# Intention Space — Static Site Generator

A lightweight Node.js static site generator that turns a directory of Markdown files into a complete, searchable website for the Intention Space research framework.

## Quick Start

```bash
npm install
npm run build
npm run serve     # Preview at http://localhost:3000
```

## Site Architecture

The generated site uses a **three-column layout** designed for technical documentation:

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER BAR                                          Home  GitHub│
│  [IS] Intention Space · Science · Technology · Innovation        │
├───────────────────┬──────────────────────────────────────────────┤
│                   │                                              │
│  SIDEBAR NAV      │  MAIN CONTENT                                │
│                   │                                              │
│  ┌─────────────┐  │  Each .md file renders here as a full page   │
│  │ Search…     │  │  with syntax-highlighted code blocks,        │
│  └─────────────┘  │  tables, blockquotes, and cross-links.       │
│                   │                                              │
│  ▸ FOUNDATIONS    │  The content area is capped at 820px for     │
│    · Pulses       │  comfortable reading, with generous padding   │
│    · Design Nodes │  on wider screens.                            │
│                   │                                              │
│  ▸ ARCHITECTURE   │                                              │
│    · PnR Model    │                                              │
│                   │                                              │
│  ▸ TUTORIALS      │                                              │
│    · Quick Start  │                                              │
│                   │                                              │
│  ▸ RESEARCH       │                                              │
│    · Dual-Process │                                              │
│                   │                                              │
├───────────────────┴──────────────────────────────────────────────┤
│  FOOTER — © Keybyte Systems · Intentix AB · Grant IR2405165      │
└──────────────────────────────────────────────────────────────────┘
```

### How Directory Structure Becomes Navigation

The sidebar menu is **generated automatically** from the `content/` directory tree:

```
content/                         SIDEBAR RENDERS AS:
├── foundations/                  ▸ FOUNDATIONS          ← directory = collapsible section
│   ├── _meta.json                 (label + order from _meta.json)
│   ├── pulses.md                    · Pulses            ← .md file = page link
│   └── design-nodes.md             · Design Nodes
├── architecture/                ▸ ARCHITECTURE
│   ├── _meta.json
│   └── pnr-model.md                · Prompt and Response Model
├── tutorials/                   ▸ TUTORIALS
│   ├── _meta.json
│   └── quick-start.md              · Quick Start
└── research/                    ▸ RESEARCH
    ├── _meta.json
    └── dual-process.md              · Dual-Process Computation
```

**The rules are simple:**

- **Directory** → collapsible section header (uppercase label)
- **`.md` file** → page link nested under its section
- **`_meta.json`** → controls section label and sort order
- **Frontmatter `order`** → controls page sort order within a section
- **Nesting** → add sub-directories for deeper menu levels
- Files starting with `_` or `.` are ignored

When you click a page link, the sidebar highlights the active page and auto-expands its parent section.

### Responsive Behaviour

On screens under 900px, the sidebar collapses into a slide-out menu triggered by a hamburger button. The layout adapts to a single-column view for mobile reading.

## How It Works

**You write Markdown → the build script generates a full static site.**

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

The build script (`scripts/build.js`) does the following on each run:

1. Scans `content/` recursively to build the navigation tree
2. Parses each `.md` file (YAML frontmatter + Markdown body)
3. Renders Markdown to HTML with syntax highlighting (highlight.js)
4. Injects navigation, header, and footer into a page template
5. Generates a landing page with links to all sections
6. Builds a JSON search index for client-side search
7. Copies static assets (CSS, JS, CNAME) into `dist/`

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
| `title` | No | Page title (defaults to filename in Title Case) |
| `order` | No | Sort order in navigation (default: 999) |
| `description` | No | SEO meta description (auto-generated from content if omitted) |

### Supported Markdown Features

- **Headings** (h1–h4) with styled hierarchy
- **Code blocks** with automatic syntax highlighting (JavaScript, JSON, Python, etc.)
- **Tables** with hover highlighting and styled headers
- **Blockquotes** rendered with amber accent border
- **Lists** (ordered and unordered) with accent-coloured markers
- **Links** between pages: `[Design Nodes](/foundations/design-nodes.html)`
- **Images** with rounded borders

### Adding a New Section

1. Create a directory: `content/my-new-section/`
2. Add a `_meta.json`:

```json
{ "label": "My New Section", "order": 5 }
```

3. Add `.md` files inside it
4. Run `npm run build` — the sidebar updates automatically

## Customizing

### Header & Footer

Edit `templates/header.html` and `templates/footer.html`. These are injected into every generated page. Update links, branding, or grant information here.

### Theme & Styling

Edit `static/css/style.css`. The theme uses CSS custom properties for easy adjustment:

```css
:root {
  --accent: #d4880f;           /* Amber accent colour */
  --accent-light: #f5c842;     /* Lighter amber for hovers */
  --bg-nav: #1a1e2e;           /* Dark navy sidebar */
  --bg-primary: #fafaf8;       /* Warm off-white content area */
  --font-heading: 'Source Serif 4', Georgia, serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --nav-width: 280px;          /* Sidebar width */
  --content-max: 820px;        /* Maximum content width */
}
```

### Site Configuration

Edit the `CONFIG` object at the top of `scripts/build.js`:

```javascript
const CONFIG = {
  siteTitle: 'Intention Space',
  siteTagline: 'Cognitive Execution Paths Without Hidden Logic',
  baseUrl: '/',
};
```

## Features

- **Auto-generated navigation** — directory tree becomes the sidebar menu
- **Syntax highlighting** — automatic for fenced code blocks (highlight.js)
- **Client-side search** — press `/` to focus, instant filtering across all pages
- **Responsive layout** — mobile-friendly with collapsible sidebar
- **Reusable header/footer** — edit once, applied to every page
- **Print-ready** — clean print stylesheet hides navigation
- **Zero runtime dependencies** — the generated site is pure HTML/CSS/JS
- **Custom domain** — CNAME file included for `intentixlab.com`

## Deployment

### GitHub Pages (current setup)

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that auto-deploys on every push to `main`:

1. Push code to your **private** GitHub repo
2. Go to Settings → Pages → Source: **GitHub Actions**
3. Set custom domain to `intentixlab.com`
4. Enable **Enforce HTTPS**

The workflow triggers on changes to `content/`, `templates/`, `static/`, `scripts/`, or `package.json`.

### Other Static Hosts

The `dist/` folder is a self-contained static site. Deploy anywhere:

```bash
# Netlify
netlify deploy --dir=dist --prod

# Vercel
vercel --prod dist

# Any host — just upload the dist/ folder
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Generate site into `dist/` |
| `npm run clean` | Remove `dist/` |
| `npm run rebuild` | Clean + build |
| `npm run serve` | Preview locally on port 3000 |

## Project Structure

```
intention-space-site/
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├── content/                        # YOUR MARKDOWN PAGES GO HERE
│   ├── foundations/                 #   Section directories
│   │   ├── _meta.json              #   Section label + order
│   │   ├── pulses.md               #   Individual pages
│   │   └── design-nodes.md
│   ├── architecture/
│   ├── tutorials/
│   └── research/
├── templates/
│   ├── header.html                 # Shared header (injected into every page)
│   └── footer.html                 # Shared footer
├── static/
│   ├── css/style.css               # Main theme
│   ├── css/hljs-theme.css          # Code block colours
│   ├── js/search.js                # Client-side search
│   ├── js/nav.js                   # Mobile nav toggle
│   └── CNAME                       # Custom domain for GitHub Pages
├── scripts/build.js                # The site generator
├── package.json
└── dist/                           # GENERATED OUTPUT (git-ignored)
```
