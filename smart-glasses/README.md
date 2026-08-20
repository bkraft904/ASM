# smart-glasses

AI-integrated smart glasses concept — self-contained project, kept separate from
anything else that lands in this repo.

- `ai-pipeline/` — hardware-agnostic AI service: camera frame + query in, HUD-ready text out.
- `simulator/` — webcam rig that runs the real ai-pipeline against a live camera, to validate the product before any hardware exists.
- `companion-app/` — phone app plan (BLE pairing, frame capture, rendering); scaffolding pending ODM choice.
- `docs/hardware-sourcing.md` — research on the ODM route, waveguide costs, and certification.
- `docs/bom-vendor-shortlist.md` — concrete MVP bill of materials, ODM pricing tiers, and a vendor shortlist to actually contact for quotes.
