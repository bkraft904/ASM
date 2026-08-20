"""Manual smoke test: analyze a local image as if it came off the glasses' camera.

Usage:
    export ANTHROPIC_API_KEY=...
    python main.py path/to/frame.jpg "what am I looking at?"
"""

import sys

from src.ble_link import LoggingGlassesLink
from src.pipeline import GlassesAIPipeline


def main() -> None:
    if len(sys.argv) != 3:
        print(f"usage: {sys.argv[0]} <image_path> <query>")
        raise SystemExit(1)

    image_path, query = sys.argv[1], sys.argv[2]
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    pipeline = GlassesAIPipeline()
    response = pipeline.analyze_frame(image_bytes, query)

    link = LoggingGlassesLink()
    link.send(response)


if __name__ == "__main__":
    main()
