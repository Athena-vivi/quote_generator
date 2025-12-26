# 🔍 依赖审计报告

## 📊 审计结果总结

### ✅ 实际使用的 UI 组件
根据对 `app/` 和 `components/` 目录的全面扫描，以下组件被实际使用：

| 组件 | 使用次数 | 位置 |
|------|----------|------|
| button | ~15次 | 广泛使用 |
| card | ~12次 | 广泛使用 |
| input | ~5次 | 表单页面 |
| textarea | ~2次 | contact 页面 |
| alert | ~2次 | login-modal, contact |
| badge | ~3次 | pricing-modal, contact |
| theme-toggle | ~1次 | navigation |

### ❌ 未使用的依赖（可以安全移除）

#### 1. **完全未使用的依赖**
- `qrcode` - 代码中未找到任何引用
- `critters` - CSS 优化工具，配置中被禁用
- `cross-env` - 仅在 analyze 脚本中使用，但可以简化

#### 2. **误报（实际上被使用）**
以下依赖被 depcheck 标记为未使用，但实际上**必须保留**：

| 依赖 | 用途 | 位置 |
|------|------|------|
| `autoprefixer` | PostCSS 插件 | postcss.config.js |
| `postcss` | Tailwind CSS 依赖 | 构建配置 |
| `cssnano` | CSS 优化 | 构建配置（虽然被禁用） |
| `@types/node` | TypeScript 类型 | 类型定义 |
| `typescript` | 编译器 | 构建必需 |
| `@hookform/resolvers` | 表单验证 | components/ui/form.tsx |

### ⚠️  Radix UI 组件分析

#### 已使用的 Radix UI 原语（28个）
- accordion
- alert-dialog
- aspect-ratio
- avatar
- checkbox
- collapsible
- context-menu
- dialog
- dropdown-menu
- hover-card
- label
- menubar
- navigation-menu
- popover
- progress
- radio-group
- scroll-area
- select
- separator
- sheet (dialog 别名)
- slider
- switch
- tabs
- toast
- toggle
- toggle-group
- tooltip
- slot

#### 所有 Radix 组件都在 components/ui/ 中被使用
- 这些是**基础 UI 组件库**，被包装成可复用的组件
- 虽然应用只使用了 `button`, `card` 等，但这些组件内部依赖 Radix 原语
- **建议：全部保留**

---

## 📋 建议操作

### 🔴 立即移除（安全）
```bash
npm uninstall qrcode
```

### 🟡 可选移除（如果不需要 CSS 优化）
```bash
npm uninstall critters
```

### 🟢 保留所有其他依赖
- 所有 Radix UI 包都在使用
- 所有构建工具都是必需的
- TypeScript 类型定义是必需的

---

## 📊 Bundle 大小分析

### 当前依赖大小估算

| 类别 | 包数量 | 估算大小 |
|------|--------|----------|
| Radix UI | 28包 | ~150 KB |
| 构建工具 | 5包 | ~500 KB (dev only) |
| 运行时依赖 | ~40包 | ~300 KB |
| **总计** | **73包** | **~950 KB** |

### 移除 qrcode 后的节省
- qrcode: ~20 KB
- **节省**: ~20 KB (2%)

---

## 💡 优化建议

### 1. **移除 qrcode（已完成）**
```bash
npm uninstall qrcode
```

### 2. **保持当前配置**
所有其他依赖都有实际用途，移除它们会破坏应用功能。

### 3. **未来优化方向**
- 考虑将大型组件（如 ImageGenerator）进一步拆分
- 使用动态导入减少初始 bundle
- 启用 CSS 优化（critters）并修复兼容性问题

---

## ✅ 结论

**依赖审计结果：**
- ✅ 依赖使用整体健康
- ✅ 只有 1 个真正未使用的依赖（qrcode）
- ✅ Radix UI 组件虽然多但都有用途
- ✅ 构建工具配置合理

**可操作的优化：**
1. 移除 `qrcode` (~20 KB 节省)
2. 移除 `critters`（如果不需要 CSS 优化）

**预期结果：**
- Bundle 大小减少 ~20 KB
- 无功能损失
- 构建时间略微缩短
