《隔壁的日常光》个人摄影网站产品需求文档 (PRD)
版本：2.0  | 目标用户：零编程经验的日常记录者
一、产品概述与定位
1.1 产品名称与 Slogan
产品名称：「隔壁的日常光」
Slogan："专业摄影师在等极光，我在等楼下小树发芽"
1.2 产品定位
一个展示 "平凡日常治愈瞬间" 的个人摄影网站，区别于专业风光摄影，强调 真实感、陪伴感和低门槛 。目标是让访客感受到"原来我身边也有这样的美"，同时为零编程经验用户提供可持续维护的个人影像日记平台。
1.3 核心价值主张
对访客：提供"生活解压阀"，发现日常小确幸，建立情感共鸣
对自己：无需专业技巧压力，通过手机即可完成全部更新维护
差异化：用"非专业"作为特色标签，不教技术，只分享"看见"的瞬间
二、目标用户画像
表格
复制
用户类型	特征	需求
核心用户	25-40岁城市白领/自由职业者，手机摄影爱好者，非专业玩家	寻找无压力、有温度的日常影像内容，获得治愈感
次要用户	摄影初学者，寻求"无门槛"学习样本	观察日常拍摄思路，而非技术参数
潜在合作方	独立杂志、治愈系品牌方	发现真实、有故事性的视觉内容创作者
三、网站页面结构与功能需求
3.1 页面架构总览
表格
复制
页面	URL	功能定位	优先级
首页	index.html	个人介绍 + 精选作品预览 + 导航枢纽	P0
作品页	photography-portfolio.html	完整瀑布流摄影作品展示	P0
联系页	contact.html	极简联系方式 + 订阅入口	P0
3.2 首页 (index.html) 功能详述
3.2.1 核心模块结构
复制
┌─────────────────────────────────────────┐
│ 固定导航栏 [Logo] [首页] [作品] [联系]    │
├─────────────────────────────────────────┤
│ Hero 区：背景图 + 主标题 + 副标题        │
├─────────────────────────────────────────┤
│ 作者卡片：头像 + 个人简介 + 邮箱         │
├─────────────────────────────────────────┤
│ 精选作品：3张图 + 日期 + 一句话描述      │
└─────────────────────────────────────────┘
3.2.2 功能细节清单
表格
复制
模块	功能点	技术实现	交互说明
导航栏	固定顶部 + 滚动隐藏/显示	CSS position: sticky + JS 监听 scroll	移动端折叠为汉堡菜单
Logo	点击返回首页	<a href="index.html">	-
作品链接	跳转到 photography-portfolio.html	<a href="photography-portfolio.html" target="_blank">	新标签页打开，避免覆盖当前页
联系链接	跳转到 contact.html	<a href="contact.html">	当前页跳转
Hero 背景	使用 images/hero.jpg	CSS background-image	移动端不固定背景，防止卡顿
作者卡片	圆形头像 + 三段式介绍	<img> + <p>	头像 hover 轻微放大
精选作品	3张图横向排列	Flex/Grid 布局	点击跳转到作品页并滚动到对应位置（可选增强）
3.3 作品页 (photography-portfolio.html) 功能详述
注意：此页面已存在，PRD中仅做兼容性约束，禁止改动核心功能。
表格
复制
功能模块	现状	约束要求
瀑布流布局	已实现	禁止修改列数、间距、动画
图片展示	正方形/竖版	禁止修改圆角、描边、阴影
点赞功能	❤️图标 + 本地存储	保留 localStorage 逻辑
评论系统	Disqus	建议移除，改为极简本地评论（可选）
日期格式	树状时间线	简化为单行「12.18·周三·晴」
关于区块	底部头像+简介	保留，内容同步首页
3.4 联系页 (contact.html) 功能详述
表格
复制
模块	功能点	技术实现	备注
导航栏	复用首页，当前高亮	CSS .active 类	-
标题区	「说点什么」 + 引导语	<h1> + <p>	文艺感文案
邮箱链接	mailto:2741735088@qq.com	<a href="mailto:...">	点击唤起邮件客户端
订阅按钮	「订阅周五邮件」	JS 弹出输入框 + localStorage 存储	诱饵：每周3张治愈图
返回按钮	「返回首页」	<a href="index.html">	-
四、设计规范与品牌手册
4.1 视觉风格关键词
日式文艺：克制留白、细线描边、低饱和配色
治愈温暖：米白背景、炭灰文字、灰豆绿点缀
真实感：无滤镜、无水印、保留手机拍摄原片感
4.2 配色系统
表格
复制
用途	色值	使用场景
背景色	#F8F6F2	全局背景
文字主色	#2C2C2C	标题、正文
文字辅色	#777777	副标题、日期
点缀色	#A8B5A0	链接 hover、按钮
装饰线	#E8E3D9	边框、分隔线
错误/裂图	#F0F0F0	图片加载失败占位
4.3 字体系统
css
复制
/* 标题：衬线，有书卷气 */
font-family: 'NotoSerifSC', serif; /* Google Fonts */

/* 正文：无衬线，现代感 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* 描述：系统默认，保证速度 */
font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
4.4 图片处理规范
表格
复制
图片类型	尺寸	格式	大小限制	处理流程
Hero 背景	1920×1080px	JPG	<500KB	VSCO 调光 → TinyPNG 压缩
精选预览	800×600px	JPG	<200KB	-
作品集	1200×800px	JPG	<300KB	-
头像	400×400px	JPG/PNG	<100KB	圆形裁剪
五、技术架构与平台方案
5.1 技术栈选择
核心原则：零依赖、零后端、零构建流程
前端：HTML5 + CSS3 + 原生 JavaScript (ES6)
存储：localStorage（点赞、订阅、阅读计数）
部署：静态文件托管（Netlify / GitHub Pages）
图片：本地 images/ 文件夹管理
5.2 文件结构规范
复制
project-root/
├── index.html              # 首页
├── photography-portfolio.html # 作品页（禁止修改）
├── contact.html            # 联系页
├── images/                 # 资源文件夹
│   ├── avatar.jpg          # 头像
│   ├── hero.jpg            # Hero 背景
│   ├── photo1.jpg ...      # 作品集（12张）
│   └── article1.jpg ...    # 文章配图（复用）
├── README.md               # 开发指南（自动生成）
└── .gitignore             # 可选
5.3 核心功能实现逻辑
5.3.1 点赞系统
JavaScript
复制
// 使用 localStorage 持久化
function toggleLike(photoId) {
  const likes = JSON.parse(localStorage.getItem('photoLikes') || '{}');
  likes[photoId] = !likes[photoId];
  localStorage.setItem('photoLikes', JSON.stringify(likes));
  renderPhotos(); // 重新渲染
}
5.3.2 订阅功能
JavaScript
复制
// 弹窗 + 邮箱验证 + localStorage
function subscribeEmail() {
  const email = prompt('输入邮箱，每周五收到3张治愈图');
  if (email && email.includes('@')) {
    localStorage.setItem('subscriber', email);
    alert('订阅成功！第一期周五送达');
  }
}
5.3.3 导航高亮
JavaScript
复制
// 自动为当前页面对应的导航链接添加 .active 类
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href.includes(window.location.pathname.split('/').pop())) {
    link.classList.add('active');
  }
});
六、内容运营与维护 SOP
6.1 内容更新频率
表格
复制
内容类型	更新频率	操作时间	操作工具
上传新照片	每周 3-5 张	2-3 分钟/张	Trae App 或 电脑拖拽
修改文字描述	随时	1 分钟/张	Trae 编辑器
新增导航页面	按需	30 分钟	Trae Builder
备份图片	每月 1 次	5 分钟	压缩 images/ 文件夹
6.2 操作流程（以更新照片为例）
准备图片：手机选图 → VSCO 微调 → TinyPNG 压缩
命名文件：photo13.jpg（续接现有序号）
放入文件夹：拖入 Trae 的 images/ 目录
修改数据：在 photos 数组末尾添加新对象
本地预览：Trae 内置预览或 live-server
部署：Netlify 自动部署（GitHub 同步）或手动上传
6.3 放弃预警指标
连续 2 周未更新 → 反思流程是否过复杂
单次上传耗时 >10 分钟 → 优化压缩工具使用
新发照片 404 >3 张 → 检查命名规范
七、部署方案对比与选型
表格
复制
平台	费用	部署方式	优点	缺点	推荐度
Netlify	免费	拖拽文件夹	最快、有预览、表单功能	国内访问稍慢	★★★★★
GitHub Pages	免费	Git 推送	纯免费、版本管理	需学 Git 基础	★★★★☆
Vercel	免费	Git 集成	速度快、CI/CD 强大	配置稍复杂	★★★★☆
阿里云 OSS	¥5/月	静态托管	国内访问快	需买域名、配置 CDN	★★★☆☆
7.1 Netlify 部署详细步骤（推荐）
注册：netlify.com → Sign Up → GitHub 账号授权
创建站点：Dashboard → Add new site → Deploy manually
上传：解压 Trae 项目 ZIP → 拖拽到网页 → Deploy
获取 URL：https://your-site-name.netlify.app
自定义域名（可选）：Domain settings → Add custom domain
7.2 域名绑定（可选）
购买：阿里云/腾讯云域名（¥50-80/年）
解析：添加 CNAME 记录 → 指向 your-site.netlify.app
HTTPS：Netlify 自动申请 SSL 证书
八、风险评估与应对预案
表格
复制
风险项	可能性	影响	应对方案
更新动力下降	中	网站荒废	降低目标至"月更"，保持心态轻松
图片被盗用	中	版权纠纷	在关于页声明"禁止商用"，保留 EXIF 信息
平台费用上涨	低	成本增加	数据可导出，随时迁移至 GitHub Pages
评论垃圾信息	低	体验下降	关闭评论功能，仅保留邮箱联系
手机丢失断档	低	内容丢失	iCloud/Google Photos 自动同步 + 本地月度备份
九、成功指标 (KPI) 与里程碑
9.1 过程指标（0-3 个月）
表格
复制
指标	目标	验证方式
照片数量	积累 50+ 张	本地 images/ 文件夹计数
更新频率	首页每周更新 1 次	Trae Git 提交记录
操作熟练度	单次上传 <5 分钟	手机计时器自测
9.2 结果指标（3-6 个月）
表格
复制
指标	目标值	验证工具
月访问量	>300 UV	Netlify Analytics / Google Analytics
平均停留时长	>90 秒	Analytics
订阅用户数	>30 人	localStorage 统计（手动）
外链分享数	>10 次	主动询问朋友
9.3 里程碑
Week 1：完成三页面部署，公开访问
Month 1：积累 20 张照片，分享给 5 位朋友测试
Month 3：稳定周更，订阅用户突破 20
Month 6：决定是否持续 or 转为私密日记
十、附录：术语表与工具清单
10.1 术语表
表格
复制
术语	解释
静态网站	无服务器端代码，纯 HTML/CSS/JS 文件
部署	把本地文件上传到公网服务器
localStorage	浏览器本地存储，数据存在用户电脑
CDN	内容分发网络，加速图片加载
404	文件不存在错误
10.2 工具清单（全部免费）
表格
复制
用途	工具	网址
代码生成	Trae Builder	trae.com.cn
图片压缩	TinyPNG	tinypng.com
图床（备用）	SM.MS	sm.ms
部署平台	Netlify	netlify.com
字体	Google Fonts	fonts.google.com
图标	Font Awesome	cdnjs.com
十一、最终批准
产品负责人：（涂晓琳 / 你的签名）
批准日期：（网站上线日）
