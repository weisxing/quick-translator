# VSCode 插件发布指南

本文档描述了如何发布 Quick Translator 插件到 VSCode 插件市场。

## 发布方案

最稳定但较繁琐的方式。

1. **打包**
   ```bash
   npm run package
   ```

2. **准备账号**
   [参考文档](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
   - [获取个人访问令牌 ](https://dev.azure.com)
   - [创建发布者](https://marketplace.visualstudio.com/manage/publishers)，会验证Google图形验证码，需要翻墙

3. **上传**
   - 访问 [Marketplace](https://marketplace.visualstudio.com/manage)
   - 登录 Microsoft 账号
   - 手动上传 .vsix 文件
   - 会验证Google图形验证码，需要翻墙
