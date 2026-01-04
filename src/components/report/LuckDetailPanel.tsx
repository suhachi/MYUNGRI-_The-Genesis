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
