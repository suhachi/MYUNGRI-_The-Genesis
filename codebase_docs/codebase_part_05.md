# 📦 프로젝트 코드베이스 - Part 5/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/frontend-styles.md`
- `scripts/generate-full-codebase-docs.cjs`
- `scripts/generate-code-docs.cjs`
- `src/pages/Start.module.css`
- `src/components/layout/Header.module.css`
- `firestore-debug.log`
- `public/vite.svg`
- `src/components/layout/PaperBackground.module.css`
- `functions/package.json`
- `eslint.config.js`
- `src/config/tokens.ts`
- `.firebase/hosting.ZGlzdA.cache`

---

## 📄 파일 내용

## 📄 project_docs_structured/frontend-styles.md

```markdown
# Frontend - Styles

> 전역 스타일 및 CSS 모듈

**생성 시각**: 2026-01-03T09:38:11.843Z

---

## 📋 목차 (17개 파일)

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

**크기**: 5.54 KB | **확장자**: css

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
    background-color: #f7f5f0;
    border: 2px solid #1c1c1c;
    border-radius: 8px;
    max-width: 1200px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
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

.calendarGrid {
    padding: 1rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    max-height: 60vh;
    overflow-y: auto;
}

.monthBox {
    border: 1px solid #eee;
    padding: 0.75rem;
    border-radius: 4px;
}

.monthTitle {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    text-align: center;
    color: #1c1c1c;
}

.daysGrid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.dayHead {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-bottom: 0.25rem;
}

.dayCell {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    border-radius: 2px;
    cursor: pointer;
    transition: transform 0.1s;
    position: relative;
}

.dayCell:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.selectedCell {
    outline: 2px solid #1c1c1c;
    outline-offset: -2px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    z-index: 11;
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

**크기**: 0.71 KB | **확장자**: css

```css
.adviceBox {
    /* Token-only accent background using color-mix instead of hardcoded rgba */
    background-color: color-mix(in srgb, var(--accent) 2%, transparent);
    border: 1px solid var(--accent);
    padding: 24px;
    position: relative;
    margin: 2rem 0;
    border-radius: 2px;
}

.badge {
    position: absolute;
    top: -12px;
    left: 20px;
    background-color: var(--accent);
    color: var(--card);
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.content {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--ink);
    line-height: 1.7;
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

**크기**: 0.57 KB | **확장자**: css

```css
.contextBox {
    /* Token-only background using color-mix instead of hardcoded rgba */
    background-color: color-mix(in srgb, var(--bg) 30%, transparent);
    border-left: 4px solid var(--muted);
    padding: 16px 20px;
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

**크기**: 1.61 KB | **확장자**: css

```css
:root {
  --bg: #EBE7E0;
  --card: #FDFCF8;
  --ink: #1C1C1C;
  --muted: #5A5A5A;
  --accent: #D9381E;
  --line: color-mix(in srgb, var(--ink) 12%, transparent);

  --font-serif: "Noto Serif KR", serif;
  --font-sans: "Noto Sans KR", "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
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
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

**크기**: 2.88 KB | **확장자**: css

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
    font-size: clamp(2.5rem, 6vw, 4.5rem);
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
    color: var(--card);
    border: none;
    padding: 1.2rem 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
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
}

.kanjiWatermark {
    position: absolute;
    top: -50px;
    right: -20px;
    font-family: var(--font-serif);
    font-size: 25rem;
    font-weight: 900;
    color: var(--ink);
    opacity: 0.05;
    pointer-events: none;
    z-index: -1;
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
        font-size: 2.25rem;
    }

    .ctaGroup {
        flex-direction: column;
    }

    .featureGrid {
        grid-template-columns: 1fr;
    }
}
```

---

## File 15: `src/pages/Processing.module.css` {#file-15}

**크기**: 4.29 KB | **확장자**: css

```css
.processingPage {
    min-height: 100vh;
    background-color: var(--bg);
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
}

.content {
    text-align: center;
    max-width: 600px;
    padding: 0 20px;
}

.spinner {
    width: 48px;
    height: 48px;
    margin: 0 auto 2.5rem;
    border: 3px solid var(--line);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 1s infinite linear;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.title {
    font-size: 1.85rem;
    margin-bottom: 2rem;
    color: var(--ink);
    letter-spacing: -0.01em;
}

.triviaWrapper {
    height: 4.5rem;
    /* Reserve space for 2 lines of text */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
}

.triviaText {
    font-family: var(--font-sans);
    font-size: 1.15rem;
    color: var(--muted);
    line-height: 1.6;
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.progressIndicator {
    margin-bottom: 3rem;
}

.dots {
    display: inline-flex;
    gap: 8px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--line);
    transition: background-color 0.3s ease;
}

.dotActive {
    background-color: var(--accent);
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

**크기**: 9.09 KB | **확장자**: css

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
    max-width: 860px;
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
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
}

.contentCard {
    background: #fdfcf8 !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06) !important;
    padding: 56px !important;
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #1c1c1c;
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
        background: #fff;
        padding: 0;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .actionButtons,
    .shareActions {
        display: none !important;
    }

    .mainLayout {
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }

    .reportContent {
        max-width: 100%;
        padding: 0;
    }

    .pageSection {
        page-break-inside: avoid;
        page-break-after: auto;
        margin-bottom: 2rem;
    }

    .contentCard {
        box-shadow: none;
        border: 1px solid #ddd;
    }

    .visualBox {
        page-break-inside: avoid;
        max-width: 100%;
        overflow: hidden;
    }

    .disclaimerSection {
        page-break-before: always;
        margin-top: 2rem;
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
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(198, 40, 40, 0.2);
    letter-spacing: -0.01em;
}

@media print {
    .sectionBlock {
        page-break-inside: avoid;
        margin: 24px 0;
    }

    .blockTitle {
        page-break-after: avoid;
    }
}
```

---

## File 17: `src/pages/Start.module.css` {#file-17}

**크기**: 3.15 KB | **확장자**: css

```css
.startPage {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.container {
    padding-top: 3rem;
    max-width: 600px;
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
    padding: 2.5rem;
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
    padding: 0.85rem 1rem;
    background-color: var(--card);
    border: 1px solid var(--line);
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--ink);
    border-radius: 4px;
    transition: border-color 0.2s;
}

.input:focus {
    outline: none;
    border-color: var(--muted);
}

.inputError {
    border-color: var(--accent);
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


```

---

## 📄 scripts/generate-full-codebase-docs.cjs

```javascript
/**
 * 프로젝트 전체 코드를 와이어프레임 구조의 MD 파일로 생성
 * 모든 파일과 코드를 10개의 MD 파일로 분할하여 저장
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'codebase_docs');

// 제외할 디렉토리 및 파일
const EXCLUDE_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.vscode',
  '.idea',
  'codebase_docs',
  'lib' // functions/lib는 빌드 결과물이므로 제외
];

const EXCLUDE_FILES = [
  '.DS_Store',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.gitignore',
  '.env',
  '.env.local'
];

// 바이너리 파일 확장자
const BINARY_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp',
  '.woff', '.woff2', '.ttf', '.eot',
  '.pdf', '.zip', '.tar', '.gz',
  '.mp3', '.mp4', '.avi', '.mov'
];

/**
 * 파일이 바이너리인지 확인
 */
function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

/**
 * 디렉토리를 재귀적으로 순회하여 모든 파일 목록 가져오기
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.relative(ROOT_DIR, fullPath);

    // 제외 대상 확인
    if (EXCLUDE_DIRS.some(dir => relativePath.split(path.sep).includes(dir))) {
      return;
    }

    if (EXCLUDE_FILES.includes(file)) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * 파일 내용을 읽고 마크다운 형식으로 변환
 */
function fileToMarkdown(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const ext = path.extname(filePath);
  
  let content = `\n## 📄 ${relativePath}\n\n`;
  
  if (isBinaryFile(filePath)) {
    content += `*[Binary file - ${ext} format]*\n\n`;
    content += `---\n`;
    return content;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const language = getLanguageFromExtension(ext);
    
    content += `\`\`\`${language}\n`;
    content += fileContent;
    content += `\n\`\`\`\n\n`;
    content += `---\n`;
  } catch (error) {
    content += `*[Error reading file: ${error.message}]*\n\n`;
    content += `---\n`;
  }

  return content;
}

/**
 * 파일 확장자로부터 언어 추론
 */
function getLanguageFromExtension(ext) {
  const languageMap = {
    '.js': 'javascript',
    '.cjs': 'javascript',
    '.mjs': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.cts': 'typescript',
    '.jsx': 'jsx',
    '.json': 'json',
    '.css': 'css',
    '.html': 'html',
    '.md': 'markdown',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.sh': 'bash',
    '.ps1': 'powershell',
    '.py': 'python',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.go': 'go',
    '.rs': 'rust',
    '.rb': 'ruby',
    '.php': 'php',
    '.sql': 'sql',
    '.xml': 'xml',
    '.toml': 'toml',
    '.ini': 'ini'
  };

  return languageMap[ext.toLowerCase()] || 'text';
}

/**
 * 디렉토리 구조를 트리 형태로 생성
 */
function generateDirectoryTree(files) {
  const tree = {};

  files.forEach((file) => {
    const relativePath = path.relative(ROOT_DIR, file);
    const parts = relativePath.split(path.sep);
    
    let current = tree;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // 파일
        if (!current._files) current._files = [];
        current._files.push(part);
      } else {
        // 디렉토리
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    });
  });

  return tree;
}

/**
 * 트리를 마크다운 형식으로 변환
 */
function treeToMarkdown(tree, indent = '') {
  let output = '';

  Object.keys(tree).sort().forEach((key) => {
    if (key === '_files') {
      tree[key].sort().forEach((file) => {
        output += `${indent}├── ${file}\n`;
      });
    } else {
      output += `${indent}├── ${key}/\n`;
      output += treeToMarkdown(tree[key], indent + '│   ');
    }
  });

  return output;
}

/**
 * 파일들을 크기 기준으로 10개 그룹으로 분할
 */
function splitFilesIntoGroups(files, numGroups = 10) {
  // 각 파일의 크기 계산
  const filesWithSize = files.map((file) => {
    try {
      const stats = fs.statSync(file);
      return { path: file, size: stats.size };
    } catch (error) {
      return { path: file, size: 0 };
    }
  });

  // 크기순으로 정렬 (큰 것부터)
  filesWithSize.sort((a, b) => b.size - a.size);

  // 각 그룹의 현재 크기를 추적
  const groups = Array.from({ length: numGroups }, () => ({
    files: [],
    totalSize: 0
  }));

  // 그리디 알고리즘: 각 파일을 현재 가장 작은 그룹에 추가
  filesWithSize.forEach((file) => {
    // 가장 작은 그룹 찾기
    let minGroup = groups[0];
    let minIndex = 0;
    
    groups.forEach((group, index) => {
      if (group.totalSize < minGroup.totalSize) {
        minGroup = group;
        minIndex = index;
      }
    });

    // 해당 그룹에 파일 추가
    minGroup.files.push(file.path);
    minGroup.totalSize += file.size;
  });

  return groups.map(group => group.files);
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🚀 프로젝트 전체 코드 문서화 시작...\n');

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 모든 파일 가져오기
  console.log('📁 파일 스캔 중...');
  const allFiles = getAllFiles(ROOT_DIR);
  console.log(`✅ 총 ${allFiles.length}개의 파일 발견\n`);

  // 디렉토리 구조 생성
  console.log('🌳 디렉토리 구조 생성 중...');
  const tree = generateDirectoryTree(allFiles);
  const treeMarkdown = treeToMarkdown(tree);

  // 인덱스 파일 생성
  let indexContent = `# 📦 프로젝트 전체 코드베이스 문서\n\n`;
  indexContent += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;
  indexContent += `## 📊 프로젝트 개요\n\n`;
  indexContent += `- **총 파일 수**: ${allFiles.length}개\n`;
  indexContent += `- **문서 분할**: 10개 파트\n`;
  indexContent += `- **프로젝트 루트**: \`${ROOT_DIR}\`\n\n`;
  
  indexContent += `## 📑 문서 목록\n\n`;
  for (let i = 1; i <= 10; i++) {
    indexContent += `- [Part ${i}](./codebase_part_${String(i).padStart(2, '0')}.md)\n`;
  }
  
  indexContent += `\n## 🌳 전체 디렉토리 구조\n\n`;
  indexContent += `\`\`\`\n`;
  indexContent += `${path.basename(ROOT_DIR)}/\n`;
  indexContent += treeMarkdown;
  indexContent += `\`\`\`\n\n`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), indexContent, 'utf-8');
  console.log('✅ 인덱스 파일 생성 완료\n');

  // 파일들을 10개 그룹으로 분할
  console.log('📦 파일 그룹화 중...');
  const fileGroups = splitFilesIntoGroups(allFiles, 10);

  // 각 그룹별로 MD 파일 생성
  fileGroups.forEach((group, index) => {
    const partNumber = index + 1;
    const fileName = `codebase_part_${String(partNumber).padStart(2, '0')}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    console.log(`\n📝 Part ${partNumber} 생성 중... (${group.length}개 파일)`);

    let content = `# 📦 프로젝트 코드베이스 - Part ${partNumber}/10\n\n`;
    content += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;
    content += `[← 인덱스로 돌아가기](./INDEX.md)\n\n`;
    content += `## 📋 이 파트의 파일 목록\n\n`;
    
    group.forEach((file) => {
      const relativePath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
      content += `- \`${relativePath}\`\n`;
    });

    content += `\n---\n`;
    content += `\n## 📄 파일 내용\n`;

    // 각 파일의 내용 추가
    group.forEach((file, fileIndex) => {
      const progress = Math.round(((fileIndex + 1) / group.length) * 100);
      process.stdout.write(`\r   진행률: ${progress}% (${fileIndex + 1}/${group.length})`);
      
      content += fileToMarkdown(file);
    });

    content += `\n---\n\n`;
    content += `**Part ${partNumber}/10 완료**\n\n`;
    content += `[← 인덱스로 돌아가기](./INDEX.md) | `;
    
    if (partNumber > 1) {
      content += `[← Part ${partNumber - 1}](./codebase_part_${String(partNumber - 1).padStart(2, '0')}.md) | `;
    }
    if (partNumber < 10) {
      content += `[Part ${partNumber + 1} →](./codebase_part_${String(partNumber + 1).padStart(2, '0')}.md)`;
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    
    const fileSizeMB = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
    console.log(`\n   ✅ ${fileName} 생성 완료 (${fileSizeMB} MB)`);
  });

  console.log('\n\n🎉 모든 문서 생성 완료!');
  console.log(`📂 출력 위치: ${OUTPUT_DIR}\n`);
  console.log('📖 생성된 파일:');
  console.log('   - INDEX.md (메인 인덱스)');
  for (let i = 1; i <= 10; i++) {
    console.log(`   - codebase_part_${String(i).padStart(2, '0')}.md`);
  }
  console.log('');
}

// 스크립트 실행
try {
  main();
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  console.error(error.stack);
  process.exit(1);
}

```

---

## 📄 scripts/generate-code-docs.cjs

```javascript
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..'); // 스크립트가 scripts 폴더에 있다고 가정
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB per markdown file (approx characters)

// Directories to exclude
const IGNORE_DIRS = [
    'node_modules',
    '.git',
    '.firebase',
    '.github',
    '.gemini',
    'dist',
    'build',
    'coverage',
    'lib', // functions/lib 등 컴파일된 결과물
    'project_docs' // 자기 자신 출력 폴더 제외
];

// Files to include (Allowlist extensions)
const ALLOW_EXTENSIONS = [
    '.ts', '.tsx',
    '.js', '.cjs', '.mjs',
    '.css', '.scss',
    '.html',
    '.json',
    '.md',
    '.rules', // firestore.rules
    '.yaml', '.yml'
];

// Files to explicitly ignore
const IGNORE_FILES = [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store'
];

// --- Helper Functions ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                getFileList(filePath, fileList);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ALLOW_EXTENSIONS.includes(ext) && !IGNORE_FILES.includes(file)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateMarkdown() {
    console.log(`🔍 Scanning directory: ${PROJECT_ROOT}`);
    const allFiles = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${allFiles.length} files to process.`);

    ensureDir(OUTPUT_DIR);

    let partCount = 1;
    let currentContent = `# Project Code Documentation - Part ${partCount}\n\n`;
    let currentSize = 0;

    for (const filePath of allFiles) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

        // Skip files in hidden directories checking relative path segments
        const parts = relativePath.split('/');
        if (parts.some(p => p.startsWith('.') && p !== '.' && p !== '..') && !relativePath.includes('.env')) {
            // .env 등은 포함하고 싶을 수 있으나 보통 .git, .firebase 등은 위에서 걸러짐.
            // 위 IGNORE_DIRS에서 이미 1차 필터링 됨. 추가 필터링 필요 시 여기서.
        }

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1);

            // Markdown code block formatting
            const codeBlock = `\n## File: ${relativePath}\n\n\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;

            if (currentSize + codeBlock.length > MAX_FILE_SIZE) {
                // Save current file
                const outPath = path.join(OUTPUT_DIR, `code_part_${String(partCount).padStart(3, '0')}.md`);
                fs.writeFileSync(outPath, currentContent, 'utf8');
                console.log(`📦 Created: ${path.relative(PROJECT_ROOT, outPath)} (${(currentSize / 1024).toFixed(1)} KB)`);

                // Reset for next file
                partCount++;
                currentContent = `# Project Code Documentation - Part ${partCount}\n\n` + codeBlock;
                currentSize = codeBlock.length;
            } else {
                currentContent += codeBlock;
                currentSize += codeBlock.length;
            }
        } catch (err) {
            console.error(`❌ Error reading file ${relativePath}:`, err.message);
        }
    }

    // Save remaining content
    if (currentSize > 0) {
        const outPath = path.join(OUTPUT_DIR, `code_part_${String(partCount).padStart(3, '0')}.md`);
        fs.writeFileSync(outPath, currentContent, 'utf8');
        console.log(`📦 Created: ${path.relative(PROJECT_ROOT, outPath)} (${(currentSize / 1024).toFixed(1)} KB)`);
    }

    console.log(`\n✅ Documentation generation complete! Check '${OUTPUT_DIR}' directory.`);
}

// --- Execute ---
generateMarkdown();

```

---

## 📄 src/pages/Start.module.css

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

## 📄 src/components/layout/Header.module.css

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

## 📄 firestore-debug.log

```text
Dec 30, 2025 7:10:38 PM com.google.cloud.datastore.emulator.firestore.websocket.WebSocketServer start
INFO: Started WebSocket server on ws://127.0.0.1:9150
API endpoint: http://127.0.0.1:8080
If you are using a library that supports the FIRESTORE_EMULATOR_HOST environment variable, run:

   export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080

If you are running a Firestore in Datastore Mode project, run:

   export DATASTORE_EMULATOR_HOST=127.0.0.1:8080

Note: Support for Datastore Mode is in preview. If you encounter any bugs please file at https://github.com/firebase/firebase-tools/issues.
Dev App Server is now running.

Dec 30, 2025 7:11:02 PM io.gapi.emulators.netty.HttpVersionRoutingHandler channelRead
INFO: Detected HTTP/2 connection.
Dec 30, 2025 7:11:03 PM io.netty.channel.DefaultChannelPipeline onUnhandledInboundException
WARNING: An exceptionCaught() event was fired, and it reached at the tail of the pipeline. It usually means the last handler in the pipeline did not handle the exception.
java.net.SocketException: Connection reset
	at java.base/sun.nio.ch.SocketChannelImpl.throwConnectionReset(SocketChannelImpl.java:401)
	at java.base/sun.nio.ch.SocketChannelImpl.read(SocketChannelImpl.java:434)
	at io.netty.buffer.PooledByteBuf.setBytes(PooledByteBuf.java:255)
	at io.netty.buffer.AbstractByteBuf.writeBytes(AbstractByteBuf.java:1132)
	at io.netty.channel.socket.nio.NioSocketChannel.doReadBytes(NioSocketChannel.java:356)
	at io.netty.channel.nio.AbstractNioByteChannel$NioByteUnsafe.read(AbstractNioByteChannel.java:151)
	at io.netty.channel.nio.NioEventLoop.processSelectedKey(NioEventLoop.java:796)
	at io.netty.channel.nio.NioEventLoop.processSelectedKeysOptimized(NioEventLoop.java:732)
	at io.netty.channel.nio.NioEventLoop.processSelectedKeys(NioEventLoop.java:658)
	at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:562)
	at io.netty.util.concurrent.SingleThreadEventExecutor$4.run(SingleThreadEventExecutor.java:998)
	at io.netty.util.internal.ThreadExecutorMap$2.run(ThreadExecutorMap.java:74)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.base/java.lang.Thread.run(Thread.java:1583)


```

---

## 📄 public/vite.svg

*[Binary file - .svg format]*

---

## 📄 src/components/layout/PaperBackground.module.css

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

## 📄 functions/package.json

```json
{
    "name": "functions",
    "description": "Cloud Functions for Firebase",
    "scripts": {
        "lint": "eslint .",
        "build": "tsc",
        "build:watch": "tsc --watch",
        "serve": "npm run build && firebase emulators:start --only functions",
        "shell": "npm run build && firebase functions:shell",
        "start": "npm run shell",
        "deploy": "firebase deploy --only functions",
        "logs": "firebase functions:log"
    },
    "engines": {
        "node": "20"
    },
    "main": "lib/index.js",
    "dependencies": {
        "firebase-admin": "^12.7.0",
        "firebase-functions": "^6.6.0",
        "kor-lunar": "^1.4.0",
        "openai": "^6.15.0"
    },
    "devDependencies": {
        "typescript": "^5.1.6"
    },
    "private": true
}

```

---

## 📄 eslint.config.js

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

---

## 📄 src/config/tokens.ts

```typescript
/**
 * Genesis Design Tokens
 * 
 * Strict Rule: NO pure #000 or #FFF allowed.
 */

export const colors = {
    bg: "#EBE7E0",
    card: "#FDFCF8",
    ink: "#1C1C1C",
    muted: "#5A5A5A",
    accent: "#D9381E",
    line: "color-mix(in srgb, var(--ink) 12%, transparent)",
} as const;

export const fonts = {
    serif: '"Noto Serif KR", serif',
    sans: '"Noto Sans KR", "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
} as const;

```

---

## 📄 .firebase/hosting.ZGlzdA.cache

```text
vite.svg,1766916245924,699a02e0e68a579f687d364bbbe7633161244f35af068220aee37b1b33dfb3c7
index.html,1767435424640,e5ed97d2f42d7ec10fc2b4491b33b85e3cca11f100dbadd3f2d2d6444fbb35d4
assets/index-BqyZ-vpS.css,1767435424640,9219c0f320380c0ff9129ccfb10f8e329f16d21c6fb7cc62e6ec946edc06155e
assets/index-DlBenzbN.js,1767435424640,df65ef12c94fd8c2a69f482b4f4d058aa97e4d6531fc4a208a19604c19cecbb5

```

---

---

**Part 5/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 4](./codebase_part_04.md) | [Part 6 →](./codebase_part_06.md)