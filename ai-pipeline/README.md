# ai-pipeline

The "brain" of the glasses: turns a camera frame + spoken query into a short
piece of text ready to render on the lens (object ID, live caption,
translation, nav, or a direct answer).

This is deliberately hardware-agnostic — it doesn't know or care which ODM's
glasses it's talking to. It takes bytes in (a JPEG frame + a query string) and
returns a `HudResponse` out. Wiring it to real glasses is two integration
points, both stubbed:

- **Frame capture** — owned by `companion-app/`, since it's normally the
  phone's BLE link to the glasses' camera, not this service.
- **Rendering** — `src/ble_link.py` defines the `GlassesLink` interface;
  `LoggingGlassesLink` is a stand-in until an ODM is picked (see
  `docs/hardware-sourcing.md`) and its BLE GATT profile / SDK is known.

## Running it

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=...
python main.py path/to/frame.jpg "what am I looking at?"
```

## Files

- `src/pipeline.py` — `GlassesAIPipeline.analyze_frame()`, the Claude vision call.
- `src/hud_response.py` — the structured, HUD-sized response type.
- `src/ble_link.py` — where a real glasses link gets implemented later.
