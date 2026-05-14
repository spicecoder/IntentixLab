# Intention Space and AI Book Project

Copy the `content/book/` directory into your existing static site repo under `content/book/`.

Then run:

```bash
npm run build
npm run serve
```

Your existing generator will treat `book/` as one navigation pillar, each chapter directory as a nested pillar, and each Markdown section as a page.

Suggested writing rule:

- one chapter directory = one major book chapter
- one `.md` file inside chapter = one readable section
- keep each section short enough to become a public web page
- later, the same sections can be assembled into a PDF or printed manuscript
