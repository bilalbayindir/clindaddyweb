# Clindaddy illustration prompts

Prompt sheet for generating editorial illustrations featuring the **Clindaddy mascot**.
Each entry is written to be pasted into an image model (nano banana / Gemini image
generation) as-is.

Source artwork lives in `pics/`. Generated assets are written to `public/images/` by
`scripts/prepare-assets.py` (`npm run assets`). See [Wiring an illustration in](#wiring-an-illustration-in)
at the end of this file.

---

## Character and style block

**Paste this into every prompt.** It is what keeps the character identical across
illustrations.

> **Character:** a friendly, sturdy cartoon dad character — thick full brown beard,
> round wire glasses, rosy red cheeks, warm smile, chunky teal-green knit sweater,
> brown trousers.
>
> **Style:** soft digital cartoon illustration, clean thick outlines, gentle soft
> shading, bright and optimistic, white / pale blue-grey palette with teal accents.
>
> **Background:** softly blurred bright clinical lab or modern office.
> **16:9 landscape, character on the right third.**
> No robots, no neon, no cyberpunk.
>
> **Text rule:** short screen labels only (1–3 words). Long on-image sentences come
> back mangled.

Constraints this respects, from `PRD.md`:

- **§13 (avoid):** no robot imagery, no giant AI brains, no cheesy AI graphics, no
  generic healthcare stock photos, no excessive neon or gradients, no cyberpunk or
  crypto aesthetics, no excessive glassmorphism or floating cards.
- **§14 (prefer):** clean, clinical, calm; structure and diagram over decoration.
- **§51 (do not invent):** never render a customer name, logo, metric, certification,
  or regulatory status into the artwork.

---

## Where to place him

| # | Page / slot | Why | Priority |
| --- | --- | --- | --- |
| 1 | `/flashanalysis` hero (`heroAside`) | The only product page with no illustration | **High** |
| 2 | `/platform` — the "One protocol read, many systems" section | New concept, currently text + grid only | **High** |
| 3 | `/technology` — after the architecture block | Abstract idea, needs one clear picture | Medium |
| 4 | `/solutions` — hero | Dual-audience story has no visual | Medium |
| 5 | `/flashedc` — the Speed section | Makes the 10–30 min claim tangible | Optional |
| 6 | `/contact` | Adds warmth to the conversion page | Optional |
| — | **Regenerate** `lifecycle-illustration.jpg` | Stale and leaks an internal label — see below | **High** |

---

## 1. FlashAnalysis: The Standards Engineer

Gives the one product page that has no artwork its own hero. The point is that the
pipeline is *specification-driven* — not that a model writes numbers.

**Visualization:** Clinical Data Rails

**Concept:** The Clindaddy guy stands at a wide curved console on the right. On the
left, three stacked rails run left-to-right: a rail of raw clinical data rows flows
into a dataset labelled **SDTM**, then into **ADaM**, then into a table of results,
with thin glowing lineage threads running from a single cell back to one source row.
A parallel, visually separate **QC** rail re-runs the same data and converges on a
small green match indicator. The guy is pointing at the lineage thread, inspecting it.

**Usage:** FlashAnalysis product page, hero aside (1408×768).

---

## 2. Platform: One Read, Many Systems

The most valuable new one — it *is* the Canonical Study Model, and it can show the
roadmap honestly in a single image.

**Visualization:** The Projection Console

**Concept:** The guy holds up one glowing, solid blueprint card labelled
**STUDY MODEL**. From it, thin beams of light fan out into a row of module panels:
**EDC**, **RTSM**, **eSource**, **CTMS**, **eTMF**, **ePRO**, **eCOA**, **eConsent**.
Crucially, the **EDC** panel is fully coloured and solid (built); the other seven are
faint, translucent outlines or blueprints (not built). He looks pleased with the one
that is lit.

**Usage:** Platform page, "One protocol read, many systems" section — directly above
the status grid.

> **Honesty note.** The solid/faint split is the whole point of this image. Only EDC
> is built. If every panel renders solid, the illustration contradicts
> `roadmapNote` and the status column on the page.

---

## 3. Technology: Where the Model Is Allowed to Act

**Visualization:** The Two-Chamber Machine

**Concept:** The guy stands before a two-chamber machine on a bench. The left chamber
is soft and document-shaped — protocol pages being read, labelled **AI**. A clear
glass boundary separates it. The right chamber is mechanical and precise — rails,
gears, a specification card being executed — labelled **ENGINE**. Above both, a single
green approval lamp labelled **HUMAN**. The guy's hand rests on the approval lamp.

**Usage:** Technology page, after "Two pipelines, one set of rules."

---

## 4. Solutions: Same Platform, Two Desks

**Visualization:** Two Desks, One Platform

**Concept:** The guy stands between two desks, gesturing to both. The left desk is a
CRO operations desk — many labelled study folders stacked high. The right desk is a
sponsor desk — one protocol and one finished submission package. A single continuous
teal bar runs beneath both desks, the same bar in both, labelled **CLINDADDY**.

**Usage:** Solutions page, hero aside.

---

## 5. FlashEDC Speed (optional)

**Visualization:** Protocol In, Design Out

**Concept:** The guy watches a protocol document drop into a chute on the left. Out of
the right side comes a neat stack of study-design cards (visit cards, form cards) in
moments. A small clock reads **10–30 MIN**. In the soft background, a tall stack of
folders fades out, labelled **~10 WEEKS**. He is pointing at the fast output,
eyebrows up.

**Usage:** FlashEDC page, Speed section.

> **Honesty note.** The minutes figure is time to a *review-ready draft*, not to a
> live study. Keep the nearby on-page footnote visible so the image cannot be read as
> "10–30 min to live."

---

## 6. Contact (optional)

**Visualization:** An Open Door

**Concept:** The guy sits at a tidy desk, mid-conversation, gesturing warmly toward
the viewer. One glowing panel beside him reads **REQUEST A DEMO**. No headset, no
call-centre imagery — a person, not a support queue.

**Usage:** Contact page.

---

## Fix: regenerate `lifecycle-illustration.jpg`

The current illustration (used on `/`, `/about`, and `/investors`) has two problems:

1. It bakes the internal note **"COMPLETE CLINICAL DATA LIFECYCLE FROM PRD"** into the
   artwork. A customer-facing page is showing a build instruction.
2. It is now **wrong**. It labels FlashEDC "Protocol → EDC" with a separate
   "DATA COLLECTION" box in the middle — capture now belongs to FlashEDC.

**Visualization:** The Lifecycle Rail (regeneration)

**Concept:** Same composition as the existing lifecycle rail illustration, same
character. Band one reads **FLASHEDC / Protocol → EDC & Data Capture**, with a small
in-band chip reading **DATA CAPTURE** *inside* the FlashEDC band rather than as a
separate middle box. Then one arrow to **FLASHANALYSIS / Clinical Data → Analysis →
Submission**, then **SUBMISSION**. Remove the top headline entirely — leave that area
clean.

**Usage:** Home hero, About, Investors (replaces `public/images/lifecycle-illustration.jpg`).

---

## Wiring an illustration in

1. **Generate** at 16:9 and save the PNG into `pics/`. Name it for where it goes —
   that is the existing convention (e.g. `flashanalysis-product-page.png`).
2. **Register it** in `scripts/prepare-assets.py` alongside the existing three
   illustration entries (`LIFECYCLE_SRC` 1600px, `FLASHEDC_SRC` 1440px, `TRUST_SRC`
   1440px).
3. **Run** `npm run assets` to write the resized file into `public/images/`.
4. **Render** it with the existing wrapper — it already supplies the `Illustration.`
   caption and the alt text the PRD requires:

   ```tsx
   <IllustrationFigure
     src="/images/<name>.png"
     alt="Illustration. <what it shows>."
     width={1408}
     height={768}
     sizes="(min-width: 1024px) 34rem, 100vw"
     caption="Illustration. <caption>."
   />
   ```

5. **Set `width` and `height`** to the *actual* output dimensions the script produced —
   read them off the generated file rather than assuming. Mismatched values distort the
   image. The pipeline caps width, so height follows from the aspect ratio.

Do not commit an illustration containing a customer name, logo, metric, or
regulatory claim (`PRD.md` §51).
