import base64
import json
import os

from anthropic import Anthropic

from .hud_response import HudResponse

DEFAULT_MODEL = "claude-sonnet-5"

SYSTEM_PROMPT = """You are the AI pipeline for a pair of smart glasses. You receive one \
camera frame and a short spoken query from the wearer. Reply with ONLY a JSON object, no \
other text: {"kind": "object_id"|"caption"|"translation"|"nav"|"answer", "label": str, \
"detail": str}. The wearer is looking at a heads-up display with room for a short label \
and one short line of detail — never write more than a sentence in "detail"."""


class GlassesAIPipeline:
    """Turns a camera frame + spoken query into a HudResponse ready to render
    on the lens. Model choice and rendering are the only two things this file
    owns — how the frame gets captured and how the response gets onto the
    glasses are the companion app's job."""

    def __init__(self, api_key: str | None = None, model: str = DEFAULT_MODEL):
        self.client = Anthropic(api_key=api_key or os.environ["ANTHROPIC_API_KEY"])
        self.model = model

    def analyze_frame(self, image_bytes: bytes, query: str, media_type: str = "image/jpeg") -> HudResponse:
        image_b64 = base64.standard_b64encode(image_bytes).decode("utf-8")

        message = self.client.messages.create(
            model=self.model,
            max_tokens=200,
            system=SYSTEM_PROMPT,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {"type": "base64", "media_type": media_type, "data": image_b64},
                        },
                        {"type": "text", "text": query},
                    ],
                }
            ],
        )

        raw = message.content[0].text
        parsed = json.loads(raw)
        return HudResponse(kind=parsed["kind"], label=parsed["label"], detail=parsed.get("detail", ""))
