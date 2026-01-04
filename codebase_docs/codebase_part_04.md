# 📦 프로젝트 코드베이스 - Part 4/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/frontend-components.md`
- `project_docs_structured/config-root.md`
- `src/pages/Home.tsx`
- `scripts/generate-design-docs.cjs`
- `scripts/ci-gate.cjs`
- `src/components/layout/Header.tsx`
- `src/types/report.ts`
- `src/components/layout/Footer.module.css`
- `src/components/ui/ContextBox.tsx`
- `src/components/layout/Container.tsx`
- `src/main.tsx`

---

## 📄 파일 내용

## 📄 project_docs_structured/frontend-components.md

```markdown
# Frontend - Components

> 재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)

**생성 시각**: 2026-01-03T09:38:11.819Z

---

## 📋 목차 (22개 파일)

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
12. [src/components/report/ReasonCards.module.css](#file-12)
13. [src/components/report/ReasonCards.tsx](#file-13)
14. [src/components/share/ShareActions.module.css](#file-14)
15. [src/components/share/ShareActions.tsx](#file-15)
16. [src/components/system/SecurityShield.tsx](#file-16)
17. [src/components/ui/AdviceBox.module.css](#file-17)
18. [src/components/ui/AdviceBox.tsx](#file-18)
19. [src/components/ui/Card.module.css](#file-19)
20. [src/components/ui/Card.tsx](#file-20)
21. [src/components/ui/ContextBox.module.css](#file-21)
22. [src/components/ui/ContextBox.tsx](#file-22)

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

## File 11: `src/components/report/LuckCalendar.tsx` {#file-11}

**크기**: 10.68 KB | **확장자**: tsx

```tsx
import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../../lib/firebase';
import type { LuckCalendar as LuckCalendarData } from '../../types/report';
import styles from './LuckCalendar.module.css';

interface LuckCalendarProps {
    reportId: string;
    onClose: () => void;
}

/**
 * LuckCalendar Component (Phase 27)
 * Displays 365-day luck calendar with scores, tags, and reason cards
 * CORS fix: Forces asia-northeast3 region via functionsKR
 */
export const LuckCalendar: React.FC<LuckCalendarProps> = ({ reportId, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [calendarData, setCalendarData] = useState<LuckCalendarData | null>(null);
    const [selectedYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Phase 27: Cross-platform Date Parser (ISO String or Firestore Timestamp)
    const parseGeneratedAt = (val: any): string => {
        if (!val) return '-';
        try {
            // ISO String case
            if (typeof val === 'string') return new Date(val).toLocaleString('ko-KR');

            // Firestore Timestamp object case (seconds, _seconds)
            const seconds = val.seconds || val._seconds;
            if (seconds) return new Date(seconds * 1000).toLocaleString('ko-KR');

            const d = new Date(val);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleString('ko-KR');
        } catch (e) {
            return '-';
        }
    };

    const loadCalendar = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log(`[LuckCalendar] Requesting calendar for ReportID: ${reportId}, Year: ${selectedYear}`);
            // Phase 27: Authoritative KR Region Instance (functionsKR)
            const generateLuckCalendar = httpsCallable<
                { reportId: string; year: number },
                LuckCalendarData
            >(functions, 'generateLuckCalendar');

            const result = await generateLuckCalendar({ reportId, year: selectedYear });
            setCalendarData(result.data);

            // Auto-select today if exists
            const todayStr = new Date().toISOString().split('T')[0];
            const todayData = result.data.calendar.find(d => d.date === todayStr);
            if (todayData) setSelectedDay(todayData);

        } catch (err: any) {
            console.error('[LuckCalendar] Failed:', {
                code: err.code,
                message: err.message,
                details: err.details,
                stack: err.stack
            });
            const detailedError = err.details
                ? `${err.message} (${JSON.stringify(err.details)})`
                : err.message || '캘린더 생성 중 알 수 없는 오류가 발생했습니다.';
            setError(`[${err.code || 'INTERNAL'}] ${detailedError}`);
        } finally {
            setLoading(false);
        }
    };

    // Phase 27: Fix dependency array
    React.useEffect(() => {
        loadCalendar();
    }, [reportId, selectedYear]);

    // Render helper for a single month
    const renderMonth = (monthIndex: number) => {
        if (!calendarData) return null;

        // Current month days from 365 days array
        const monthDays = calendarData.calendar.filter(d => {
            const date = new Date(d.date);
            return date.getMonth() === monthIndex;
        });

        if (monthDays.length === 0) return null;

        const firstDay = new Date(monthDays[0].date);
        const startOffset = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

        const monthName = `${monthIndex + 1}월`;

        return (
            <div key={monthIndex} className={styles.monthBox}>
                <h4 className={styles.monthTitle}>{monthName}</h4>
                <div className={styles.daysGrid}>
                    {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                        <div key={d} className={styles.dayHead}>{d}</div>
                    ))}

                    {/* Empty cells for offset */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className={styles.emptyCell} />
                    ))}

                    {/* Day cells */}
                    {monthDays.map(day => {
                        const date = new Date(day.date);
                        const dayNum = date.getDate();
                        const isSelected = selectedDay && selectedDay.date === day.date;
                        const gradeClass =
                            day.grade === "GOOD" ? styles.gradeGood :
                                day.grade === "WARN" ? styles.gradeWarn :
                                    styles.gradeCaution;

                        return (
                            <div
                                key={day.date}
                                className={`${styles.dayCell} ${gradeClass} ${isSelected ? styles.selectedCell : ''}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                <span className={styles.dayNum}>{dayNum}</span>
                                <span className={styles.dayScore}>{day.score}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.loadingState}>
                        <p>운기 캘린더 생성 중...</p>
                        <p className={styles.loadingHint}>최초 생성 시 최대 2분 소요될 수 있습니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.errorState}>
                        <p>오류: {error}</p>
                        <button onClick={onClose} className={styles.closeButton}>닫기</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!calendarData) {
        return null;
    }

    return (
        <div className={styles.calendarModal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{selectedYear}년 운기 캘린더</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>

                <div className={styles.calendarGrid}>
                    {Array.from({ length: 12 }).map((_, i) => renderMonth(i))}
                </div>

                {/* 상세 설명 패널 */}
                <div className={styles.detailPanel}>
                    {selectedDay ? (
                        <div className={styles.detailCard}>
                            <div className={styles.detailHeader}>
                                <div className={styles.detailTitle}>
                                    <span className={styles.detailDate}>{selectedDay.date}</span>
                                    <span className={`${styles.detailGrade} ${selectedDay.grade === "GOOD" ? styles.gradeGood :
                                        selectedDay.grade === "WARN" ? styles.gradeWarn : styles.gradeCaution
                                        }`}>
                                        {selectedDay.grade === "GOOD" ? "최적화" : selectedDay.grade === "WARN" ? "부하 발생" : "충돌 주의"}
                                    </span>
                                </div>
                                <div className={styles.detailScore}>
                                    점수: <strong>{selectedDay.score}</strong>
                                </div>
                            </div>

                            <div className={styles.detailBody}>
                                <div className={styles.detailSection}>
                                    <h5>분석 근거</h5>
                                    {selectedDay.reasons && selectedDay.reasons.length > 0 ? (
                                        <ul>{selectedDay.reasons.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>
                                    ) : <p className={styles.emptyMsg}>설명 데이터가 없습니다(서버 출력 확인 필요)</p>}
                                </div>
                                <div className={styles.detailSection}>
                                    <h5>권장 수칙</h5>
                                    {selectedDay.actionPlan && selectedDay.actionPlan.length > 0 ? (
                                        <ul>{selectedDay.actionPlan.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul>
                                    ) : <p className={styles.emptyMsg}>권장 수칙 데이터가 없습니다</p>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noSelection}>날짜를 클릭하면 상세 분석 리포트가 표시됩니다.</div>
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <div className={styles.legend}>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeGood}`} />
                            <span>최적화 (70+)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeWarn}`} />
                            <span>부하 발생 (40-69)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeCaution}`} />
                            <span>충돌 주의 (0-39)</span>
                        </div>
                    </div>
                    <p className={styles.generatedAt}>
                        생성 시각: {parseGeneratedAt(calendarData.generatedAt)}
                    </p>
                </div>
            </div>
        </div>
    );
};


```

---

## File 12: `src/components/report/ReasonCards.module.css` {#file-12}

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

## File 13: `src/components/report/ReasonCards.tsx` {#file-13}

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

## File 14: `src/components/share/ShareActions.module.css` {#file-14}

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

## File 15: `src/components/share/ShareActions.tsx` {#file-15}

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

## File 16: `src/components/system/SecurityShield.tsx` {#file-16}

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

## File 17: `src/components/ui/AdviceBox.module.css` {#file-17}

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

## File 18: `src/components/ui/AdviceBox.tsx` {#file-18}

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

## File 19: `src/components/ui/Card.module.css` {#file-19}

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

## File 20: `src/components/ui/Card.tsx` {#file-20}

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

## File 21: `src/components/ui/ContextBox.module.css` {#file-21}

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

## File 22: `src/components/ui/ContextBox.tsx` {#file-22}

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


```

---

## 📄 project_docs_structured/config-root.md

```markdown
# Configuration - Root

> 프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)

**생성 시각**: 2026-01-03T09:38:11.861Z

---

## 📋 목차 (11개 파일)

1. [.firebaserc](#file-1)
2. [.gitignore](#file-2)
3. [eslint.config.js](#file-3)
4. [firebase.json](#file-4)
5. [firestore.indexes.json](#file-5)
6. [firestore.rules](#file-6)
7. [package.json](#file-7)
8. [tsconfig.app.json](#file-8)
9. [tsconfig.json](#file-9)
10. [tsconfig.node.json](#file-10)
11. [vite.config.ts](#file-11)

---

## File 1: `.firebaserc` {#file-1}

**크기**: 0.06 KB | **확장자**: txt

```txt
{
  "projects": {
    "default": "myungri-genesis"
  }
}

```

---

## File 2: `.gitignore` {#file-2}

**크기**: 0.29 KB | **확장자**: txt

```txt
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
. e n v . p r o d u c t i o n . l o c a l  
 
```

---

## File 3: `eslint.config.js` {#file-3}

**크기**: 0.60 KB | **확장자**: js

```js
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

## File 4: `firebase.json` {#file-4}

**크기**: 1.17 KB | **확장자**: json

```json
{
    "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
    },
    "functions": [
        {
            "source": "functions",
            "predeploy": [
                "npm --prefix \"$RESOURCE_DIR\" run build"
            ],
            "codebase": "default",
            "ignore": [
                "node_modules",
                ".git",
                "firebase-debug.log",
                "firebase-adminsdk-*.json"
            ]
        }
    ],
    "hosting": {
        "public": "dist",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [
            {
                "source": "**",
                "destination": "/index.html"
            }
        ]
    },
    "emulators": {
        "auth": {
            "port": 9099
        },
        "functions": {
            "port": 5001
        },
        "firestore": {
            "port": 8080
        },
        "hosting": {
            "port": 5000
        },
        "ui": {
            "enabled": true
        },
        "singleProjectMode": true
    }
}
```

---

## File 5: `firestore.indexes.json` {#file-5}

**크기**: 0.05 KB | **확장자**: json

```json
{
    "indexes": [],
    "fieldOverrides": []
}
```

---

## File 6: `firestore.rules` {#file-6}

**크기**: 0.63 KB | **확장자**: rules

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Option B: Strict Security Policy [S1]
    // Reports can only be 'get' by individual ID, but never 'list' or 'write' by client SDK.
    match /reports/{reportId} {
      allow get: if true;         // Allow direct individual lookup
      allow list: if false;       // Deny collection queries (list/query) to prevent mass data scraping
      allow write: if false;      // Deny all client-side writes
    }

    // Default deny for all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

```

---

## File 7: `package.json` {#file-7}

**크기**: 1.06 KB | **확장자**: json

```json
{
  "name": "myungri-the-genesis",
  "author": "KS Company <suhachi78@gmail.com>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/check-env.cjs",
    "build": "tsc -b && vite build",
    "build:functions": "npm --prefix functions run build",
    "build:all": "npm run build && npm run build:functions",
    "deploy": "npm run build:all && firebase deploy",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "firebase": "^12.7.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.11.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@types/react-router-dom": "^5.3.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}
```

---

## File 8: `tsconfig.app.json` {#file-8}

**크기**: 0.71 KB | **확장자**: json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

---

## File 9: `tsconfig.json` {#file-9}

**크기**: 0.12 KB | **확장자**: json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

---

## File 10: `tsconfig.node.json` {#file-10}

**크기**: 0.64 KB | **확장자**: json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

---

## File 11: `vite.config.ts` {#file-11}

**크기**: 0.16 KB | **확장자**: ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---


```

---

## 📄 src/pages/Home.tsx

```tsx
import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Container className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>命理: The Genesis</h1>
                        <p className={styles.heroSubtitle}>
                            현대적 유산과 초원자 단위 데이터 분석의 만남.<br />
                            명리: 제네시스를 통해 당신의 내일과 소통하십시오.
                        </p>
                        <div className={styles.ctaGroup}>
                            <Link to="/start" className={styles.primaryBtn}>내 사주 분석하기 →</Link>
                            <button className={styles.secondaryBtn}>샘플 리포트</button>
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.astrolabeContainer}>
                            <svg className={styles.astrolabeSvg} viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" />
                                <circle cx="50" cy="50" r="30" />
                                <path d="M50 2 L50 98 M2 50 L98 50" />
                                <path d="M15 15 L85 85 M85 15 L15 85" />
                                <circle cx="50" cy="50" r="10" />
                            </svg>
                        </div>
                        <div className={styles.kanjiWatermark}>命</div>
                        <Card className={styles.principleCard} hasAccentBar>
                            <h3 className={styles.cardTitle}>서비스 원칙</h3>
                            <ul className={styles.principleList}>
                                <li>독자 개발된 만세력 정밀 알고리즘</li>
                                <li>Reason Card 기반 근거 중심 해석</li>
                                <li>AI는 문장 리라이팅에만 제한적으로 사용</li>
                            </ul>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Content Section Example */}
            <section className={styles.features}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>초원자 단위 분석 리포트</h2>
                    </div>

                    <div className={styles.featureGrid}>
                        <Card className={styles.featureCard}>
                            <h4>32페이지 이상의 방대한 분석</h4>
                            <p>원전 근거와 현대적 해석을 담은 독보적인 권위의 리포트를 제공합니다.</p>
                            <ContextBox>
                                명리 분석 결과는 단순한 운세가 아닌, 과거의 지혜를 데이터로 재구성한 학술적 결과물입니다.
                            </ContextBox>
                        </Card>

                        <Card className={styles.featureCard}>
                            <h4>명확한 Action Plan</h4>
                            <p>분석 결과를 넘어 당신의 삶에 적용할 수 있는 구체적인 가이드를 제안합니다.</p>
                            <AdviceBox>
                                올해의 기운은 새로운 시작보다 내실을 다지는 것에 적합합니다. 학문적 성취나 전문성 강화에 시간을 투자하십시오.
                            </AdviceBox>
                        </Card>
                    </div>
                </Container>
            </section>
        </div>
    );
};

```

---

## 📄 scripts/generate-design-docs.cjs

```javascript
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'design_code_complete.md');

// Directories to focus on for "Design"
const DESIGN_PATHS = [
    'src/components',
    'src/pages',
    'src/styles',
    'src/config'
];

// Extensions to include
const ALLOW_EXTENSIONS = ['.tsx', '.css', '.module.css', '.ts'];

// Files to explicitly include even if not in DESIGN_PATHS
const SPECIFIC_FILES = [
    'index.html',
    'src/App.tsx',
    'src/main.tsx'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isDesignRelated(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

    // Check if it's in a design-related directory
    const isInDesignDir = DESIGN_PATHS.some(p => relativePath.startsWith(p));

    // Check if it's a specific file
    const isSpecific = SPECIFIC_FILES.includes(relativePath);

    // Check extension
    const ext = path.extname(filePath).toLowerCase();
    const isAllowedExt = ALLOW_EXTENSIONS.includes(ext);

    // Business logic exclusion: exclude calculation engine logic even if in src/config if it's not design
    if (relativePath.includes('engine') || relativePath.includes('functions/src')) {
        return false;
    }

    return (isInDesignDir || isSpecific) && isAllowedExt;
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && !file.startsWith('.')) {
                getFileList(filePath, fileList);
            }
        } else {
            if (isDesignRelated(filePath)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateDesignMarkdown() {
    console.log(`🎨 Gathering design-related code from: ${PROJECT_ROOT}`);
    const files = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${files.length} design-related files.`);

    ensureDir(OUTPUT_DIR);

    let content = `# MYUNGRI: The Genesis - Full Design Code Documentation\n`;
    content += `Generated on: ${new Date().toLocaleString()}\n\n`;
    content += `> [!NOTE]\n`;
    content += `> This document contains all CSS, UI Components, Layouts, and Design Tokens.\n\n---\n`;

    for (const filePath of files) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'text';

            content += `\n## File: ${relativePath}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;
        } catch (err) {
            console.error(`❌ Error reading ${relativePath}:`, err.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`✅ Success! Design documentation created at: ${OUTPUT_FILE}`);
}

generateDesignMarkdown();

```

---

## 📄 scripts/ci-gate.cjs

```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * [Zero Tolerance] CI Release Gate Script
 * 1. Pre-build: 환경 변수 엄격 검증 (check-env.cjs 재사용)
 * 2. Post-build: 빌드 결과물(Bundle) 내 필수 식별자(projectId 등) 존재 확인
 */

function runPreBuildCheck() {
    console.log('🚀 [CI Gate] Step 1: Pre-build Environment Validation...');
    try {
        execSync('node scripts/check-env.cjs', { stdio: 'inherit' });
    } catch (err) {
        console.error('❌ [CI Gate] Pre-build validation failed.');
        process.exit(1);
    }
}

function runPostBuildCheck() {
    console.log('🚀 [CI Gate] Step 2: Post-build Bundle Integrity Check...');
    const distPath = path.resolve(__dirname, '../dist');

    if (!fs.existsSync(distPath)) {
        console.error('❌ [CI Gate] Build directory (dist) not found. Run "npm run build" first.');
        process.exit(1);
    }

    // 번들 파일들 내에서 projectId가 실제로 포함되어 있는지 검색 (Vite define 검증)
    // 실제 projectId 값 대신 플레이스홀더나 빈 자리가 남지 않았는지 확인
    const assetsPath = path.join(distPath, 'assets');
    const files = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));

    let projectIdFound = false;
    for (const file of files) {
        const content = fs.readFileSync(path.join(assetsPath, file), 'utf8');
        // projectId가 실제 빌드될 때 "myungri-genesis"와 같은 문자열로 박혔는지 확인
        // (참고: 빌드 시 환경변수는 문자열 리터럴로 치환됨)
        if (content.includes('myungri-genesis')) {
            projectIdFound = true;
            break;
        }
    }

    if (!projectIdFound) {
        console.error('❌ [CI Gate] INTEGRITY FAIL: "projectId" (myungri-genesis) was not detected in JS bundles.');
        console.error('👉 This indicates a failed Vite environment injection at build time.');
        process.exit(1);
    }

    console.log('✅ [CI Gate] Bundle integrity verified. "projectId" detected.');
}

function main() {
    const isPostBuild = process.argv.includes('--post-build');

    if (isPostBuild) {
        runPostBuildCheck();
    } else {
        runPreBuildCheck();
    }
}

main();

```

---

## 📄 src/components/layout/Header.tsx

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

## 📄 src/types/report.ts

```typescript
// Report Types for Phase 26
export interface ReasonCard {
    title: string;
    evidence: string[];
    patchCode: string[];
    riskIfIgnored: string;
}

export interface Section {
    id: string;
    title: string;
    content?: string; // Legacy support
    category: string;
    type?: string;
    reasonCards?: ReasonCard[];
    // Phase 27: 3단 구조
    result?: string;
    explain?: string;
    interpretation?: string;
}

export interface ReportMeta {
    title: string;
    summary: string;
    fateRuntimeModel?: string; // 命/運 모델 요약
    strategistMeta?: {
        disclaimer?: string;
    };
}

export interface DayEntry {
    date: string; // YYYY-MM-DD
    score: number;
    grade: "GOOD" | "WARN" | "CAUTION";
    dayGanji?: string;
    reasons: string[];
    actionPlan: string[];
    eventFit: {
        contract: string;
        signboard: string;
        launch: string;
    };
}

export interface LuckCalendar {
    year: number;
    generatedAt: string | any; // Supports ISO String or Timestamp object
    calendar: DayEntry[];
}

```

---

## 📄 src/components/layout/Footer.module.css

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

## 📄 src/components/ui/ContextBox.tsx

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

## 📄 src/components/layout/Container.tsx

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

## 📄 src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './lib/firebase'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

```

---

---

**Part 4/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 3](./codebase_part_03.md) | [Part 5 →](./codebase_part_05.md)