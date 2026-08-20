from abc import ABC, abstractmethod

from .hud_response import HudResponse


class GlassesLink(ABC):
    """The vendor-specific side of getting text onto the lens. Every ODM ships
    its own BLE GATT profile / SDK for this, so this stays an interface until
    a reference-design vendor (see docs/hardware-sourcing.md) is picked."""

    @abstractmethod
    def send(self, response: HudResponse) -> None: ...


class LoggingGlassesLink(GlassesLink):
    """Stand-in link for developing the pipeline without hardware — prints
    what would have been rendered on the lens."""

    def send(self, response: HudResponse) -> None:
        print(f"[HUD] {response.as_hud_text()}")
