"""
Prepare ClinDaddy brand + editorial assets for the web.

Source files live in ./pics. Outputs are written to ./public/images and ./app.

What it does:
  1. Cuts the near-uniform light background out of the logo lockup so it can sit
     on any surface (navbar, dark footer, print).
  2. Splits the lockup into an emblem mark and a wordmark.
  3. Produces a dark-surface variant: navy type recoloured to white, with the
     emblem left in its own colours (see `to_light_region`).
  4. Produces favicon / app-icon sizes from the emblem.
  5. Downsamples the editorial illustrations to sane web dimensions and writes
     them as JPEG. The brand assets stay PNG — see `save_jpeg` for why the two
     halves of this pipeline do not share a format.

Run with:  npm run assets
"""

from __future__ import annotations

import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PICS = os.path.join(ROOT, "pics")
PUBLIC_IMAGES = os.path.join(ROOT, "public", "images")
APP = os.path.join(ROOT, "app")

# Superseded `logo.png` (the first character render). The 2026-10-06 artwork is
# the one that ships: a fuller beard and a warmer expression on the same mark.
LOGO_SRC = os.path.join(PICS, "logo-final.jpeg")
LIFECYCLE_SRC = os.path.join(
    PICS,
    "complete-clinical-data-lifecycle-form-protocol-homepagehero-aboutpage-investorrelations.png",
)
FLASHEDC_SRC = os.path.join(PICS, "flashedc-product-page.png")
TRUST_SRC = os.path.join(PICS, "trust-page-section28.png")
FLASHANALYSIS_SRC = os.path.join(PICS, "FlashAnalysis-The-Standards-Engineer.png")
PLATFORM_SRC = os.path.join(PICS, "Platform-One-Read-Many-Systems.png")
TECHNOLOGY_SRC = os.path.join(PICS, "TechnologyWheretheModelIsAllowedtoAct.png")
SOLUTIONS_SRC = os.path.join(PICS, "SolutionsSamePlatformTwoDesks.png")
FLASHEDC_SPEED_SRC = os.path.join(PICS, "FlashEDCSpeed.png")
CONTACT_SRC = os.path.join(PICS, "request-a-demo.png")

# The supplied logo sits on a very light gradient backdrop (every channel stays
# above ~238). "Distance from white" is therefore a clean content signal: the
# gradient never exceeds ~16, while the navy wordmark reaches ~225.
#
# Anything at or below ALPHA_FLOOR is treated as backdrop; the ramp to full
# opacity completes at ALPHA_CEIL, which keeps anti-aliased glyph edges smooth.
ALPHA_FLOOR = 20.0
ALPHA_CEIL = 48.0

# The illustrations are flat colour with hard edges, which JPEG carries at
# roughly a tenth of the PNG it replaces. The artwork is untouched by this
# value in the sense that matters: every illustration is flattened to RGB
# before it is written, so there is no alpha to lose. See `save_jpeg`.
JPEG_QUALITY = 85


def ensure_dirs() -> None:
    os.makedirs(PUBLIC_IMAGES, exist_ok=True)
    os.makedirs(APP, exist_ok=True)


def cut_background(img: Image.Image) -> Image.Image:
    """Drop the light backdrop, preserving anti-aliased edges as soft alpha."""
    img = img.convert("RGB")

    # Distance from white, taken on the darkest channel so coloured strokes
    # keep full opacity while the near-white backdrop falls to zero.
    darkest = ImageChops_darkest(img.getchannel("R"), img.getchannel("G"))
    darkest = ImageChops_darkest(darkest, img.getchannel("B"))
    distance = ImageOps.invert(darkest)

    span = ALPHA_CEIL - ALPHA_FLOOR
    alpha = distance.point(
        lambda v: 0 if v <= ALPHA_FLOOR else min(255, int((v - ALPHA_FLOOR) * 255.0 / span))
    )

    out = img.convert("RGBA")
    out.putalpha(alpha)
    return out


def ImageChops_darkest(a: Image.Image, b: Image.Image) -> Image.Image:
    from PIL import ImageChops

    return ImageChops.darker(a, b)


def content_bbox(img: Image.Image, threshold: int = 40):
    """Bounding box of non-transparent (or non-background) content."""
    if img.mode == "RGBA":
        mask = img.getchannel("A").point(lambda v: 255 if v > threshold else 0)
    else:
        mask = img.convert("L").point(lambda v: 255 if v < 245 else 0)
    return mask.getbbox()


def column_profile(img: Image.Image):
    """Return per-column content counts, used to find the mark / wordmark gap."""
    alpha = img.getchannel("A")
    width, height = img.size
    pixels = alpha.load()
    profile = []
    for x in range(width):
        count = 0
        for y in range(height):
            if pixels[x, y] > 24:
                count += 1
        profile.append(count)
    return profile


def split_mark(logo: Image.Image) -> tuple[Image.Image, Image.Image, int]:
    """Split the transparent lockup into (emblem, wordmark, emblem right edge).

    The split column is returned alongside the two crops because
    `to_light_region` needs it to recolour only the wordmark half of the
    full lockup, leaving the emblem exactly as drawn.
    """
    width, height = logo.size
    profile = column_profile(logo)

    # Walk in from the left past the emblem, then find the first run of empty
    # columns wide enough to be the gap between the emblem and the wordmark.
    min_gap = max(6, int(width * 0.012))
    search_from = int(width * 0.08)

    gap_start = None
    run = 0
    for x in range(search_from, width):
        if profile[x] <= 1:
            if run == 0:
                gap_start = x
            run += 1
            if run >= min_gap:
                break
        else:
            run = 0
            gap_start = None

    if gap_start is None:
        cut = int(width * 0.22)
    else:
        cut = gap_start + run // 2

    emblem = logo.crop((0, 0, cut, height))
    wordmark = logo.crop((cut, 0, width, height))

    return tight_crop(emblem), tight_crop(wordmark), cut


def tight_crop(img: Image.Image) -> Image.Image:
    box = content_bbox(img)
    return img.crop(box) if box else img


def to_light(img: Image.Image) -> Image.Image:
    """Recolour navy type to white so it reads on dark surfaces.

    Anything bright and blue-dominant enough to be the teal accent is left
    alone; the navy wordmark is not, so it becomes white. This is for type
    only — see `to_light_region` for the whole lockup.
    """
    return whiten_from(img, 0)


def to_light_region(img: Image.Image, from_x: int) -> Image.Image:
    """Whiten everything at or right of `from_x`, leaving the emblem as drawn.

    The emblem is the character illustration — a multicolour drawing, not a
    single-ink mark. Running the whitening over it collapses the face into a
    flat white silhouette and loses every feature, so on dark surfaces the
    emblem keeps its own colours and only the navy wordmark is recoloured.
    """
    return whiten_from(img, from_x)


def whiten_from(img: Image.Image, from_x: int) -> Image.Image:
    out = img.copy()
    pixels = out.load()
    width, height = out.size
    for y in range(height):
        for x in range(from_x, width):
            r, g, b, a = pixels[x, y]
            if a == 0:
                continue
            is_teal = b > 150 and g > 140 and (b - r) > 40
            if not is_teal:
                pixels[x, y] = (255, 255, 255, a)
    return out


def find_font(bold: bool = False) -> str | None:
    """Pick a usable system sans-serif for the Open Graph card."""
    candidates = (
        [
            r"C:\Windows\Fonts\segoeuib.ttf",
            r"C:\Windows\Fonts\arialbd.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        ]
        if bold
        else [
            r"C:\Windows\Fonts\segoeui.ttf",
            r"C:\Windows\Fonts\arial.ttf",
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        ]
    )
    for path in candidates:
        if os.path.exists(path):
            return path
    return None


def build_og_image(logo_inverse: Image.Image) -> None:
    """Compose the 1200x630 social card from brand artwork and type."""
    from PIL import ImageDraw, ImageFont

    W, H = 1200, 630
    canvas = Image.new("RGB", (W, H), (8, 30, 44))
    draw = ImageDraw.Draw(canvas)

    # Faint engineering grid, drawn in a slightly lighter navy.
    grid = (14, 42, 61)
    for x in range(0, W, 64):
        draw.line([(x, 0), (x, H)], fill=grid, width=1)
    for y in range(0, H, 64):
        draw.line([(0, y), (W, y)], fill=grid, width=1)

    # Teal rule along the top edge.
    draw.rectangle([0, 0, W, 6], fill=(64, 152, 168))

    # Lockup, scaled to a comfortable width.
    lockup = logo_inverse.copy()
    target_w = 330
    lockup = lockup.resize(
        (target_w, int(lockup.height * target_w / lockup.width)), Image.LANCZOS
    )
    canvas.paste(lockup, (72, 64), lockup)

    bold = find_font(bold=True)
    regular = find_font(bold=False)

    if bold and regular:
        motto = ImageFont.truetype(regular, 20)
        headline = ImageFont.truetype(bold, 68)
        sub = ImageFont.truetype(regular, 27)
        chip = ImageFont.truetype(regular, 21)

        draw.text((72, 246), "From Protocol to Submission.", font=headline, fill=(255, 255, 255))
        draw.text(
            (72, 336),
            "Clinical data automation from protocol to regulatory submission.",
            font=sub,
            fill=(185, 208, 222),
        )

        # Lifecycle chips.
        stages = ["Protocol", "FlashEDC", "Data Collection", "FlashAnalysis", "Submission"]
        x, y = 72, 430
        for index, stage in enumerate(stages):
            box = draw.textbbox((0, 0), stage, font=chip)
            w = box[2] - box[0] + 40
            draw.rounded_rectangle(
                [x, y, x + w, y + 46],
                radius=8,
                outline=(42, 99, 137),
                width=1,
                fill=(14, 42, 61),
            )
            draw.text((x + 20, y + 11), stage, font=chip, fill=(213, 236, 240))
            x += w + 14
            if index < len(stages) - 1:
                draw.text((x - 2, y + 10), "\u2192", font=chip, fill=(79, 126, 158))
                x += 22

        draw.text(
            (72, 552),
            "AI assists. Deterministic systems execute. Humans approve.",
            font=motto,
            fill=(127, 207, 212),
        )

    canvas.save(os.path.join(PUBLIC_IMAGES, "og.png"), optimize=True)
    print(f"  wrote public/images/og.png  {W}x{H}")


def resize_max(img: Image.Image, max_width: int) -> Image.Image:
    if img.width <= max_width:
        return img
    ratio = max_width / img.width
    return img.resize((max_width, int(img.height * ratio)), Image.LANCZOS)


def save(img: Image.Image, *parts: str) -> None:
    path = os.path.join(*parts)
    img.save(path, optimize=True)
    print(f"  wrote {os.path.relpath(path, ROOT)}  {img.size[0]}x{img.size[1]}")


def save_jpeg(img: Image.Image, *parts: str) -> None:
    """Write an opaque illustration as a progressive JPEG.

    JPEG has no alpha channel, so it is only ever used for the editorial
    illustrations — every one of them is already flattened to RGB, because
    they sit on their own background rather than on the page. The logo, mark,
    wordmark, and app icons are the opposite case: they are cut out with
    `cut_background` and exist so they can sit on navy, white, or anything
    else, so encoding them as JPEG would put a solid rectangle behind the
    artwork. Those stay PNG.

    Chroma is kept at full resolution (`subsampling=0`). These illustrations
    are flat fields meeting at hard edges with labels drawn over them, which
    is precisely where the default 4:2:0 subsampling bleeds colour; the extra
    bytes buy visibly cleaner edges on the baked-in type.
    """
    path = os.path.join(*parts)
    img.convert("RGB").save(
        path,
        "JPEG",
        quality=JPEG_QUALITY,
        optimize=True,
        progressive=True,
        subsampling=0,
    )
    print(f"  wrote {os.path.relpath(path, ROOT)}  {img.size[0]}x{img.size[1]}  jpeg q{JPEG_QUALITY}")


def main() -> None:
    ensure_dirs()

    print("Logo")
    logo_raw = Image.open(LOGO_SRC)
    logo = tight_crop(cut_background(logo_raw))
    emblem, wordmark, emblem_right = split_mark(logo)
    save(logo, PUBLIC_IMAGES, "clindaddy-logo.png")
    save(to_light_region(logo, emblem_right), PUBLIC_IMAGES, "clindaddy-logo-inverse.png")

    print("Emblem")
    save(emblem, PUBLIC_IMAGES, "clindaddy-mark.png")
    # Same artwork, not a whitened copy: see `to_light_region`.
    save(emblem, PUBLIC_IMAGES, "clindaddy-mark-inverse.png")

    print("Wordmark")
    # The current mark carries the wordmark on its own. The "Clinical Data
    # Automation" tagline belonged to the previous logo and was retired with
    # it, so there is no second line to split off — `wordmark` as returned by
    # split_mark is already the finished asset.
    save(wordmark, PUBLIC_IMAGES, "clindaddy-wordmark.png")
    save(to_light(wordmark), PUBLIC_IMAGES, "clindaddy-wordmark-inverse.png")

    print("Icons")
    # Square canvas with breathing room, so the mark is not clipped in a tab.
    side = int(max(emblem.size) * 1.28)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(
        emblem,
        ((side - emblem.width) // 2, (side - emblem.height) // 2),
        emblem,
    )
    save(canvas.resize((512, 512), Image.LANCZOS), APP, "icon.png")
    save(canvas.resize((180, 180), Image.LANCZOS), APP, "apple-icon.png")

    print("Social card")
    build_og_image(Image.open(os.path.join(PUBLIC_IMAGES, "clindaddy-logo-inverse.png")).convert("RGBA"))

    print("Editorial illustrations")
    # JPEG, not PNG: these are the only opaque assets the pipeline writes. See
    # `save_jpeg`. Any reference to one of these in the app must use the .jpg
    # name — there is no .png twin.
    save_jpeg(resize_max(Image.open(LIFECYCLE_SRC).convert("RGB"), 1600), PUBLIC_IMAGES, "lifecycle-illustration.jpg")
    save_jpeg(resize_max(Image.open(FLASHEDC_SRC).convert("RGB"), 1440), PUBLIC_IMAGES, "flashedc-illustration.jpg")
    save_jpeg(resize_max(Image.open(TRUST_SRC).convert("RGB"), 1440), PUBLIC_IMAGES, "trust-illustration.jpg")
    save_jpeg(
        resize_max(Image.open(FLASHANALYSIS_SRC).convert("RGB"), 1440),
        PUBLIC_IMAGES,
        "flashanalysis-illustration.jpg",
    )
    save_jpeg(resize_max(Image.open(PLATFORM_SRC).convert("RGB"), 1440), PUBLIC_IMAGES, "platform-illustration.jpg")
    save_jpeg(
        resize_max(Image.open(TECHNOLOGY_SRC).convert("RGB"), 1440),
        PUBLIC_IMAGES,
        "technology-illustration.jpg",
    )
    save_jpeg(
        resize_max(Image.open(SOLUTIONS_SRC).convert("RGB"), 1440),
        PUBLIC_IMAGES,
        "solutions-illustration.jpg",
    )
    save_jpeg(
        resize_max(Image.open(FLASHEDC_SPEED_SRC).convert("RGB"), 1440),
        PUBLIC_IMAGES,
        "flashedc-speed-illustration.jpg",
    )
    save_jpeg(
        resize_max(Image.open(CONTACT_SRC).convert("RGB"), 1440),
        PUBLIC_IMAGES,
        "contact-illustration.jpg",
    )

    # Retire the PNG originals these replaced. Without this, a re-run on a tree
    # that already had them leaves both formats on disk and the stale `.png`
    # ships to every deployment.
    for stale in os.listdir(PUBLIC_IMAGES):
        if stale.endswith("-illustration.png"):
            os.remove(os.path.join(PUBLIC_IMAGES, stale))
            print(f"  removed stale public/images/{stale}")

    print("Done.")


if __name__ == "__main__":
    main()
