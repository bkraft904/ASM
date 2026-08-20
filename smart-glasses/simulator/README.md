# simulator

A webcam rig that stands in for the glasses so the product can be validated
before any hardware exists. It calls the exact same `ai-pipeline` code the
real glasses will use — this isn't a mockup of the pipeline, it's the pipeline,
pointed at a webcam instead of a BLE camera feed.

## Running it

```bash
pip install -r requirements.txt
pip install -r ../ai-pipeline/requirements.txt
export ANTHROPIC_API_KEY=...
python webcam_rig.py
```

Needs a local machine with a webcam and a display — it opens an OpenCV window,
so it won't run headless or in this sandbox. Press SPACE to capture a frame
and type a query, `q` to quit.

## Why this exists

It's the "phone+camera rig to simulate the glasses" step from the sourcing
plan: proves out the AI pipeline's usefulness and latency on real queries
against a real camera feed, without waiting on an ODM quote. Once
`companion-app/` exists against a real vendor SDK, this rig's job is done —
it's a throwaway prototype, not a product component.
