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
