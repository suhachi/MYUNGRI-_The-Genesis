// P8-ATOMIC-001: Output Schema Definition

export interface ReportSection {
    sectionId: string;
    title: string;
    resultFacts: Record<string, any>;
    interpretationFacts: Record<string, any>;
    explainHints: Record<string, any>;

    // Frontend Compatibility Fields (Narrated)
    result?: string;
    explain?: string;
    interpretation?: string;
}

export interface FullReportData {
    meta: {
        version: string;
        generatedAt: string;
    };
    sections: {
        executiveSummary: ReportSection;
        originAudit: ReportSection;
        lifeFlow: ReportSection;
        rolling12: ReportSection;
        naming?: ReportSection; // Conditional
    };
}
