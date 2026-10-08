# Touchbase Technologies — website

Company website built on the Natfort layout: Home, Solutions (+ a page per solution),
Room Planner, Shop (cart, wishlist, compare, checkout, order confirmation), Projects, About and Contact.
Frontend only — the contact form and checkout are demos; cart, wishlist and orders persist in the browser.
A floating WhatsApp button (brand red) sits on every page.

## Run

```bash
npm install
npm run dev      # http://localhost:5190
npm run build    # production build in dist/, every page pre-rendered to static HTML
```

## Where things live

| What | File |
| --- | --- |
| Brand colours, fonts | `src/index.css` |
| Company details, solutions, projects, stats, FAQs, brands | `src/data/site.js` |
| Room Planner rooms, add-ons and recommendation logic | `src/data/planner.js` |
| Shop products, categories, bundles, delivery towns | `src/data/products.js` |
| Cart, wishlist, compare, orders, promo codes | `src/store/index.js` |
| Logos and favicon | `public/brand/`, `public/favicon.svg` |
| Photos (WebP, resized) | `public/img/` |

## To confirm before launch

Phone, email, address and socials, the numbers in `stats`, and the `partners`
brand list in `src/data/site.js` are placeholders.

Shop prices, stock levels and specs in `src/data/products.js` are demo data. Products show an icon
tile until you add a photo: put it in `public/products/` and set `image: '/products/<file>'`.
Demo promo codes: `TOUCHBASE5`, `CONNECT10`.

## How the build works

`npm run build` makes the browser bundle, then renders each page (home, solutions, shop products,
planner, projects, about, contact) to static HTML in `dist/`, so pages load with content, work
without JavaScript and are readable by search engines. Unknown URLs fall back to `dist/200.html`.

## Inline links

Phrases listed in `src/data/crossLinks.js` become links wherever `autoLink()` runs over body copy
(dotted underline, solid on hover). External links ask the visitor to confirm before leaving.
