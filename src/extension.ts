import * as vscode from 'vscode';
import { TencentTranslator } from './translator';

interface TranslationCache {
    text: string;
    translation: string;
    timestamp: number;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Quick Translator 插件已激活');
    const translator = new TencentTranslator();
    const cache = new Map<string, TranslationCache>();
    const CACHE_EXPIRE_TIME = 1000 * 60 * 5; // 5分钟缓存过期

    // 注册复制命令
    const copyCommand = vscode.commands.registerCommand('quick-translator.copyTranslation', (text: string) => {
        vscode.env.clipboard.writeText(text).then(() => {
            vscode.window.showInformationMessage('已复制翻译结果到剪贴板');
        });
    });

    // 监听选中文本变化
    let lastSelection: string = '';
    let lastHover: vscode.Hover | undefined;

    vscode.window.onDidChangeTextEditorSelection(event => {
        const editor = event.textEditor;
        if (!editor || editor.selection.isEmpty) {
            lastSelection = '';
            lastHover = undefined;
            return;
        }

        const text = editor.document.getText(editor.selection);
        if (text === lastSelection) {
            return;
        }

        lastSelection = text;
        lastHover = undefined;
    });

    // 注册悬停提供程序
    const hoverProvider = vscode.languages.registerHoverProvider('*', {
        async provideHover(document, position) {
            const editor = vscode.window.activeTextEditor;
            if (!editor || editor.document !== document) {
                return;
            }

            const selection = editor.selection;
            if (selection.isEmpty) {
                return;
            }

            // 检查鼠标位置是否在选中区域内
            const selectedRange = new vscode.Range(selection.start, selection.end);
            if (!selectedRange.contains(position)) {
                lastHover = undefined;  // 只清除悬浮框缓存，保留翻译缓存
                return;
            }

            const text = document.getText(selection);

            // 检查翻译缓存
            const now = Date.now();
            const cached = cache.get(text);
            if (cached && (now - cached.timestamp) < CACHE_EXPIRE_TIME) {
                // 如果有悬浮框缓存且文本未变，直接返回悬浮框
                if (lastHover && text === lastSelection) {
                    return lastHover;
                }
                // 否则用翻译缓存创建新的悬浮框
                lastHover = createHover(cached.translation, text);
                lastSelection = text;
                return lastHover;
            }

            const config = vscode.workspace.getConfiguration('translator');
            const maxLength = config.get<number>('maxTextLength') || 5000;

            if (text.length > maxLength) {
                lastHover = createHover('⚠ 文本太长，超过最大可翻译长度限制');
                return lastHover;
            }

            try {
                const translation = await translator.translate(text);

                // 更新缓存
                cache.set(text, {
                    text,
                    translation,
                    timestamp: now
                });

                lastHover = createHover(translation, text);
                return lastHover;
            } catch (error: any) {
                if (error.message.includes('API 密钥')) {
                    lastHover = createHover([
                        '🔑 请先配置腾讯云 API 密钥:',
                        '1. 打开设置 (Ctrl+,)',
                        '2. 搜索 "translator"',
                        '3. 填入 SecretId 和 SecretKey'
                    ].join('\n'));
                    return lastHover;
                }
                if (error.message.startsWith('API错误:')) {
                    lastHover = createHover('❌ ' + error.message);
                    return lastHover;
                }
                lastHover = createHover('❗ 翻译失败，请检查网络连接或 API 密钥是否正确');
                return lastHover;
            }
        }
    });

    context.subscriptions.push(hoverProvider, copyCommand);
    console.log('Quick Translator 插件注册完成');
}

function createHover(translation: string, originalText?: string): vscode.Hover {
    const markdownContent = new vscode.MarkdownString();
    markdownContent.isTrusted = true;
    markdownContent.supportHtml = true;

    if (originalText) {
        // 添加原文和分隔线
        markdownContent.appendMarkdown(`*${originalText}*\n\n`);
        markdownContent.appendMarkdown('---\n');
    }

    // 添加翻译结果
    markdownContent.appendMarkdown(`🌐 ${translation}`);

    // 添加复制按钮
    if (originalText) {
        markdownContent.appendMarkdown('\n\n');
        // 使用命令参数传递要复制的文本
        markdownContent.appendMarkdown(`📋 [复制](command:quick-translator.copyTranslation?${encodeURIComponent(JSON.stringify([translation]))})`);
    }

    return new vscode.Hover(markdownContent);
}

export function deactivate() { } 