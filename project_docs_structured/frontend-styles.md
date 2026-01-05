# Frontend - Styles

> 전역 스타일 및 CSS 모듈

**생성 시각**: 2026-01-05T10:21:53.975Z

---

## 📋 목차 (18개 파일)

1. [src/App.css](#file-1)
2. [src/App.module.css](#file-2)
3. [src/components/layout/Container.module.css](#file-3)
4. [src/components/layout/Footer.module.css](#file-4)
5. [src/components/layout/Header.module.css](#file-5)
6. [src/components/layout/PaperBackground.module.css](#file-6)
7. [src/components/report/LuckCalendar.module.css](#file-7)
8. [src/components/report/ReasonCards.module.css](#file-8)
9. [src/components/share/ShareActions.module.css](#file-9)
10. [src/components/ui/AdviceBox.module.css](#file-10)
11. [src/components/ui/Card.module.css](#file-11)
12. [src/components/ui/ContextBox.module.css](#file-12)
13. [src/index.css](#file-13)
14. [src/pages/Home.module.css](#file-14)
15. [src/pages/Processing.module.css](#file-15)
16. [src/pages/Report.module.css](#file-16)
17. [src/pages/Start.module.css](#file-17)
18. [src/styles/print.css](#file-18)

---

## File 1: `src/App.css` {#file-1}

**크기**: 0.04 KB | **확장자**: css

```css
/* App.css cleared for Genesis brand system */
```

---

## File 2: `src/App.module.css` {#file-2}

**크기**: 0.81 KB | **확장자**: css

```css
.introContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 2rem;
    text-align: center;
}

.heroBrand {
    font-size: clamp(3rem, 10vw, 6rem);
    transition: transform 0.8s ease-out;
}

.enterBtn {
    padding: 1.2rem 3rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.05em;
}

.enterBtn:hover {
    transform: translateY(-2px);
    /* Token-only hover shadow using color-mix */
    box-shadow: 0 10px 20px -10px color-mix(in srgb, var(--ink) 30%, transparent);
}
```

---

## File 3: `src/components/layout/Container.module.css` {#file-3}

**크기**: 0.27 KB | **확장자**: css

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
}

@media (max-width: 768px) {
    .container {
        padding-left: 20px;
        padding-right: 20px;
    }
}
```

---

## File 4: `src/components/layout/Footer.module.css` {#file-4}

**크기**: 0.64 KB | **확장자**: css

```css
.footer {
    padding: 2rem 0;
    border-top: 1px solid var(--line);
    margin-top: auto;
    text-align: center;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

.copyright {
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
}

.companyInfo {
    opacity: 0.8;
}

.divider {
    margin: 0 0.5rem;
    opacity: 0.3;
}

@media (max-width: 480px) {
    .footer {
        padding: 1.5rem 0;
    }
}
```

---

## File 5: `src/components/layout/Header.module.css` {#file-5}

**크기**: 2.69 KB | **확장자**: css

```css
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--card);
    border-bottom: 1px solid var(--line);
    padding: 1rem 0;
}

.headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.brandLink {
    text-decoration: none;
    color: inherit;
    display: block;
}

.brand {
    font-size: 1.15rem;
}

.desktopNav {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.navLink {
    font-family: var(--font-sans);
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.navLink:hover {
    color: var(--ink);
}

.ctaButton {
    background-color: var(--ink);
    color: var(--card);
    border: none;
    padding: 0.6rem 1.5rem;
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    transition: opacity 0.2s;
}

.ctaButton:hover {
    opacity: 0.9;
}

.mobileMenuBtn {
    display: none;
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
}

.hamburger {
    width: 24px;
    height: 2px;
    background-color: var(--ink);
    position: relative;
    transition: background-color 0.2s;
}

.hamburger::before,
.hamburger::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--ink);
    left: 0;
    transition: transform 0.3s, top 0.3s;
}

.hamburger::before {
    top: -6px;
}

.hamburger::after {
    top: 6px;
}

.isOpen {
    background-color: transparent;
}

.isOpen::before {
    top: 0;
    transform: rotate(45deg);
}

.isOpen::after {
    top: 0;
    transform: rotate(-45deg);
}

.mobileMenu {
    position: fixed;
    top: 65px;
    left: 0;
    width: 100%;
    height: 0;
    background-color: var(--card);
    overflow: hidden;
    transition: height 0.3s ease;
    border-bottom: 1px solid var(--line);
}

.mobileMenuVisible {
    height: calc(100vh - 65px);
}

.mobileNav {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
}

.mobileNavLink {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
}

.mobileCtaButton {
    margin-top: 1rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    padding: 1rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .desktopNav {
        display: none;
    }

    .mobileMenuBtn {
        display: block;
    }
}
```

---

## File 6: `src/components/layout/PaperBackground.module.css` {#file-6}

**크기**: 0.86 KB | **확장자**: css

```css
.paperWrapper {
    position: relative;
    min-height: 100vh;
    background-color: var(--bg);
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
}

.noiseOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.3;
    mix-blend-mode: multiply;
    /* CSS-based noise texture fallback */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.content {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
}
```

---

## File 7: `src/components/report/LuckCalendar.module.css` {#file-7}

**크기**: 5.68 KB | **확장자**: css

```css
.calendarModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
}

.modalContent {
    background-color: #F3F0EB;
    border: 1px solid var(--ink);
    border-radius: 2px;
    max-width: 900px;
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.modalHeader h2 {
    font-family: "Noto Serif KR", serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c1c1c;
}

.closeButton {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1c1c1c;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
}

.closeButton:hover {
    color: #c62828;
}

.loadingState,
.errorState {
    text-align: center;
    padding: 3rem;
}

.loadingState p {
    font-size: 1rem;
    color: #1c1c1c;
    margin-bottom: 0.5rem;
}

.loadingHint {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.errorState p {
    font-size: 1rem;
    color: #c62828;
    margin-bottom: 1rem;
}

.calendarContainer {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    padding: 20px 0;
    margin-bottom: 2rem;
}

.yearGrid {
    display: grid;
    grid-template-rows: repeat(7, 12px);
    /* Sun to Sat as rows if we do GitHub style, or vice versa as spec */
    grid-auto-flow: column;
    grid-auto-columns: 12px;
    gap: 3px;
}

/* Definition spec says: Columns 7, Rows 53. Let's strictly follow. */
.strictGrid {
    display: grid;
    grid-template-columns: repeat(7, 12px);
    grid-auto-rows: 12px;
    gap: 3px;
    justify-content: center;
}

.dayHead {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-bottom: 0.25rem;
}

.dayCell {
    width: 12px;
    height: 12px;
    border-radius: 1px;
    cursor: pointer;
    transition: transform 0.1s;
    background-color: rgba(0, 0, 0, 0.05);
    /* Base */
}

.dayCell:hover {
    transform: scale(1.4);
    z-index: 100;
}

.todayCell {
    border: 1.5px solid var(--accent);
    transform: scale(1.2);
    z-index: 10;
}

/* Tooltip from spec */
.tooltip {
    position: absolute;
    background: #000;
    color: #FFF;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 2px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -100%);
    margin-top: -10px;
}

.dayNum {
    font-weight: 600;
}

.dayScore {
    font-size: 0.6rem;
    opacity: 0.8;
}

/* 점수별 테마 */
.gradeGood {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.gradeWarn {
    background-color: #fffde7;
    color: #fbc02d;
}

.gradeCaution {
    background-color: #ffebee;
    color: #c62828;
}

.emptyCell {
    visibility: hidden;
}

.detailPanel {
    margin-top: 1.5rem;
    background-color: #fdfcf8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-height: 180px;
}

.noSelection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    font-style: italic;
}

.detailCard {
    padding: 1.5rem;
}

.detailHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.detailTitle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detailDate {
    font-size: 1.1rem;
    font-weight: 700;
}

.detailGrade {
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
}

.detailScore {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.detailScore strong {
    font-size: 1.5rem;
    color: #1c1c1c;
    margin-left: 4px;
}

.detailBody {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.detailSection h5 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 0.75rem;
}

.detailSection ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detailSection li {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 4px;
}

.detailSection li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #c62828;
}

.emptyMsg {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.4);
}

.modalFooter {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.legend {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
}

.legendItem {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.generatedAt {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
    .calendarModal {
        padding: 0.5rem;
    }

    .modalContent {
        padding: 1rem;
        max-height: 95vh;
    }

    .calendarGrid {
        grid-template-columns: 1fr;
    }

    .detailBody {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
```

---

## File 8: `src/components/report/ReasonCards.module.css` {#file-8}

**크기**: 1.45 KB | **확장자**: css

```css
.reasonCardsContainer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(198, 40, 40, 0.15);
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 4px solid #c62828;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0 4px 4px 0;
}

.cardTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1c1c1c;
    margin-bottom: 1rem;
}

.evidenceSection,
.patchSection,
.riskSection {
    margin-top: 1rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.5rem;
}

.evidenceList,
.patchList {
    margin: 0;
    padding-left: 1.5rem;
}

.evidenceList li,
.patchList li {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0.5rem;
}

.patchList li {
    font-weight: 500;
    color: #1c1c1c;
}

.riskText {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(198, 40, 40, 0.9);
    font-weight: 500;
}

@media print {
    .reasonCardsContainer {
        page-break-inside: avoid;
    }

    .reasonCard {
        page-break-inside: avoid;
        background-color: rgba(198, 40, 40, 0.05);
    }
}
```

---

## File 9: `src/components/share/ShareActions.module.css` {#file-9}

**크기**: 1.65 KB | **확장자**: css

```css
.shareContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    position: relative;
    margin-bottom: 1.5rem;
}

.buttonGroup {
    display: flex;
    gap: 0.5rem;
}

.shareBtn {
    padding: 0.5rem 1rem;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ink);
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.shareBtn:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--bg) 30%, transparent);
}

.shareBtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.kakaoBtn {
    background-color: #FEE500;
    /* Kakao Official Yellow - Branding is allowed here */
    border-color: #FEE500;
    color: #191919;
}

.kakaoBtn:hover:not(:disabled) {
    background-color: #FADA0A;
    border-color: #FADA0A;
}

.toast {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    background-color: var(--ink);
    color: var(--card);
    font-size: 0.75rem;
    border-radius: 4px;
    z-index: 20;
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {

    .shareBtn,
    .toast {
        transition: none;
        animation: none;
    }
}

/* Hide in print */
@media print {
    .shareContainer {
        display: none !important;
    }
}
```

---

## File 10: `src/components/ui/AdviceBox.module.css` {#file-10}

**크기**: 0.52 KB | **확장자**: css

```css
.adviceBox {
    background-color: transparent;
    border: none;
    padding: 0;
    position: relative;
    margin: 2rem 0;
}

.badge {
    display: none;
    /* Hide badge, using icon instead */
}

.content {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--ink);
    line-height: 1.7;
    display: flex;
    align-items: flex-start;
}

.content::before {
    content: "💡";
    font-style: normal;
    margin-right: 12px;
    font-size: 1.2rem;
}
```

---

## File 11: `src/components/ui/Card.module.css` {#file-11}

**크기**: 0.54 KB | **확장자**: css

```css
.card {
    background-color: var(--card);
    padding: 32px;
    border-radius: 2px;
    /* Token-only shadow using color-mix instead of hardcoded rgba */
    box-shadow: 0 20px 50px -12px color-mix(in srgb, var(--ink) 5%, transparent);
    position: relative;
    border: 1px solid var(--line);
}

.accentBar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--accent);
}

@media (max-width: 768px) {
    .card {
        padding: 24px;
    }
}
```

---

## File 12: `src/components/ui/ContextBox.module.css` {#file-12}

**크기**: 0.45 KB | **확장자**: css

```css
.contextBox {
    background-color: #F7F7F7;
    border-left: 4px solid #8C8C8C;
    padding: 20px;
    margin: 1.5rem 0;
}

.label {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.content {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
}
```

---

## File 13: `src/index.css` {#file-13}

**크기**: 2.25 KB | **확장자**: css

```css
:root {
  --bg: #F3F0EB;
  /* Warm Beige (Hanji) */
  --card: #FFFFFF;
  --ink: #2C2C2C;
  /* Ink Black */
  --muted: #8C8C8C;
  /* Muted Ink */
  --accent: #CC3D3D;
  /* Cinnabar Red (Inju) */
  --line: rgba(0, 0, 0, 0.1);

  --font-serif: "Noto Serif KR", serif;
  --font-sans: "Noto Sans KR", "Inter", system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Paper Texture Background */
  background-image: url('/assets/paper-noise.png');
  background-repeat: repeat;
  background-size: 150px;
  background-attachment: fixed;
  position: relative;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-color: var(--bg);
  z-index: -1;
}

/* Texture Blend Layer */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url('/assets/paper-noise.png');
  background-repeat: repeat;
  background-size: 150px;
  opacity: 0.04;
  pointer-events: none;
  z-index: -1;
  background-attachment: fixed;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
}

/* BrandLockup Classes */
.brand-lockup {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  max-width: 100%;
  transition: all 0.3s ease;
}

.brand-lockup-kr {
  font-family: var(--font-serif);
  font-weight: 900;
  color: var(--ink);
  white-space: nowrap;
}

.brand-lockup-en {
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
}

.brand-lockup-suffix {
  font-family: var(--font-sans);
  font-weight: 300;
  color: var(--muted);
  white-space: nowrap;
}

.brand-lockup.variant-accent .brand-lockup-suffix {
  color: var(--accent);
  font-weight: 400;
}

/* Responsive Stacked Behavior [R3] */
.brand-lockup.variant-stacked-mobile {
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

@media (max-width: 389px) {
  .brand-lockup:not(.variant-force-inline) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

---

## File 14: `src/pages/Home.module.css` {#file-14}

**크기**: 3.81 KB | **확장자**: css

```css
.home {
    padding-bottom: 5rem;
}

.hero {
    padding: 6rem 0;
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.heroGrid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: center;
}

.heroTitle {
    font-family: var(--font-serif);
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
}

.heroSubtitle {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 3rem;
    max-width: 600px;
}

.ctaGroup {
    display: flex;
    gap: 1rem;
}

.primaryBtn {
    background-color: var(--ink);
    color: #FFF;
    border: none;
    height: 64px;
    padding: 0 32px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.primaryBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.secondaryBtn {
    background-color: transparent;
    color: var(--ink);
    border: 1px solid var(--ink);
    padding: 1.2rem 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 4px;
}

.heroVisual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.astrolabeContainer {
    position: absolute;
    width: 140%;
    height: 140%;
    z-index: -1;
    opacity: 0.08;
    animation: rotateAstrolabe 120s infinite linear;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.astrolabeSvg {
    width: 100%;
    height: 100%;
    stroke: #000;
    stroke-width: 1px;
    fill: none;
}

@keyframes rotateAstrolabe {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.kanjiWatermark {
    position: absolute;
    top: -50px;
    right: -20px;
    font-family: var(--font-serif);
    font-size: 25rem;
    font-weight: 900;
    color: var(--ink);
    opacity: 0.03;
    pointer-events: none;
    z-index: -2;
    line-height: 1;
}

.principleCard {
    z-index: 10;
}

.cardTitle {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
}

.principleList {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.principleList li {
    font-family: var(--font-sans);
    color: var(--muted);
    font-size: 0.95rem;
    padding-left: 1.5rem;
    position: relative;
}

.principleList li::before {
    content: '·';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: 900;
    font-size: 1.5rem;
    line-height: 0.8;
}

/* Features */
.features {
    padding: 4rem 0;
}

.sectionHeader {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--line);
    padding-bottom: 1rem;
}

.sectionTitle {
    font-size: 2rem;
}

.featureGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.featureCard h4 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
}

@media (max-width: 1024px) {
    .heroGrid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .kanjiWatermark {
        font-size: 15rem;
        top: -30px;
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 4rem 0;
    }

    .heroTitle {
        font-size: 2.5rem;
    }

    .ctaGroup {
        flex-direction: column;
        gap: 1rem;
    }

    .primaryBtn {
        height: 56px;
        width: 100%;
    }

    .featureGrid {
        grid-template-columns: 1fr;
    }
}
```

---

## File 15: `src/pages/Processing.module.css` {#file-15}

**크기**: 4.09 KB | **확장자**: css

```css
.processingPage {
    min-height: 100vh;
    background-color: #0F0F0F;
    /* Deep Black */
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.processingPage::after {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url('/assets/paper-noise.png');
    background-repeat: repeat;
    background-size: 150px;
    opacity: 0.1;
    /* Stronger CRT noise */
    pointer-events: none;
    z-index: 100;
}

.container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.terminal {
    width: 100%;
    max-width: 800px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    color: #33FF00;
    /* Terminal Green */
    background: rgba(0, 0, 0, 0.4);
    padding: 40px;
    border-radius: 4px;
    border: 1px solid rgba(51, 255, 0, 0.2);
    box-shadow: 0 0 40px rgba(0, 0, 0, 1);
}

.logLine {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 8px;
    display: block;
}

.cursor {
    display: inline-block;
    width: 10px;
    height: 2px;
    background-color: #33FF00;
    margin-left: 4px;
    animation: blink 0.5s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.footer {
    padding: 24px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.copyright {
    font-size: 0.8rem;
    color: var(--muted);
    text-align: center;
}

/* Phase 27: Error UI */
.errorCard {
    max-width: 500px;
    width: 90%;
    padding: 40px;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(198, 40, 40, 0.3);
    text-align: center;
    backdrop-filter: blur(10px);
}

.errorHeader {
    margin-bottom: 24px;
}

.errorTitle {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff5252;
    margin-bottom: 8px;
}

.errorCode {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: rgba(255, 82, 82, 0.6);
    background: rgba(255, 82, 82, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.errorText {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-main);
    margin-bottom: 32px;
}

.detailsBox {
    background: rgba(0, 0, 0, 0.3);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 32px;
    text-align: left;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.detailsBox pre {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #888;
    white-space: pre-wrap;
    word-break: break-all;
}

.actionRow {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.retryBtn {
    padding: 12px 24px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.retryBtn:hover {
    background: #e53935;
    transform: translateY(-2px);
}

.cancelBtn {
    padding: 12px 24px;
    background: transparent;
    color: var(--text-main);
    border: 1px solid var(--border-main);
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancelBtn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--text-main);
}

.subtext {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
}

/* Accessibility: Strict prefers-reduced-motion enforcement */
@media (prefers-reduced-motion: reduce) {
    .spinner {
        animation: none;
        border-top-color: var(--line);
    }

    .triviaText {
        animation: none;
        transition: none;
    }

    .dot {
        transition: none;
        animation: none;
    }

    * {
        animation: none !important;
        transition: none !important;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 1.5rem;
    }

    .triviaText {
        font-size: 1rem;
    }
}
```

---

## File 16: `src/pages/Report.module.css` {#file-16}

**크기**: 11.32 KB | **확장자**: css

```css
.reportPage {
    min-height: 100vh;
    background-color: var(--bg);
    overflow-x: hidden;
}

.mainLayout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    position: relative;
}

.qualityBanner {
    grid-column: 1 / -1;
    margin-bottom: 1.5rem;
    padding: 1rem 1.25rem;
    background: color-mix(in srgb, var(--accent) 8%, var(--card));
    border: 1px solid var(--accent);
    border-radius: 6px;
    color: var(--ink);
    line-height: 1.6;
    font-size: 0.95rem;
}

/* 사이드바 스타일 */
.sidebar {
    position: sticky;
    top: 6rem;
    height: calc(100vh - 8rem);
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    z-index: 10;
}

.sidebarHeader {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebarHeader h3 {
    font-size: 1.1rem;
    color: var(--ink);
}

.closeBtn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--muted);
    cursor: pointer;
}

.nav {
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.navItem {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.8rem;
    background: transparent;
    border: none;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
}

.navItem:hover {
    background-color: color-mix(in srgb, var(--bg) 50%, transparent);
}

.pageNum {
    background: rgba(198, 40, 40, 0.05);
}

.navItem .pageNum {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
    width: 20px;
}

.navItem .pageTitle {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reportContent {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
}

.reportHeader {
    margin-bottom: 80px;
    text-align: left;
}

.mainTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.mainSummary {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.6;
    max-width: 600px;
}

.pageSection {
    margin-bottom: 120px;
    scroll-margin-top: 40px;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid #1c1c1c;
    padding-bottom: 8px;
}

.categoryTag {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1c1c1c;
}

.pageIdentifier {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--muted);
}

.contentCard {
    background: #FFFFFF !important;
    border-left: 4px solid #CC3D3D !important;
    border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05) !important;
    padding: 40px !important;
    margin-bottom: 3rem;
}

.sectionTitle {
    font-family: var(--font-serif);
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--ink);
}

.textContent p {
    margin-bottom: 24px;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
    text-align: justify;
}

.visualBox {
    border: 2px solid #1c1c1c;
    padding: 32px;
    margin: 40px 0;
}

.visualTitle {
    font-family: "Noto Serif KR", serif;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #1c1c1c;
}

.placeholder {
    height: 180px;
    background: rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    gap: 0.5rem;
}

.placeholder::before {
    content: "SERVICE PREPARING";
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    opacity: 0.5;
}

.disclaimerSection {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
}

.disclaimerSection p {
    font-size: 0.85rem;
    margin-bottom: 8px;
    line-height: 1.6;
}

.disclaimerEn {
    font-size: 0.75rem !important;
    font-style: italic;
}

.mobileNavTrigger {
    display: none;
}

@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }

    .sidebarOpen {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #f7f5f0;
    }

    .mobileNavTrigger {
        display: block;
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 900;
        background: #1c1c1c;
        color: #fff;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .mainTitle {
        font-size: 2.25rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .sidebar {
        transition: none;
    }

    .navItem {
        transition: none;
    }
}

/* Phase 26: Action Buttons */
.actionButtons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.pdfButton,
.calendarButton {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.pdfButton {
    background-color: #1c1c1c;
    color: #fff;
}

.pdfButton:hover {
    background-color: #333;
}

.calendarButton {
    background-color: #fff;
    color: #1c1c1c;
    border: 1px solid #1c1c1c;
}

.calendarButton:hover {
    background-color: #f7f5f0;
}

/* Phase 26: Reason Cards */
.reasonCardsContainer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.reasonCardsTitle {
    font-size: 0.9rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1rem;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 3px solid #c62828;
    padding: 1rem;
    margin-bottom: 1rem;
}

.reasonCard h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1c1c1c;
}

.reasonCard p {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
}

/* Phase 26: Print Optimization */
@media print {
    .reportPage {
        background: #FFFFFF !important;
        padding: 0 !important;
    }

    body::before,
    body::after {
        display: none !important;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .actionButtons,
    .shareActions,
    .header {
        display: none !important;
    }

    .mainLayout {
        display: block !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    .reportContent {
        max-width: 100% !important;
        padding: 0 !important;
    }

    .pageSection {
        page-break-before: always;
        margin-bottom: 40px;
    }

    .contentCard {
        box-shadow: none !important;
        border: 1px solid #EEEEEE !important;
        padding: 30px !important;
    }

    .visualBox {
        page-break-inside: avoid;
    }

    @page {
        size: A4;
        margin: 20mm;
    }
}

/* Print Mode Class */
.printMode .sidebar,
.printMode .mobileNavTrigger,
.printMode .actionButtons {
    display: none;
}

.printMode .mainLayout {
    grid-template-columns: 1fr;
}

/* Phase 27: Legacy Warning Styles */
.legacyWarning {
    padding: 80px 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.legacyCard {
    max-width: 600px;
    text-align: center;
}

.legacyTitle {
    font-size: 2rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
}

.legacyText {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
}

.legacyFeatures {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.legacyFeatures li {
    font-size: 1rem;
    padding: 0.5rem 0;
    color: #1c1c1c;
}

.regenerateButton {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    background-color: #c62828;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
}

.regenerateButton:hover {
    background-color: #a52020;
    transform: translateY(-2px);
}

/* Phase 27: 3단 블록 스타일 */
.sectionBlock {
    margin: 32px 0;
    padding: 24px 0;
    border-top: 1px solid rgba(28, 28, 28, 0.1);
}

.sectionBlock:first-child {
    border-top: none;
    padding-top: 0;
}

.blockTitle {
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 1rem;
    display: none;
    /* Hide internal block titles as they are implied by components */
}

/* 3단 구조 컴포넌트 스타일 보정 */
.resultBlock {
    margin-bottom: 2rem;
}

.explainBlock {
    background-color: #F7F7F7;
    border-left: 4px solid var(--muted);
    padding: 20px;
    margin-bottom: 2rem;
}

.interpretationBlock {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--ink);
    line-height: 1.7;
}

.interpretationBlock::before {
    content: "💡 ";
    font-style: normal;
    margin-right: 8px;
}

@media print {
    .sectionBlock {
        page-break-inside: avoid;
        margin: 24px 0;
    }

    .blockTitle {
        page-break-after: avoid;
    }

    .qualityAlert {
        display: none !important;
    }
}

/* Phase 28: Quality Alert Banner */
.qualityAlert {
    background: #FFF9C4;
    border: 2px solid #FBC02D;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.alertIcon {
    font-size: 2rem;
}

.alertContent h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #F57F17;
    margin-bottom: 8px;
}

.alertContent p {
    font-size: 0.95rem;
    color: #5D4037;
    margin-bottom: 16px;
    line-height: 1.5;
}

.regenerateBtn {
    background: #F57F17;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}

.regenerateBtn:hover:not(:disabled) {
    background: #E65100;
    transform: translateY(-2px);
}

.regenerateBtn:disabled {
    opacity: 0.6;
    cursor: wait;
}
```

---

## File 17: `src/pages/Start.module.css` {#file-17}

**크기**: 3.52 KB | **확장자**: css

```css
.startPage {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.container {
    padding-top: 3rem;
    max-width: 480px;
}

.pageHeader {
    margin-bottom: 2.5rem;
    text-align: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--ink);
}

.helperText {
    font-family: var(--font-sans);
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
}

.formCard {
    padding: 40px;
    background: #FFFFFF;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.labelRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--ink);
}

.input {
    width: 100%;
    height: 52px;
    padding: 0 1rem;
    background-color: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--ink);
    border-radius: 2px;
    transition: all 0.2s;
}

.input:focus {
    outline: none;
    background-color: #FFF;
    border: 1px solid var(--ink);
}

.inputError {
    border: 1px solid var(--accent);
    animation: shake 0.4s;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    75% {
        transform: translateX(5px);
    }
}

.readOnly {
    background-color: color-mix(in srgb, var(--bg) 20%, transparent);
    cursor: default;
}

.errorMsg {
    font-size: 0.8rem;
    color: var(--accent);
    font-family: var(--font-sans);
}

.toggleWrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.checkbox {
    accent-color: var(--accent);
    width: 1.1rem;
    height: 1.1rem;
}

.toggleLabel {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--muted);
    cursor: pointer;
}

.segmentControl {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: color-mix(in srgb, var(--bg) 30%, transparent);
    padding: 4px;
    border-radius: 6px;
    border: 1px solid var(--line);
}

.segmentBtn {
    padding: 0.75rem;
    border: none;
    background: transparent;
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--muted);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
}

.segmentBtn:hover {
    color: var(--ink);
}

.active {
    background-color: var(--card);
    color: var(--ink);
    font-weight: 700;
    box-shadow: 0 2px 4px color-mix(in srgb, var(--ink) 5%, transparent);
}

.submitBtn {
    margin-top: 1rem;
    padding: 1.25rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    border-top: none;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s;
}

.submitBtn:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
}

.submitBtn:disabled {
    background-color: var(--muted);
    opacity: 0.3;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .container {
        padding-top: 2rem;
    }

    .formCard {
        padding: 1.5rem;
    }

    .title {
        font-size: 1.75rem;
    }
}
```

---

## File 18: `src/styles/print.css` {#file-18}

**크기**: 1.64 KB | **확장자**: css

```css
/* P9-ATOMIC-003: Print Optimization */

@media print {

    /* Hide interactive elements */
    .no-print,
    button,
    nav,
    footer,
    .calendarModal {
        /* Don't print modals */
        display: none !important;
    }

    /* Page Setup */
    @page {
        size: A4;
        margin: 20mm;
    }

    body {
        background-color: white !important;
        color: black !important;
        font-family: "Noto Serif KR", serif !important;
        font-size: 11pt;
        line-height: 1.6;
    }

    /* Container Reset */
    .reportContainer {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
    }

    /* Typography */
    h1,
    h2,
    h3 {
        page-break-after: avoid;
        color: black !important;
    }

    p {
        orphans: 3;
        widows: 3;
        text-align: justify;
    }

    /* Section Breaks */
    .reportSection {
        page-break-inside: avoid;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #ddd;
    }

    /* Color Adjustment for Ink Saving */
    .gradeGood {
        background-color: transparent !important;
        border: 1px solid #2e7d32;
        color: #2e7d32 !important;
    }

    .gradeWarn {
        background-color: transparent !important;
        border: 1px solid #fbc02d;
        color: #f9a825 !important;
    }

    .gradeCaution {
        background-color: transparent !important;
        border: 1px solid #c62828;
        color: #c62828 !important;
    }
}
```

---

