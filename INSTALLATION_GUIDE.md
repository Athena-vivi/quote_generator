# 安装依赖指南

## 当前问题
遇到网络连接问题 (ECONNRESET)，无法执行 `npm install`。

## 解决方案

### 方案1：手动安装（推荐）
1. 确保你已经在中国大陆的网络环境
2. 使用以下命令之一：
   ```bash
   # 使用yarn（通常更稳定）
   yarn install

   # 或使用cnpm（淘宝镜像）
   npm install -g cnpm --registry=https://registry.npm.taobao.org
   cnpm install

   # 或使用pnpm
   pnpm install
   ```

### 方案2：使用代理
如果你有代理设置：
```bash
npm config set proxy http://your-proxy-server:port
npm config set https-proxy http://your-proxy-server:port
npm install
```

### 方案3：清空缓存重试
```bash
npm cache clean --force
npm install
```

## 验证安装
安装完成后，运行：
```bash
npm run build
```

## 注意事项
- `@next/mdx` 已经在 package.json 中定义（版本 ^15.4.2）
- 如果依然有网络问题，建议切换到更稳定的网络环境

## SEO改进状态
✅ 所有SEO改进代码已实施完成
⚠️ 只需要安装依赖即可正常运行