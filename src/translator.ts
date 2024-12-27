import * as vscode from 'vscode';
import { TencentApi, TencentCredentials } from './tencent-api';

export class TencentTranslator {
    private api: TencentApi | null = null;
    private cache = new Map<string, string>();

    private getCredentials(): TencentCredentials {
        const config = vscode.workspace.getConfiguration('translator');
        return {
            secretId: config.get<string>('tencentSecretId') || '',
            secretKey: config.get<string>('tencentSecretKey') || ''
        };
    }

    private getSourceLanguage(text: string): string {
        const config = vscode.workspace.getConfiguration('translator');
        const configLang = config.get<string>('sourceLanguage') || 'auto';

        if (configLang === 'auto') {
            return this.detectLanguage(text);
        }

        // 验证语言代码
        const validLangs = ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es'];
        if (!validLangs.includes(configLang)) {
            console.warn(`不支持的源语言: ${configLang}, 使用自动检测`);
            return this.detectLanguage(text);
        }

        return configLang;
    }

    private getTargetLanguage(sourceLang: string): string {
        const config = vscode.workspace.getConfiguration('translator');
        const configLang = config.get<string>('targetLanguage') || 'en';

        // 验证语言代码
        const validLangs = ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es'];
        if (!validLangs.includes(configLang)) {
            console.warn(`不支持的目标语言: ${configLang}, 使用默认值: en`);
            return 'en';
        }

        // 如果源语言和目标语言相同，则翻译为英文（源语言为英文则翻译为中文）
        if (sourceLang === configLang) {
            return sourceLang === 'en' ? 'zh' : 'en';
        }

        return configLang;
    }

    private detectLanguage(text: string): string {
        if (/[\u4e00-\u9fa5]/.test(text)) return 'zh';
        if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(text)) return 'ja';
        if (/[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/.test(text)) return 'ko';
        return 'en';
    }

    async translate(text: string): Promise<string> {
        try {
            const credentials = this.getCredentials();
            if (!credentials.secretId || !credentials.secretKey) {
                throw new Error('请先在设置中配置腾讯云 API 密钥（SecretId 和 SecretKey）');
            }

            if (!this.api) {
                this.api = new TencentApi(credentials);
            }

            const sourceLang = this.getSourceLanguage(text);
            const targetLang = this.getTargetLanguage(sourceLang);

            if (sourceLang === targetLang) {
                return text;
            }

            return await this.api.translate(text, sourceLang, targetLang);
        } catch (error: any) {
            console.error('翻译错误:', error);
            throw error;
        }
    }
} 