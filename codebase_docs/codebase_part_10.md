# 📦 프로젝트 코드베이스 - Part 10/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `src/pages/Report.tsx`
- `functions/src/index.ts`
- `src/components/report/LuckCalendar.tsx`
- `functions/src/generateLuckCalendar.js`
- `src/assets/react.svg`
- `src/App.tsx`
- `src/components/report/ReasonCards.tsx`
- `src/components/share/ShareActions.module.css`
- `src/config/trivia.ts`
- `firestore.rules`
- `src/components/layout/PaperBackground.tsx`
- `.env.production.local`
- `tsconfig.json`
- `.env.example`

---

## 📄 파일 내용

## 📄 src/pages/Report.tsx

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
const normalizeSection = (s: any, index: number): Section => {
    let id = typeof s?.id === 'string' ? s.id.trim() : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title.trim() : String(s?.title ?? "제목 없음");
    const category = typeof s?.category === 'string' ? s.category.trim() : "ANALYSIS";

    // Phase 27: Preserving 3-tier structure (Safe extraction)
    const result = s?.result ? String(s.result) : undefined;
    const explain = s?.explain ? String(s.explain) : undefined;
    const interpretation = s?.interpretation ? String(s.interpretation) : undefined;

    // Synthesize content for legacy display if needed
    let content = s?.content ? String(s.content) : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(val => val && val.length > 0).join("\n\n");
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
    const [isRegenerating, setIsRegenerating] = useState(false);

    // Phase 28: Quality Quality check
    const isQualityLow = useMemo(() => {
        if (!reportData?.sections) return false;
        const missingCount = reportData.sections.filter((s: any) =>
            s.result?.includes('누락') || s.explain?.includes('누락') || s.interpretation?.includes('누락')
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
                        <p>{reportData?.reportMeta?.strategistMeta?.disclaimer}</p>
                        <p className={styles.disclaimerEn}>본 리포트는 제네시스 마스터의 시스템적 관점에서 인간의 성향을 분석한 결과입니다. 최종적인 판단과 행동은 사용자의 주관에 따릅니다.</p>
                        <div style={{ marginTop: '2rem', fontSize: '0.7rem', opacity: 0.3, fontFamily: 'monospace' }}>
                            BUILD: {buildInfo.appVersion} / {buildInfo.buildTimeISO}
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

## 📄 functions/src/index.ts

```typescript
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { OpenAI } = require("openai");
const { calculateV1 } = require("./engine/calculation/v1");

// Phase 26: Import generateLuckCalendar
const { generateLuckCalendar } = require("./generateLuckCalendar");

// [Stability Patch] App Check Visibility & Secrets
const REGION = "asia-northeast3";
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

setGlobalOptions({ region: REGION });
admin.initializeApp();

logger.info(`[System] App Check Enforced: ${ENFORCE_APP_CHECK} (Emulator: ${process.env.FUNCTIONS_EMULATOR})`);

/**
 * generateReport (Callable Function v2)
 * Phase 23: OpenAI JSON Mode & Action Plan Integration
 * v4.1.0-AI-JSON: Zero Tolerance AI Activation
 */
/**
 * Phase 25: System Audit Report Structure
 */
export const REPORT_STRUCTURE = [
    { id: "01_intro", title: "제네시스 오버뷰", category: "SUMMARY" },
    { id: "02_code", title: "제네시스 코드", category: "ARCH" },
    { id: "03_logic", title: "분석 알고리즘 명세", category: "SPEC" },
    { id: "04_os", title: "운영체제 타입", category: "SYSTEM" },
    { id: "05_core", title: "코어 엘리먼트", category: "CORE" },
    { id: "06_dual", title: "듀얼 프로세서", category: "CORE" },
    { id: "07_balance", title: "에너지 구조 및 밸런스", category: "RESOURCE" },
    { id: "08_bug", title: "고질적 버그 리포트", category: "DEBUG" },
    { id: "09_crash", title: "반복되는 시스템 충돌", category: "DEBUG" },
    { id: "10_leak", title: "에너지 누수 구간", category: "DEBUG" },
    { id: "11_defense", title: "방어 기제 및 방화벽", category: "SECURITY" },
    { id: "12_killer", title: "킬러 애플리케이션", category: "APP" },
    { id: "13_process", title: "업무 처리 프로세스", category: "APP" },
    { id: "14_wealth", title: "리소스 할당 전략", category: "STRATEGY" },
    { id: "15_decision", title: "의사결정 병목 해결", category: "STRATEGY" },
    { id: "16_social", title: "인터랙션 프로토콜", category: "NETWORK" },
    { id: "17_love", title: "호환성 검사", category: "NETWORK" },
    { id: "18_traffic", title: "네트워크 트래픽 관리", category: "NETWORK" },
    { id: "19_current", title: "현재 시스템 부하", category: "STATUS" },
    { id: "20_major", title: "업데이트 일정", category: "ROADMAP" },
    { id: "21_roadmap", title: "단기 패치 노트", category: "ROADMAP" },
    { id: "22_wave", title: "바이오리듬 및 파동", category: "STATUS" },
    { id: "23_boost", title: "시스템 부스팅", category: "PATCH" },
    { id: "24_archive", title: "시스템 아카이브", category: "META" },
] as const;

/**
 * Master Myungri – 시스템 감사관 페르소나
 */
const SYSTEM_PROMPT = `
당신은 "Master Myungri", 선임 시스템 감사관(Senior System Auditor)입니다.
당신은 인간을 하나의 "Human OS"로 분석합니다.

Mandatory rules:
- 오직 IT/시스템 메타포만 사용하십시오.
- 일간(Day Master) = CPU/Kernel
- 운(Fate) = System Traffic
- 충(Clash) = System Crash
- 흉신(Demon God) = Malware
- 용신(Useful God) = Optimization Patch
- 논리가 먼저이고 결론이 뒤따라야 합니다.
- 위로나 점술적인 톤은 배제하십시오. 오직 감사 결과에만 집중합니다.
- 시스템의 버그를 지적하고 구체적인 Action Plan을 제시하십시오.
- 각 섹션은 반드시 최소 3-4문단으로 구성하십시오. (매우 중요)
- 섹션 ID와 제목을 변경하지 마십시오.
- 리포트 전체 분량을 축소하지 마십시오. 총 공백 제외 30,000자 이상의 밀도 높은 분석을 지향합니다.
- 반드시 유효한 JSON 형식으로만 응답하며, 마크다운 태그 기입은 금지합니다.
`;

const SCHEMA_VERSION = "report/v6";
const APP_VERSION = "v6.0.0";
const SERVER_BUILD_ID = "v6.0.0-LONGFORM";

exports.generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK,
    secrets: [OPENAI_API_KEY],
    timeoutSeconds: 300, // Increase timeout for longer reports
    memory: "512MiB"
}, async (request: any) => {
    const rawData = request.data;

    // ... (입력 검증 로직 생략되지 않도록 전체 유지 권장되나 prompt 지시에 따라 변경점 집중)
    // 실제로는 index.ts 전체를 한 번 읽었으므로 정확한 위치에 삽입

    // [Step 4.1 Implementation]
    // ... (기존 검증 로직 이후)


    // 1. 입력 검증 (Fail Fast - Hardened)
    const allowedSex = ["male", "female"];
    const allowedCalendar = ["solar", "lunar"];

    if (!allowedSex.includes(rawData.sex) || !allowedCalendar.includes(rawData.calendar)) {
        throw new HttpsError("invalid-argument", "지정된 성별 또는 달력 형식이 유효하지 않습니다.");
    }

    if (rawData.calendar === "lunar" && typeof rawData.isLeapMonth !== "boolean") {
        throw new HttpsError("invalid-argument", "음력 선택 시 윤달 여부(isLeapMonth)를 반드시 boolean 값으로 지정해야 합니다.");
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(rawData.birthDate)) {
        throw new HttpsError("invalid-argument", "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD).");
    }

    // Optional userName and scriptType
    let userName: string | undefined;
    let scriptType: 'hanja' | 'hangul' | 'unknown' | undefined;

    if (rawData.userName) {
        const trimmed = rawData.userName.trim();
        if (trimmed.length < 2 || trimmed.length > 20) {
            throw new HttpsError("invalid-argument", "이름은 2자 이상 20자 이하여야 합니다.");
        }
        userName = trimmed;

        // Compute scriptType if not provided
        if (rawData.scriptType) {
            scriptType = rawData.scriptType;
        } else {
            if (/\p{Script=Han}/u.test(trimmed)) {
                scriptType = 'hanja';
            } else if (/\p{Script=Hangul}/u.test(trimmed)) {
                scriptType = 'hangul';
            } else {
                scriptType = 'unknown';
            }
        }
    }

    const birthYear = parseInt(rawData.birthDate.split('-')[0]);
    if (birthYear < 1890 || birthYear > 2050) {
        throw new HttpsError("invalid-argument", "분석 가능한 연도 범위를 벗어났습니다 (1890년 ~ 2050년 지원).");
    }

    const timeUnknown = !!rawData.timeUnknown;
    let birthTime = null;
    if (!timeUnknown) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!rawData.birthTime || !timeRegex.test(rawData.birthTime)) {
            throw new HttpsError("invalid-argument", "출생 시간 형식이 올바르지 않습니다 (HH:mm).");
        }
        birthTime = rawData.birthTime;
    }

    const normalizedIsLeapMonth = rawData.calendar === "solar" ? false : !!rawData.isLeapMonth;

    const input: any = {
        birthDate: rawData.birthDate,
        birthTime: birthTime,
        timeUnknown: timeUnknown,
        sex: rawData.sex,
        calendar: rawData.calendar,
        isLeapMonth: normalizedIsLeapMonth,
        timezone: "Asia/Seoul"
    };

    // Only include userName if it exists
    if (userName) {
        input.userName = userName;
        input.scriptType = scriptType;
    }

    try {
        // 2. 사주 실계산 실행
        const calculation = calculateV1(input);
        const { pillars } = calculation;

        // 3. OpenAI 해석 엔진 가동 (gpt-4o)
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY.value(),
        });

        const modelName = "gpt-4o";

        // [Phase 28: Per-section Segmented Generation]
        async function generateOneSection(sectionMeta: any, attempt = 1): Promise<any> {
            const sectionPrompt = `
섹션 ID: ${sectionMeta.id}
섹션 제목: ${sectionMeta.title}
섹션 카테고리: ${sectionMeta.category}

위 섹션에 대해 시스템 감사 보고서를 작성하십시오.
반드시 아래 JSON 구조를 지키고, 각 필드의 최소 길이를 준수하십시오.

필수 규칙:
1. result: 핵심 결론 (최소 400자)
2. explain: 논리적 근거 (최소 600자)
3. interpretation: 현실적 행동 지침 (최소 400자)
4. reasonCards: 최소 2개 이상의 객체 배열

IT/시스템 메타포만 사용하고, 한국어로만 작성하십시오.
`;

            try {
                const secCompletion = await openai.chat.completions.create({
                    model: modelName,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        {
                            role: "user",
                            content: `INPUT DATA:\n${JSON.stringify({
                                userName: userName || "Anonymous",
                                pillars,
                                dayStem: pillars.day.stem,
                                sex: rawData.sex,
                                solarDate: calculation.normalization.solarDate
                            })}\n\nTASK:\n${sectionPrompt}`
                        }
                    ],
                    response_format: { type: "json_object" },
                    temperature: 0.3,
                });

                const content = JSON.parse(secCompletion.choices[0]?.message?.content || "{}");

                // Quality Gate: Length check
                const rLen = (content.result || "").length;
                const eLen = (content.explain || "").length;
                const iLen = (content.interpretation || "").length;

                if (attempt < 2 && (rLen < 300 || eLen < 450 || iLen < 300)) {
                    logger.warn(`[QualityGate] Section ${sectionMeta.id} too short (R:${rLen}, E:${eLen}, I:${iLen}). Retrying...`);
                    return generateOneSection(sectionMeta, attempt + 1);
                }

                return {
                    ...content,
                    id: sectionMeta.id,
                    title: sectionMeta.title,
                    category: sectionMeta.category,
                    quality: { rLen, eLen, iLen, attempt }
                };
            } catch (secErr: any) {
                logger.error(`[AI-Section] Error in ${sectionMeta.id}:`, secErr);
                return {
                    id: sectionMeta.id,
                    title: sectionMeta.title,
                    category: sectionMeta.category,
                    result: "데이터를 생성하는 중 시간 초과 또는 오류가 발생했습니다.",
                    explain: "시스템 가동 중 일시적인 부하가 감지되었습니다. 재생성을 권장합니다.",
                    interpretation: "재시도 버튼을 통해 다시 감사해 주십시오.",
                    reasonCards: [],
                    error: secErr.message
                };
            }
        }

        // 24개 섹션 순차 생성 (토큰 및 품질 확보)
        const sections: any[] = [];
        let totalChars = 0;

        for (const meta of REPORT_STRUCTURE) {
            // 24_archive는 별도 처리
            if (meta.id === "24_archive") {
                sections.push({
                    id: meta.id,
                    title: meta.title,
                    category: meta.category,
                    result: `Algorithm: ${calculation.algorithmVersion}`,
                    explain: `Model: ${modelName}\nEngine: ${SERVER_BUILD_ID}\nSchema: ${SCHEMA_VERSION}`,
                    interpretation: `본 리포트는 섹션별 정밀 감수가 적용된 고밀도 분석 보고서(Phase 28)입니다.`,
                    reasonCards: [],
                    type: "analysis"
                });
                continue;
            }

            const secData = await generateOneSection(meta);
            sections.push({
                ...secData,
                type: (meta.id === "01_intro") ? "intro" : "analysis"
            });
            totalChars += (secData.result?.length || 0) + (secData.explain?.length || 0) + (secData.interpretation?.length || 0);
            logger.info(`[Progress] Generated Section: ${meta.id} (Total so far: ${totalChars} chars)`);
        }

        // 5. Build reportMeta
        const reportMeta = {
            title: userName ? `${userName} 님의 SYSTEM AUDIT v5.0` : "SYSTEM AUDIT v5.0",
            userName: userName,
            summary: "섹션별 순차 감수가 완료된 고품질 Human OS 인티그리티 리포트입니다.",
            strategistMeta: {
                disclaimer: "본 감사 보고서는 시스템적 패턴 분석이며, 최종적인 기동 결정은 운영자 본인에게 있습니다."
            }
        };

        // 6. 리포트 데이터 영구 보관
        const reportData = {
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            userId: request.auth?.uid || "anonymous",
            version: APP_VERSION,
            schemaVersion: SCHEMA_VERSION,
            serverBuildId: SERVER_BUILD_ID,
            algorithmVersion: "Genesis-V6.0-SEGMENTED",
            model: modelName,
            qualityMetrics: {
                totalChars,
                sectionCount: sections.length,
                timestamp: new Date().toISOString()
            },
            input: input,
            calculation: {
                ...calculation,
                forensicTime: (calculation as any).forensicTime ?? null
            },
            reportMeta,
            sections: sections,
            tableOfContents: REPORT_STRUCTURE.map(meta => ({ id: meta.id, title: meta.title }))
        };

        const reportRef = await admin.firestore().collection("reports").add(reportData);

        return {
            reportId: reportRef.id,
            totalChars,
            sections: sections.map(s => ({ id: s.id, result: s.result ? "OK" : "MISSING" }))
        };

    } catch (err: any) {
        logger.error("Report Generation Error:", err);
        if (err instanceof HttpsError) throw err;
        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${err.message || 'LLM_INTERPRETATION_FAILED'}`);
    }
});

// Phase 26: Export generateLuckCalendar
exports.generateLuckCalendar = generateLuckCalendar;

```

---

## 📄 src/components/report/LuckCalendar.tsx

```tsx
import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../../lib/firebase';
import type { LuckCalendar as LuckCalendarData } from '../../types/report';
import { buildInfo } from '../../buildInfo';
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

            // Auto-select today if exists (KST safety: Sv-SE format is YYYY-MM-DD)
            const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
            const todayData = result.data.calendar.find(d => d.date === todayStr);
            if (todayData) setSelectedDay(todayData);

        } catch (err: any) {
            console.error('[LuckCalendar] Failed:', {
                code: err.code,
                message: err.message,
                details: err.details
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

    // Tooltip State
    const [hoveredDay, setHoveredDay] = useState<any>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    // Phase 27: Render logic for 53-week grid
    const renderYearGrid = () => {
        if (!calendarData) return null;

        return (
            <div className={styles.calendarContainer} onMouseMove={handleMouseMove}>
                <div className={styles.strictGrid}>
                    {calendarData.calendar.map((day) => {
                        const isToday = day.date === new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
                        const isSelected = selectedDay && selectedDay.date === day.date;

                        // Score-based coloring (rgba)
                        let backgroundColor = 'rgba(0,0,0,0.05)';
                        if (day.grade === "GOOD") {
                            backgroundColor = `rgba(46, 125, 50, ${day.score / 100})`;
                        } else if (day.grade === "WARN") {
                            backgroundColor = `rgba(211, 47, 47, ${(100 - day.score) / 100})`;
                        } else {
                            backgroundColor = `rgba(255, 152, 0, 0.4)`;
                        }

                        return (
                            <div
                                key={day.date}
                                className={`${styles.dayCell} ${isToday ? styles.todayCell : ''} ${isSelected ? styles.selectedCell : ''}`}
                                style={{ backgroundColor }}
                                onClick={() => setSelectedDay(day)}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                            />
                        );
                    })}
                </div>

                {/* 툴팁 구현 */}
                {hoveredDay && (
                    <div
                        className={styles.tooltip}
                        style={{ left: tooltipPos.x, top: tooltipPos.y }}
                    >
                        {hoveredDay.date} | {hoveredDay.iljin} | {hoveredDay.score}점
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.loadingState}>
                        <p>SYSTEM_BOOT: AUDITING_LUCK_CALENDAR...</p>
                        <p className={styles.loadingHint}>최초 생성 시 운기 흐름 분석에 시간이 소요될 수 있습니다.</p>
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
                        <h2 className={styles.errorTitle}>ACCESS_DENIED</h2>
                        <p>{error}</p>
                        <button onClick={onClose} className={styles.closeButton}>CLOSE</button>
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
                    <h2>{selectedYear}년 운기 감사 리포트 (SYSTEM_AUDIT)</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>

                {renderYearGrid()}

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
                        생성 시각: {parseGeneratedAt(calendarData.generatedAt)} | B: {buildInfo.buildTimeISO.slice(0, 16)}
                    </p>
                </div>
            </div>
        </div>
    );
};


```

---

## 📄 functions/src/generateLuckCalendar.js

```javascript
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

/**
 * generateLuckCalendar (Phase 26)
 * Generates 365-day luck calendar with scores, grades, and action plans
 * Uses Firestore caching to reduce costs
 */
exports.generateLuckCalendar = onCall({
    region: "asia-northeast3",
    enforceAppCheck: process.env.FUNCTIONS_EMULATOR !== "true",
    timeoutSeconds: 300,
    memory: "512MiB"
}, async (request) => {
    const { reportId, year } = request.data;
    const uid = request.auth?.uid || "anonymous";

    try {
        // 1. Validation
        if (!reportId || typeof reportId !== 'string') {
            throw new HttpsError("invalid-argument", "reportId가 유효하지 않거나 누락되었습니다.");
        }

        const targetYear = year || new Date().getFullYear();
        if (targetYear < 1890 || targetYear > 2100) {
            throw new HttpsError("invalid-argument", "지원되지 않는 연도 범위입니다 (1890-2100).");
        }

        // 2. Load report (Verification)
        const reportRef = admin.firestore().collection("reports").doc(reportId);
        const reportDoc = await reportRef.get();

        if (!reportDoc.exists) {
            console.error(`[generateLuckCalendar] Report not found. ID: ${reportId}`);
            throw new HttpsError("not-found", "해당 리포트를 찾을 수 없습니다. 다시 시도해 주세요.");
        }

        const reportData = reportDoc.data();
        const input = reportData.input;

        if (!input || !input.birthDate) {
            console.error(`[generateLuckCalendar] Invalid report data structure. ID: ${reportId}`);
            throw new HttpsError("failed-precondition", "리포트 데이터 내 입력 정보(생년월일 등)가 누락되었습니다.");
        }

        // 3. Check cache
        const cacheId = `${reportId}_${targetYear}`;
        const cacheRef = admin.firestore().collection("luckCalendars").doc(cacheId);
        const cacheDoc = await cacheRef.get();

        if (cacheDoc.exists) {
            const cached = cacheDoc.data();
            const genAt = cached.generatedAt;
            const genTime = (genAt && typeof genAt.toMillis === 'function')
                ? genAt.toMillis()
                : new Date(genAt || 0).getTime();

            const cacheAge = Date.now() - genTime;
            if (cacheAge < 30 * 24 * 60 * 60 * 1000) {
                return cached;
            }
        }

        // 4. Generate 365/366 days
        const isLeapYear = (targetYear % 4 === 0 && targetYear % 100 !== 0) || (targetYear % 400 === 0);
        const totalDays = isLeapYear ? 366 : 365;
        const days = [];

        for (let dayOfYear = 1; dayOfYear <= totalDays; dayOfYear++) {
            const date = new Date(targetYear, 0, dayOfYear);
            const dateStr = date.toISOString().split('T')[0];

            const score = calculateDayScore(date, input);
            const grade = score >= 70 ? "GOOD" : score >= 40 ? "WARN" : "CAUTION";

            days.push({
                date: dateStr,
                dayGanji: "UNKNOWN",
                score,
                grade,
                reasons: generateReasons(score, grade),
                actionPlan: generateActionPlan(grade),
                eventFit: {
                    contract: score >= 65 ? "GOOD" : score >= 35 ? "WARN" : "CAUTION",
                    signboard: score >= 70 ? "GOOD" : score >= 40 ? "WARN" : "CAUTION",
                    launch: score >= 75 ? "GOOD" : score >= 45 ? "WARN" : "CAUTION"
                }
            });
        }

        const result = {
            year: targetYear,
            reportId,
            timezone: "Asia/Seoul",
            generatedAt: new Date().toISOString(),
            calendar: days
        };

        // Cache result
        await cacheRef.set(result);
        return result;

    } catch (err) {
        console.error("[generateLuckCalendar] Exception:", {
            reportId,
            uid,
            message: err.message,
            stack: err.stack,
            code: err.code
        });

        if (err instanceof HttpsError) throw err;

        throw new HttpsError("internal", `운기 캘린더 생성 실패: ${err.message || "UNKNOWN_ERROR"}`, {
            reportId,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Deterministic day score calculation
 * Based on date patterns and birth data
 */
function calculateDayScore(date, birthInput) {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;

    // Simple deterministic algorithm (can be enhanced with actual 명리 logic)
    let score = 50; // Base score

    // Birth month affinity
    const birthMonth = parseInt(birthInput.birthDate.split('-')[1]);
    if (month === birthMonth) score += 15;
    if (Math.abs(month - birthMonth) === 6) score -= 10;

    // Day patterns
    if (dayOfWeek === 0 || dayOfWeek === 6) score += 5; // Weekend bonus
    if (dayOfMonth % 10 === 8) score += 10; // Lucky number 8
    if (dayOfMonth === 13) score -= 15; // Unlucky 13

    // Month patterns
    if ([1, 5, 9].includes(month)) score += 5; // Spring/summer/autumn starts
    if ([2, 6, 10].includes(month)) score -= 3; // Transition months

    // Clamp to 0-100
    return Math.max(0, Math.min(100, score));
}

function generateReasons(score, grade) {
    if (grade === "GOOD") {
        return [
            "시스템 트래픽이 안정적입니다",
            "에너지 흐름이 원활합니다",
            "외부 충돌 리스크가 낮습니다"
        ];
    } else if (grade === "WARN") {
        return [
            "시스템 부하가 중간 수준입니다",
            "일부 프로세스에서 병목이 예상됩니다",
            "주의 깊은 모니터링이 필요합니다"
        ];
    } else {
        return [
            "시스템 충돌 위험이 높습니다",
            "에너지 누수 구간입니다",
            "중요 결정은 연기를 권장합니다"
        ];
    }
}

function generateActionPlan(grade) {
    if (grade === "GOOD") {
        return [
            "중요한 계약이나 협상을 진행하세요",
            "새로운 프로젝트를 시작하기 좋은 날입니다",
            "대인 관계 확장에 적극적으로 나서세요"
        ];
    } else if (grade === "WARN") {
        return [
            "신중한 의사결정을 하세요",
            "기존 업무에 집중하고 새로운 시도는 최소화하세요",
            "건강 관리에 신경 쓰세요"
        ];
    } else {
        return [
            "중요한 결정은 미루세요",
            "방어적인 자세를 유지하세요",
            "휴식과 재충전에 집중하세요"
        ];
    }
}

```

---

## 📄 src/assets/react.svg

*[Binary file - .svg format]*

---

## 📄 src/App.tsx

```tsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import { ReportPrint } from './pages/ReportPrint';
import styles from './App.module.css';
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError as libAppCheckError, firebaseConfigError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);
  const [appCheckTimeout, setAppCheckTimeout] = useState(false);

  // [Zero Tolerance] Initializing UI Timeout (Prevent hanging)
  useEffect(() => {
    if (import.meta.env.PROD && !isAppCheckReady && !libAppCheckError && !firebaseConfigError) {
      const timer = setTimeout(() => {
        setAppCheckTimeout(true);
      }, 5000); // 5s Limit
      return () => clearTimeout(timer);
    }
  }, []);

  const effectiveAppCheckError = libAppCheckError || (appCheckTimeout ? "APPCHECK_TIMEOUT" : null);

  // [Zero Tolerance] Security Gate: Block on config error or initialization failure
  if (import.meta.env.PROD) {
    if (firebaseConfigError || effectiveAppCheckError) {
      return <SecurityShield reason={firebaseConfigError || effectiveAppCheckError} />;
    }

    if (!isAppCheckReady) {
      return (
        <div style={{
          height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-main)', color: 'var(--muted)', fontSize: '0.9rem'
        }}>
          Security Initializing...
        </div>
      );
    }
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
        <Route path="/report/:reportId/print" element={<ReportPrint />} />
      </Routes>
      <Footer />
    </PaperBackground>
  );
}

export default App;

```

---

## 📄 src/components/report/ReasonCards.tsx

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

## 📄 src/components/share/ShareActions.module.css

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

## 📄 src/config/trivia.ts

```typescript
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

## 📄 firestore.rules

```text
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

## 📄 src/components/layout/PaperBackground.tsx

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

## 📄 .env.production.local

```text
VITE_FIREBASE_API_KEY=AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=850478803106
VITE_FIREBASE_APP_ID=1:850478803106:web:5184a93285afb9a002cffb
VITE_FIREBASE_MEASUREMENT_ID=G-RRKP53N8H8
VITE_RECAPTCHA_SITE_KEY=6Ld24zwsAAAAAOsfLHNZvt1mrn9BjbsrJwEF1i9E

```

---

## 📄 tsconfig.json

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

## 📄 .env.example

```text
# Kakao JavaScript SDK Key
VITE_KAKAO_JS_KEY=

# Public Origin (e.g. https://genesis.myungri.com)
VITE_PUBLIC_ORIGIN=

```

---

---

**Part 10/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 9](./codebase_part_09.md) | 