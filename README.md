# 微观经济学II讲义

## Microeconomics II Manuscript

这是一本使用[Jupyter Book](https://jupyterbook.org/)构建的微观经济学II交互式讲义。

## 本地构建

### 环境要求

- Python 3.8+
- pip

### 安装依赖

```bash
pip install -r requirements.txt
```

### 构建书籍

```bash
jupyter-book build .
```

构建完成后，打开 `_build/html/index.html` 查看生成的书籍。

### 实时预览（开发模式）

```bash
jupyter-book build . --watch --serve
```

这将在本地启动一个服务器，并自动重新构建书籍当文件发生变化时。

## 项目结构

```
.
├── _config.yml          # Jupyter Book 配置文件
├── _toc.yml            # 目录结构配置
├── intro.md            # 书籍简介
├── 第一讲.md           # 第一讲内容
├── requirements.txt    # Python 依赖
├── README.md           # 本文件
└── _build/             # 构建输出目录（自动生成）
```

## 添加新章节

1. 创建新的 markdown 文件（如 `第二讲.md`）
2. 在 `_toc.yml` 中的相应位置添加条目
3. 重新构建书籍

## 部署

书籍可以部署到：
- GitHub Pages
- Netlify
- Vercel
- 任何支持静态网站的平台

### GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml` 文件来实现自动部署到 GitHub Pages。

## 许可证

[添加您的许可证信息]

## 贡献

[添加贡献指南]

<!-- Updated for Cloudflare Pages deployment fix on 2025-11-21 -->
