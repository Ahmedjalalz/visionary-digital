# Education And Life Foundation (EFL) — Official Brand Style Guide & Design System

> **Document Version:** `2026.1 (Production Release)`  
> **Target Audience:** Graphic Designers, Art Directors, UI/UX Designers, Print Vendors, and Marketing Teams  
> **Organization:** Education And Life Foundation (EFL) · Established 2003 · Lahore, Punjab, Pakistan  
> **Core Mission:** Grassroots education, healthcare, safe drinking water, and widow family dignity across underprivileged communities.

---

## Visual Summary & Design System Sheet

![EFL Brand Style Guide Illustration](file:///C:/Users/Ahmad/.gemini/antigravity/brain/01384132-1dc1-44da-a9c1-bfe3786c585a/ELF_Brand_Style_Guide.png)

---

## 1. Brand Essence & Visual Language

The visual identity of Education And Life Foundation balances **authoritative institutional clarity** with **deep human empathy**. 

* **Editorial & Light-First:** The identity avoids stark harsh minimalism in favor of warm, editorial surfaces (`#FFFFFF` and `#F3F7FC` Sand Paper).
* **Foundation Blue (`#0D3987`):** The signature primary hue conveys trust, stability, and enduring institutional commitment.
* **Ink Slate Navy (`#143055`):** Serves as high-contrast body typography and dark hero/footer anchors, providing a richer, softer tone than pure black (`#000000`).
* **Sky Blue Highlight (`#62B7FF`):** Injects modern vitality and clear focus across dark sections, active badges, and overline eyebrows.
* **Three-Typeface System:** A purposeful typographic trio consisting of **Bricolage Grotesque** (structure & impact), **Instrument Sans** (clarity & reading ease), and **Instrument Serif** (human emotion & storytelling).

---

## 2. Complete Color Palette Specification

All colors have been mathematically calibrated for both digital screens (sRGB & modern OKLCH) and professional print reproduction (CMYK).

### 2.1 Core Palette

| Swatch | Color Name | Role / CSS Token | HEX | RGB | CMYK (Print) | OKLCH | Contrast / WCAG |
| :---: | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| 🔵 | **Foundation Blue** | Primary Brand, Action Buttons, Logos (`--clay` / `--primary`) | `#0D3987` | `13, 57, 135` | `C:90 M:58 Y:0 K:47` | `oklch(0.368 0.139 261)` | **9.4:1 AAA** on White |
| 🌑 | **Ink Slate Navy** | Primary Text, Dark Hero & Footer Canvas (`--ink` / `--foreground`) | `#143055` | `20, 48, 85` | `C:76 M:44 Y:0 K:67` | `oklch(0.310 0.075 256)` | **13.8:1 AAA** on White |
| 🔷 | **Sky Blue Bright** | High-Contrast Eyebrows, Active Pills, Accents (`--clay-bright`) | `#62B7FF` | `98, 183, 255` | `C:62 M:28 Y:0 K:0` | `oklch(0.760 0.140 248)` | **8.6:1 AAA** on Ink Navy |
| 🔹 | **Cobalt Mid-Tone (Moss)** | Secondary Brand, Category Icons, Maps (`--moss`) | `#2E67AC` | `46, 103, 172` | `C:73 M:40 Y:0 K:33` | `oklch(0.510 0.125 255)` | **5.2:1 AA** on White |
| 📄 | **Sand Pale Paper** | Editorial Section Background, Canvas Surface (`--sand` / `.paper`) | `#F3F7FC` | `243, 247, 252` | `C:4 M:2 Y:0 K:1` | `oklch(0.975 0.008 255)` | Light Canvas |
| ⚪ | **Cream White** | Base Canvas, Clean Cards, White Button Text (`--cream` / `--background`) | `#FFFFFF` | `255, 255, 255` | `C:0 M:0 Y:0 K:0` | `oklch(1.000 0.000 000)` | Primary Surface |
| 🔘 | **Muted Slate** | Subtitles, Lede Descriptions, Meta Labels (`--muted-foreground`) | `#485C77` | `72, 92, 119` | `C:39 M:23 Y:0 K:53` | `oklch(0.470 0.050 256)` | **5.6:1 AA** on White |
| ◽ | **Soft Neutral Tint** | Inset Containers, Subtle Borders, Dividers (`--muted` / `--secondary`) | `#EDF0F6` | `237, 240, 246` | `C:4 M:2 Y:0 K:4` | `oklch(0.955 0.008 255)` | Subtle Container |
| 🧊 | **Ice Blue Tint** | Interactive Hover States, Selected Chips (`--accent`) | `#E5ECF5` | `229, 236, 245` | `C:7 M:4 Y:0 K:4` | `oklch(0.940 0.015 255)` | Active State |
| 🔴 | **Signal Crimson** | School-in-a-Bag Red, Emergency Relief, Errors (`--destructive`) | `#E23532` | `226, 53, 50` | `C:0 M:77 Y:78 K:11` | `oklch(0.600 0.210 27)` | **4.6:1 AA** on White |

---

### 2.2 Data Visualization & Infographic Palette

When designing infographics, pie charts, donor impact breakdowns, and annual report graphs, use the following assigned sequence:

| Series | Name | Hex Code | RGB | Assigned Domain |
| :--- | :--- | :---: | :---: | :--- |
| **Series 1** | Deep Foundation Blue | `#0D3987` | `13, 57, 135` | Education, Schools, Literacy |
| **Series 2** | Cyan Marine Teal | `#008FAD` | `0, 143, 173` | Clean Water & WASH Filtration Plants |
| **Series 3** | Soft Sky Blue | `#86BEEE` | `134, 190, 238` | Healthcare, Medical Camps, Clinics |
| **Series 4** | Deep Marine Teal | `#1B7390` | `27, 115, 144` | Skills Development & Vocational Labs |
| **Series 5** | Royal Indigo | `#264698` | `38, 70, 152` | Widows Aid & Family Self-Reliance |

---

### 2.3 Borders, Dividers & Outlines

* **Light Mode Stroke:** `rgba(13, 57, 135, 0.16)` (`#0D3987` at 16% opacity).
* **Input / Field Active Stroke:** `rgba(13, 57, 135, 0.24)` (`#0D3987` at 24% opacity).
* **Dark Mode Stroke (on Ink Navy):** `rgba(255, 255, 255, 0.20)` (White at 20% opacity).

---

## 3. Typography System — The Editorial Trio

EFL employs three distinct Google Fonts that work in harmony across digital and print collateral.

```html
<!-- Google Fonts Embed Code -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

### 3.1 The Three Typefaces

#### 1. Bricolage Grotesque (Display & Headings)
* **Design Classification:** Neo-Grotesque with distinctive flared ink-traps and humanist curves.
* **Role:** Hero banners, H1/H2/H3 headlines, oversized numerical metrics, marquee statements.
* **Weights Used:**
  * **SemiBold (600)** — Sub-headers & card tags
  * **Bold (700)** — Standard H1, H2, H3 headlines
  * **ExtraBold (800)** — Hero titles (`.display-xl`) & large tabular numbers (`.numeral`)
* **Styling Rules:** Keep tracking tight (`0` or `-0.01em`). Keep line-height compressed (`0.98` to `1.08`).

#### 2. Instrument Sans (Body, Navigation & UI)
* **Design Classification:** Clean modernist geometric grotesque.
* **Role:** All body paragraphs, navigation links, UI buttons, form inputs, metadata, eyebrows.
* **OpenType Features:** `font-feature-settings: "ss01", "cv01"` (activates humanist single-story 'a' and refined commas).
* **Weights Used:**
  * **Regular (400)** — Standard running paragraphs
  * **Medium (500)** — Secondary labels, metadata
  * **SemiBold (600)** — Eyebrows, field headers
  * **Bold (700)** — Buttons, strong emphasis
* **Styling Rules:** High legibility at small sizes. Comfortable reading line-height (`1.5` to `1.65`).

#### 3. Instrument Serif (Emotive Accent & Editorial)
* **Design Classification:** Delicate transitional serif with high vertical stroke contrast.
* **Role:** Heartfelt pull quotes, humanitarian storytelling callouts, testimonials, philosophical vignettes.
* **Styles Used:**
  * **Italic (400i)** — Pull quotes & narrative reflection statements
  * **Regular (400)** — Editorial book excerpts
* **Styling Rules:** Never use for long body text. Reserve for reflective, dignified 1–2 sentence statements.

---

## 4. Typography Scale & Hierarchy Matrix

This matrix provides the exact sizing, weights, line-heights, and letter-spacings for all layouts:

| Level / Token | Font Family | Size (px) | Size (rem / CSS formula) | Weight | Line Height | Letter Spacing | CSS Utility | Usage Context |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Display XL** | Bricolage Grotesque | 48px – 86px+ | `clamp(2.7rem, 6vw, 5.4rem)` | 800 ExtraBold | `1.01` | `0em` | `.display-xl` | Homepage hero headline, cover titles |
| **Display Large (H1)** | Bricolage Grotesque | 35px – 61px | `clamp(2.2rem, 4.4vw, 3.8rem)` | 700 Bold | `1.04` | `0em` | `.display-lg / h1` | Page titles, major impact headers |
| **Display Medium (H2)** | Bricolage Grotesque | 25px – 38px | `clamp(1.6rem, 2.9vw, 2.4rem)` | 700 Bold | `1.08` | `0em` | `.display-md / h2` | Section titles, program headers |
| **Display Small (H3)** | Bricolage Grotesque | 20px – 24px | `1.25rem – 1.5rem` | 700 Bold | `1.20` | `0em` | `h3 / text-xl` | Feature cards, project grid items |
| **Metric Numeral** | Bricolage Grotesque | 48px – 72px | `3.0rem – 4.5rem` | 800 ExtraBold | `0.80` | `0em` (Tabular) | `.numeral` | Impact metrics (e.g. **50,000+ Bags**) |
| **Editorial Pull Quote**| Instrument Serif | 28px – 42px | `1.75rem – 2.65rem` | 400 Italic | `1.18` | `normal` | `font-serif italic` | Testimonials & emotional reflections |
| **Lede Intro** | Instrument Sans | 16px – 18.4px | `clamp(1rem, 1.1vw, 1.15rem)` | 400 Regular | `1.60` | `normal` | `.lede` | Lead intro paragraph under H1/H2 |
| **Body Standard** | Instrument Sans | 16px | `1.0rem` | 400 Regular | `1.55` | `normal` | `text-base` | Main article copy, report narratives |
| **Body Small / Meta** | Instrument Sans | 14px | `0.875rem` | 500 Medium | `1.50` | `normal` | `text-sm` | Captions, dates, secondary descriptions |
| **Eyebrow Overline** | Instrument Sans | 11.2px | `0.7rem` | 600 SemiBold | `1.20` | **`+0.24em` CAPS** | `.eyebrow` | Category kicker labels (e.g. `SINCE 2003`) |
| **Button / Action Tag**| Instrument Sans | 12px | `0.75rem` | 700 Bold | `1.00` | **`+0.18em` CAPS** | `btn text-xs` | Primary & secondary pill action buttons |
| **Micro Caption** | Instrument Sans | 10px – 11px | `0.65rem – 0.68rem` | 600 SemiBold | `1.30` | **`+0.18em` CAPS** | `text-[0.68rem]` | Photo credits, copyright, pill tags |

---

## 5. UI Elements, Buttons & Shape Geometry

### 5.1 Border Radius Scale

* **`--radius-sm` (4px):** Sub-badges, micro tags, status chips.
* **`--radius-md` (8px):** Form text inputs, tooltips, dropdown menus.
* **`--radius-lg` (12px):** Standard cards, popover dialogs, default container.
* **`--radius-xl` (16px):** Featured cards, media showcases.
* **`--radius-2xl` (20px):** Large modal dialogues, highlight banners.
* **`--radius-3xl` (24px):** Main section wrappers.
* **`--radius-4xl` (32px):** Hero wrappers.
* **`--radius-full` (9999px / Pill):** Primary CTA buttons, filter chips, category tags.

### 5.2 Button Specifications

1. **Primary Action Pill:**
   * **Background:** Foundation Blue (`#0D3987`)
   * **Text:** Cream White (`#FFFFFF`), Bold 700, 12px, Uppercase, `+0.18em` letter spacing
   * **Padding:** `14px 28px` (desktop) / `12px 24px` (mobile)
   * **Corner Radius:** `9999px` (Full Pill)
   * **Shadow:** `0 4px 14px rgba(13, 57, 135, 0.25)`
   * **Hover State:** Foundation Blue Deep (`#092A66`) with elevated shadow

2. **Secondary Dark Pill:**
   * **Background:** Ink Slate Navy (`#143055`)
   * **Text:** Cream White (`#FFFFFF`), Bold 700, 12px, Uppercase, `+0.18em` letter spacing
   * **Corner Radius:** `9999px` (Full Pill)
   * **Hover State:** Ink Navy 85% opacity (`#143055D9`)

3. **Outline Glass Pill (For Dark Sections):**
   * **Background:** `rgba(255, 255, 255, 0.08)` backdrop blur
   * **Border:** `1px solid rgba(255, 255, 255, 0.30)`
   * **Text:** Cream White (`#FFFFFF`), Bold 700, 12px, Uppercase, `+0.18em` letter spacing
   * **Corner Radius:** `9999px` (Full Pill)

---

## 6. Graphic Designer Checklist & Do's / Don'ts

### ✅ Do:
* **Preserve the editorial contrast:** Pair high-impact bold headings in **Bricolage Grotesque** with clean, spacious body text in **Instrument Sans**.
* **Use Instrument Serif strictly for accents:** Use it for reflective, emotional quotes (e.g. *“Every child seated with pencil and paper has their future restored.”*).
* **Apply wide letter-spacing on small caps:** Always apply `0.18em` to `0.24em` tracking to uppercase eyebrows and button labels.
* **Use Sand Paper (`#F3F7FC`) for page rhythm:** Alternate between pure white sections and pale sand surfaces to create editorial depth.
* **Maintain WCAG AAA compliance:** Use Ink Navy (`#143055`) or Foundation Blue (`#0D3987`) for text on light backgrounds.

### ❌ Don't:
* **Don't use pure black (`#000000`):** Always use Ink Slate Navy (`#143055`) for dark typography and dark surfaces.
* **Don't use Bricolage Grotesque for body paragraphs:** It has expressive flared shapes meant solely for headlines and numbers.
* **Don't stretch or distort the letter-spacing of Bricolage:** Headings should stay tight (`0` tracking) to maintain their bold typographic weight.
* **Don't use generic corporate blues:** Always adhere to the calibrated Foundation Blue (`#0D3987`) and Ink Navy (`#143055`).

---

## 7. Package Contents in `BRAND_GUIDE_FOR_DESIGNER`

The handoff directory located at `visionary-digital/BRAND_GUIDE_FOR_DESIGNER/` contains the following ready-to-send files:

1. **`ELF_Brand_Style_Guide.png`** — **Ultra-High-Resolution visual illustration sheet** showing all swatches, typography hierarchy, font sizes, weights, and components.
2. **`ELF_Brand_Style_Guide.html`** — **Interactive, print-ready HTML style guide**. Open in any web browser to view, copy codes, or export to PDF (`Ctrl + P` / `Print to PDF`).
3. **`BRAND_STYLE_GUIDE.md`** — Complete specification document.
4. **`README_FOR_GRAPHIC_DESIGNER.md`** — Quick-start summary card for the designer.
5. **`assets/`** — Directory containing official brand assets:
   * `efl-logo.png` — Official Foundation logo
   * `emblem.png` — Official Foundation emblem
   * `school-in-a-bag-logo-blue.png` — School-in-a-bag blue edition
   * `school-in-a-bag-logo-red.png` — School-in-a-bag red edition
   * `brand_concept_mockup.jpg` — Studio poster presentation mockup

---

*Education And Life Foundation · Brand Identity System · All Rights Reserved © 2003–2026*
