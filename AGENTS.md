# Kiranlata catalogue consistency

When adding or updating products, follow `PRODUCT_CATALOGUE_CHECKLIST.md` completely. Treat it as the required acceptance checklist for every weave and region.

Key rules:

- Use the product metadata as the source of truth. Do not invent names, colors, prices, materials, availability, or GI claims.
- If product metadata is incomplete or conflicting, research only verifiable factual claims using authoritative sources or ask the user; do not leave `pending`, `TBD`, or guessed copy in customer-facing product information.
- Keep original photography outside the repository untouched. Publish optimized sRGB derivatives only.
- Do not copy, rename, or add source photos to product folders unless asked. For product-photo staging, use the user's confirmed `.jpg` filenames; never claim an image is present until it has been supplied and verified.
- Generate catalogue-card and detailed-view image sizes for every photograph.
- Derive design, main-color, border/accent-color, availability, and price filters from product data so new values appear automatically.
- Keep color roles distinct: use `primaryColors` for main colors (falling back to the first legacy `colors` value when absent) and only explicit `accentColors` for border/accent filters. Never treat every color mentioned in details as a main or accent color; omit an accent filter when no accent data exists rather than guessing.
- Global search should find products by either recorded main or accent colors, but incidental color words in descriptive copy must not become color matches. Search remains a single query field; dedicated filters distinguish the two roles.
- Keep filters dependent on the selected collection/weave and combine active facets conjunctively. Keep applied-filter chips removable individually, provide Clear all, and ensure clearing restores the full eligible catalogue rather than hiding records with incomplete newer metadata.
- Record product-specific design features only when confirmed. In the current Ilkal inventory, two-pallu is confirmed for ILK-01, ILK-02, ILK-03, ILK-05, ILK-07, ILK-08, ILK-11, and ILK-12; do not mark ILK-04 or ILK-06 as two-pallu. Ask before assigning this feature to other Ilkal products.
- A one-photo product is static and has no misleading gallery controls. Multi-photo products retain desktop hover cycling, arrows, touch swipe, modal thumbnails, and counters.
- Keep product cards, detailed views, masthead features, focus treatments, and responsive behavior visually consistent across categories.
- Keep homepage featured-weave product IDs and collection counts synchronized with catalogue masthead selections and published inventory. Use the `kiranlata-featured-weave` skill when creating or updating these homepage chapters.
- Keep all homepage featured-weave chapters on the same responsive sizing system. A longer category name, lead, or educational panel must not make one weave visibly larger than its siblings or remove the visual gap between chapters.
- Prefer a concise display heading when a full category name wraps awkwardly; retain the full category name in collection destinations, accessible names, and product metadata.
- Keep featured-tile captions as the earlier slim, translucent stripe with readable text and an unobstructed photograph; avoid large opaque/boxed overlays. On regional “All” chapters, lead with the weave name; on an individual weave masthead, lead with design identification rather than repeating the category name.
- Size responsive rows from their actual content or shared minimums. Never clip educational copy to force matching heights; compare intro, visual, and reader areas for every chapter at representative desktop, tablet, phone, and narrow-phone widths.
- Test desktop, tablet, mobile, keyboard interaction, touch behavior, image loading, console errors, and horizontal overflow before deployment.
- Keep the inquiry cart separate from checkout; persist product IDs only and resolve details from the catalogue. Exclude sold-out items, send the full selection through the existing inquiry form, and clear it only after successful submission. Show one compact purchase instruction that clearly offers both paths: begin a website inquiry or message Kiranlata on Instagram. Keep the buttons short (“Begin inquiry” and “Message on Instagram”); the Instagram action copies the selected sarees, opens the profile, and tells shoppers to paste the selection into their message. Treat Instagram messaging and website inquiry as equally prominent primary purchase options, with matching button size and visual weight.
- On product cards, place the inquiry link first, then the Add to cart and Compare buttons together in a clear action row. In featured-weave drawers, offer an accessible icon-only add-to-cart button beside View product for available pieces; it must add the currently displayed catalogue product and update the shared cart count.
- Make Instagram the direct purchase handoff: the cart's Instagram action copies the selected items automatically, opens Kiranlata's Instagram, and gives a short paste-to-confirm instruction. Keep the instructions compact and visually highlighted; retain website inquiry as an alternative.
- Add-to-cart buttons must prevent duplicate entries for one-of-a-kind products: show a sage “✓ In cart” state and disable that product’s add control until it is removed from the cart. Keep Remove available inside the cart. Give Add to cart and Compare controls concise hover titles that explain their action; Compare toggles the product in or out of the three-piece comparison.
- Keep product comparison a separate optional shortlist (maximum three items), based only on recorded catalogue fields, with an action to add available products to the inquiry cart.
- Work locally unless the user explicitly requests a GitHub push or deployment.
