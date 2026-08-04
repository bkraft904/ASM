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
