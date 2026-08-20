from dataclasses import dataclass
from typing import Literal

HudKind = Literal["object_id", "caption", "translation", "nav", "answer"]


@dataclass
class HudResponse:
    """What actually gets rendered onto the lens. Kept short on purpose —
    a HUD has room for a label and a line of detail, not a paragraph."""

    kind: HudKind
    label: str
    detail: str = ""

    def as_hud_text(self, max_chars: int = 48) -> str:
        text = self.label if not self.detail else f"{self.label} — {self.detail}"
        return text if len(text) <= max_chars else text[: max_chars - 1] + "…"
