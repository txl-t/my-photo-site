# 日常光摄影作品集 - 开发指南

## 1. 项目简介
本项目是一个治愈风格的摄影作品集网站，使用纯原生技术栈开发，旨在展示日常摄影作品，提供治愈系内容体验。

## 2. 技术栈选择

| 技术类别 | 选择方案 | 理由 |
|---------|---------|------|
| 基础技术 | 纯 HTML5 + CSS3 + 原生 JavaScript (ES6) | 零学习曲线、零依赖、零构建流程，Trae AI 生成准确率最高 |
| 样式方案 | 原生 CSS + CSS Grid/Flexbox | 无需学习Tailwind，直接修改样式表即可 |
| 数据存储 | 浏览器 localStorage | 无后端架构，数据存储在客户端 |
| 部署平台 | GitHub Pages | 免费、稳定、易于部署 |

## 3. 本地运行步骤

### 3.1 Trae 内置预览
1. 在 Trae 中打开任意 .html 文件（如 index.html）
2. 右键编辑器 → Open with Live Server
3. 浏览器自动打开 http://localhost:8080，实时预览
4. 或者双击 index.html 文件即可在默认浏览器打开

### 3.2 手动启动静态服务器（需安装 Node.js）
```bash
# 在项目根目录右键 → Open in Terminal
# 安装 http-server（全局安装一次即可）
npm install -g http-server

# 启动服务
http-server -p 8080

# 浏览器访问 http://localhost:8080
```

## 4. 目录结构说明

```
你的项目根目录/
├── index.html                   # 首页 - 网站入口与导航枢纽
├── photography-portfolio.html   # 作品页 - 完整瀑布流作品集
├── contact.html                 # 联系页 - 极简联系方式与订阅入口
├── images/                      # 资源文件夹（必须存在）
│   ├── avatar.jpg               # 头像 - 关于我区块展示（必需）
│   ├── hero.jpg                 # Hero背景图 - 首页顶部背景
│   ├── photo1.jpg               # 作品集图片1 - 按序号递增
│   ├── photo2.jpg
│   └── ...                      # 最多支持50张（建议单张<300KB）
├── lib/                         # 可选静态库文件夹
│   └── ...                      # 如需引入第三方库（如字体、图标）
└── README.md                    # 开发指南说明文档
```

## 5. 核心功能说明

### 5.1 首页 (index.html)
- 极简Hero区展示个人标语+精选3张作品预览+作者卡片
- 纯CSS实现滚动隐藏式导航
- localStorage存储阅读偏好

### 5.2 作品页 (photography-portfolio.html)
- 瀑布流布局展示所有摄影作品
- 点击放大查看功能
- 点赞本地持久化，跨页面数据同步

### 5.3 联系页 (contact.html)
- 极简邮箱链接设计
- 邮件订阅弹窗功能
- 纯前端实现，数据存储在浏览器本地

### 5.4 全局功能
- 响应式设计，适配PC/手机/平板
- 图片懒加载，提升性能
- 零第三方依赖，纯原生实现

## 6. 开发规范

### 6.1 HTML规范
- 使用语义化标签
- 保持代码简洁清晰
- 适当添加注释

### 6.2 CSS规范
- 使用原生CSS，避免第三方框架
- 采用CSS Grid/Flexbox进行布局
- 保持样式表的模块化和可维护性

### 6.3 JavaScript规范
- 使用ES6+语法
- 保持代码简洁高效
- 适当添加注释
- 避免全局变量污染

## 7. 部署指南

### 7.1 GitHub Pages部署
1. 将项目推送到GitHub仓库
2. 进入仓库设置
3. 在Pages选项中，选择main分支作为部署源
4. 等待自动部署完成
5. 访问分配的GitHub Pages URL

### 7.2 Netlify部署
1. 登录Netlify账号
2. 点击"New site from Git"
3. 选择GitHub仓库
4. 配置部署设置（不需要构建命令，直接部署根目录）
5. 点击"Deploy site"
6. 等待部署完成，访问分配的Netlify URL

## 8. 维护指南

### 8.1 更新作品
1. 将新作品图片添加到images/目录，命名为photoX.jpg（X为序号）
2. 在photography-portfolio.html中添加对应的HTML结构
3. 确保图片尺寸合适，建议单张<300KB

### 8.2 修改样式
1. 直接编辑对应的.css文件
2. 保持CSS的模块化和可维护性
3. 测试不同设备上的显示效果

### 8.3 更新文案
1. 直接编辑对应的.html文件
2. 保持文案简洁明了
3. 突出个人风格

## 9. 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 10. 性能优化

- 图片懒加载，提升初始加载速度
- 合理使用localStorage，避免过度存储
- 优化CSS和JavaScript代码，减少文件体积
- 使用适当的图片格式和压缩比例

## 11. 许可证

本项目采用MIT许可证，可自由使用、修改和分发。
