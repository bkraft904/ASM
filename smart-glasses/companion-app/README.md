# companion-app

The phone app that pairs with the glasses over BLE, captures camera frames,
calls `../ai-pipeline/` for the AI response, and pushes the result back to the
glasses for rendering.

## Not scaffolded yet — on purpose

Unlike `../ai-pipeline/`, this one genuinely can't be built platform-agnostic:
BLE GATT profiles and the companion SDK are vendor-specific, so the right
starting point depends on which ODM reference design gets picked (see
`../docs/hardware-sourcing.md`). Scaffolding a React Native or Flutter shell now
would mean throwing it away once a vendor's native SDK requirements are known.

## Decision to make once an ODM is picked

- **Native iOS/Android** if the vendor SDK is native-only (common for BLE
  peripherals with camera streaming — lowest latency, most reliable BLE).
- **React Native / Flutter** if the vendor ships a cross-platform SDK or a
  well-documented BLE GATT spec you can wrap yourself.

## What this app owns

1. BLE pairing + connection lifecycle with the glasses.
2. Pulling camera frames (and mic audio, if doing live captioning) off the
   glasses' BLE/WiFi link.
3. Calling `ai-pipeline` (embedded on-device, or as a hosted service) with
   each frame + the wearer's query.
4. Pushing the returned HUD text back to the glasses to render.
