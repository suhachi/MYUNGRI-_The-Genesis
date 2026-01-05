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
