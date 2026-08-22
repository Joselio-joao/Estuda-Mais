from pathlib import Path
from PIL import Image


ROOT = Path("/home/ubuntu/estudamais/assets/images")
TARGETS = {
    "icon.png": 768,
    "splash-icon.png": 768,
    "android-icon-foreground.png": 768,
    "favicon.png": 256,
}


def optimise(path: Path, edge: int) -> None:
    with Image.open(path) as image:
        rgba = image.convert("RGBA")
        rgba.thumbnail((edge, edge), Image.Resampling.LANCZOS)
        rgba.save(path, format="PNG", optimize=True, compress_level=9)


for filename, edge in TARGETS.items():
    optimise(ROOT / filename, edge)
    print(f"Optimised {filename} to {edge}px")
