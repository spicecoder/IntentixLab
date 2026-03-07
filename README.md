# Intention Space — Static Site Generator

A lightweight Node.js static site generator that turns a directory of Markdown files into a complete, searchable website with a science/technology theme.

## Quick Start

```bash
npm install
npm run build
npm run serve     # Preview at http://localhost:3000
```

## How It Works

**You write Markdown → the script generates a full static site.**

```
content/                    →    dist/
├── foundations/             │    ├── foundations/
│   ├── _meta.json          │    │   ├── pulses.html
│   ├── pulses.md           │    │   └── design-nodes.html
│   └── design-nodes.md     │    ├── architecture/
├── architecture/            │    │   └── pnr-model.html
│   ├── _meta.json          │    ├── css/
│   └── pnr-model.md        │    ├── js/
└── tutorials/               │    └── index.html
    ├── _meta.json           │
    └── quick-start.md       │
```

## Writing Pages

Each `.md` file becomes a page. Use YAML frontmatter for metadata:

```markdown
---
title: My Page Title
order: 1
description: A short description for SEO and search.
---

# My Page Title

Your content here with full GitHub-flavored Markdown support.
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | No | Page title (defaults to filename) |
| `order` | No | Sort order in navigation (default: 999) |
| `description` | No | SEO description (auto-generated from content) |

## Directory Structure = Navigation

- Each **directory** in `content/` becomes a collapsible section
- Each **`.md` file** becomes a page link under its section
- Add `_meta.json` to control label and order:

```json
{ "label": "Getting Started", "order": 1 }
```

## Customizing

Edit `templates/header.html` and `templates/footer.html` for shared chrome.
Edit `static/css/style.css` — uses CSS variables for easy theming.
Edit `CONFIG` in `scripts/build.js` for site title and tagline.

## Deploy to GitHub Pages

This project includes a GitHub Actions workflow that auto-deploys on push:

1. Create a **private** repo on GitHub
2. Go to Settings → Pages → Source: **GitHub Actions**
3. Push your code to `main`
4. Site auto-builds and deploys

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Generate site into `dist/` |
| `npm run clean` | Remove `dist/` |
| `npm run rebuild` | Clean + build |
| `npm run serve` | Preview locally on port 3000 |
