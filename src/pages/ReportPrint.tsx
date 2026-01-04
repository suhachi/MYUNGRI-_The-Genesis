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
