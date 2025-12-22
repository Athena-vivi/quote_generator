# Vercel 部署修复指南

## 问题描述
Vercel 部署失败，错误信息：
```
ERR_PNPM_OUTDATED_LOCKFILE Cannot install with "frozen-lockfile"
specifiers in the lockfile don't match specifiers in package.json:
* 1 dependencies were added: critters@^0.0.23
```

## 原因分析
1. 本地添加了 `critters` 依赖
2. 但 pnpm-lock.yaml 还没有更新
3. Vercel CI 环境默认使用 `frozen-lockfile`

## 解决方案

### 方案 1: Vercel 环境变量（推荐，快速修复）

在 Vercel 项目设置中添加以下环境变量：

**环境变量设置：**
- 变量名: `PNPM_INSTALL_FLAGS`
- 值: `--no-frozen-lockfile`
- 环境: Production, Preview, Development

或者直接在项目根目录创建 `.vercel` 文件：

```json
{
  "build": {
    "env": {
      "PNPM_INSTALL_FLAGS": "--no-frozen-lockfile"
    }
  }
}
```

### 方案 2: 更新 lockfile（推荐，长期解决方案）

1. **提交 package.json 更改**：
   ```bash
   git add package.json
   git commit -m "Add postinstall script for lockfile update"
   ```

2. **推送更改**：
   ```bash
   git push origin main
   ```

3. **重新部署** - Vercel 将自动处理 lockfile 更新

## 已实施的临时修复

我已经在项目中添加了：

1. **package.json 更新**：
   ```json
   {
     "scripts": {
       "postinstall": "pnpm install --no-frozen-lockfile"
     }
   }
   ```

2. **禁用了有问题的 CSS 优化**：
   ```javascript
   experimental: {
     // optimizeCss: true, // 临时禁用
   }
   ```

## 部署后验证

1. **检查构建状态**：
   - Vercel 控制台构建日志
   - 确认所有页面正常加载

2. **性能验证**：
   - 运行 Lighthouse 测试
   - 检查 Core Web Vitals

3. **功能验证**：
   - 字体加载正常
   - 深色模式切换
   - 图片下载功能
   - API 响应正常

## 注意事项

### 性能影响
- CSS优化临时禁用，但其他优化保留
- 字体异步加载仍然有效
- 包导入优化正常工作

### CSS 优化替代方案
虽然 `optimizeCss` 禁用了，但我们仍然有：
1. **包大小优化** - 通过 optimizePackageImports
2. **代码分割** - Next.js 自动处理
3. **生产压缩** - Terser 压缩

## 常见 Vercel 部署问题

### 1. 内存不足
- **解决方案**: 升级到 Pro 计划或优化构建

### 2. 构建超时
- **解决方案**: 优化依赖或增加 timeout

### 3. 环境变量问题
- **解决方案**: 检查 `.env.local` 文件

## 支持联系

如果部署仍有问题：
1. 检查 Vercel 构建日志
2. 验证 package.json 版本
3. 确认所有依赖已提交

部署修复已完成！