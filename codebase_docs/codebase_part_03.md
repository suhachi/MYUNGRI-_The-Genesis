# 📦 프로젝트 코드베이스 - Part 3/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/frontend-pages.md`

---

## 📄 파일 내용

## 📄 project_docs_structured/frontend-pages.md

```markdown
# Frontend - Pages

> 프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)

**생성 시각**: 2026-01-03T09:38:11.808Z

---

## 📋 목차 (9개 파일)

1. [src/pages/Home.module.css](#file-1)
2. [src/pages/Home.tsx](#file-2)
3. [src/pages/Processing.module.css](#file-3)
4. [src/pages/Processing.tsx](#file-4)
5. [src/pages/Report.module.css](#file-5)
6. [src/pages/Report.tsx](#file-6)
7. [src/pages/ReportPrint.tsx](#file-7)
8. [src/pages/Start.module.css](#file-8)
9. [src/pages/Start.tsx](#file-9)

---

## File 1: `src/pages/Home.module.css` {#file-1}

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

## File 2: `src/pages/Home.tsx` {#file-2}

**크기**: 3.72 KB | **확장자**: tsx

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

## File 3: `src/pages/Processing.module.css` {#file-3}

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

## File 4: `src/pages/Processing.tsx` {#file-4}

**크기**: 7.82 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { TRIVIA_LINES } from '../config/trivia';
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

    const [triviaIndex, setTriviaIndex] = useState(0);
    const [progressStep, setProgressStep] = useState(0);
    const [error, setError] = useState<{
        code?: string;
        message: string;
        details?: string;
    } | null>(null);

    // 최소 시각적 대기 시간 (3.5s ~ 5s 랜덤)
    const [visualDuration] = useState(() => Math.floor(Math.random() * 1500) + 3500);

    const nextTrivia = useCallback(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_LINES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextTrivia, 1500);
        return () => clearInterval(interval);
    }, [nextTrivia]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressStep((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const executeGeneration = useCallback(async () => {
        if (!formData) {
            console.error("[generateReport] Missing formData in location state");
            return;
        }

        setError(null);
        const startTime = Date.now();

        try {
            console.log("[generateReport] Calling function with payload:", formData);
            const generateReportFunc = httpsCallable(functions, 'generateReport');
            const result = await generateReportFunc(formData);

            const { reportId, schemaVersion, serverBuildId, version } = result.data as any;
            console.log(`[generateReport] Success!
                Report ID: ${reportId}
                Schema: ${schemaVersion}
                Build: ${serverBuildId}
                Version: ${version}`);

            // 최소 시각적 시간 보장
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, visualDuration - elapsedTime);
            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            navigate(`/report/${reportId}`, { replace: true });
        } catch (err: any) {
            console.error("[generateReport] Analysis Failed:", err);

            let errorMessage = err.message || "알 수 없는 시스템 오류가 발생했습니다.";
            let errorDetails = "";

            if (err.details) {
                errorDetails = typeof err.details === 'object'
                    ? JSON.stringify(err.details, null, 2)
                    : String(err.details);
            }

            // App Check / Security 힌트 추가
            const securityCodes = ['permission-denied', 'unauthenticated', 'failed-precondition', 'unavailable'];
            if (securityCodes.includes(err.code)) {
                errorMessage = "보안 게이트(App Check) 또는 인증 문제로 요청이 차단되었습니다. 관리자 설정을 점검하거나 잠시 후 다시 시도해주세요.";
            }

            setError({
                code: err.code,
                message: errorMessage,
                details: errorDetails
            });
        }
    }, [formData, navigate, visualDuration]);

    useEffect(() => {
        if (formData) {
            executeGeneration();
        }
    }, [formData, executeGeneration]);

    // 입 정보가 없는 경우 전용 UI
    if (!formData) {
        return (
            <div className={styles.processingPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingContainer}>
                    <Card className={styles.errorCard}>
                        <h2 className={styles.errorTitle}>데이터 누락</h2>
                        <p className={styles.errorText}>입력 정보가 전달되지 않았습니다. 분석 시작 페이지로 돌아가 정보를 다시 입력해주세요.</p>
                        <button
                            className={styles.retryBtn}
                            onClick={() => navigate('/start', { replace: true })}
                        >
                            입력 화면으로 이동
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
                    <>
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
                    </>
                ) : (
                    <Card className={styles.errorCard}>
                        <div className={styles.errorHeader}>
                            <h2 className={styles.errorTitle}>분석 실패</h2>
                            {error.code && <span className={styles.errorCode}>CODE: {error.code}</span>}
                        </div>

                        <p className={styles.errorText}>{error.message}</p>

                        {error.details && (
                            <div className={styles.detailsBox}>
                                <pre>{error.details}</pre>
                            </div>
                        )}

                        <div className={styles.actionRow}>
                            <button className={styles.retryBtn} onClick={executeGeneration}>
                                다시 시도
                            </button>
                            <button className={styles.cancelBtn} onClick={() => navigate('/start')}>
                                입력 화면으로
                            </button>
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

## File 6: `src/pages/Report.tsx` {#file-6}

**크기**: 17.04 KB | **확장자**: tsx

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
import { ShareActions } from '../components/share/ShareActions';
import { openPrintWindow } from '../lib/pdf';
import { ReasonCards } from '../components/report/ReasonCards';
import { LuckCalendar } from '../components/report/LuckCalendar';
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
const normalizeSection = (s: any, index: number): Section => {
    let id = typeof s?.id === 'string' ? s.id.trim() : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title.trim() : String(s?.title ?? "제목 없음");
    const category = typeof s?.category === 'string' ? s.category.trim() : "ANALYSIS";

    // Phase 27: Preserving 3-tier structure
    const result = typeof s?.result === 'string' ? s.result : undefined;
    const explain = typeof s?.explain === 'string' ? s.explain : undefined;
    const interpretation = typeof s?.interpretation === 'string' ? s.interpretation : undefined;

    // Synthesize content for legacy display if needed
    let content = typeof s?.content === 'string' ? s.content : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(Boolean).join("\n\n");
    }

    if (!id || id.length === 0) {
        id = `unknown_${index}`;
    }

    id = id.replace(/[^a-zA-Z0-9_-]/g, '_');

    return {
        id,
        title,
        content,
        category,
        result,
        explain,
        interpretation,
        type: s?.type,
        reasonCards: s?.reasonCards || []
    };
};

const normalizeSections = (input: any, toc?: any[]): Section[] => {
    let rawSections: Section[] = [];

    if (Array.isArray(input)) { rawSections = input.map((s, i) => normalizeSection(s, i)); }
    else if (input && typeof input === 'object') { rawSections = Object.values(input).map((s, i) => normalizeSection(s, i)); }

    if (!toc || !Array.isArray(toc)) return rawSections;

    // Phase 27: Strict ordering by Table of Contents
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


// Phase 27: Category 한글 매핑
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

export const Report: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const navigate = useNavigate();

    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

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

    // [D3] 동적 섹션 구성 (정규화 적용)
    const activeSections = useMemo(() => {
        return normalizeSections(reportData?.sections, reportData?.tableOfContents);
    }, [reportData]);

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
                                                {section.reasonCards && section.reasonCards.length > 0 && (
                                                    <ReasonCards cards={section.reasonCards} />
                                                )}
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
                        <p>{reportData?.reportMeta?.strategistMeta?.disclaimer}</p>
                        <p className={styles.disclaimerEn}>본 리포트는 제네시스 마스터의 시스템적 관점에서 인간의 성향을 분석한 결과입니다. 최종적인 판단과 행동은 사용자의 주관에 따릅니다.</p>
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

**크기**: 9.20 KB | **확장자**: tsx

```tsx
/* eslint-disable @tanstack/query/no-window-matchmedia */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance as db } from '../lib/firebase';
import { Card } from '../components/ui/Card';
import type { Section } from '../types/report';
import styles from './Report.module.css';

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

    const result = typeof s?.result === 'string' ? s.result : undefined;
    const explain = typeof s?.explain === 'string' ? s.explain : undefined;
    const interpretation = typeof s?.interpretation === 'string' ? s.interpretation : undefined;

    let content = typeof s?.content === 'string' ? s.content : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(Boolean).join("\n\n");
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
                    <p>{reportData?.reportMeta?.strategistMeta?.disclaimer}</p>
                    <p className={styles.disclaimerEn}>본 리포트는 제네시스 마스터의 시스템적 관점에서 인간의 성향을 분석한 결과입니다. 최종적인 판단과 행동은 사용자의 주관에 따릅니다.</p>
                </footer>
            </main>
        </div>
    );
};

```

---

## File 8: `src/pages/Start.module.css` {#file-8}

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

## File 9: `src/pages/Start.tsx` {#file-9}

**크기**: 12.72 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import { detectScriptType } from '../lib/text';
import styles from './Start.module.css';

interface FormData {
    userName: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean;
    timezone: 'Asia/Seoul';
}

interface Errors {
    userName?: string;
    birthDate?: string;
    sex?: string;
    calendar?: string;
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

        if (!name || name === 'userName') {
            const trimmed = formData.userName.trim();
            if (trimmed.length === 1) {
                newErrors.userName = '이름은 최소 2자 이상이어야 합니다.';
            } else if (trimmed.length > 20) {
                newErrors.userName = '이름은 최대 20자까지 입력 가능합니다.';
            } else {
                delete newErrors.userName;
            }
        }

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
            const trimmedName = formData.userName.trim();
            const payload: any = {
                birthDate: formData.birthDate,
                birthTime: formData.birthTime,
                timeUnknown: formData.timeUnknown,
                sex: formData.sex,
                calendar: formData.calendar,
                isLeapMonth: formData.isLeapMonth,
                timezone: formData.timezone
            };

            // Only include userName and scriptType if name is provided
            if (trimmedName.length > 0) {
                payload.userName = trimmedName;
                payload.scriptType = detectScriptType(trimmedName);
            }

            navigate('/processing', { state: payload });
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
                        {/* Name */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>성명 (한자 권장, 한글 가능)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="예: 洪吉童 또는 홍길동"
                                className={`${styles.input} ${touched.userName && errors.userName ? styles.inputError : ''}`}
                            />
                            {touched.userName && errors.userName && (
                                <span className={styles.errorMsg}>{errors.userName}</span>
                            )}
                        </div>

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


```

---

---

**Part 3/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 2](./codebase_part_02.md) | [Part 4 →](./codebase_part_04.md)