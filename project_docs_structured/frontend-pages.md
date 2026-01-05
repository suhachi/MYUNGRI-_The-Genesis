# Frontend - Pages

> 프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)

**생성 시각**: 2026-01-05T10:21:53.937Z

---

## 📋 목차 (10개 파일)

1. [src/pages/Home.module.css](#file-1)
2. [src/pages/Home.tsx](#file-2)
3. [src/pages/Processing.module.css](#file-3)
4. [src/pages/Processing.tsx](#file-4)
5. [src/pages/Report.module.css](#file-5)
6. [src/pages/Report.tsx](#file-6)
7. [src/pages/ReportPrint.tsx](#file-7)
8. [src/pages/Start.module.css](#file-8)
9. [src/pages/Start.test.tsx](#file-9)
10. [src/pages/Start.tsx](#file-10)

---

## File 1: `src/pages/Home.module.css` {#file-1}

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

## File 2: `src/pages/Home.tsx` {#file-2}

**크기**: 4.19 KB | **확장자**: tsx

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

## File 3: `src/pages/Processing.module.css` {#file-3}

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

## File 4: `src/pages/Processing.tsx` {#file-4}

**크기**: 6.46 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import { InputSchema } from '../../contracts/input.schema';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import styles from './Processing.module.css';

/**
 * Processing Page [Phase 27: Zero Silent Redirect]
 * 1. 호출: generateReport Callable API 호출 (functionsKR 강제)
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 성공 시에만 reportId 경로로 이동
 * 4. 에러: 실패 시 상세 에러 패널 노출 (자동 이동 절대 금지)
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [logs, setLogs] = useState<string[]>([]);
    const [error, setError] = useState<{
        code?: string;
        message: string;
        details?: string;
    } | null>(null);

    // 로그 시퀀스 정의
    const LOG_SEQUENCE = [
        { text: "SYSTEM_BOOT_SEQUENCE_INIT...", delay: 0 },
        { text: "PARSING_FOUR_PILLARS_DATA...", delay: 1500 },
        { text: "ACCESSING_GENESIS_ARCHIVE...", delay: 3000 },
        { text: "AUDITING_HUMAN_OS_KERNEL...", delay: 4500 }
    ];

    useEffect(() => {
        LOG_SEQUENCE.forEach((item) => {
            setTimeout(() => {
                setLogs(prev => [...prev, `> ${item.text} `]);
            }, item.delay);
        });
    }, []);

    const executeGeneration = useCallback(async () => {
        if (!formData) return;

        setError(null);
        const startTime = Date.now();

        try {
            // [Layer 0] Contract Validation
            const validation = InputSchema.safeParse(formData);
            if (!validation.success) {
                const issues = validation.error.format();
                const errorKey = Object.keys(issues).find(k => k !== '_errors');
                const firstMsg = errorKey ? (issues as any)[errorKey]._errors[0] : "입력 형식이 올바르지 않습니다.";

                throw {
                    code: "VALIDATION_FAILED",
                    message: firstMsg || "입력 데이터 검증 실패",
                    details: JSON.stringify(issues, null, 2)
                };
            }

            const generateReportFunc = httpsCallable(functions, 'generateReport');
            const result = await generateReportFunc(formData);

            const { reportId } = result.data as any;

            // 최소 시각적 시간 보장 (로그 시퀀스가 4.5s에 시작하므로 최소 6s 대기 권장)
            const elapsedTime = Date.now() - startTime;
            const minTime = 6000;
            const remainingTime = Math.max(0, minTime - elapsedTime);

            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            navigate(`/ report / ${reportId} `, { replace: true });
        } catch (err: any) {
            console.error("[generateReport] Analysis Failed:", err);
            setError({
                code: err.code,
                message: err.message || "알 수 없는 시스템 오류가 발생했습니다.",
                details: err.details ? JSON.stringify(err.details, null, 2) : ""
            });
        }
    }, [formData, navigate]);

    useEffect(() => {
        if (formData) {
            executeGeneration();
        }
    }, [formData, executeGeneration]);

    if (!formData) {
        return (
            <div className={styles.processingPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingContainer}>
                    <Card className={styles.errorCard}>
                        <h2 className={styles.errorTitle}>DATA_NOT_FOUND</h2>
                        <p className={styles.errorText}>입력 정보가 전달되지 않았습니다. 분석 시작 페이지로 돌아가 정보를 다시 입력해주세요.</p>
                        <button className={styles.retryBtn} onClick={() => navigate('/start', { replace: true })}>
                            REBOOT_SYSTEM
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                {!error ? (
                    <div className={styles.terminal}>
                        {logs.map((log, i) => (
                            <div key={i} className={styles.logLine}>
                                {log}
                                {i === logs.length - 1 && <span className={styles.cursor}>_</span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Card className={styles.errorCard}>
                        <div className={styles.errorHeader}>
                            <h2 className={styles.errorTitle}>CRITICAL_SYSTEM_ERROR</h2>
                            {error.code && <span className={styles.errorCode}>ID: {error.code}</span>}
                        </div>
                        <p className={styles.errorText}>{error.message}</p>
                        {error.details && (
                            <div className={styles.detailsBox}>
                                <pre>{error.details}</pre>
                            </div>
                        )}
                        <div className={styles.actionRow}>
                            <button className={styles.retryBtn} onClick={executeGeneration}>RETRY</button>
                            <button className={styles.cancelBtn} onClick={() => navigate('/start')}>EXIT</button>
                        </div>
                    </Card>
                )}
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

## File 5: `src/pages/Report.module.css` {#file-5}

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

## File 6: `src/pages/Report.tsx` {#file-6}

**크기**: 21.36 KB | **확장자**: tsx

```tsx
/* eslint-disable @tantml:query/no-window-matchmedia */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance as db } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { ShareActions } from '../components/share/ShareActions';
import { openPrintWindow } from '../lib/pdf';
import { ReasonCards } from '../components/report/ReasonCards';
import { LuckCalendar } from '../components/report/LuckCalendar';
import { SWStatus } from '../components/ui/SWStatus';
import { buildInfo } from '../buildInfo';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import type { Section } from '../types/report';
import styles from './Report.module.css';

/**
 * Report Page v4.0.0 (Phase 26)
 * 1. 크래시 수정: 완전한 섹션 정규화 + safeSplitId
 * 2. PDF 저장: 인쇄 페이지 오픈 버튼
 * 3. 운기 캘린더: 진입 UI (모달 연동)
 * 4. Reason Cards: 섹션별 근거 카드 렌더링
 */

/**
 * System Audit Report Visual Components
 */
function GenesisCodeVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Genesis Architecture Diagram</p>
            <div className={styles.placeholder}></div>
        </div>
    );
}

function BalanceRadarVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Energy Balance Radar</p>
            <div className={styles.placeholder}></div>
        </div>
    );
}

/**
 * Data Hardening Helpers (Phase 26)
 */
const normalizeSection = (section: any, sectionId: string): Section => {
    if (!section) {
        return {
            id: sectionId,
            title: "정보 없음",
            result: "데이터를 불러올 수 없습니다.",
            explain: "",
            interpretation: "",
            category: "ANALYSIS"
        };
    }

    return {
        id: section.sectionId || sectionId,
        title: section.title || "분석 섹션",
        result: section.result || "",
        explain: section.explain || "",
        interpretation: section.interpretation || "",
        category: section.category || "ANALYSIS",
        reasonCards: section.reasonCards || []
    };
};

const normalizeSections = (input: any, toc?: any[]): Section[] => {
    let rawSections: Section[] = [];

    if (Array.isArray(input)) {
        rawSections = input.map((s, i) => normalizeSection(s, `sec_${i}`));
    }
    else if (input && typeof input === 'object') {
        rawSections = Object.entries(input).map(([key, s]) => normalizeSection(s, key));
    }

    if (!toc || !Array.isArray(toc)) return rawSections;

    // Phase 27: Strict ordering by Table of Contents
    const sectionMap = new Map(rawSections.map(s => [s.id, s]));
    const ordered: Section[] = [];
    const seenIds = new Set<string>();

    toc.forEach((item: any) => {
        const id = typeof item === 'string' ? item : item.id;
        const normalizedId = id?.replace(/[^a-zA-Z0-9_-]/g, '_');
        const section = sectionMap.get(normalizedId);
        if (section) {
            ordered.push(section);
            seenIds.add(normalizedId);
        }
    });

    // Append any sections not in TOC
    rawSections.forEach(s => {
        if (!seenIds.has(s.id)) ordered.push(s);
    });

    return ordered;
};

const safeSplitId = (id: string): string[] => {
    if (typeof id !== 'string') {
        return ['??'];
    }
    if (!id.includes('_')) {
        return [id];
    }
    return id.split('_');
};

const CATEGORY_LABELS: Record<string, string> = {
    SUMMARY: '요약',
    ARCH: '아키텍처',
    SPEC: '명세',
    SYSTEM: '시스템',
    CORE: '코어',
    RESOURCE: '리소스',
    DEBUG: '디버그',
    SECURITY: '보안',
    APP: '애플리케이션',
    STRATEGY: '전략',
    NETWORK: '네트워크',
    STATUS: '상태',
    ROADMAP: '로드맵',
    PATCH: '패치',
    META: '메타'
};

const TIME_UNKNOWN_DISCLAIMER = "※ 태어난 시각을 알 수 없어 '시주(時柱)' 판단을 유보하며, 관련 분석이 배제됩니다. 정확한 시각 입력 시 결과가 달라질 수 있습니다.";

export const Report: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const navigate = useNavigate();

    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const timeUnknown = useMemo(() => {
        return reportData?.input?.timeUnknown ?? reportData?.reportMeta?.timeUnknown ?? false;
    }, [reportData]);

    // Phase 28: Quality Quality check
    const isQualityLow = useMemo(() => {
        if (!reportData?.sections) return false;
        const missingCount = reportData.sections.filter((s: any) =>
            (s.result?.includes('누락') || s.result?.includes('오류') || s.result?.includes('초과')) ||
            (s.explain?.includes('누락') || s.explain?.includes('오류') || s.explain?.includes('초과')) ||
            (s.interpretation?.includes('누락') || s.interpretation?.includes('오류') || s.interpretation?.includes('초과'))
        ).length;
        return missingCount > 6;
    }, [reportData]);

    const handleRegenerate = async () => {
        if (!window.confirm("현재 리포트의 데이터 품질을 높이기 위해 섹션별 정밀 재분석을 시작하시겠습니까? (약 1-2분 소요)")) return;

        setIsRegenerating(true);
        try {
            const generateReport = httpsCallable<any, any>(functions, 'generateReport');
            const result = await generateReport(reportData.input);
            if (result.data.reportId) {
                navigate(`/report/${result.data.reportId}`);
                window.location.reload(); // To ensure clean state
            }
        } catch (err: any) {
            console.error("Regeneration failed:", err);
            alert("리포트 재생성 중 오류가 발생했습니다: " + err.message);
        } finally {
            setIsRegenerating(false);
        }
    };

    // [D3] Firestore 데이터 Fetch (Phase 27: Version Gate)
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
                    const data = docSnap.data();

                    // Phase 27: 버전 게이트 - v6 미만은 구버전으로 표시
                    if (data.schemaVersion !== "report/v6") {
                        setReportData({ ...data, isLegacy: true });
                    } else {
                        setReportData(data);
                    }
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

    const activeSections = useMemo(() => {
        return normalizeSections(reportData?.sections, reportData?.tableOfContents);
    }, [reportData]);

    const disclaimerText = useMemo(() => {
        if (timeUnknown) {
            return reportData?.reportMeta?.mainDisclaimer || reportData?.reportMeta?.strategistMeta?.disclaimer || TIME_UNKNOWN_DISCLAIMER;
        }
        return reportData?.reportMeta?.strategistMeta?.disclaimer;
    }, [reportData, timeUnknown]);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(`page-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            setIsMenuOpen(false);
        }
    }, [prefersReducedMotion]);

    const handlePdfExport = useCallback(() => {
        if (reportId) {
            openPrintWindow(reportId);
        }
    }, [reportId]);

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

    // Phase 27: 구버전 리포트 차단
    if (reportData?.isLegacy) {
        return (
            <div className={styles.reportPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.legacyWarning}>
                    <Card className={styles.legacyCard}>
                        <h2 className={styles.legacyTitle}>⚠️ 구버전 리포트입니다</h2>
                        <p className={styles.legacyText}>
                            이 리포트는 이전 버전(Genesis-V1.2~V5.0)으로 생성되었습니다.
                        </p>
                        <p className={styles.legacyText}>
                            Phase 27 업그레이드가 적용된 최신 리포트를 생성하려면 아래 버튼을 클릭하세요.
                        </p>
                        <ul className={styles.legacyFeatures}>
                            <li>✅ 100% 한글 UI</li>
                            <li>✅ A4 인쇄 30페이지 이상</li>
                            <li>✅ 결과-풀이-해석 3단 구조</li>
                            <li>✅ 365일 운기 캘린더</li>
                            <li>✅ Reason Cards 시스템</li>
                        </ul>
                        <button onClick={() => navigate('/start')} className={styles.regenerateButton}>
                            새로 분석하기
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {(timeUnknown || isQualityLow) && (
                    <div className={styles.qualityBanner}>
                        {timeUnknown && (
                            <p>{disclaimerText || TIME_UNKNOWN_DISCLAIMER}</p>
                        )}
                        {isQualityLow && (
                            <p>여러 섹션에서 누락/오류 신호가 감지되었습니다. 정밀 재분석을 실행해주세요.</p>
                        )}
                    </div>
                )}

                {/* 동적 INDEX 사이드바 */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>감사 목차</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {activeSections.map((section) => {
                            const tokens = safeSplitId(section.id);
                            const pageNum = tokens[0] || '??';

                            return (
                                <button
                                    key={section.id}
                                    className={styles.navItem}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    <span className={styles.pageNum}>{pageNum}</span>
                                    <span className={styles.pageTitle}>{section.title}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    INDEX
                </button>

                <main className={styles.reportContent}>
                    {/* Phase 28: Quality Alert Banner */}
                    {isQualityLow && (
                        <div className={styles.qualityAlert}>
                            <div className={styles.alertIcon}>⚠️</div>
                            <div className={styles.alertContent}>
                                <h3>리포트 품질 정밀화 필요</h3>
                                <p>일부 분석 섹션의 데이터가 충분하지 않습니다. 시스템 감사 알고리즘(Phase 28)을 통해 고밀도 리포트로 재생성할 수 있습니다.</p>
                                <button
                                    className={styles.regenerateBtn}
                                    onClick={handleRegenerate}
                                    disabled={isRegenerating}
                                >
                                    {isRegenerating ? "시스템 정밀 재가동 중..." : "고품질 리포트 재생성"}
                                </button>
                            </div>
                        </div>
                    )}
                    <header className={styles.reportHeader}>
                        <h1 className={styles.mainTitle}>
                            {reportData?.reportMeta?.title || "SYSTEM AUDIT v5.0"}
                        </h1>
                        <p className={styles.mainSummary}>{reportData?.reportMeta?.summary}</p>

                        {/* Phase 26: Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button className={styles.pdfButton} onClick={handlePdfExport}>
                                PDF 저장
                            </button>
                            <button className={styles.calendarButton} onClick={() => setShowCalendar(true)}>
                                운기 캘린더
                            </button>
                        </div>
                    </header>

                    <ShareActions />

                    {activeSections.map((section) => (
                        <section
                            key={section.id}
                            id={`page-${section.id}`}
                            className={styles.pageSection}
                        >
                            <div className={styles.pageHeader}>
                                <span className={styles.categoryTag}>
                                    {CATEGORY_LABELS[section.category] || section.category}
                                </span>
                                <span className={styles.pageIdentifier}>섹션: {section.id}</span>
                            </div>

                            <Card className={styles.contentCard}>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>

                                {section.id === "02_code" && <GenesisCodeVisual />}
                                {section.id === "07_balance" && <BalanceRadarVisual />}

                                {section.id !== "02_code" && section.id !== "07_balance" && (
                                    <>
                                        {/* Phase 27: 3단 구조 렌더링 */}
                                        {section.result && (
                                            <div className={styles.sectionBlock}>
                                                <div className={styles.resultBlock}>
                                                    <div className={styles.textContent}>
                                                        {section.result.split('\n').map((p: string, i: number) => (
                                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {section.explain && (
                                            <div className={styles.sectionBlock}>
                                                <ContextBox title="분석 근거 및 원리" className={styles.explainBlock}>
                                                    <div className={styles.textContent}>
                                                        {section.explain.split('\n').map((p: string, i: number) => (
                                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                        ))}
                                                    </div>
                                                    {section.reasonCards && section.reasonCards.length > 0 && (
                                                        <ReasonCards cards={section.reasonCards} />
                                                    )}
                                                </ContextBox>
                                            </div>
                                        )}

                                        {section.interpretation && (
                                            <div className={styles.sectionBlock}>
                                                <AdviceBox badgeText="Action Plan" className={styles.interpretationBlock}>
                                                    <div className={styles.textContent}>
                                                        {section.interpretation.split('\n').map((p: string, i: number) => (
                                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                        ))}
                                                    </div>
                                                </AdviceBox>
                                            </div>
                                        )}

                                        {/* Legacy support */}
                                        {!section.result && !section.explain && !section.interpretation && section.content && (
                                            <div className={styles.textContent}>
                                                {section.content.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </Card>
                        </section>
                    ))}

                    <footer className={styles.disclaimerSection}>
                        <p>{disclaimerText}</p>
                        <p className={styles.disclaimerEn}>본 리포트는 제네시스 마스터의 시스템적 관점에서 인간의 성향을 분석한 결과입니다. 최종적인 판단과 행동은 사용자의 주관에 따릅니다.</p>
                        <div style={{ marginTop: '2rem', fontSize: '0.7rem', opacity: 0.3, fontFamily: 'monospace' }}>
                            <p>BUILD: {buildInfo.commitHash} {buildInfo.buildTimeISO}</p>
                            <p>VER: {buildInfo.appVersion} | CORE: {reportData?.reportMeta?.determinismHash || 'INITIAL_AUDIT'} | <SWStatus /></p>
                        </div>
                    </footer>
                </main>
            </Container>

            {/* Phase 26: Luck Calendar Modal */}
            {showCalendar && reportId && (
                <LuckCalendar reportId={reportId} onClose={() => setShowCalendar(false)} />
            )}
        </div>
    );
};

```

---

## File 7: `src/pages/ReportPrint.tsx` {#file-7}

**크기**: 10.02 KB | **확장자**: tsx

```tsx
/* eslint-disable @tanstack/query/no-window-matchmedia */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance as db } from '../lib/firebase';
import { Card } from '../components/ui/Card';
import type { Section } from '../types/report';
import styles from './Report.module.css';

const TIME_UNKNOWN_DISCLAIMER = "※ 태어난 시각을 알 수 없어 '시주(時柱)' 판단을 유보하며, 관련 분석이 배제됩니다. 정확한 시각 입력 시 결과가 달라질 수 있습니다.";
const PLACEHOLDER_TEXT = "데이터가 제공되지 않았습니다. (품질 게이트 자동 대체)";

/**
 * ReportPrint Page (Phase 26)
 * Print-optimized layout for PDF export
 * - No sidebar, no buttons, no share actions
 * - Auto-trigger window.print() on mount
 * - Preserves Technical Ink styling
 */

function GenesisCodeVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Genesis Architecture Diagram</p>
            <div className={styles.placeholder}></div>
        </div>
    );
}

function BalanceRadarVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Energy Balance Radar</p>
            <div className={styles.placeholder}></div>
        </div>
    );
}

const normalizeSection = (s: any, index: number): Section => {
    let id = typeof s?.id === 'string' ? s.id.trim() : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title.trim() : String(s?.title ?? "제목 없음");
    const category = typeof s?.category === 'string' ? s.category.trim() : "ANALYSIS";

    let result = s?.result ? String(s.result) : undefined;
    let explain = s?.explain ? String(s.explain) : undefined;
    let interpretation = s?.interpretation ? String(s.interpretation) : undefined;

    let content = s?.content ? String(s.content) : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(val => val && val.length > 0).join("\n\n");
    }

    if (!result && !explain && !interpretation && !content) {
        result = PLACEHOLDER_TEXT;
        explain = "근거 데이터가 충분하지 않습니다.";
        interpretation = "정확한 해석을 위해 재생성이 필요할 수 있습니다.";
        content = PLACEHOLDER_TEXT;
    }

    if (!id || id.length === 0) { id = `unknown_${index}`; }
    id = id.replace(/[^a-zA-Z0-9_-]/g, '_');

    return {
        id, title, content, category,
        result, explain, interpretation,
        type: s?.type,
        reasonCards: s?.reasonCards || []
    };
};

const normalizeSections = (input: any, toc?: any[]): Section[] => {
    let rawSections: Section[] = [];
    if (Array.isArray(input)) { rawSections = input.map((s, i) => normalizeSection(s, i)); }
    else if (input && typeof input === 'object') { rawSections = Object.values(input).map((s, i) => normalizeSection(s, i)); }

    if (!toc || !Array.isArray(toc)) return rawSections;

    const sectionMap = new Map(rawSections.map(s => [s.id, s]));
    const ordered: Section[] = [];
    const seenIds = new Set<string>();

    toc.forEach((item: any) => {
        const id = item.id?.replace(/[^a-zA-Z0-9_-]/g, '_');
        const section = sectionMap.get(id);
        if (section) {
            ordered.push(section);
            seenIds.add(id);
        }
    });

    rawSections.forEach(s => { if (!seenIds.has(s.id)) ordered.push(s); });
    return ordered;
};

export const ReportPrint: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const timeUnknown = reportData?.input?.timeUnknown ?? reportData?.reportMeta?.timeUnknown ?? false;

    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) return;

            try {
                const docRef = doc(db, "reports", reportId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setReportData(docSnap.data());
                }
            } catch (error) {
                console.error("Print page fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId]);

    // Auto-trigger print after content is ready
    useEffect(() => {
        if (!loading && reportData) {
            // Small delay to ensure rendering is complete
            const timer = setTimeout(() => {
                window.print();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading, reportData]);

    if (loading) {
        return (
            <div className={styles.reportPage}>
                <div className={styles.loadingState}>
                    <p>인쇄 준비 중...</p>
                </div>
            </div>
        );
    }

    const activeSections = normalizeSections(reportData?.sections, reportData?.tableOfContents);

    return (
        <div className={`${styles.reportPage} ${styles.printMode}`}>
            <main className={styles.reportContent}>
                <header className={styles.reportHeader}>
                    <h1 className={styles.mainTitle}>
                        {reportData?.reportMeta?.title || "SYSTEM AUDIT v5.0"}
                    </h1>
                    <p className={styles.mainSummary}>{reportData?.reportMeta?.summary}</p>
                </header>

                {activeSections.map((section) => (
                    <section
                        key={section.id}
                        id={`page-${section.id}`}
                        className={styles.pageSection}
                    >
                        <div className={styles.pageHeader}>
                            <span className={styles.categoryTag}>{section.category}</span>
                            <span className={styles.pageIdentifier}>ID: {section.id}</span>
                        </div>

                        <Card className={styles.contentCard}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>

                            {section.id === "02_code" && <GenesisCodeVisual />}
                            {section.id === "07_balance" && <BalanceRadarVisual />}

                            {section.id !== "02_code" && section.id !== "07_balance" && (
                                <>
                                    {section.result && (
                                        <div className={styles.sectionBlock}>
                                            <h3 className={styles.blockTitle}>결과</h3>
                                            <div className={styles.textContent}>
                                                {section.result.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {section.explain && (
                                        <div className={styles.sectionBlock}>
                                            <h3 className={styles.blockTitle}>풀이</h3>
                                            <div className={styles.textContent}>
                                                {section.explain.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {section.interpretation && (
                                        <div className={styles.sectionBlock}>
                                            <h3 className={styles.blockTitle}>해석</h3>
                                            <div className={styles.textContent}>
                                                {section.interpretation.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {!section.result && !section.explain && !section.interpretation && section.content && (
                                        <div className={styles.textContent}>
                                            {section.content.split('\n').map((p: string, i: number) => (
                                                p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    </section>
                ))}

                <footer className={styles.disclaimerSection}>
                    <p>{timeUnknown ? (reportData?.reportMeta?.mainDisclaimer || reportData?.reportMeta?.strategistMeta?.disclaimer || TIME_UNKNOWN_DISCLAIMER) : reportData?.reportMeta?.strategistMeta?.disclaimer}</p>
                    <p className={styles.disclaimerEn}>본 리포트는 제네시스 마스터의 시스템적 관점에서 인간의 성향을 분석한 결과입니다. 최종적인 판단과 행동은 사용자의 주관에 따릅니다.</p>
                </footer>
            </main>
        </div>
    );
};

```

---

## File 8: `src/pages/Start.module.css` {#file-8}

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

## File 9: `src/pages/Start.test.tsx` {#file-9}

**크기**: 3.87 KB | **확장자**: tsx

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Start } from './Start';
import { describe, it, expect, vi } from 'vitest';

// Mock useNavigate
const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe('Start Component IME Safety', () => {
    it('should retain raw characters during hancul composition', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // Simulate typing "배"
        // 1. "ㅂ"
        fireEvent.compositionStart(input);
        fireEvent.change(input, { target: { value: 'ㅂ' } });
        expect(input.value).toBe('ㅂ');

        // 2. "배"
        fireEvent.change(input, { target: { value: '배' } });
        expect(input.value).toBe('배');

        // 3. Complete composition
        fireEvent.compositionEnd(input, { currentTarget: { value: '배' } });
        expect(input.value).toBe('배');
    });

    it('should keep Hanja conversion intact', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // Simulate Hanja conversion "裵"
        fireEvent.compositionStart(input);
        fireEvent.change(input, { target: { value: '裵' } });
        expect(input.value).toBe('裵');

        fireEvent.compositionEnd(input, { currentTarget: { value: '裵' } });
        expect(input.value).toBe('裵');
    });

    it('should strip illegal special characters ONLY after submission or composition end', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // Type "배!" (illegal char !)
        fireEvent.change(input, { target: { value: '배!' } });
        // During input, we don't sanitize yet to be safe
        expect(input.value).toBe('배!');

        // End composition (some browsers might trigger it here)
        fireEvent.compositionEnd(input, { currentTarget: { value: '배!' } });
        // After composition end, SSOT sanitizer should have stripped it
        expect(input.value).toBe('배');
    });

    it('should allow spaces (e.g., "A B") and mixed scripts (e.g., "배 裵 Su")', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        // "A B"
        fireEvent.change(input, { target: { value: 'A B' } });
        fireEvent.compositionEnd(input, { currentTarget: { value: 'A B' } });
        expect(input.value).toBe('A B');

        // Mixed "배 裵 Su"
        fireEvent.change(input, { target: { value: '배 裵 Su' } });
        fireEvent.compositionEnd(input, { currentTarget: { value: '배 裵 Su' } });
        expect(input.value).toBe('배 裵 Su');
    });

    it('should allow 1-character names per policy', () => {
        render(
            <BrowserRouter>
                <Start />
            </BrowserRouter>
        );

        const input = screen.getByLabelText(/이름/i) as HTMLInputElement;

        fireEvent.change(input, { target: { value: '홍' } });
        expect(input.value).toBe('홍');

        // No error should be shown for length if specified (checking if validator is silent)
        const error = screen.queryByText(/글자 이상/i);
        expect(error).toBeNull();
    });
});

```

---

## File 10: `src/pages/Start.tsx` {#file-10}

**크기**: 13.14 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import styles from './Start.module.css';

import { InputSchema } from '@contracts/input.schema';
import { sanitizeUserName, detectScriptType } from '@contracts/shared/nameSanitize';

interface FormData {
    userName: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean | null;
    timezone: 'Asia/Seoul';
}

interface Errors {
    [key: string]: string | undefined;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        birthDate: '',
        birthTime: '',
        timeUnknown: false,
        sex: '',
        calendar: '',
        isLeapMonth: null,
        timezone: 'Asia/Seoul'
    });

    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const leapValid = formData.calendar !== 'lunar' || formData.isLeapMonth !== null;
        const timeValid = formData.timeUnknown || formData.birthTime !== '';

        setIsValid(
            formData.birthDate !== '' &&
            formData.sex !== '' &&
            formData.calendar !== '' &&
            leapValid &&
            timeValid
        );
    }, [formData]);

    const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setFormData(prev => ({ ...prev, birthDate: val }));
        if (touched.birthDate) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
                setErrors(prev => ({ ...prev, birthDate: '생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD).' }));
            } else {
                setErrors(prev => ({ ...prev, birthDate: undefined }));
            }
        }
    };

    const handleSexChange = (sex: 'male' | 'female') => {
        setFormData(prev => ({ ...prev, sex }));
        setTouched(prev => ({ ...prev, sex: true }));
        setErrors(prev => ({ ...prev, sex: undefined }));
    };

    const handleCalendarChange = (calendar: 'solar' | 'lunar') => {
        setFormData(prev => ({
            ...prev,
            calendar,
            isLeapMonth: calendar === 'solar' ? null : prev.isLeapMonth
        }));
        setTouched(prev => ({ ...prev, calendar: true }));
        setErrors(prev => ({ ...prev, calendar: undefined }));
    };

    const handleTimeUnknownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            timeUnknown: checked,
            birthTime: checked ? '' : prev.birthTime
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
        if (e.type === 'compositionstart') {
            // isComposing state removed to pass lint gate
        } else if (e.type === 'compositionend') {
            // [REFACTOR-R1] Final sanitize on composition end using SSOT utility.
            const finalValue = sanitizeUserName(e.currentTarget.value);
            setFormData(prev => ({ ...prev, userName: finalValue }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // [REFACTOR-R1] Final Sanitize & Trim on Submit.
        const safeName = sanitizeUserName(formData.userName).trim();

        // [REFACTOR-R2] Use Shared Input Schema for Runtime Validation
        const validationResult = InputSchema.safeParse({
            ...formData,
            userName: safeName || undefined // userName is optional
        });

        if (!validationResult.success) {
            const newErrors: Errors = {};
            validationResult.error.issues.forEach(issue => {
                newErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(newErrors);
            return;
        }

        const payload = validationResult.data;
        navigate('/processing', {
            state: {
                ...payload,
                scriptType: safeName ? detectScriptType(safeName) : undefined
            }
        });
    };

    return (
        <Container>
            <Header />
            <main className={styles.main}>
                <Card className={styles.startCard}>
                    <h1 className={styles.title}>운명의 기원을 찾아서</h1>
                    <p className={styles.subtitle}>정확한 명식 분석을 위해 정보를 입력해주세요.</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* 이름 입력 */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>이름 (선택)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onCompositionStart={handleComposition}
                                onCompositionEnd={handleComposition}
                                onBlur={handleBlur}
                                placeholder="이름을 입력해주세요 (선택)"
                                className={styles.input}
                                autoComplete="name"
                            />
                            <p className={styles.hint}>한글, 한자, 영문 입력이 가능합니다. (IME 보호 적용)</p>
                            {errors.userName && <p className={styles.error}>{errors.userName}</p>}
                        </div>

                        {/* 생년월일 */}
                        <div className={styles.field}>
                            <label htmlFor="birthDate" className={styles.label}>생년월일</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleBirthDateChange}
                                onBlur={handleBlur}
                                className={styles.input}
                                required
                            />
                            {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
                        </div>

                        {/* 성별 선택 */}
                        <div className={styles.field}>
                            <label className={styles.label}>성별</label>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={() => handleSexChange('male')}
                                    className={`${styles.selectionButton} ${formData.sex === 'male' ? styles.active : ''}`}
                                >
                                    남성
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSexChange('female')}
                                    className={`${styles.selectionButton} ${formData.sex === 'female' ? styles.active : ''}`}
                                >
                                    여성
                                </button>
                            </div>
                            {errors.sex && <p className={styles.error}>{errors.sex}</p>}
                        </div>

                        {/* 양력/음력 */}
                        <div className={styles.field}>
                            <label className={styles.label}>양력/음력</label>
                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    onClick={() => handleCalendarChange('solar')}
                                    className={`${styles.selectionButton} ${formData.calendar === 'solar' ? styles.active : ''}`}
                                >
                                    양력
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCalendarChange('lunar')}
                                    className={`${styles.selectionButton} ${formData.calendar === 'lunar' ? styles.active : ''}`}
                                >
                                    음력
                                </button>
                            </div>
                            {errors.calendar && <p className={styles.error}>{errors.calendar}</p>}
                        </div>

                        {/* 음력일 경우 윤달 여부 */}
                        {formData.calendar === 'lunar' && (
                            <div className={styles.field}>
                                <label className={styles.label}>윤달 여부</label>
                                <div className={styles.buttonGroup}>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isLeapMonth: false }))}
                                        className={`${styles.selectionButton} ${formData.isLeapMonth === false ? styles.active : ''}`}
                                    >
                                        평달
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isLeapMonth: true }))}
                                        className={`${styles.selectionButton} ${formData.isLeapMonth === true ? styles.active : ''}`}
                                    >
                                        윤달
                                    </button>
                                </div>
                                {errors.isLeapMonth && <p className={styles.error}>{errors.isLeapMonth}</p>}
                            </div>
                        )}

                        {/* 태어난 시간 */}
                        <div className={styles.field}>
                            <div className={styles.labelRow}>
                                <label htmlFor="birthTime" className={styles.label}>태어난 시간</label>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={formData.timeUnknown}
                                        onChange={handleTimeUnknownChange}
                                    />
                                    모름
                                </label>
                            </div>
                            {!formData.timeUnknown && (
                                <input
                                    type="time"
                                    id="birthTime"
                                    name="birthTime"
                                    value={formData.birthTime}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={styles.input}
                                    required
                                />
                            )}
                            {errors.birthTime && <p className={styles.error}>{errors.birthTime}</p>}
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!isValid}
                        >
                            기원 분석 시작
                        </button>
                    </form>
                </Card>
            </main>
        </Container>
    );
};

```

---

