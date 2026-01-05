"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeterministicPacket = generateDeterministicPacket;
const pillars_1 = require("./pillars");
const daewoon_1 = require("./daewoon");
const sewoon_1 = require("./sewoon");
const calendar365_1 = require("./calendar365");
const precompute_1 = require("./calendar365/precompute");
const naming_1 = require("./naming");
/**
 * [Phase 28] ATOMIC-R2-02: Deterministic Engine Entry Point
 * - No LLM, No Network.
 * - Pure data packet output.
 */
function generateDeterministicPacket(input, userName) {
    // 1. Core Pillars (Ipchun-based)
    const pillars = (0, pillars_1.calculatePillars)(input);
    // 2. Daewoon (3 days = 1 year, minute precision)
    const daewoon = (0, daewoon_1.calculateDaewoon)({
        birthDate: pillars.normalization.solarDate,
        birthTime: input.birthTime,
        sex: input.sex,
        yearStem: pillars.year.stem,
        monthStem: pillars.month.stem,
        monthBranch: pillars.month.branch,
        timezone: input.timezone
    });
    // 3. Sewoon (Current Year)
    const currentYear = new Date().getUTCFullYear();
    const sewoon = (0, sewoon_1.calculateSewoon)(currentYear, pillars);
    // 4. Calendar 365 (Rolling 12 Months)
    const range = (0, calendar365_1.calculateRollingRange)(pillars.normalization.solarDate);
    const dailyLuck = (0, precompute_1.precomputeDailyLuck)(pillars.normalization.solarDate, pillars);
    // 5. Naming (Conditional)
    let naming;
    if (userName) {
        naming = (0, naming_1.analyzeNaming)(userName);
    }
    return {
        algorithmVersion: "Genesis-V6.0-PURE",
        computedAt: new Date().toISOString(),
        input,
        pillars,
        daewoon,
        sewoon,
        calendar365: {
            range,
            dailyLuck: dailyLuck.records
        },
        naming
    };
}
//# sourceMappingURL=index.js.map