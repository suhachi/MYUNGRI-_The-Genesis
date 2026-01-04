"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assembleReport = assembleReport;
const rollingRange_1 = require("../rollingRange");
const precompute_1 = require("../luckCalendar/precompute");
const hasHan_1 = require("../name/hasHan");
function assembleReport(input) {
    // 1. Executive Summary
    const executiveSummary = assembleExecutiveSummary(input);
    // 2. Origin Audit (Natal Chart)
    const originAudit = assembleOriginAudit(input.pillars);
    // 3. Life Flow (Daewoon)
    const lifeFlow = assembleLifeFlow(input);
    // 4. Rolling 12 Months
    const rolling12 = assembleRolling12(input);
    // 5. Naming (Conditional)
    let naming;
    if ((0, hasHan_1.hasHan)(input.userName)) {
        naming = assembleNaming(input.userName);
    }
    // Assembly
    const report = {
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
function assembleExecutiveSummary(input) {
    // TODO: Connect real Logic
    return {
        sectionId: "EXIT_001",
        title: "Executive Summary",
        resultFacts: { corePattern: "Unknown" },
        interpretationFacts: { summary: "High potential." },
        explainHints: { tone: "Professional" }
    };
}
function assembleOriginAudit(pillars) {
    return {
        sectionId: "ORIG_001",
        title: "Origin Audit",
        resultFacts: { pillars },
        interpretationFacts: { balance: "balanced" },
        explainHints: { focus: "Earth" }
    };
}
function assembleLifeFlow(input) {
    return {
        sectionId: "LIFE_001",
        title: "Life Flow",
        resultFacts: { currentDaewoon: "Gap-Ja" },
        interpretationFacts: { trend: "Rising" },
        explainHints: { strategy: "Invest" }
    };
}
function assembleRolling12(input) {
    const range = (0, rollingRange_1.calculateRollingRange)(input.analysisDate);
    const result = (0, precompute_1.precomputeDailyLuck)(input.analysisDate, input.pillars);
    const records = result.records;
    return {
        sectionId: "ROLL_001",
        title: "Rolling 12 Months",
        resultFacts: { range, recordCount: records.length, records },
        interpretationFacts: { bestMonth: "May" },
        explainHints: { caution: "Winter" }
    };
}
function assembleNaming(userName) {
    return {
        sectionId: "NAME_001",
        title: "Naming Analysis",
        resultFacts: { hasHan: true },
        interpretationFacts: { strokes: "Good" },
        explainHints: { origin: "Hanja" }
    };
}
//# sourceMappingURL=main.js.map