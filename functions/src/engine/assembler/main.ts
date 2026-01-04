import { FullReportData, ReportSection } from '../../contracts/output.schema';
import { PillarsResult } from '../pillars';
import { calculateRollingRange } from '../rollingRange';
import { precomputeDailyLuck } from '../luckCalendar/precompute';
import { hasHan } from '../name/hasHan';
// Import other engine modules as needed...

// P8-ATOMIC-001: Report Assembly Pipeline

export interface AssemblyInput {
    userName: string;
    koreanAge: number; // or birthDate
    analysisDate: string;
    pillars: PillarsResult;
    // ... input for other engines
}

export function assembleReport(input: AssemblyInput): FullReportData {
    // 1. Executive Summary
    const executiveSummary = assembleExecutiveSummary(input);

    // 2. Origin Audit (Natal Chart)
    const originAudit = assembleOriginAudit(input.pillars);

    // 3. Life Flow (Daewoon)
    const lifeFlow = assembleLifeFlow(input);

    // 4. Rolling 12 Months
    const rolling12 = assembleRolling12(input);

    // 5. Naming (Conditional)
    let naming: ReportSection | undefined;
    if (hasHan(input.userName)) {
        naming = assembleNaming(input.userName);
    }

    // Assembly
    const report: FullReportData = {
        meta: {
            version: "1.0.0",
            generatedAt: new Date().toISOString()
        },
        sections: {
            executiveSummary,
            originAudit,
            lifeFlow,
            rolling12,
            naming
        }
    };

    return report;
}

// --- Sub-Assemblers (Skeleton for Atomic) ---

function assembleExecutiveSummary(input: AssemblyInput): ReportSection {
    // TODO: Connect real Logic
    return {
        sectionId: "EXIT_001",
        title: "Executive Summary",
        resultFacts: { corePattern: "Unknown" },
        interpretationFacts: { summary: "High potential." },
        explainHints: { tone: "Professional" }
    };
}

function assembleOriginAudit(pillars: PillarsResult): ReportSection {
    return {
        sectionId: "ORIG_001",
        title: "Origin Audit",
        resultFacts: { pillars },
        interpretationFacts: { balance: "balanced" },
        explainHints: { focus: "Earth" }
    };
}

function assembleLifeFlow(input: AssemblyInput): ReportSection {
    return {
        sectionId: "LIFE_001",
        title: "Life Flow",
        resultFacts: { currentDaewoon: "Gap-Ja" },
        interpretationFacts: { trend: "Rising" },
        explainHints: { strategy: "Invest" }
    };
}

function assembleRolling12(input: AssemblyInput): ReportSection {
    const range = calculateRollingRange(input.analysisDate);
    const result = precomputeDailyLuck(input.analysisDate, input.pillars);
    const records = result.records;
    return {
        sectionId: "ROLL_001",
        title: "Rolling 12 Months",
        resultFacts: { range, recordCount: records.length, records },
        interpretationFacts: { bestMonth: "May" },
        explainHints: { caution: "Winter" }
    };
}

function assembleNaming(userName: string): ReportSection {
    return {
        sectionId: "NAME_001",
        title: "Naming Analysis",
        resultFacts: { hasHan: true },
        interpretationFacts: { strokes: "Good" },
        explainHints: { origin: "Hanja" }
    };
}
