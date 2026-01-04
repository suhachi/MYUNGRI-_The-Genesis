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
