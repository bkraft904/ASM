# ASM — Aero Saint Motorsport

A one-page site for Aero Saint Motorsport: hero, fleet, facility, team, sponsors, and contact.

Plain HTML/CSS/JS — no build step.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Adding your real photos

See `assets/images/README.md` for the exact filenames the site expects.
Drop a file in and refresh — no code changes needed.

## Editing content

- Team roster: `js/main.js` → `ROSTER` array.
- Stats (founded year, wins, championships, fleet size): `index.html` → `#stats` section, `data-count` attributes.
- Sponsors, contact details, copy: directly in `index.html`.
- Merch prices/sizes/descriptions: `js/products.js` — this is the single source of truth the cart reads from. If you change a price or size list here, also update the matching text in `index.html`'s `#merch` section and the corresponding `shop/*.html` page (they're written statically for SEO, so they don't auto-sync).

## Merch cart

`shop/*.html` are individual product pages (one per merch item). Each has an
"Add to Cart" form that adds to a cart stored in the visitor's browser
(`localStorage`, via `js/cart.js`) — no backend, no payment processing.
"Send Order Inquiry" opens the visitor's email client with a pre-filled
order summary addressed to `team@aerosaintmotorsport.com`; it's a lead/inquiry
flow, not a completed purchase. If you want real online payments later, that
needs a payment processor (Stripe, Shopify, Snipcart, etc.) wired in.
