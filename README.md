# Quick Translator

一个轻量级的 VSCode 翻译插件，支持多语言互译，选中文本即可悬浮翻译。基于腾讯云机器翻译服务。

## 功能特点

- 🚀 即时翻译：选中文本后立即显示翻译结果
- 🔍 智能检测：自动识别文本语言
- 🌍 多语言支持：
  - 中文 (zh)
  - 英语 (en)
  - 日语 (ja)
  - 韩语 (ko)
  - 法语 (fr)
  - 德语 (de)
  - 西班牙语 (es)
- 💾 翻译缓存：相同文本无需重复请求
- 📋 一键复制：快速复制翻译结果

## 安装

在 VSCode 扩展市场搜索 "Quick Translator" 或点击[这里](https://marketplace.visualstudio.com/items?itemName=weisxing.quick-translator)安装。

## 使用前准备

1. 注册[腾讯云账号](https://cloud.tencent.com/)并开通[机器翻译服务](https://cloud.tencent.com/product/tmt)

    > **免费额度说明**
    > - 每月免费额度：5百万字符
    > - 超出后定价：58元/百万字符
    > - 免费额度每月1号自动重置
    > - [查看详细计费说明](https://cloud.tencent.com/document/product/551/35017)

2. 获取 API 密钥（SecretId 和 SecretKey）：
   - 访问[访问密钥](https://console.cloud.tencent.com/cam/capi)页面
   - 创建或查看密钥
3. 在 VSCode 中配置密钥：
   - 打开设置（Ctrl+,）
   - 搜索 "translator"
   - 填入 SecretId 和 SecretKey

## 使用方法

1. 选中需要翻译的文本
2. 将鼠标悬停在选中文本上
3. 查看翻译结果
4. 点击 "复制" 按钮复制翻译结果

## 配置选项

- `translator.tencentSecretId`: 腾讯云 API SecretId
- `translator.tencentSecretKey`: 腾讯云 API SecretKey
- `translator.sourceLanguage`: 源语言设置（默认：自动检测）
  - `auto`: 自动检测
  - `zh`: 简体中文
  - `en`: 英语
  - `ja`: 日语
  - `ko`: 韩语
  - `fr`: 法语
  - `de`: 德语
  - `es`: 西班牙语
- `translator.targetLanguage`: 目标翻译语言（默认：英语）
  - `zh`: 简体中文
  - `en`: 英语
  - `ja`: 日语
  - `ko`: 韩语
  - `fr`: 法语
  - `de`: 德语
  - `es`: 西班牙语
- `translator.hoverDelay`: 悬停延迟时间（毫秒，默认：300）
- `translator.maxTextLength`: 最大可翻译文本长度（默认：5000字符）
- `translator.projectId`: 腾讯云项目 ID（默认：0）

## 注意事项

- ⚠️ 请妥善保管 API 密钥，不要分享给他人
- 💰 翻译服务可能产生费用，请关注腾讯云账户余额
- 🔒 密钥信息仅保存在本地，不会上传到任何服务器
- ❓ 如遇问题，请查看控制台输出的错误信息

## 问题反馈

如果你在使用过程中遇到任何问题，或有功能建议，欢迎：

- [提交 Issue](https://github.com/weisxing/quick-translator/issues)

## 更新日志

### 0.0.1 (2023-12-27)
- ✨ 初始版本发布
- 🌟 支持多语言互译
- 🚀 支持即时翻译
- 💾 支持翻译缓存
- 📋 支持一键复制
- 🔧 支持自定义配置

## 许可证

[MIT License](LICENSE) © 2024 [weisxing](https://github.com/weisxing) 