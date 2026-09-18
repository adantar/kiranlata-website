# Product catalogue task list

Use this checklist for every Dhaniakhali upload and when converting any other weave from concept products to real inventory.

## 1. Intake and validation

- [ ] Confirm the product folder has a stable ID, for example `DHA-010`.
- [ ] Read `product-info.txt` and treat it as the source of truth.
- [ ] Confirm product name, category, design, colors, fabric, GI designation, price, availability, and image filenames.
- [ ] Verify every listed photograph exists and belongs to the same product.
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

- [ ] Add the product ID, customer-facing name, design, normalized color list, fabric, GI weave, numeric price, availability, and image list.
- [ ] Use **Design** for treatments such as Fish Motif, Traditional, and Ikat Border; the weave itself remains the category.
- [ ] Keep card and modal titles concise and design-led (for example, **Ikat Border Dhaniakhali**); display colors in the details line rather than repeating them in the title.
- [ ] Keep display capitalization consistent while retaining normalized values for filtering.
- [ ] Remove superseded concept products once real inventory for that category is approved.

## 4. Collection behavior

- [ ] Product image, name, price, and “View details” affordance open the correct detailed view.
- [ ] One-image products show no arrows, counter, thumbnails, automatic cycling, or fake loop.
- [ ] Multi-image products support desktop hover cycling and previous/next arrows.
- [ ] Multi-image products support touch swipe and visible mobile arrow controls.
- [ ] Detailed views use large derivatives; collection cards use card derivatives.
- [ ] Modal thumbnails and counters match the actual number of photographs.
- [ ] Keyboard focus and desktop hover add the same subtle zoom, tonal overlay, and gold frame.
- [ ] Touch press provides brief visual feedback without relying on hover.

## 5. Dynamic filters

- [ ] Generate Design options from the products currently available in the selected weave.
- [ ] Generate Color options from normalized product color arrays.
- [ ] Generate the price limits from numeric product prices.
- [ ] If all products share one price, show the single current price instead of a meaningless slider range.
- [ ] Confirm combined filters work and “Clear filters” restores every product.
- [ ] Confirm result counts update accessibly.

## 6. Editorial and masthead consistency

- [ ] Feature three commercially useful and visually distinct real products when enough inventory exists.
- [ ] Use three independently clickable masthead tiles linked to the exact product details.
- [ ] Use floating ivory-and-gold captions with an image gradient and animated underline—no rectangular caption card.
- [ ] Select features that represent distinct designs, price positions, or use cases rather than near-duplicates.
- [ ] Keep category descriptions and collection actions consistent with the established Bengal layout.

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
- [ ] Commit with a focused message and push the intended branch.
- [ ] Report the branch and commit hash after a successful push.

## Rollout status

- [x] Dhaniakhali: initial nine real products, optimized images, galleries, modal, filters, masthead features, and responsive interactions.
- [x] Dhaniakhali: added DHA-010–DHA-016, Inch Par filtering, and an accessible sold-out enquiry state.
- [ ] Dhaniakhali: apply this checklist automatically to each future product batch.
- [ ] Gorod: replace concept inventory and apply the complete system.
- [ ] Baluchari: replace concept inventory and apply the complete system.
- [ ] Phulia: replace concept inventory and apply the complete system.
- [ ] Bengal Kalakshetra: replace concept inventory and apply the complete system.
- [ ] Dhalapathar: replace concept inventory and apply the complete system.
- [ ] Ilkal: replace concept inventory and apply the complete system.
- [ ] Narayanpet: replace concept inventory and apply the complete system.
- [ ] Patteda Anchu: replace concept inventory and apply the complete system.
- [ ] Kanchipuram: replace concept inventory and apply the complete system.
- [ ] Banarasi: replace concept inventory and apply the complete system.
- [ ] Maheshwari: replace concept inventory and apply the complete system.
