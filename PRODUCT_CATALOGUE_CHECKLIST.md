# Product catalogue task list

Use this checklist for every Dhaniakhali upload and when converting any other weave from concept products to real inventory.

## 1. Intake and validation

- [ ] Confirm the product folder has a stable ID, for example `DHA-010`.
- [ ] Read the supplied `product_info.txt` (or the existing legacy `product-info.txt`) and treat it as the product-intake source of truth.
- [ ] Confirm product name, category, design, colors, fabric, GI designation, price, availability, and image filenames.
- [ ] Resolve missing or conflicting metadata before publication: research only verifiable claims using authoritative sources or ask the user for product-specific facts. Never leave `pending`, `TBD`, or invented copy in `product_info.txt` or public product information.
- [ ] Record only supplied and verified image filenames. Do not copy, rename, delete, or add photos in user-managed staging folders unless asked; use `.jpg` names there only when confirmed by the user.
- [ ] Verify every listed photograph exists and belongs to the same product.
- [ ] Normalize inconsistent source filenames only in the derivative output; preserve the source and use a consistent numbered derivative sequence.
- [ ] Compare GI wording to the official registry and apply it only where the supplied product metadata supports the claim; do not propagate a category-level claim to other fibres or listings without evidence.
- [ ] Normalize genuinely synonymous or overlapping color labels for filters without changing the supplied product record or asserting a different visible color.
- [ ] Flag discrepancies rather than guessing.

## 2. Image preparation

- [ ] Preserve the original Drive photographs without modifying them.
- [ ] Convert images to web-safe sRGB.
- [ ] Create a card derivative with a maximum long edge of 900 px.
- [ ] Create a detailed-view derivative with a maximum long edge of 2000 px.
- [ ] Use optimized progressive JPEG or WebP output with visually appropriate quality.
- [ ] Inspect the resulting pixels for color-profile failures, black images, rotation, or bad crops.
- [ ] Store derivatives under `assets/images/products/<weave>/<product-id>/`.
- [ ] Name derivatives consistently: `01-card.jpg`, `01-large.jpg`, and so on.

## 3. Product data

- [ ] Add the product ID, customer-facing name, design, normalized color list, fabric, GI weave, internal numeric price, availability, and image list.
- [ ] Treat approved numeric `priceValue` as the source of truth: display the recorded price on public product cards, detailed views, and homepage feature drawers. Do not invent or derive missing prices.
- [ ] Keep BAN-001 and BAN-002 inquiry-only: show **Contact us for price** and route the link to the inquiry form with that product's ID. Other real products with a recorded price show the amount on its own clear line and an **Inquire about this saree** link that carries the product ID and availability.
- [ ] Keep concept/placeholding listings outside real-product pricing and inquiry changes unless they are explicitly converted to approved inventory.
- [ ] Use **Design** for treatments such as Fish Motif, Traditional, and Ikat Border; the weave itself remains the category.
- [ ] Keep card and modal titles concise and design-led (for example, **Ikat Border Dhaniakhali**); display colors in the details line rather than repeating them in the title.
- [ ] Keep display capitalization consistent while retaining normalized values for filtering.
- [ ] Preserve special product attributes such as collector status and an included blouse piece as structured data, and surface them consistently on cards and detailed views.
- [ ] Treat product-specific weave features (including whether a saree has two pallus) as explicit per-product facts, never a category default. Current Ilkal confirmations: two pallus for ILK-01, ILK-02, ILK-03, ILK-05, ILK-07, ILK-08, ILK-11, and ILK-12; ILK-04 and ILK-06 do not have two pallus. Ask before assigning this feature to other products.
- [ ] Remove superseded concept products once real inventory for that category is approved.

## 4. Collection behavior

- [ ] Main-menu collection links, submenu weave links, and in-page weave/region filters land with the first visible product gallery below the fixed navigation, not on the editorial description or collection-preview heading; verify direct hash entry and on-page selection at phone and desktop widths.
- [ ] On phone, primary navigation labels remain direct collection links while adjacent plus/minus controls expand or collapse their submenus; use subtle palette-matched separators and verify touch, keyboard, expanded-state labels, and drawer close behavior. Keep desktop navigation behavior unchanged.
- [ ] Use consistent US-English customer-facing wording: **Inquiry** for the navigation action, **Inquire about this saree** for priced products, and **Contact us for price** for inquiry-only listings.
- [ ] Product image, name, pricing message, and “View details” affordance open the correct detailed view.
- [ ] Keep product price and inquiry treatment consistent between the collection card, detailed view, and homepage featured-weave drawer. An inquiry link carries the exact product ID.
- [ ] Global product search uses published real-product catalogue records as its source of truth; results include the product image, ID, name, weave, key fabric/color details, recorded public price or **Contact us for price**, and current availability. Concept/placeholding listings stay out until approved as real inventory.
- [ ] Search works from desktop, tablet, and phone headers; keyboard focus, clear/close controls, empty and no-match states, result count, “View all,” and product links to the correct quick view are verified.
- [ ] Search indexes product ID, name, weave, design, recorded main colors, and explicit accent colors. A color query may match either role, but incidental color words in descriptive copy must not create matches; keep the search as one query field and use dedicated facets when shoppers need to distinguish main from accent color.
- [ ] When product records change, update the search loader’s `region-page.js` cache version along with page asset versions so on-demand search never serves stale inventory.
- [ ] One-image products show no arrows, counter, thumbnails, automatic cycling, or fake loop.
- [ ] Multi-image products support desktop hover cycling and previous/next arrows.
- [ ] Multi-image products support touch swipe and visible mobile arrow controls.
- [ ] Detailed views use large derivatives; collection cards use card derivatives.
- [ ] Modal thumbnails and counters match the actual number of photographs.
- [ ] Keyboard focus and desktop hover add the same subtle zoom, tonal overlay, and gold frame.
- [ ] Touch press provides brief visual feedback without relying on hover.

### Availability-status workflow

- [ ] Change availability once in the product metadata; never hardcode a product's status independently into a card, modal, filter, homepage drawer, or inquiry form.
- [ ] For every product changed to **Sold Out**, verify the collection-card badge, muted product treatment, Availability filter, quick-view status, sold-out inquiry wording, and homepage collection-drawer status wherever that product appears.
- [ ] For every product returned to **Available**, verify that all sold-out treatments disappear from those same surfaces.
- [ ] Do not add availability badges to editorial masthead or homepage feature imagery unless that surface adopts availability labels for every product consistently. Product codes must still appear on every real-product masthead tile.
- [ ] Recalculate only counts affected by the change. Availability changes do not alter total collection counts, but any visible available/sold-out subtotal must be derived again from product metadata.

## 5. Dynamic filters

- [ ] Generate Design options from the products currently available in the selected weave.
- [ ] Generate separate **Main color** and **Border / accent color** options from role-specific metadata. Main color uses nonempty `primaryColors`, falling back to the first legacy `colors` value; accent uses only explicit `accentColors`. Do not classify every color in a details string or legacy color list as an accent match.
- [ ] Omit the Border / accent color facet if the selected product set has no explicit accent values; do not show an empty facet or infer accent data. Preserve older catalogue records through the main-color fallback so they remain filterable and never disappear.
- [ ] Generate Availability options from published product data. Always provide **All**; show **Available** and **Sold Out** only when those states exist in the selected weave.
- [ ] When a regional page contains real inventory for multiple weaves, derive and render Design, Main color, Border / accent color, and Availability filters independently for each selected weave; adding one weave must not replace or contaminate another weave's facets.
- [ ] Derive price-filter choices from recorded prices for the selected weave; show a **Price on request** option only where products in that weave have no numeric price. Keep concept/placeholding listings out of product price facets.
- [ ] Keep dependent facet values scoped to the selected collection/weave and compatible result set; a design choice must not expose designs from unrelated weaves. Combine selected facets with AND logic, show individually removable applied-filter chips plus Clear all, and verify clearing restores every eligible real product, including legacy records.
- [ ] For dependent facets such as Main color and Border / accent color, keep all known options visible with live compatible-result counts; disable only options that would produce zero results, preserve the currently selected option so it can be toggled off, and keep All/reset choices and removable active-filter chips available. Do not silently remove unavailable combinations or allow shoppers to get trapped.
- [ ] Render filter groups as accessible collapsible disclosures with a clear expand/collapse indicator; verify keyboard operation and that collapsing a group does not clear its selection.
- [ ] Confirm Design, Main color, Border / accent color, Availability, and Price filters work in combination.
- [ ] Confirm result counts update accessibly.
- [ ] Provide a collection sort control for every category and subcategory page, alongside the global shop sort. Include Featured (catalogue order), Price: low to high, Price: high to low, Name: A to Z, and Product ID: low to high (numeric ID ordering); keep the selected sort applied while facets change, place unpriced items last in both price sorts, and verify the result count and visible order on desktop and mobile.

## 6. Editorial and masthead consistency

- [ ] Feature three commercially useful and visually distinct real products when enough inventory exists.
- [ ] Give each featured weave chapter a small, unobtrusive decorative mark based on a documented or image-confirmed motif/construction; keep it outside the saree's focal area and make the mark distinct across weaves.
- [ ] Use distinct icons for each feature category and educational example; avoid generic fallback shapes and visually audit every icon at desktop and phone sizes.
- [ ] Treat the category masthead selection as the homepage feature authority: one product uses one photograph, two use both, and three or more use the masthead's top three without duplication.
- [ ] When masthead featured IDs change, update the corresponding entry in `assets/js/featured-weaves.js` in the same task.
- [ ] When adding a real-product weave, synchronize its homepage feature drawer, global-search route/category, featured count, catalogue route, and masthead IDs.
- [ ] Recalculate the homepage feature's collection count whenever products are added or removed; confirm the count matches published catalogue data.
- [ ] Use three independently clickable masthead tiles linked to the exact product details.
- [ ] Use floating ivory-and-gold captions with an image gradient and animated underline—no rectangular caption card.
- [ ] Use the approved slim translucent caption stripe with legible type; keep the photograph visible and do not regress to a large opaque/boxed overlay. Regional “All” chapters lead with weave names; individual weave mastheads lead with design identification, with category and product code retained in the smaller label as appropriate.
- [ ] Select features that represent distinct designs, price positions, or use cases rather than near-duplicates.
- [ ] Keep category descriptions and collection actions consistent with the established Bengal layout.
- [ ] For a new homepage feature, use the `kiranlata-featured-weave` skill to research its educational taxonomy, create a distinct regional art direction, and verify synchronized interactions.
- [ ] Keep the new feature's intro, collage canvas, reader panel, and chapter spacing consistent with the other homepage features at each responsive breakpoint; do not let a longer heading or copy change a single chapter's visual scale.
- [ ] If the full category name is too long for the display heading, use a concise display-only name while preserving the full category name in navigation, accessible labels, product data, and the collection CTA.
- [ ] Measure all sibling feature heights and the chapter gap at desktop, tablet, standard-phone, and narrow-phone widths. Confirm long glossary content is fully visible; prefer content-sized rows with shared minimum heights to clipping or text-specific fixed heights.
- [ ] Check the key interactive states (each educational tab, arrows, photos, product drawer) after responsive reflow, including keyboard/touch and reduced-motion behavior.

## 7. Professional QA

- [ ] Test current desktop width around 1440 × 900.
- [ ] Test tablet around 768 × 1024.
- [ ] Test phone around 390 × 844.
- [ ] Confirm no horizontal overflow at any breakpoint.
- [ ] Confirm images load and preserve correct color and orientation.
- [ ] Test every masthead feature link.
- [ ] Test a one-image product and every available multi-image count.
- [ ] Test filter combinations, clearing, keyboard focus, arrows, swipe, thumbnails, modal open, and modal close.
- [ ] Check JavaScript syntax, `git diff --check`, and browser console errors.
- [ ] Update asset cache versions after CSS or JavaScript changes.

## 8. Release

- [ ] Summarize local changes and test results for review.
- [ ] Do not deploy until explicitly requested.
- [ ] Before deployment, review the staged file list and ensure no originals or unrelated files are included.
- [ ] Stage an explicit allowlist of intended source, catalogue, and required derivative files; never stage browser artifacts, `output/`, originals, or unrelated untracked files wholesale.
- [ ] Commit with a focused message and push the intended branch.
- [ ] Verify the deployed site and representative collection/search/filter flows after the push.
- [ ] Report the branch and commit hash after a successful push.

## Rollout status

- [x] Dhaniakhali: initial nine real products, optimized images, galleries, modal, filters, masthead features, and responsive interactions.
- [x] Dhaniakhali: added DHA-010–DHA-016, Inch Par filtering, and an accessible sold-out inquiry state.
- [ ] Dhaniakhali: apply this checklist automatically to each future product batch.
- [x] Gorod: six real products, optimized galleries, researched editorial copy, independent filters, masthead features, and responsive interactions.
- [x] Baluchari: six real listings, optimized galleries, researched feature, masthead, dynamic filters, search and product drawer; GI labels follow product metadata.
- [x] Phulia: 16 real listings, optimized galleries, researched feature, updated count, dynamic filters, masthead and product drawer.
- [ ] Bengal Kalakshetra: replace concept inventory and apply the complete system.
- [x] Dhalapathar: two real collector pieces, optimized galleries, blouse-piece labelling, masthead features, filters, and responsive interactions.
- [x] Ilkal: replace concept inventory and apply the complete system.
- [x] Narayanpet: eight real listings, optimized primary images, researched feature, masthead, dynamic filters, search and product drawer.
- [x] Patteda Anchu: replace concept inventory and apply the complete system.
- [ ] Kanchipuram: replace concept inventory and apply the complete system.
- [ ] Banarasi: replace concept inventory and apply the complete system.
- [x] Maheshwari: verify eight Drive product records and photo counts; publish eight products, 17-photo galleries, researched feature chapter, dependent filters, search routing, masthead and collection sorting.
