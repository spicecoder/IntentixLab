# IntentixLab Markdown Publishing Standard

Version: 0.1  
Status: Working standard  
Scope: intentixlab.com static pages generated from Markdown files

---

## 1. Purpose

IntentixLab pages are authored as Markdown files and rendered by the static site generator in `scripts/build.js`. The purpose of this standard is to keep research notes, architecture pages, tutorials, tools, and social-awareness essays publishable through one predictable file contract.

The standard follows the spirit of an open content format: a page should remain readable as plain Markdown, carry enough frontmatter to be discoverable and reusable, and avoid depending on hidden build-time knowledge. It is compatible with the current generator and can later be mapped into a richer OKF/OCF-style catalogue without rewriting the content.

---

## 2. File Placement

Each public page lives under `content/` and becomes one generated HTML page.

Example:

```text
content/research/intentions-as-communication-context-boundary.md
  -> /research/intentions-as-communication-context-boundary.html
```

Use folders as publishing sections:

- `content/foundations/` for core primitives
- `content/architecture/` for system structure
- `content/tutorials/` for implementation guides
- `content/research/` for research notes and papers
- `content/tools/` for tools and embedded utilities
- `content/social-awareness/` for societal and ethical notes

Each section may include `_meta.json` to define its navigation label and order.

---

## 3. Required Frontmatter

Every new public page should include YAML frontmatter. The current build uses `title`, `description`, and `order`; the remaining fields are forward-compatible metadata for catalogue, citation, and publication workflows.

```yaml
---
title: Intentions as Communication Context Boundary
subtitle: A Research Note for Perceptive App Development
description: Intentions act as communication anchors and context boundaries in Perceptive App development, with Signals carrying context through Intention and trivalent Pulses while Response carries payload.
order: 0
status: draft
version: 0.1
date: 2026-06-19
author: Pronab Pal
affiliation: IntentixLab, Melbourne, Australia
canonical: /research/intentions-as-communication-context-boundary.html
source_type: research-note
tags:
  - Intention Space
  - Perceptive Apps
  - Situational Reality
references:
  - pal-2024-human-intention-space
---
```

### Field Meanings

| Field | Required | Used by current build | Meaning |
|---|---:|---:|---|
| `title` | Yes | Yes | Page title and navigation label. |
| `description` | Yes | Yes | SEO/search summary. Keep under roughly 160-240 characters where possible. |
| `order` | Yes | Yes | Navigation sort order inside the section. |
| `subtitle` | Recommended | No | Human-readable subtitle shown in the page body if desired. |
| `status` | Recommended | No | `draft`, `working`, `published`, or `archived`. |
| `version` | Recommended | No | Version of the note or page. |
| `date` | Recommended | No | Publication or draft date in `YYYY-MM-DD`. |
| `author` | Recommended | No | Author name. |
| `affiliation` | Optional | No | Affiliation text for research notes. |
| `canonical` | Recommended | No | Final public URL path. |
| `source_type` | Recommended | No | `research-note`, `architecture-note`, `tutorial`, `tool`, `position-statement`, or `essay`. |
| `tags` | Recommended | No | Searchable topical terms. |
| `references` | Optional | No | Stable reference keys for cited works or related internal papers. |

---

## 4. Body Structure

A research note should use this structure unless there is a strong reason not to:

```markdown
# Page Title
*Subtitle*

**Author**  
Affiliation  
*Version and date*

---

## Abstract

## 1. Main Claim

## 2. Background or Framing

## 3. Model or Proposal

## 4. Example

## 5. Contribution

## Conclusion

## References
```

Architecture and tutorial pages may be more direct, but should still begin with a clear `#` title matching the frontmatter title.

---

## 5. Link and URL Rules

Use generated `.html` links for internal pages:

```markdown
[Perception as Architecture](./perception-as-architecture.html)
[Design Nodes](/foundations/design-nodes.html)
```

Prefer lowercase, hyphenated filenames for new pages:

```text
intentions-as-communication-context-boundary.md
```

Avoid spaces, punctuation, uppercase-only acronyms in filenames unless preserving an existing URL.

---

## 6. Citation Rules

Research notes should cite sources explicitly in the body, not only in a bibliography.

Good:

```markdown
Speech-act theory treats utterances as actions in social contexts (Austin, 1962; Searle, 1969).
```

Then include a matching item in `## References`.

Internal lineage should be cited where relevant. For Intention Space work, cite the original paper:

```text
Pal, P. (2024). Human Intention Space - Natural Language Phrase Driven Approach to Place Social Computing Interaction in a Designed Space. International Journal on Natural Language Computing, 13(3). https://aircconline.com/abstract/ijnlc/v13n3/13324ijnlc02.html
```

---

## 7. OCF/OKF Alignment

For now, IntentixLab Markdown pages remain independent units. To keep them ready for an open content or open knowledge format later:

- Keep the body readable without the website template.
- Keep metadata in YAML frontmatter.
- Use stable reference keys in `references` when a page depends on prior work.
- Use explicit dates and versions for research notes.
- Keep page filenames stable once published.
- Prefer structured sections and tables over purely narrative pages when defining a standard.
- Avoid hiding semantic meaning only in build scripts.

This keeps each note portable as:

- a site page
- a preprint source
- a ResearchGate or Academia reference text
- a future catalogue item
- a PDF or book chapter source

---

## 8. Current Generator Contract

The current generator in `scripts/build.js` guarantees:

- every `.md` file under `content/` becomes an `.html` page under `dist/`
- `title` controls page title and navigation label
- `description` controls the HTML meta description and search summary fallback
- `order` controls navigation order inside the section
- section `_meta.json` controls section label and order
- Markdown tables, code blocks, links, and raw HTML blocks are supported
- the search index is generated from the Markdown body text

Forward-compatible fields are allowed because `gray-matter` parses them and the current build safely ignores fields it does not yet render.

---

## 9. Publishing Checklist

Before publishing a new page:

- Add frontmatter with `title`, `description`, and `order`.
- Use a stable lowercase hyphenated filename.
- Add the page to its section `index.md` when that section uses a manual topic list.
- Cite prior Intention Space work if the note builds on it.
- Run `npm run build`.
- Open the generated page in `dist/` or preview with `npm run serve`.
- Check that the page appears in navigation and search.

---

## 10. Minimal Template

```markdown
---
title: Page Title
subtitle: Optional Subtitle
description: One or two sentences describing the page.
order: 1
status: draft
version: 0.1
date: 2026-06-19
author: Pronab Pal
affiliation: IntentixLab, Melbourne, Australia
canonical: /section/page-title.html
source_type: research-note
tags:
  - Intention Space
---

# Page Title
*Optional Subtitle*

**Pronab Pal**  
IntentixLab, Melbourne, Australia  
*Version 0.1 - 19 June 2026*

---

## Abstract

Start here.
```
