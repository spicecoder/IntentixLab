#!/usr/bin/env node

/**
 * Intention Space — Static Site Generator
 * 
 * Reads .md files from content/, uses directory structure as navigation,
 * applies header/footer templates, generates search index, and outputs
 * a complete static site to dist/.
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const hljs = require('highlight.js');
const matter = require('gray-matter');
const { globSync } = require('glob');

// ─── Configuration ───────────────────────────────────────────────
const CONFIG = {
  contentDir: path.join(__dirname, '..', 'content'),
  templateDir: path.join(__dirname, '..', 'templates'),
  staticDir: path.join(__dirname, '..', 'static'),
  outputDir: path.join(__dirname, '..', 'dist'),
  siteTitle: 'Intention Space',
  siteTagline: 'Cognitive Execution Paths Without Hidden Logic',
  baseUrl: '/',
};

// ─── Marked Setup with Syntax Highlighting ───────────────────────
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  gfm: true,
  breaks: false,
});

// ─── Utility Functions ───────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function titleCase(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function readTemplate(name) {
  const filePath = path.join(CONFIG.templateDir, `${name}.html`);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return '';
}

// ─── Build Navigation Tree from Directory Structure ──────────────

function buildNavTree(contentDir) {
  const tree = [];

  const entries = fs.readdirSync(contentDir, { withFileTypes: true })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;

    if (entry.isDirectory()) {
      const children = buildNavTree(path.join(contentDir, entry.name));
      const indexPath = path.join(contentDir, entry.name, 'index.md');
      const hasIndex = fs.existsSync(indexPath);
      
      const metaPath = path.join(contentDir, entry.name, '_meta.json');
      let order = 999;
      let label = titleCase(entry.name);
      if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        order = meta.order ?? 999;
        label = meta.label ?? label;
      }

      tree.push({
        type: 'section',
        name: entry.name,
        label,
        order,
        href: hasIndex ? `/${entry.name}/index.html` : null,
        children,
      });
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      const filePath = path.join(contentDir, entry.name);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      const slug = entry.name.replace(/\.md$/, '');
      const relDir = path.relative(CONFIG.contentDir, contentDir);

      tree.push({
        type: 'page',
        name: slug,
        label: data.title || titleCase(slug),
        order: data.order ?? 999,
        href: relDir ? `/${relDir}/${slug}.html` : `/${slug}.html`,
      });
    }
  }

  return tree.sort((a, b) => a.order - b.order);
}

// ─── Render Navigation HTML ──────────────────────────────────────

// function renderNav(tree, activePath = '', depth = 0) {
//   let html = `<ul class="nav-level-${depth}">`;

//   for (const item of tree) {
//     if (item.type === 'section') {
//       const isActive = activePath.startsWith(`/${item.name}`);
//       const openAttr = isActive ? ' open' : '';
//       html += `<li class="nav-section${isActive ? ' active' : ''}">`;
//       html += `<details${openAttr}>`;
//       html += `<summary>${item.label}</summary>`;
//       html += renderNav(item.children, activePath, depth + 1);
//       html += `</details></li>`;
//     } else {
//       const isActive = activePath === item.href;
//       html += `<li class="nav-page${isActive ? ' active' : ''}">`;
//       html += `<a href="${item.href}">${item.label}</a></li>`;
//     }
//   }

//   html += '</ul>';
//   return html;
// }
// Locate this section in your renderNav function in scripts/build.js

function renderNav(tree, activePath = '', depth = 0) {
  let html = `<ul class="nav-level-${depth}">`;

  for (const item of tree) {
    if (item.type === 'section') {
      const isActive = activePath.startsWith(`/${item.name}`);
      const isExactActive = activePath === item.href; // Check if this index is exactly active
      const openAttr = isActive ? ' open' : '';
      
      html += `<li class="nav-section${isActive ? ' active' : ''}">`;
      html += `<details${openAttr}>`;
      
      // FIX: Wrap the summary in a link if item.href exists
      const labelHtml = item.href 
        ? `<a href="${item.href}" class="${isExactActive ? 'active-link' : ''}">${item.label}</a>`
        : item.label;
        
      html += `<summary>${labelHtml}</summary>`;
      html += renderNav(item.children, activePath, depth + 1);
      html += `</details></li>`;
    } else {
      const isActive = activePath === item.href;
      html += `<li class="nav-page${isActive ? ' active' : ''}">`;
      html += `<a href="${item.href}">${item.label}</a></li>`;
    }
  }

  html += '</ul>';
  return html;
}


// ─── Process a Single Markdown File ──────────────────────────────

/**
 * extractRawHtmlBlocks: Pull out any <div>...</div> blocks that contain
 * <svg>, <style>, or <script> tags before handing content to marked.
 * marked's HTML-block parser can be confused by nested <style> inside
 * SVG <defs>, causing the SVG to render as a raw code block instead of
 * an image. We replace each raw-HTML block with a unique placeholder,
 * let marked parse the rest of the markdown normally, then splice the
 * original HTML back in.
 */
function extractRawHtmlBlocks(content) {
  const blocks = [];

  // Match outermost <div> wrappers that contain SVG, style, or script.
  // The regex is intentionally non-greedy on the inner content so that
  // adjacent diagrams are captured separately.
  const protected_re = /(<div[\s\S]*?<(?:svg|style|script)[\s\S]*?<\/div>)/g;

  const protected_content = content.replace(protected_re, (match) => {
    const placeholder = `\n\nRAW_HTML_BLOCK_${blocks.length}\n\n`;
    blocks.push(match);
    return placeholder;
  });

  return { protected_content, blocks };
}

function processMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(raw);

  // 1. Pull SVG / raw-HTML sections out before marked sees them.
  const { protected_content, blocks } = extractRawHtmlBlocks(content);

  // 2. Let marked parse the SVG-free markdown.
  let htmlContent = marked.parse(protected_content);

  // 3. Splice the raw HTML blocks back in, replacing the <p>PLACEHOLDER</p>
  //    that marked will have wrapped around each placeholder line.
  blocks.forEach((block, i) => {
    htmlContent = htmlContent.replace(
      new RegExp(`<p>RAW_HTML_BLOCK_${i}<\\/p>`, 'g'),
      block
    );
  });

  const plainText = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#*_`\[\]()>~|-]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return {
    frontmatter,
    htmlContent,
    plainText,
    title: frontmatter.title || titleCase(path.basename(filePath, '.md')),
    description: frontmatter.description || plainText.slice(0, 160),
  };
}

// ─── Generate Full Page HTML ─────────────────────────────────────

function generatePage({ title, description, htmlContent, navHtml, headerHtml, footerHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description.replace(/"/g, '&quot;')}">
  <title>${title} — ${CONFIG.siteTitle}</title>
  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/hljs-theme.css">
</head>
<body>
  <div class="site-wrapper">

    <!-- Header -->
    <header class="site-header">
      ${headerHtml}
    </header>

    <div class="site-body">
      <!-- Sidebar Navigation -->
      <nav class="site-nav" id="site-nav">
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>

        <div class="nav-search">
          <input type="text" id="search-input" placeholder="Search topics…" autocomplete="off" />
          <div id="search-results" class="search-results"></div>
        </div>

        ${navHtml}
      </nav>

      <!-- Main Content -->
      <main class="site-content">
        <article class="page-article">
          ${htmlContent}
        </article>
      </main>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
      ${footerHtml}
    </footer>

  </div>

  <script src="/js/search.js"></script>
  <script src="/js/nav.js"></script>
</body>
</html>`;
}

// ─── Build Search Index ──────────────────────────────────────────

function buildSearchIndex(pages) {
  return pages.map(p => ({
    title: p.title,
    href: p.href,
    excerpt: p.plainText.slice(0, 300),
    text: p.plainText.toLowerCase(),
  }));
}

// ─── Main Build ──────────────────────────────────────────────────

function build() {
  console.log('\n⚡ Building Intention Space site…\n');

  if (fs.existsSync(CONFIG.outputDir)) {
    fs.rmSync(CONFIG.outputDir, { recursive: true });
  }
  ensureDir(CONFIG.outputDir);

  const headerHtml = readTemplate('header');
  const footerHtml = readTemplate('footer');
  const navTree = buildNavTree(CONFIG.contentDir);
  const mdFiles = globSync('**/*.md', { cwd: CONFIG.contentDir });
  console.log(`  Found ${mdFiles.length} markdown file(s)\n`);

  const allPages = [];

  for (const relPath of mdFiles) {
    const fullPath = path.join(CONFIG.contentDir, relPath);
    const outName = relPath.replace(/\.md$/, '.html');
    const outPath = path.join(CONFIG.outputDir, outName);
    const href = '/' + outName;

    const { frontmatter, htmlContent, plainText, title, description } = processMarkdown(fullPath);
    const navHtml = renderNav(navTree, href);

    const pageHtml = generatePage({
      title, description, htmlContent, navHtml, headerHtml, footerHtml,
    });

    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, pageHtml);
    console.log(`  ✓ ${relPath} → ${outName}`);

    allPages.push({ title, href, plainText, description });
  }

  // Generate landing page if none exists
  const landingPath = path.join(CONFIG.outputDir, 'index.html');
  if (!fs.existsSync(landingPath)) {
    const landingNavHtml = renderNav(navTree, '/');
    const landingContent = `
      <div class="landing-hero">
        <h1>${CONFIG.siteTitle}</h1>
        <p class="tagline">${CONFIG.siteTagline}</p>
        <p class="landing-description">
          A research framework exploring how perception and intention can become 
          first-class computational constructs — eliminating hidden control flow 
          through declarative, data-driven design.
        </p>
        <div class="landing-nav">
          <h3>Explore Topics</h3>
          ${renderNav(navTree, '/', 0)}
        </div>
      </div>
    `;
    const landingHtml = generatePage({
      title: 'Home', description: CONFIG.siteTagline,
      htmlContent: landingContent, navHtml: landingNavHtml, headerHtml, footerHtml,
    });
    fs.writeFileSync(landingPath, landingHtml);
    console.log(`  ✓ Generated landing page`);
  }

  // Write search index
  const searchIndex = buildSearchIndex(allPages);
  ensureDir(path.join(CONFIG.outputDir, 'js'));
  fs.writeFileSync(
    path.join(CONFIG.outputDir, 'js', 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
  );
  console.log(`  ✓ Search index (${searchIndex.length} entries)`);

  // Copy static assets
  copyRecursive(CONFIG.staticDir, CONFIG.outputDir);
  console.log(`  ✓ Static assets copied`);

  console.log(`\n✅ Site built → dist/ (${allPages.length} pages)\n`);
  console.log(`   Run "npm run serve" to preview locally\n`);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      ensureDir(destPath);
      copyRecursive(srcPath, destPath);
    } else {
      ensureDir(path.dirname(destPath));
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

build();