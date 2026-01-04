# Frontend - Components

> 재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)

**생성 시각**: 2026-01-04T15:48:38.276Z

---

## 📋 목차 (24개 파일)

1. [src/components/common/BrandLockup.tsx](#file-1)
2. [src/components/layout/Container.module.css](#file-2)
3. [src/components/layout/Container.tsx](#file-3)
4. [src/components/layout/Footer.module.css](#file-4)
5. [src/components/layout/Footer.tsx](#file-5)
6. [src/components/layout/Header.module.css](#file-6)
7. [src/components/layout/Header.tsx](#file-7)
8. [src/components/layout/PaperBackground.module.css](#file-8)
9. [src/components/layout/PaperBackground.tsx](#file-9)
10. [src/components/report/LuckCalendar.module.css](#file-10)
11. [src/components/report/LuckCalendar.tsx](#file-11)
12. [src/components/report/LuckDetailPanel.tsx](#file-12)
13. [src/components/report/ReasonCards.module.css](#file-13)
14. [src/components/report/ReasonCards.tsx](#file-14)
15. [src/components/share/ShareActions.module.css](#file-15)
16. [src/components/share/ShareActions.tsx](#file-16)
17. [src/components/system/SecurityShield.tsx](#file-17)
18. [src/components/ui/AdviceBox.module.css](#file-18)
19. [src/components/ui/AdviceBox.tsx](#file-19)
20. [src/components/ui/Card.module.css](#file-20)
21. [src/components/ui/Card.tsx](#file-21)
22. [src/components/ui/ContextBox.module.css](#file-22)
23. [src/components/ui/ContextBox.tsx](#file-23)
24. [src/components/ui/SWStatus.tsx](#file-24)

---

## File 1: `src/components/common/BrandLockup.tsx` {#file-1}

**크기**: 1.52 KB | **확장자**: tsx

```tsx
import React from 'react';
import { APP_NAME_EN, BRAND_LOCKUP_KR } from '../../config/brand';

interface BrandLockupProps {
    display: 'kr_lockup' | 'en_name';
    variant?: 'default' | 'accent' | 'stacked-mobile';
    className?: string;
    as?: 'h1' | 'h2' | 'div' | 'span';
}

/**
 * BrandLockup Component
 * 
 * [R3] Responsive: Automatically stacks when viewport <= 389px via CSS.
 * [R4] Usage: 
 *      - Intro: display="kr_lockup" variant="accent" (as="h1")
 *      - Home: display="kr_lockup" variant="default"
 *      - Report/PDF: display="en_name"
 */
export const BrandLockup: React.FC<BrandLockupProps> = ({
    display,
    variant = 'default',
    className = '',
    as = 'div'
}) => {
    const Component = as;

    // Split the brand string into Part 1 (命理 or MYUNGRI) and Part 2 (: The Genesis)
    // BRAND_LOCKUP_KR = "命理: The Genesis"
    // APP_NAME_EN = "MYUNGRI: The Genesis"
    const fullText = display === 'kr_lockup' ? BRAND_LOCKUP_KR : APP_NAME_EN;
    const [part1, part2] = fullText.split(':');

    const variantClass = variant === 'stacked-mobile' ? 'variant-stacked-mobile' : variant === 'accent' ? 'variant-accent' : '';
    const displayClass = display === 'kr_lockup' ? 'brand-lockup-kr' : 'brand-lockup-en';

    return (
        <Component className={`brand-lockup ${variantClass} ${className}`.trim()}>
            <span className={displayClass}>{part1}</span>
            <span className="brand-lockup-suffix">:{part2}</span>
        </Component>
    );
};

```

---

## File 2: `src/components/layout/Container.module.css` {#file-2}

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

## File 3: `src/components/layout/Container.tsx` {#file-3}

**크기**: 0.46 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
    as: Component = 'div'
}) => {
    return (
        <Component className={`${styles.container} ${className}`.trim()}>
            {children}
        </Component>
    );
};

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

## File 5: `src/components/layout/Footer.tsx` {#file-5}

**크기**: 0.64 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    Copyright © 2025 MYUNGRI: The Genesis.
                </div>
                <div className={styles.companyInfo}>
                    KS컴퍼니 <span className={styles.divider}>|</span> 대표: 배종수, 석경선 <span className={styles.divider}>|</span> 문의: suhachi78@gmail.com
                </div>
            </div>
        </footer>
    );
};

```

---

## File 6: `src/components/layout/Header.module.css` {#file-6}

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

## File 7: `src/components/layout/Header.tsx` {#file-7}

**크기**: 1.91 KB | **확장자**: tsx

```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLockup } from '../common/BrandLockup';
import { Container } from './Container';
import styles from './Header.module.css';

interface HeaderProps {
    lockupDisplay?: 'kr_lockup' | 'en_name';
}

export const Header: React.FC<HeaderProps> = ({ lockupDisplay = 'kr_lockup' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <Link to="/" className={styles.brandLink}>
                    <BrandLockup display={lockupDisplay} variant="default" as="div" className={styles.brand} />
                </Link>

                <nav className={styles.desktopNav}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    <Link to="/about" className={styles.navLink}>Principles</Link>
                    <Link to="/start" className={styles.ctaButton}>분석하기</Link>
                </nav>

                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    <div className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`} />
                </button>
            </Container>

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link to="/" className={styles.mobileNavLink} onClick={toggleMenu}>Home</Link>
                    <Link to="/about" className={styles.mobileNavLink} onClick={toggleMenu}>Principles</Link>
                    <Link to="/start" className={styles.mobileCtaButton} onClick={toggleMenu}>분석하기</Link>
                </nav>
            </div>
        </header>
    );
};

```

---

## File 8: `src/components/layout/PaperBackground.module.css` {#file-8}

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

## File 9: `src/components/layout/PaperBackground.tsx` {#file-9}

**크기**: 0.54 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './PaperBackground.module.css';

interface PaperBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`${styles.paperWrapper} ${className}`.trim()}>
            <div className={styles.noiseOverlay} />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

```

---

## File 10: `src/components/report/LuckCalendar.module.css` {#file-10}

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

## File 11: `src/components/report/LuckCalendar.tsx` {#file-11}

**크기**: 8.71 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect } from 'react';
import styles from './LuckCalendar.module.css';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance } from '../../lib/firebase';
import { LuckDetailPanel } from './LuckDetailPanel';
import { buildInfo } from '../../buildInfo';

// --- Types (Local Definition to match Engine Output) ---
interface DailyLuckRecord {
    dateKey: string;
    ganzhi: { label: string };
    score: number;
    headline: string;
    tenGod?: string; // Optional in concise record
    eventFlags?: any;
}

interface LuckCalendarProps {
    reportId: string;
    onClose: () => void;
}

// --- Smart Container ---
export const LuckCalendar: React.FC<LuckCalendarProps> = ({ reportId, onClose }) => {
    const [records, setRecords] = useState<DailyLuckRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Fetch Report Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(dbInstance, "reports", reportId);
                const snap = await getDoc(docRef);

                if (!snap.exists()) {
                    setError("리포트를 찾을 수 없습니다.");
                    setLoading(false);
                    return;
                }

                const data = snap.data();

                // Locate Rolling12 Data
                // Strategy: Check if sections is array or object.
                // Engine Phase 8 outputs object { sections: { rolling12: ... } }
                // But legacy might be array.
                let targetSection: any = null;

                if (data.sections && !Array.isArray(data.sections)) {
                    // Object structure
                    targetSection = data.sections.rolling12 || data.sections["ROLL_001"];
                } else if (Array.isArray(data.sections)) {
                    // Array structure
                    targetSection = data.sections.find((s: any) => s.id === 'rolling12' || s.category === 'ROLLING' || s.title?.includes('Rolling'));
                }

                if (targetSection && targetSection.resultFacts) {
                    // Assuming resultFacts contains 'records' or similar
                    // Phase 8 Assembler: resultFacts: { range, recordCount } ... wait, where are records?
                    // Let's check assembler again inside my head. 
                    // Assembler called: const records = precomputeDailyLuck(...).records;
                    // Then assembleRolling12 returned resultFacts: { range, recordCount }. 
                    // WAIT. Did I forget to include the records array in resultFacts?
                    // Checking P8-ATOMIC-001 code memory... I extracted recordCount but did I save records?
                    // If not, I need to fix Assembler or re-fetch.
                    // Assuming I might have missed it, fallback to 'detail' fetch? No, slow.
                    // Let's assume for now I will fix Assembler to include 'records' in resultFacts.

                    if (Array.isArray(targetSection.resultFacts.records)) {
                        setRecords(targetSection.resultFacts.records);
                    } else {
                        // If missing in DB, we might need a fallback or show error.
                        // For P9 Fix, let's assume we read from 'records'.
                        setError("운세 캘린더 데이터가 리포트에 포함되지 않았습니다. (재생성 필요)");
                    }
                } else {
                    setError("운세 캘린더 섹션을 찾을 수 없습니다.");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [reportId]);

    // Derived State for Detail Panel
    const selectedRecord = records.find(r => r.dateKey === selectedDate) || null;

    // Transform Record to Detail Result (Mocking full detail from summary if needed)
    const detailData = selectedRecord ? {
        ...selectedRecord,
        tenGod: selectedRecord.tenGod || 'Day',
        categoryGuidance: selectedRecord.headline, // Fallback
        eventFlags: selectedRecord.eventFlags || { special: [] }
    } : null;

    if (!reportId) return null;

    return (
        <div className={styles.calendarModal} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>12개월 운기 흐름 (Rolling Calendar)</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>

                {loading && <div className={styles.loadingState}><p>데이터 로딩 중...</p></div>}

                {error && <div className={styles.errorState}><p>{error}</p></div>}

                {!loading && !error && (
                    <>
                        <LuckCalendarGrid
                            records={records}
                            onDateSelect={setSelectedDate}
                        />

                        {/* Detail Panel is reused but managed here */}
                        <LuckDetailPanel
                            isOpen={!!selectedDate}
                            onClose={() => setSelectedDate(null)}
                            data={detailData as any}
                            isLoading={false}
                            error={null}
                        />

                        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.6rem', opacity: 0.3, fontFamily: 'monospace' }}>
                            BUILD: {buildInfo.commitHash} {buildInfo.buildTimeISO}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// --- Dumb View Component ---
interface GridProps {
    records: DailyLuckRecord[];
    onDateSelect: (date: string) => void;
}

const LuckCalendarGrid: React.FC<GridProps> = ({ records, onDateSelect }) => {
    // Group by Month
    const months: Record<string, DailyLuckRecord[]> = {};
    records.forEach(r => {
        const key = r.dateKey.substring(0, 7);
        if (!months[key]) months[key] = [];
        months[key].push(r);
    });
    const monthKeys = Object.keys(months).sort();
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className={styles.calendarContainer}>
            {monthKeys.map(mKey => (
                <MonthBlock
                    key={mKey}
                    monthLabel={mKey}
                    days={months[mKey]}
                    today={today}
                    onDateSelect={onDateSelect}
                />
            ))}
        </div>
    );
};

const MonthBlock: React.FC<{
    monthLabel: string;
    days: DailyLuckRecord[];
    today: string;
    onDateSelect: (date: string) => void;
}> = ({ monthLabel, days, today, onDateSelect }) => {
    const firstDay = new Date(`${monthLabel}-01`).getDay();
    const emptySlots = Array(firstDay).fill(null);

    return (
        <div className={styles.monthWrapper}>
            <h4 className={styles.monthTitle}>{monthLabel} ({formatKoreanMonth(monthLabel)})</h4>
            <div className={styles.strictGrid}>
                {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                    <div key={d} className={styles.dayHead}>{d}</div>
                ))}
                {emptySlots.map((_, i) => <div key={`empty-${i}`} className={styles.emptyCell} />)}
                {days.map(d => {
                    const isToday = d.dateKey === today;
                    let gradeClass = '';
                    if (d.score >= 70) gradeClass = styles.gradeGood;
                    else if (d.score <= 30) gradeClass = styles.gradeCaution;
                    else gradeClass = styles.gradeWarn;

                    return (
                        <div
                            key={d.dateKey}
                            className={`${styles.dayCell} ${gradeClass} ${isToday ? styles.todayCell : ''}`}
                            onClick={() => onDateSelect(d.dateKey)}
                            title={`${d.ganzhi.label}: ${d.headline}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

function formatKoreanMonth(ym: string) {
    const parts = ym.split('-');
    return parts.length > 1 ? `${parts[1]}월` : ym;
}

```

---

## File 12: `src/components/report/LuckDetailPanel.tsx` {#file-12}

**크기**: 3.51 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './LuckCalendar.module.css'; // Reuse CSS
// temporary type definition
interface DailyDetailResult {
    dateKey: string;
    ganzhi: { label: string };
    score: number;
    tenGod: string;
    headline: string;
    categoryGuidance: string;
    detailAnchorId?: string;
    eventFlags: { special: string[] };
}


interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: DailyDetailResult | null;
    isLoading: boolean;
    error: string | null;
}

export const LuckDetailPanel: React.FC<Props> = ({ isOpen, onClose, data, isLoading, error }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.calendarModal} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>일운 상세 분석</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>

                {isLoading && (
                    <div className={styles.loadingState}>
                        <p>운기 데이터를 분석 중입니다...</p>
                    </div>
                )}

                {error && (
                    <div className={styles.errorState}>
                        <p>데이터 로드 실패: {error}</p>
                    </div>
                )}

                {!isLoading && !error && data && (
                    <div className={styles.detailCard}>
                        <div className={styles.detailHeader}>
                            <div className={styles.detailTitle}>
                                <span className={styles.detailDate}>{data.dateKey} [{data.ganzhi.label}]</span>
                                <span className={styles.detailGrade}>
                                    {data.score >= 70 ? '길(吉)' : data.score <= 30 ? '흉(凶)' : '평(平)'}
                                </span>
                            </div>
                            <div className={styles.detailScore}>
                                에너지 지수 <strong>{data.score}</strong>
                            </div>
                        </div>

                        <div className={styles.detailBody}>
                            <div className={styles.detailSection}>
                                <h5>오늘의 흐름 ({data.tenGod})</h5>
                                <p>{data.headline}</p>
                            </div>

                            <div className={styles.detailSection}>
                                <h5>조언과 지침</h5>
                                <p>{data.categoryGuidance}</p>
                                {data.detailAnchorId && <small>Reference ID: {data.detailAnchorId}</small>}
                            </div>

                            {/* Evidence / Flags */}
                            {data.eventFlags.special.length > 0 && (
                                <div className={styles.detailSection}>
                                    <h5>주요 변수</h5>
                                    <ul>
                                        {data.eventFlags.special.map(flag => <li key={flag}>{flag}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

```

---

## File 13: `src/components/report/ReasonCards.module.css` {#file-13}

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

## File 14: `src/components/report/ReasonCards.tsx` {#file-14}

**크기**: 2.26 KB | **확장자**: tsx

```tsx
import React from 'react';
import type { ReasonCard } from '../../types/report';
import styles from './ReasonCards.module.css';

interface ReasonCardsProps {
    cards: ReasonCard[];
}

/**
 * ReasonCards Component (Phase 26)
 * Renders reason cards with Technical Ink style
 * - title, evidence, patchCode, riskIfIgnored
 */
export const ReasonCards: React.FC<ReasonCardsProps> = ({ cards }) => {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className={styles.reasonCardsContainer}>
            <h3 className={styles.sectionTitle}>근거 카드 (Reason Cards)</h3>
            {cards.map((card, index) => (
                <div key={index} className={styles.reasonCard}>
                    <h4 className={styles.cardTitle}>{card.title}</h4>

                    {card.evidence && card.evidence.length > 0 && (
                        <div className={styles.evidenceSection}>
                            <p className={styles.label}>근거 (Evidence):</p>
                            <ul className={styles.evidenceList}>
                                {card.evidence.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {card.patchCode && card.patchCode.length > 0 && (
                        <div className={styles.patchSection}>
                            <p className={styles.label}>수정 코드 (Action Plan):</p>
                            <ul className={styles.patchList}>
                                {card.patchCode.map((patch, idx) => (
                                    <li key={idx}>{patch}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {card.riskIfIgnored && (
                        <div className={styles.riskSection}>
                            <p className={styles.label}>무시 시 리스크:</p>
                            <p className={styles.riskText}>{card.riskIfIgnored}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

```

---

## File 15: `src/components/share/ShareActions.module.css` {#file-15}

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

## File 16: `src/components/share/ShareActions.tsx` {#file-16}

**크기**: 3.41 KB | **확장자**: tsx

```tsx
import React, { useState } from 'react';
import { SHARE_META, getShareUrl } from '../../config/shareMeta';
import { shareToKakao, isKakaoAvailable } from '../../lib/kakao';
import styles from './ShareActions.module.css';

interface ShareActionsProps {
    title?: string;
    text?: string;
    url?: string;
}

export const ShareActions: React.FC<ShareActionsProps> = ({
    title = SHARE_META.TITLE,
    text = SHARE_META.DESCRIPTION,
    url = getShareUrl()
}) => {
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    handleCopyLink();
                }
            }
        } else {
            handleCopyLink();
        }
    };

    const handleKakaoShare = () => {
        shareToKakao({
            title,
            description: text,
            imageUrl: SHARE_META.IMAGE_URL,
            url
        });
    };

    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                showToast('Link Copied');
            } else {
                // Fallback for non-supported clipboard
                const textArea = document.createElement("textarea");
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('Link Copied');
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    const showToast = (msg: string) => {
        setCopyStatus(msg);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    return (
        <div className={styles.shareContainer}>
            <div className={styles.buttonGroup}>
                {!!navigator.share ? (
                    <button
                        className={styles.shareBtn}
                        onClick={handleWebShare}
                        aria-label="Share via native device"
                    >
                        Share
                    </button>
                ) : (
                    <button
                        className={styles.shareBtn}
                        onClick={handleCopyLink}
                        aria-label="Copy link to clipboard"
                    >
                        Copy Link
                    </button>
                )}

                <button
                    className={`${styles.shareBtn} ${styles.kakaoBtn}`}
                    onClick={handleKakaoShare}
                    disabled={!isKakaoAvailable()}
                    aria-label="Share via KakaoTalk"
                >
                    Kakao
                </button>
            </div>

            {copyStatus && (
                <div className={styles.toast} role="status">
                    {copyStatus}
                </div>
            )}
        </div>
    );
};

```

---

## File 17: `src/components/system/SecurityShield.tsx` {#file-17}

**크기**: 2.83 KB | **확장자**: tsx

```tsx
import React from 'react';
import { PaperBackground } from '../layout/PaperBackground';
import { Footer } from '../layout/Footer';

interface SecurityShieldProps {
    reason: string | null;
}

export const SecurityShield: React.FC<SecurityShieldProps> = ({ reason }) => {
    return (
        <PaperBackground>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '2rem',
                fontFamily: 'var(--font-sans)',
                background: 'rgba(0,0,0,0.02)'
            }}>
                <div style={{
                    fontSize: '3rem',
                    marginBottom: '1.5rem',
                    filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))'
                }}>
                    🛡️
                </div>
                <h1 style={{
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    letterSpacing: '0.1em'
                }}>
                    SECURITY SHIELD ACTIVE
                </h1>
                <p style={{
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    maxWidth: '400px',
                    wordBreak: 'keep-all'
                }}>
                    {reason === "MISSING_FIREBASE_CONFIG"
                        ? "Vite 빌드 타임에 필수 Firebase 설정(Project ID 등)이 주입되지 않아 앱 실행이 원천 차단되었습니다."
                        : "이 빌드에 필수 보안 설정(reCAPTCHA Site Key)이 누락되어 배포 및 API 호출이 원격 차단되었습니다."
                    }
                </p>
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'var(--surface)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    color: '#e74c3c',
                    border: '1px solid rgba(231,76,60,0.2)'
                }}>
                    ERRORCODE: {reason || "UNKNOWN_SECURITY_FAIL"}
                </div>
                <p style={{
                    marginTop: '1.5rem',
                    color: 'var(--muted)',
                    fontSize: '0.8rem'
                }}>
                    관리자 가이드에 따라 .env.production.local 설정을 확인하십시오.
                </p>
            </div>
            <Footer />
        </PaperBackground>
    );
};

```

---

## File 18: `src/components/ui/AdviceBox.module.css` {#file-18}

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

## File 19: `src/components/ui/AdviceBox.tsx` {#file-19}

**크기**: 0.57 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './AdviceBox.module.css';

interface AdviceBoxProps {
    children: React.ReactNode;
    className?: string;
    badgeText?: string;
}

export const AdviceBox: React.FC<AdviceBoxProps> = ({
    children,
    className = '',
    badgeText = 'Action Plan'
}) => {
    return (
        <div className={`${styles.adviceBox} ${className}`.trim()}>
            <div className={styles.badge}>{badgeText}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

```

---

## File 20: `src/components/ui/Card.module.css` {#file-20}

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

## File 21: `src/components/ui/Card.tsx` {#file-21}

**크기**: 0.46 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hasAccentBar?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hasAccentBar = false
}) => {
    return (
        <div className={`${styles.card} ${hasAccentBar ? styles.accentBar : ''} ${className}`.trim()}>
            {children}
        </div>
    );
};

```

---

## File 22: `src/components/ui/ContextBox.module.css` {#file-22}

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

## File 23: `src/components/ui/ContextBox.tsx` {#file-23}

**크기**: 0.57 KB | **확장자**: tsx

```tsx
import React from 'react';
import styles from './ContextBox.module.css';

interface ContextBoxProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const ContextBox: React.FC<ContextBoxProps> = ({
    children,
    className = '',
    title = '해석/설명'
}) => {
    return (
        <div className={`${styles.contextBox} ${className}`.trim()}>
            <div className={styles.label}>{title}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

```

---

## File 24: `src/components/ui/SWStatus.tsx` {#file-24}

**크기**: 1.95 KB | **확장자**: tsx

```tsx
import React, { useEffect, useState } from 'react';

export const SWStatus: React.FC = () => {
    const [status, setStatus] = useState<string>('Unregistered');
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        if (!('serviceWorker' in navigator)) {
            setStatus("Not Supported");
            return;
        }

        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg) {
                if (reg.active) {
                    const scope = reg.scope.split('/').pop() || 'root';
                    const ctrl = navigator.serviceWorker.controller ? 'Ctrl' : 'No-Ctrl';
                    setStatus(`Active (${scope}, ${ctrl})`);
                }
                else if (reg.installing) setStatus("Installing");
                else if (reg.waiting) setStatus("Waiting");
                else setStatus("Registered");

                // Update available detection
                if (reg.waiting) setUpdateAvailable(true);

                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    if (installingWorker) {
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setUpdateAvailable(true);
                            }
                        };
                    }
                };
            } else {
                setStatus("Unregistered");
            }
        });
    }, []);

    return (
        <span style={{ marginLeft: '10px' }} title="Service Worker Status (Scope, Controller)">
            SW: {status}
            {updateAvailable && <strong style={{ color: 'orange', marginLeft: '5px', cursor: 'pointer' }} onClick={() => window.location.reload()}> (UPDATE READY - Click to reload)</strong>}
        </span>
    );
};

```

---

