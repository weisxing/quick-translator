import * as tencentcloud from "tencentcloud-sdk-nodejs-tmt";
import * as vscode from "vscode";

export interface TencentCredentials {
    secretId: string;
    secretKey: string;
}

interface TranslateParams {
    SourceText: string;
    Source: string;
    Target: string;
    ProjectId: number;
}

export class TencentApi {
    private readonly REGION = 'ap-beijing';
    private client: any;

    constructor(private credentials: TencentCredentials) {
        if (!credentials.secretId || !credentials.secretKey) {
            throw new Error('请先在设置中配置腾讯云 API 密钥（SecretId 和 SecretKey）');
        }

        const TmtClient = tencentcloud.tmt.v20180321.Client;
        const clientConfig = {
            credential: {
                secretId: credentials.secretId.trim(),
                secretKey: credentials.secretKey.trim(),
            },
            region: this.REGION,
            profile: {
                httpProfile: {
                    endpoint: "tmt.tencentcloudapi.com",
                },
            },
        };

        try {
            this.client = new TmtClient(clientConfig);
        } catch (error) {
            console.error('初始化腾讯云客户端失败:', error);
            throw new Error('初始化翻译服务失败，请检查密钥配置');
        }
    }

    async translate(text: string, sourceLang: string, targetLang: string): Promise<string> {
        try {
            const config = vscode.workspace.getConfiguration('translator');
            const projectId = config.get<number>('projectId') || 0;

            const params = {
                SourceText: text,
                Source: sourceLang.toLowerCase(),
                Target: targetLang.toLowerCase(),
                ProjectId: projectId
            };

            console.log('发送请求:', {
                region: this.REGION,
                params
            });

            return new Promise((resolve, reject) => {
                this.client.TextTranslate(params).then(
                    (data: any) => {
                        console.log('API响应:', data);
                        if (data?.Error) {
                            reject(new Error(`API错误: ${data.Error.Code} - ${data.Error.Message}`));
                            return;
                        }
                        if (!data?.TargetText) {
                            reject(new Error('翻译服务返回的数据格式无效'));
                            return;
                        }
                        resolve(data.TargetText);
                    },
                    (err: any) => {
                        console.error('翻译错误:', err);
                        reject(new Error(err.message || '翻译失败'));
                    }
                );
            });
        } catch (error: any) {
            console.error('翻译错误:', error);
            throw new Error(error.message || '翻译失败');
        }
    }
}