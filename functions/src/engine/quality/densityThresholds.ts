/**
 * Genesis Only Contract (report/v6) Density Thresholds.
 * Total target: 45,000+ characters.
 */
export const DENSITY_THRESHOLDS = {
    TOTAL: 45000,
    SECTIONS: {
        executiveSummary: 4000,
        originAudit: 8000,
        lifeFlow: 20000,
        turningPoints: 4000,
        rolling12: 6000,
        luckCalendar: 4000,
        dateDetail: 4000,
        naming: 4000, // If active
    },
    FIELDS: {
        result: 500,
        interpretation: 1000,
        explain: 500
    }
};

/**
 * Required policy phrases for specific conditions.
 */
export const POLICY_PHRASES = {
    TIME_UNKNOWN: "시주 판단 유보",
    HANJA_MISSING: "한자 확정 불가"
};

/**
 * Banned phrases to be stripped by auto-repair.
 */
export const BANNED_PHRASES = [
    "[PENDING_RENDER]",
    "TBD",
    "플레이스홀더",
    "내용을 입력하세요",
    "무료 운세 수준",
    "데이터가 없습니다"
];
