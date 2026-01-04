# MYUNGRI: The Genesis - Full Design Code Documentation
Generated on: 2025. 12. 30. 오후 9:12:40

> [!NOTE]
> This document contains all CSS, UI Components, Layouts, and Design Tokens.

---

## File: src/App.tsx

```tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import styles from './App.module.css';
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);

  // [Zero Tolerance] Security Fail-Fast: Block app in production if App Check is not ready
  if (import.meta.env.PROD && !isAppCheckReady) {
    return <SecurityShield reason={appCheckError} />;
  }

  return (
    <PaperBackground>
      <Routes>
        <Route path="/" element={
          !showHome ? (
            <main className={styles.introContainer}>
              <BrandLockup
                display="kr_lockup"
                variant="accent"
                as="h1"
                className={styles.heroBrand}
              />
              <button
                className={styles.enterBtn}
                onClick={() => setShowHome(true)}
              >
                시작하기 →
              </button>
            </main>
          ) : (
            <>
              <Header lockupDisplay="kr_lockup" />
              <Home />
            </>
          )
        } />
        <Route path="/start" element={<Start />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:reportId" element={<Report />} />
      </Routes>
      <Footer />
    </PaperBackground>
  );
}

export default App;

```

---

## File: src/components/common/BrandLockup.tsx

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

## File: src/components/layout/Container.module.css

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

## File: src/components/layout/Container.tsx

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

## File: src/components/layout/Footer.module.css

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

## File: src/components/layout/Footer.tsx

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

## File: src/components/layout/Header.module.css

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

## File: src/components/layout/Header.tsx

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

## File: src/components/layout/PaperBackground.module.css

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

## File: src/components/layout/PaperBackground.tsx

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

## File: src/components/share/ShareActions.module.css

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

## File: src/components/share/ShareActions.tsx

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

## File: src/components/system/SecurityShield.tsx

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
                    이 빌드에 필수 보안 설정(reCAPTCHA Site Key)이 누락되어 배포 및 API 호출이 원격 차단되었습니다.
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

## File: src/components/ui/AdviceBox.module.css

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

## File: src/components/ui/AdviceBox.tsx

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

## File: src/components/ui/Card.module.css

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

## File: src/components/ui/Card.tsx

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

## File: src/components/ui/ContextBox.module.css

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

## File: src/components/ui/ContextBox.tsx

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

## File: src/config/brand.ts

```ts
/**
 * MYUNGRI: The Genesis - Brand Naming Constants
 * 
 * [Usage Rules]
 * - APP_NAME_EN: Used for <title>, meta tags, SEO, and technical documentation/reports.
 * - BRAND_LOCKUP_KR: Used ONLY for Intro and Home visible brand headlines.
 */

export const APP_NAME_EN = "MYUNGRI: The Genesis";
export const BRAND_LOCKUP_KR = "命理: The Genesis";

```

---

## File: src/config/reportTemplate.ts

```ts
export interface ReportPage {
    id: number;
    title: string;
    category: string;
    content: string;
    type: 'cover' | 'index' | 'summary' | 'analysis' | 'action' | 'appendix';
}

export const REPORT_SECTIONS: ReportPage[] = [
    { id: 1, title: "분석 엔진 리포트", category: "Cover", content: "당신의 우주적 설계도와 현대적 데이터의 만남", type: 'cover' },
    { id: 2, title: "리포트 목차", category: "Index", content: "32페이지에 걸친 상세 분석 지도", type: 'index' },
    { id: 3, title: "탄생 데이터 요약", category: "Summary", content: "입력된 탄생 정보 및 환경 변수 확인", type: 'summary' },
    { id: 4, title: "원전 근거 (Reason Card 01)", category: "Evidence", content: "고전 문헌에 근거한 본질적 자아 분석", type: 'analysis' },
    { id: 5, title: "오행의 균형 분석", category: "Overview", content: "목(木), 화(火), 토(土), 금(金), 수(水) 분포도", type: 'analysis' },
    { id: 6, title: "십신(十神)의 상호작용", category: "Overview", content: "사회적 관계와 내면적 욕구의 구조", type: 'analysis' },
    { id: 7, title: "신강/신약 측정 결과", category: "Analysis", content: "일간의 힘과 주변 기운의 조화", type: 'analysis' },
    { id: 8, title: "격국(格局) 판정", category: "Analysis", content: "삶의 큰 틀과 사회적 그릇의 정의", type: 'analysis' },
    { id: 9, title: "용신(用神)과 희신(喜神)", category: "Analysis", content: "균형을 맞추는 핵심 기운과 반가운 기운", type: 'analysis' },
    { id: 10, title: "천간(天干) 에너지 분석", category: "Details", content: "드러난 성정과 외부적 기질", type: 'analysis' },
    { id: 11, title: "지지(地支) 잠재력 분석", category: "Details", content: "내면의 에너지와 현실적 기반", type: 'analysis' },
    { id: 12, title: "지장간(地藏干)의 암시", category: "Details", content: "숨겨진 재능과 예상치 못한 기회", type: 'analysis' },
    { id: 13, title: "십이운성(十二運星) 주기", category: "Cycles", content: "에너지의 성쇠와 생애 변곡점", type: 'analysis' },
    { id: 14, title: "대운(大運)의 흐름: 1단계", category: "Cycles", content: "생애 첫 번째 대운의 도전과 성과", type: 'analysis' },
    { id: 15, title: "대운(大運)의 흐름: 2단계", category: "Cycles", content: "청년기 에너지 방향성과 확장성", type: 'analysis' },
    { id: 16, title: "현재 대운 집중 분석", category: "Cycles", content: "현재 당신이 서 있는 인생의 계절", type: 'analysis' },
    { id: 17, title: "세운(歲運) 흐름: 올해의 운", category: "Cycles", content: "현재 연도의 기운적 특징과 활용법", type: 'analysis' },
    { id: 18, title: "월별 흐름 예측: 상반기", category: "Cycles", content: "기운의 변화 리듬과 월별 전략", type: 'analysis' },
    { id: 19, title: "월별 흐름 예측: 하반기", category: "Cycles", content: "안정적 마무리를 위한 기운 조율", type: 'analysis' },
    { id: 20, title: "액션 플랜: 커리어 전략", category: "Action", content: "직업적 성취를 위한 최적의 타이밍", type: 'action' },
    { id: 21, title: "액션 플랜: 재무적 흐름", category: "Action", content: "리스크 관리와 자산 형성의 시기", type: 'action' },
    { id: 22, title: "액션 플랜: 인간관계", category: "Action", content: "귀인의 원조와 조심해야 할 인연", type: 'action' },
    { id: 23, title: "액션 플랜: 조언(Advice Card)", category: "Action", content: "현재 직면한 과제에 대한 명확한 지침", type: 'action' },
    { id: 24, title: "건강 및 심리적 조언", category: "Health", content: "신체적 에너지 보강과 멘탈 관리", type: 'action' },
    { id: 25, title: "공간적 활용: 행운의 방향", category: "Action", content: "주거 및 활동 공간의 에너지 최적화", type: 'action' },
    { id: 26, title: "컬러 및 상징 활용법", category: "Action", content: "일상의 소품으로 기운을 보강하는 방법", type: 'action' },
    { id: 27, title: "원전 근거 (Reason Card 02)", category: "Evidence", content: "심화 분석 데이터 대조 결과", type: 'analysis' },
    { id: 28, title: "심층 분석: 성격의 이면", category: "Deep Dive", content: "타인이 모르는 당신만의 본질", type: 'analysis' },
    { id: 29, title: "미래 전략: 3년 내 핵심 과제", category: "Action", content: "가장 우선순위를 두어야 할 삶의 영역", type: 'action' },
    { id: 30, title: "분석 학술적 Appendix", category: "Appendix", content: "사용된 전문 용어와 분석 기법 해설", type: 'appendix' },
    { id: 31, title: "리포트 요약 및 맺음말", category: "Appendix", content: "변화를 위한 마지막 한마디", type: 'appendix' },
    { id: 32, title: "정밀 분석 보증서", category: "Appendix", content: "데이터 정확성 및 분석 권위 보증", type: 'appendix' },
];

```

---

## File: src/config/shareMeta.ts

```ts
/**
 * Share Metadata Configuration
 * Strict Rules: EN brand only ("MYUNGRI: The Genesis")
 */

const origin = import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin;

export const SHARE_META = {
    TITLE: "MYUNGRI: The Genesis",
    DESCRIPTION: "Modern Heritage & Astro-Data Analysis Report",
    IMAGE_URL: `${origin}/og-placeholder.png`, // 실제 운영 시 절대 경로 OG 이미지 필요
    URL_BASE: origin
};

export const getShareUrl = () => {
    // 리포트는 stateful하므로 직접 공유 대신 시작 페이지(/start) 공유 권장
    return `${SHARE_META.URL_BASE}/start`;
};

```

---

## File: src/config/tokens.ts

```ts
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

## File: src/config/trivia.ts

```ts
export const TRIVIA_LINES = [
    "만세력 알고리즘으로 당신의 탄생 좌표를 정밀 측정 중입니다.",
    "오행의 균형과 기운의 흐름을 초원자 단위로 분석하고 있습니다.",
    "십신(十神)의 상호작용을 통해 성격과 기질을 파악하는 중입니다.",
    "대운과 세운의 교차점을 분석하여 미래의 기회를 탐색합니다.",
    "근거 카드(Reason Card) 엔진이 원전 데이터를 대조하고 있습니다.",
    "역학적 균형을 맞추기 위해 정교한 수치 연산을 수행 중입니다.",
    "하드코딩된 분석 엔진이 좌표를 도출하고 있습니다.",
    "음양의 조화가 당신의 삶에 미치는 영향을 검토하고 있습니다.",
    "정확한 해석을 위해 60갑자의 순환 정보를 재정렬하고 있습니다.",
    "데이터 기반의 명확한 Action Plan을 구성하는 중입니다.",
    "당신의 고유한 기운이 현대적 해석과 만나는 과정입니다.",
    "불필요한 미신을 배제하고 학술적 근거에 집중하여 분석합니다.",
    "사주 원국의 강약을 측정하여 인생의 계절을 파악 중입니다.",
    "Genesis Book Style의 고전적 미학을 리포트에 담고 있습니다."
];

```

---

## File: src/main.tsx

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

## File: src/pages/Home.module.css

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

## File: src/pages/Home.tsx

```tsx
import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { BrandLockup } from '../components/common/BrandLockup';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Container className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <BrandLockup display="kr_lockup" variant="accent" as="h1" className={styles.heroTitle} />
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

## File: src/pages/Processing.module.css

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

## File: src/pages/Processing.tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { TRIVIA_LINES } from '../config/trivia';
import styles from './Processing.module.css';

/**
 * Processing Page
 * 1. 호출: generateReport Callable API 호출
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 생성된 reportId 경로로 이동
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [triviaIndex, setTriviaIndex] = useState(0);
    const [progressStep, setProgressStep] = useState(0);

    // [Hardening] 데이터 없이 직접 접근 시 즉시 차단
    useEffect(() => {
        if (!formData) {
            navigate('/start', { replace: true });
        }
    }, [formData, navigate]);

    // 최소 시각적 대기 시간 (3.5s ~ 5s 랜덤)
    const [visualDuration] = useState(() => Math.floor(Math.random() * 1500) + 3500);

    const nextTrivia = useCallback(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_LINES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextTrivia, 1200);
        return () => clearInterval(interval);
    }, [nextTrivia]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressStep((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // 서버 사이드 리포트 생성 및 이동
    useEffect(() => {
        let isMounted = true;

        const executeGeneration = async () => {
            const startTime = Date.now();

            try {
                // A. 서버 엔진 호출
                const generateReportFunc = httpsCallable(functions, 'generateReport');
                const result = await generateReportFunc(formData);
                const { reportId } = result.data as { reportId: string };

                // B. 최소 시각적 시간 보장
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, visualDuration - elapsedTime);

                if (remainingTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, remainingTime));
                }

                if (isMounted) {
                    navigate(`/report/${reportId}`, { replace: true });
                }
            } catch (error) {
                console.error("Analysis Failed:", error);
                if (isMounted) {
                    navigate('/start', { replace: true });
                }
            }
        };

        if (formData) {
            executeGeneration();
        }

        return () => { isMounted = false; };
    }, [formData, navigate, visualDuration]);

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                <div className={styles.visualizer}>
                    <div className={styles.orbit}>
                        <div className={`${styles.node} ${styles.n1}`}></div>
                        <div className={`${styles.node} ${styles.n2}`}></div>
                        <div className={`${styles.node} ${styles.n3}`}></div>
                    </div>
                </div>

                <div className={styles.messageBox}>
                    <p className={styles.triviaLine}>{TRIVIA_LINES[triviaIndex]}</p>
                    <div className={styles.progressBar}>
                        <span className={styles.progressState}>
                            분석 중{'.'.repeat(progressStep + 1)}
                        </span>
                    </div>
                </div>
            </Container>

            <footer className={styles.footer}>
                <Container>
                    <p className={styles.copyright}>&copy; 2025 MYUNGRI: The Genesis. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};

```

---

## File: src/pages/Report.module.css

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
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 700;
}

.pageTitle {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 리포트 콘텐츠 스타일 */
.reportContent {
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.noticeCard {
    padding: 1.5rem;
    background-color: color-mix(in srgb, var(--accent) 5%, transparent);
    border-left: 4px solid var(--accent);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 0.95rem;
}

.pageSection {
    scroll-margin-top: var(--header-height, 6rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    break-inside: avoid;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
}

.categoryTag {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.pageIdentifier {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    color: var(--muted);
}

.contentCard {
    padding: 4rem;
    min-height: 600px;
}

.sectionTitle {
    font-size: 2.25rem;
    margin-bottom: 2rem;
    line-height: 1.2;
}

.sectionContent {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    color: var(--ink);
    line-height: 1.8;
}

.primitiveBox {
    margin-top: 3rem;
}

.formDataSummary {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: color-mix(in srgb, var(--bg) 20%, transparent);
    border-radius: 4px;
    font-family: var(--font-sans);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Phase 3-C: Real Calculation Visuals */
.pillarsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
    max-width: 600px;
}

.pillarItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.pillarLabel {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.1em;
}

.pillarGanji {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    width: 100%;
}

.pillarGanji .stem {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
}

.pillarGanji .branch {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 900;
    color: var(--muted);
    line-height: 1;
    margin-top: 0.25rem;
}

.forensicDetails {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
    font-family: var(--font-sans);
}

.forensicRow {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--line);
    font-size: 0.9rem;
}

.forensicRow .highlight {
    font-weight: 700;
    color: var(--accent);
}

/* 모바일 전용 요소 */
.mobileNavTrigger {
    display: none;
    position: sticky;
    top: 5rem;
    z-index: 5;
    width: 100%;
    padding: 1rem;
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--ink) 5%, transparent);
}

/* 인쇄 스타일 */
@media print {
    .reportPage {
        background-color: var(--bg) !important;
    }

    .mainLayout {
        display: block !important;
        padding: 0 !important;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .noticeCard {
        display: none !important;
    }

    .reportContent {
        gap: 0 !important;
    }

    .pageSection {
        page-break-after: always !important;
        break-after: page !important;
        padding: 2cm !important;
    }

    .contentCard {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        background: none !important;
    }

    .disclaimerSection {
        page-break-before: auto;
        border-top: 1px solid var(--line) !important;
        padding-top: 1cm !important;
    }
}

/* Disclaimer & Loading Styles */
.loadingState {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    color: var(--ink-dim);
    font-size: var(--font-sm);
}

.disclaimerSection {
    margin-top: calc(var(--space-xl) * 2);
    padding: var(--space-lg);
    border-top: 1px solid var(--line);
    color: var(--ink-dim);
    font-size: var(--font-xs);
    line-height: 1.6;
    text-align: center;
}

.disclaimerEn {
    margin-top: var(--space-xs);
    opacity: 0.7;
    font-style: italic;
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
    .mainLayout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: -100%;
        width: 80%;
        height: 100vh;
        transition: left 0.3s ease;
        border-radius: 0;
        box-shadow: 20px 0 50px color-mix(in srgb, var(--ink) 30%, transparent);
    }

    .sidebarOpen {
        left: 0;
    }

    .closeBtn,
    .mobileNavTrigger {
        display: block;
    }

    .contentCard {
        padding: 2.5rem 1.5rem;
        min-height: auto;
    }

    .sectionTitle {
        font-size: 1.75rem;
    }

    .pillarsGrid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
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
```

---

## File: src/pages/Report.tsx

```tsx
/* eslint-disable @tanstack/query/no-window-matchmedia */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { REPORT_SECTIONS as FALLBACK_SECTIONS } from '../config/reportTemplate';
import { ShareActions } from '../components/share/ShareActions';
import styles from './Report.module.css';

/**
 * Report Page v3.2.1 (Hardened)
 * 1. 데이터 소스: Firestore reports/{reportId} (sections[] 우선)
 * 2. 렌더링: 서버 제공 섹션 기반 동적 리스트 구성
 * 3. INDEX: 렌더링된 섹션에 맞춰 자동 갱신
 */
export const Report: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const navigate = useNavigate();

    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // [D3] Firestore 데이터 Fetch
    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) {
                navigate('/start', { replace: true });
                return;
            }

            try {
                const docRef = doc(db, "reports", reportId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setReportData(docSnap.data());
                } else {
                    console.warn("[S1] Report not found.");
                    navigate('/start', { replace: true });
                }
            } catch (error) {
                console.error("Archive fetch error:", error);
                navigate('/start', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId, navigate]);

    // 접근성 감지 (Reduced Motion)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // [D3] 동적 섹션 구성 (서버 데이터 우선, 없으면 템플릿 Fallback)
    const activeSections = useMemo(() => {
        if (reportData?.sections && Array.isArray(reportData.sections)) {
            return reportData.sections;
        }
        return FALLBACK_SECTIONS;
    }, [reportData]);

    const scrollToSection = useCallback((id: number) => {
        const element = document.getElementById(`page-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            setIsMenuOpen(false);
        }
    }, [prefersReducedMotion]);

    if (loading) {
        return (
            <div className={styles.reportPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingState}>
                    <div className={styles.loadingPulse}>
                        <p>보안 데이터 아카이브를 호출 중입니다...</p>
                    </div>
                </Container>
            </div>
        );
    }

    const inputData = reportData?.input;
    const calc = reportData?.calculation;

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {/* 동적 INDEX 사이드바 */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>INDEX</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {activeSections.map((section: any) => (
                            <button
                                key={section.id}
                                className={styles.navItem}
                                onClick={() => scrollToSection(section.id)}
                            >
                                <span className={styles.pageNum}>{String(section.id).padStart(2, '0')}</span>
                                <span className={styles.pageTitle}>{section.title}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    INDEX
                </button>

                <main className={styles.reportContent}>
                    <ShareActions />

                    {activeSections.map((section: any) => {
                        // [Stability Patch #1] UI Rendering Defense: Section.type 정규화
                        const allowedTypes = ["analysis", "action", "context"];
                        const normalizedType = allowedTypes.includes(section.type) ? section.type : "context";

                        return (
                            <section
                                key={section.id}
                                id={`page-${section.id}`}
                                className={`${styles.pageSection} ${styles[`type-${normalizedType}`]}`}
                            >
                                <div className={styles.pageHeader}>
                                    <span className={styles.categoryTag}>{section.category}</span>
                                    <span className={styles.pageIdentifier}>P. {section.id}</span>
                                </div>

                                <Card className={styles.contentCard}>
                                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                                    <p className={styles.sectionContent}>{section.content}</p>

                                    {normalizedType === 'analysis' && (
                                        <ContextBox className={styles.primitiveBox}>
                                            지정된 알고리즘({reportData?.algorithmVersion || 'v1.0'})에 기반한 패턴 결과입니다.
                                        </ContextBox>
                                    )}

                                    {normalizedType === 'action' && (
                                        <AdviceBox className={styles.primitiveBox}>
                                            사용자의 주도적 의사결정을 지원하기 위한 전략 제안입니다.
                                        </AdviceBox>
                                    )}

                                    {/* [Phase 3-C] Pillars Display in Section 2 or 3 */}
                                    {section.id === 2 && calc?.pillars && (
                                        <div className={styles.pillarsGrid}>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>HOUR</span>
                                                <div className={styles.pillarGanji}>
                                                    <span className={styles.stem}>{calc.pillars.hour?.stem || '?'}</span>
                                                    <span className={styles.branch}>{calc.pillars.hour?.branch || '?'}</span>
                                                </div>
                                            </div>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>DAY</span>
                                                <div className={styles.pillarGanji}>
                                                    <span className={styles.stem}>{calc.pillars.day?.stem || '?'}</span>
                                                    <span className={styles.branch}>{calc.pillars.day?.branch || '?'}</span>
                                                </div>
                                            </div>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>MONTH</span>
                                                {(calc?.pillars?.month?.label === 'UNKNOWN' || !calc?.pillars?.month?.label || calc?.pillars?.month?.stem === '?') ? (
                                                    <div className={styles.pillarUnknown}>
                                                        <span className={styles.unknownLabel}>UNKNOWN</span>
                                                        <span className={styles.unknownHint}>윤달 월주 미제공</span>
                                                    </div>
                                                ) : (
                                                    <div className={styles.pillarGanji}>
                                                        <span className={styles.stem}>{calc.pillars.month.stem}</span>
                                                        <span className={styles.branch}>{calc.pillars.month.branch}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>YEAR</span>
                                                <div className={styles.pillarGanji}>
                                                    <span className={styles.stem}>{calc.pillars.year?.stem || '?'}</span>
                                                    <span className={styles.branch}>{calc.pillars.year?.branch || '?'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {section.id === 3 && inputData && (
                                        <div className={styles.formDataSummary}>
                                            <p><strong>BIRTH:</strong> {inputData.birthDate} {inputData.calendar === 'lunar' ? `(음력${inputData.isLeapMonth ? ' 윤달' : ''})` : '(양력)'}</p>
                                            <p><strong>SEX:</strong> {inputData.sex === 'male' ? '남성' : '여성'}</p>
                                            <p><strong>NORMALIZED:</strong> {calc?.normalization?.solarDate || 'N/A'} (Solar)</p>
                                        </div>
                                    )}

                                    {/* [Phase 3-C] Forensic Time Display in Section 5 */}
                                    {section.id === 5 && calc?.forensicTime && (
                                        <div className={styles.forensicDetails}>
                                            <div className={styles.forensicRow}>
                                                <span>Local Clock</span>
                                                <span>{calc.forensicTime.localTime || 'N/A'}</span>
                                            </div>
                                            <div className={styles.forensicRow}>
                                                <span>EoT + Longitude Offset</span>
                                                <span>{calc.forensicTime.totalOffsetMin ?? '0'}m</span>
                                            </div>
                                            <div className={styles.forensicRow}>
                                                <span>True Solar Time</span>
                                                <span className={styles.highlight}>{calc.forensicTime.trueSolarHHmm || 'N/A'}</span>
                                            </div>
                                            <div className={styles.forensicRow}>
                                                <span>Classification</span>
                                                <span>{calc.forensicTime.classification || '일반'}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Warnings Display */}
                                    {section.id === 12 && calc?.warnings?.length > 0 && (
                                        <div className={styles.primitiveBox}>
                                            <AdviceBox>
                                                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                                    {calc.warnings.map((msg: string, i: number) => (
                                                        <li key={i} style={{ fontSize: '0.9rem' }}>{msg}</li>
                                                    ))}
                                                </ul>
                                            </AdviceBox>
                                        </div>
                                    )}
                                </Card>
                            </section>
                        );
                    })}

                    <footer className={styles.disclaimerSection}>
                        <p>{reportData?.reportMeta?.strategistMeta?.disclaimer || "본 리포트는 통계적 패턴 기반의 제안이며 모든 선택의 책임은 사용자에게 있습니다."}</p>
                        <p className={styles.disclaimerEn}>This report provides data-informed patterns. Final interpretation and decisions remain the user’s responsibility.</p>
                    </footer>
                </main>
            </Container>
        </div>
    );
};

```

---

## File: src/pages/Start.module.css

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

## File: src/pages/Start.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import styles from './Start.module.css';

interface FormData {
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean;
    timezone: 'Asia/Seoul';
}

interface Errors {
    birthDate?: string;
    sex?: string;
    calendar?: string;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        birthDate: '',
        birthTime: '',
        timeUnknown: false,
        sex: '',
        calendar: '',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    });

    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isFormValid =
            formData.birthDate !== '' &&
            formData.sex !== '' &&
            formData.calendar !== '';
        setIsValid(isFormValid);
    }, [formData]);

    const validate = (name?: string) => {
        const newErrors: Errors = { ...errors };

        if (!name || name === 'birthDate') {
            if (!formData.birthDate) newErrors.birthDate = '생년월일을 선택해주세요.';
            else delete newErrors.birthDate;
        }

        if (!name || name === 'sex') {
            if (!formData.sex) newErrors.sex = '성별을 선택해주세요.';
            else delete newErrors.sex;
        }

        if (!name || name === 'calendar') {
            if (!formData.calendar) newErrors.calendar = '달력 종류를 선택해주세요.';
            else delete newErrors.calendar;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSegmentChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            navigate('/processing', { state: formData });
        }
    };

    return (
        <div className={styles.startPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.container}>
                <div className={styles.pageHeader}>
                    <h2 className={styles.title}>데이터 입력</h2>
                    <p className={styles.helperText}>정확한 분석을 위해 당신의 탄생 정보를 입력해주세요. 입력은 최소화되어 있습니다.</p>
                </div>

                <Card className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Birth Date */}
                        <div className={styles.field}>
                            <label htmlFor="birthDate" className={styles.label}>생년월일 (필수)</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${styles.input} ${touched.birthDate && errors.birthDate ? styles.inputError : ''}`}
                                required
                            />
                            {touched.birthDate && errors.birthDate && (
                                <span className={styles.errorMsg}>{errors.birthDate}</span>
                            )}
                        </div>

                        {/* Birth Time */}
                        <div className={styles.field}>
                            <div className={styles.labelRow}>
                                <label htmlFor="birthTime" className={styles.label}>출생 시간 (선택)</label>
                                <div className={styles.toggleWrapper}>
                                    <input
                                        type="checkbox"
                                        id="timeUnknown"
                                        name="timeUnknown"
                                        checked={formData.timeUnknown}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="timeUnknown" className={styles.toggleLabel}>시간 모름</label>
                                </div>
                            </div>
                            <input
                                type="time"
                                id="birthTime"
                                name="birthTime"
                                value={formData.birthTime}
                                onChange={handleChange}
                                disabled={formData.timeUnknown}
                                className={styles.input}
                            />
                        </div>

                        {/* Sex */}
                        <div className={styles.field}>
                            <span className={styles.label}>성별 (필수)</span>
                            <div className={styles.segmentControl}>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.sex === 'male' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('sex', 'male')}
                                >
                                    남
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.sex === 'female' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('sex', 'female')}
                                >
                                    여
                                </button>
                            </div>
                            {touched.sex && errors.sex && (
                                <span className={styles.errorMsg}>{errors.sex}</span>
                            )}
                        </div>

                        {/* Calendar Type */}
                        <div className={styles.field}>
                            <span className={styles.label}>양력 / 음력 (필수)</span>
                            <div className={styles.segmentControl}>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.calendar === 'solar' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('calendar', 'solar')}
                                >
                                    양력
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.calendar === 'lunar' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('calendar', 'lunar')}
                                >
                                    음력
                                </button>
                            </div>
                            {touched.calendar && errors.calendar && (
                                <span className={styles.errorMsg}>{errors.calendar}</span>
                            )}
                        </div>

                        {/* Leap Month (Conditional) */}
                        {formData.calendar === 'lunar' && (
                            <div className={styles.field}>
                                <div className={styles.toggleWrapper}>
                                    <input
                                        type="checkbox"
                                        id="isLeapMonth"
                                        name="isLeapMonth"
                                        checked={formData.isLeapMonth}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="isLeapMonth" className={styles.toggleLabel}>음력 윤달입니다</label>
                                </div>
                            </div>
                        )}

                        {/* Timezone (Read-only) */}
                        <div className={styles.field}>
                            <label className={styles.label}>타임존</label>
                            <input
                                type="text"
                                value={formData.timezone}
                                readOnly
                                className={`${styles.input} ${styles.readOnly}`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={styles.submitBtn}
                        >
                            분석 시작하기 →
                        </button>
                    </form>
                </Card>
            </Container>
        </div>
    );
};

```

---
