# Change Log

All notable changes to the "Quick Translator" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2023-12-27

### Added
- ✨ 初始版本发布
- 🌍 集成腾讯云机器翻译服务
  - 支持腾讯云 TMT API
  - 支持项目 ID 配置
  - 支持 SecretId/SecretKey 认证
- 🌍 支持多语言互译
  - 中文 (zh)
  - 英语 (en)
  - 日语 (ja)
  - 韩语 (ko)
  - 法语 (fr)
  - 德语 (de)
  - 西班牙语 (es)
- 🔍 支持自动语言检测
- 🚀 支持即时翻译
  - 选中文本后立即显示翻译结果
  - 鼠标悬停自动触发翻译
- 💾 支持翻译缓存
  - 缓存有效期 5 分钟
  - 相同文本无需重复请求
- 📋 支持一键复制翻译结果
- 🔧 支持自定义配置
  - 源语言设置
  - 目标语言设置
  - 悬停延迟时间
  - 最大翻译长度
  - 腾讯云项目 ID

### Changed
- 无

### Deprecated
- 无

### Removed
- 无

### Fixed
- 无

### Security
- 🔒 API 密钥仅保存在本地
- 🛡️ 支持 HTTPS 安全传输
- 🔐 使用腾讯云官方 SDK 进行安全调用

[0.0.1]: https://github.com/weisxing/quick-translator/releases/tag/v0.0.1 