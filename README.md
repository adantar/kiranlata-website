# Kiranlata website

Static catalogue website for Kiranlata, designed to be hosted on GitHub Pages and connected to a custom `.com` domain.

## Local preview

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Catalogue and site workflows

- Follow [`AGENTS.md`](AGENTS.md) and the complete [`PRODUCT_CATALOGUE_CHECKLIST.md`](PRODUCT_CATALOGUE_CHECKLIST.md) before changing catalogue data, collection pages, search, filters, or homepage features.
- Product records are the source of truth. Resolve missing facts with authoritative research or a user question; do not leave pending/TBD copy or infer product attributes.
- Keep main and border/accent color roles distinct in filters. Search indexes both recorded roles, while ignoring incidental color mentions in descriptive copy; legacy main colors fall back to the first `colors` entry.
- Preserve source photography outside the repository. Publish optimized sRGB derivatives only, and do not alter user-managed photo folders or add photographs unless requested.
- Keep product metadata, collection counts, search routes, filters, and homepage featured-weave selections synchronized. Use the `kiranlata-featured-weave` skill when changing a homepage feature chapter.

## Publishing

The site is hosted on GitHub Pages. Work and review locally first. Deploy only when the user requests it, stage an explicit allowlist (never all untracked files), run the responsive and interaction checks in the catalogue checklist, then commit and push the intended branch. Verify the live site after publishing. Keep the configured custom-domain file unchanged unless the user asks to change domain settings.
