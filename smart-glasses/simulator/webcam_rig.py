"""Phone/webcam rig that simulates the glasses' camera + HUD without hardware.

Point a webcam at something, press SPACE, type what you'd ask the glasses,
and the AI pipeline's response renders as an overlay on the video feed — the
same text a real lens would show via GlassesLink. This is the "validate the
product before touching hardware" step: it exercises the exact same
ai-pipeline code the real glasses will call.

Usage:
    export ANTHROPIC_API_KEY=...
    pip install -r requirements.txt
    python webcam_rig.py

Controls:
    SPACE  capture the current frame and ask a question (typed in the terminal)
    q      quit
"""

import sys
import time
from pathlib import Path

import cv2

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "ai-pipeline"))
from src.pipeline import GlassesAIPipeline  # noqa: E402

HUD_GREEN = (138, 255, 60)  # BGR
RESPONSE_DISPLAY_SECONDS = 8


def draw_hud_text(frame, text, y):
    # black outline pass so green text stays legible over any background
    cv2.putText(frame, text, (24, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 4, cv2.LINE_AA)
    cv2.putText(frame, text, (24, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, HUD_GREEN, 1, cv2.LINE_AA)


def main():
    pipeline = GlassesAIPipeline()
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise RuntimeError("no webcam found — this rig needs a camera to simulate the glasses")

    last_response_text = ""
    response_expires_at = 0.0

    print("Point the camera at something. SPACE to ask, q to quit.")

    while True:
        ok, frame = cap.read()
        if not ok:
            break

        draw_hud_text(frame, "ASM-01  |  LIVE", y=30)
        if time.time() < response_expires_at:
            draw_hud_text(frame, last_response_text, y=frame.shape[0] - 30)

        cv2.imshow("smart-glasses simulator", frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord("q"):
            break

        if key == ord(" "):
            ok, still = cap.read()
            if not ok:
                continue
            query = input("ask the glasses: ")
            _, jpeg = cv2.imencode(".jpg", still)
            print("thinking...")
            response = pipeline.analyze_frame(jpeg.tobytes(), query)
            last_response_text = response.as_hud_text()
            response_expires_at = time.time() + RESPONSE_DISPLAY_SECONDS
            print(f"[HUD] {last_response_text}")

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
