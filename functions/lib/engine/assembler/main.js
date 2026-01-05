"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assembleReport = assembleReport;
/**
 * [Phase 28] ATOMIC-R2-03: Report Assembly Pipeline
 * - Maps DeterministicPacket -> Narrative Report Structure
 * - Whitelist-only access to deterministic data
 */
function assembleReport(packet) {
    // 1. Executive Summary
    const executiveSummary = assembleExecutiveSummary(packet);
    // 2. Origin Audit (Natal Chart)
    const originAudit = assembleOriginAudit(packet);
    // 3. Life Flow (Daewoon)
    const lifeFlow = assembleLifeFlow(packet);
    // 4. Rolling 12 Months
    const rolling12 = assembleRolling12(packet);
    // 5. Naming (Conditional)
    let naming;
    if (packet.naming) {
        naming = assembleNaming(packet.naming);
    }
    const report = {
        meta: {
            version: packet.algorithmVersion,
            generatedAt: packet.computedAt
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
// --- Sub-Assemblers ---
function assembleExecutiveSummary(packet) {
    return {
        sectionId: "EXIT_001",
        title: "종합 분석 요약",
        resultFacts: {
            corePattern: "Unknown",
            solarDate: packet.pillars.normalization.solarDate
        },
        interpretationFacts: { summary: "분석 진행 중..." },
        explainHints: { tone: "Professional" },
        result: "",
        explain: "",
        interpretation: "",
    };
}
function assembleOriginAudit(packet) {
    return {
        sectionId: "ORIG_001",
        title: "타고난 성향 (원국)",
        resultFacts: { pillars: packet.pillars },
        interpretationFacts: { balance: "계산됨" },
        explainHints: { focus: "Five Elements" },
        result: "",
        explain: "",
        interpretation: "",
    };
}
function assembleLifeFlow(packet) {
    return {
        sectionId: "LIFE_001",
        title: "대운 및 인생의 흐름",
        resultFacts: {
            direction: packet.daewoon.direction,
            startAge: packet.daewoon.startAge,
            segments: packet.daewoon.segments
        },
        interpretationFacts: { trend: "계산됨" },
        explainHints: { strategy: "Life Cycle" },
        result: "",
        explain: "",
        interpretation: "",
    };
}
function assembleRolling12(packet) {
    return {
        sectionId: "ROLL_001",
        title: "최근 1년 운세 흐름",
        resultFacts: {
            range: packet.calendar365.range,
            dailyLuckCount: packet.calendar365.dailyLuck.length
        },
        interpretationFacts: { bestMonth: "계산됨" },
        explainHints: { caution: "Seasonal" },
        result: "",
        explain: "",
        interpretation: "",
    };
}
function assembleNaming(namingData) {
    return {
        sectionId: "NAME_001",
        title: "성명 분석 (이름의 기운)",
        resultFacts: { ...namingData },
        interpretationFacts: { strokes: "분석됨" },
        explainHints: { origin: "Hanja/Phonetic" },
        result: "",
        explain: "",
        interpretation: "",
    };
}
//# sourceMappingURL=main.js.map