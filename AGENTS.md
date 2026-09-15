# Kiranlata catalogue consistency

When adding or updating products, follow `PRODUCT_CATALOGUE_CHECKLIST.md` completely. Treat it as the required acceptance checklist for every weave and region.

Key rules:

- Use the product metadata as the source of truth. Do not invent names, colors, prices, materials, availability, or GI claims.
- Keep original photography outside the repository untouched. Publish optimized sRGB derivatives only.
- Generate catalogue-card and detailed-view image sizes for every photograph.
- Derive design, color, and price filters from product data so new values appear automatically.
- A one-photo product is static and has no misleading gallery controls. Multi-photo products retain desktop hover cycling, arrows, touch swipe, modal thumbnails, and counters.
- Keep product cards, detailed views, masthead features, focus treatments, and responsive behavior visually consistent across categories.
- Test desktop, tablet, mobile, keyboard interaction, touch behavior, image loading, console errors, and horizontal overflow before deployment.
- Work locally unless the user explicitly requests a GitHub push or deployment.
