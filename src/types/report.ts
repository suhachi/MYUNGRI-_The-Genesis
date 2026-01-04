// Report Types for Phase 26
export interface ReasonCard {
    title: string;
    evidence: string[];
    patchCode: string[];
    riskIfIgnored: string;
}

export interface Section {
    id: string;
    title: string;
    content?: string; // Legacy support
    category: string;
    type?: string;
    reasonCards?: ReasonCard[];
    // Phase 27: 3단 구조
    result?: string;
    explain?: string;
    interpretation?: string;
}

export interface ReportMeta {
    title: string;
    summary: string;
    fateRuntimeModel?: string; // 命/運 모델 요약
    strategistMeta?: {
        disclaimer?: string;
    };
}

export interface DayEntry {
    date: string; // YYYY-MM-DD
    score: number;
    grade: "GOOD" | "WARN" | "CAUTION";
    dayGanji?: string;
    reasons: string[];
    actionPlan: string[];
    eventFit: {
        contract: string;
        signboard: string;
        launch: string;
    };
}

export interface LuckCalendar {
    year: number;
    generatedAt: string | any; // Supports ISO String or Timestamp object
    calendar: DayEntry[];
}
