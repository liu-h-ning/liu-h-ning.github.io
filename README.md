# Liu Hongning Academic Homepage

这是一个适合 GitHub Pages 的个人学术主页与博客。当前风格参考 `https://www.shuo-yu.com/` 的学术主页类型：顶部锚点导航、左侧个人信息栏、右侧 Bio/News/Experiences/Publications/Blog 内容流。

页面信息已根据刘洪宁简历、ResearchGate、Google Scholar 和 DBLP 做初步整理；论文列表以 ResearchGate research 页面显示的 10 篇 publications 为准。

项目不依赖构建工具，打开 `index.html` 即可预览。

## 目录

- `index.html`: 学术主页入口
- `assets/styles.css`: 页面样式与响应式布局
- `assets/site-data.js`: 动态、经历、研究方向、荣誉、活动、论文和文章数据
- `assets/app.js`: 列表渲染、文章搜索与分类筛选
- `posts/`: 独立文章页面

## 修改个人信息

优先编辑 `assets/site-data.js`：

- `news`: 首页动态
- `experiences`: 教育和工作经历
- `interests`: 研究兴趣
- `honors`: 奖项荣誉
- `activities`: 学术活动
- `publications`: 论文和项目
- `posts`: 博客文章入口

再编辑 `index.html` 里的姓名、职称、单位、城市、邮箱、Scholar、ORCID、GitHub 和 CV 链接。

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库，仓库名可用 `你的用户名.github.io`。
2. 在本地初始化并推送：

```powershell
git init
git add .
git commit -m "Create academic homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git
git push -u origin main
```

3. 打开仓库的 `Settings` -> `Pages`。
4. Source 选择 `Deploy from a branch`，Branch 选择 `main` 和 `/root`。
5. 等待 GitHub Pages 构建完成后访问 `https://你的用户名.github.io/`。

## 后续扩展

- 当前头像使用 GitHub 头像外链；如需更换，编辑 `index.html` 中的 `avatar-image`。
- 把 `publications` 的链接改成 PDF、DOI、Code 或项目主页。
- 绑定个人域名时，在仓库根目录新增 `CNAME` 文件。
- 如果需要 Markdown 写作流，可以后续迁移到 Jekyll、Hugo 或 Astro。
