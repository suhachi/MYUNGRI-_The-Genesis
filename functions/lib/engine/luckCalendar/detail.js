"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyDetail = getDailyDetail;
const precompute_1 = require("./precompute");
function getDailyDetail(birthPillars, dateKey) {
    // 1. Generate records (using precompute for consistency)
    // Optimization: In a real DB scenario, we would query by ID.
    // Here, we re-compute.
    const result = (0, precompute_1.precomputeDailyLuck)(dateKey, birthPillars);
    // The precompute generates range starting from dateKey.
    // So the first record is the one we want.
    const record = result.records[0];
    if (!record || record.dateKey !== dateKey) {
        throw new Error(`Failed to compute detail for ${dateKey}`);
    }
    // 2. Add Category-based Guidance
    // Deterministic, no absolute claims.
    const guidance = generateGuidance(record);
    return {
        ...record,
        categoryGuidance: guidance
    };
}
function generateGuidance(record) {
    const tenGod = record.tenGod.dayStem;
    // Simple mapping based on TenGod
    if (tenGod.includes("비견") || tenGod.includes("겁재")) {
        return "주체성이 강해지는 시기입니다. 독단적인 결정을 주의하고 협력을 모색해보세요.";
    }
    if (tenGod.includes("식신") || tenGod.includes("상관")) {
        return "표현욕구가 높아지는 날입니다. 창의적인 활동에 유리하지만 언행에 신중함이 필요합니다.";
    }
    if (tenGod.includes("편재") || tenGod.includes("정재")) {
        return "실속을 챙기기 좋은 흐름입니다. 재정적인 계획을 점검하거나 결과를 확인해보세요.";
    }
    if (tenGod.includes("편관") || tenGod.includes("정관")) {
        return "책임감과 원칙이 중요해지는 날입니다. 규칙을 준수하고 명예를 지키는 것이 좋습니다.";
    }
    if (tenGod.includes("편인") || tenGod.includes("정인")) {
        return "생각이 깊어지는 하루입니다. 학업이나 연구, 자기 성찰에 시간을 투자해보세요.";
    }
    return "평온한 마음으로 하루를 보내세요.";
}
//# sourceMappingURL=detail.js.map