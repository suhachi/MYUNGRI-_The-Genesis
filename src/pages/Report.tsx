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
                                                {calc.pillars.month?.label === 'UNKNOWN' ? (
                                                    <div className={styles.pillarUnknown}>
                                                        <span className={styles.unknownLabel}>UNKNOWN</span>
                                                        <span className={styles.unknownHint}>윤달 월주 미제공</span>
                                                    </div>
                                                ) : (
                                                    <div className={styles.pillarGanji}>
                                                        <span className={styles.stem}>{calc.pillars.month?.stem || '?'}</span>
                                                        <span className={styles.branch}>{calc.pillars.month?.branch || '?'}</span>
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
