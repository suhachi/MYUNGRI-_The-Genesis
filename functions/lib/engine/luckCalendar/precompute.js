"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.precomputeDailyLuck = precomputeDailyLuck;
const rollingRange_1 = require("../rollingRange");
const converter_1 = require("../calendar/converter");
const ganzhi_1 = require("../calendar/ganzhi");
const tenGod_1 = require("../tenGod");
const rules_1 = require("../relations/rules");
/**
 * P6-ATOMIC-002: Precompute Daily Luck Records
 * Generates 365+ daily records for the rolling year.
 */
function precomputeDailyLuck(analysisDate, natalPillars) {
    const range = (0, rollingRange_1.calculateRollingRange)(analysisDate);
    const records = [];
    const dayMaster = natalPillars.day.stem;
    for (const dateKey of range.dates) {
        const [y, m, d] = dateKey.split('-').map(Number);
        // 1. Get Lunar/Ganzhi for the day
        let lunar;
        try {
            lunar = (0, converter_1.convertToLunar)(y, m, d);
        }
        catch (e) {
            console.warn(`Skipping date ${dateKey} due to conversion error`);
            continue;
        }
        const yearGanji = (0, ganzhi_1.toHanjaGanji)(lunar.secha);
        const monthGanji = (0, ganzhi_1.toHanjaGanji)(lunar.wolgeon);
        const dayGanji = (0, ganzhi_1.toHanjaGanji)(lunar.iljin);
        // 2. Ten God (Day Pillar vs Day Master)
        const stemTenGod = (0, tenGod_1.getTenGod)(dayMaster, dayGanji.stem);
        const branchTenGod = (0, tenGod_1.getTenGod)(dayMaster, dayGanji.branch);
        // 3. Five Elements
        const stemElem = (0, tenGod_1.getElement)(dayGanji.stem);
        const branchElem = (0, tenGod_1.getElement)(dayGanji.branch);
        // 4. Relations (Luck vs Natal)
        const relations = checkDailyRelations(dayGanji, natalPillars);
        // 5. Headline & Evidence
        const { headline, evidence } = generateDailyHeadline(stemTenGod, branchTenGod, relations, stemElem, branchElem);
        records.push({
            dateKey,
            ganzhi: {
                year: yearGanji,
                month: monthGanji,
                day: dayGanji
            },
            tenGod: {
                dayStem: stemTenGod,
                dayBranch: branchTenGod
            },
            fiveElementsDelta: {
                stem: stemElem,
                branch: branchElem
            },
            eventFlags: {
                hasHab: relations.hasHab,
                hasChung: relations.hasChung,
                special: relations.list.map(r => r.subtype)
            },
            headline,
            evidenceSummary: evidence,
            detailAnchorId: `detail-${dateKey}`
        });
    }
    return {
        range: { start: range.startDate, end: range.endDate },
        records
    };
}
// Helper: Check relations between Daily Pillar and Natal Pillars
function checkDailyRelations(daily, natal) {
    const list = [];
    const targets = [natal.year, natal.month, natal.day, natal.hour].filter(p => p !== null);
    const targetNames = ['year', 'month', 'day', 'hour']; // Corresponding names
    // Check Stem (Cheongan)
    targets.forEach((target, idx) => {
        const pair = daily.stem + target.stem;
        const pairRev = target.stem + daily.stem;
        // Hab
        let habVal = rules_1.CHEONGAN_HAB[pair] || rules_1.CHEONGAN_HAB[pairRev];
        if (habVal) {
            list.push({
                type: 'Hab', subtype: 'CheonganHab',
                pillars: ['daily', targetNames[idx]],
                value: habVal,
                description: `일운 ${daily.stem}와 원국 ${target.stem}의 합`
            });
        }
        // Chung
        let chungVal = rules_1.CHEONGAN_CHUNG[pair] || rules_1.CHEONGAN_CHUNG[pairRev];
        if (chungVal) {
            list.push({
                type: 'Chung', subtype: 'CheonganChung',
                pillars: ['daily', targetNames[idx]],
                description: `일운 ${daily.stem}와 원국 ${target.stem}의 충`
            });
        }
    });
    // Check Branch (Jiji)
    targets.forEach((target, idx) => {
        const pair = daily.branch + target.branch;
        const pairRev = target.branch + daily.branch;
        // YukHab
        let habVal = rules_1.JIJI_YUKHAB[pair] || rules_1.JIJI_YUKHAB[pairRev];
        if (habVal) {
            list.push({
                type: 'Hab', subtype: 'YukHab',
                pillars: ['daily', targetNames[idx]],
                value: habVal,
                description: `일운 ${daily.branch}와 원국 ${target.branch}의 육합`
            });
        }
        // Chung
        let chungVal = rules_1.JIJI_CHUNG[pair] || rules_1.JIJI_CHUNG[pairRev];
        if (chungVal) {
            list.push({
                type: 'Chung', subtype: 'JijiChung',
                pillars: ['daily', targetNames[idx]],
                description: `일운 ${daily.branch}와 원국 ${target.branch}의 충`
            });
        }
    });
    return {
        list,
        hasHab: list.some(r => r.type === 'Hab'),
        hasChung: list.some(r => r.type === 'Chung'),
        hasGongmang: false
    };
}
// Helper: Deterministic Headline Template
function generateDailyHeadline(stemTenGod, branchTenGod, relations, stemElem, branchElem) {
    let headline = "";
    let evidence = "";
    // Priority 1: Chung (Conflict)
    if (relations.hasChung) {
        const chungItem = relations.list.find(r => r.type === 'Chung');
        headline = `변화와 충돌이 예상되는 날 (${chungItem?.description})`;
        evidence = `일운과 원국 사이에 ${chungItem?.subtype}이 발생하여 주의가 필요합니다.`;
        return { headline, evidence };
    }
    // Priority 2: Hab (Harmony)
    if (relations.hasHab) {
        const habItem = relations.list.find(r => r.type === 'Hab');
        headline = `조화와 협력이 깃드는 날 (${habItem?.description})`;
        evidence = `일운과 원국이 합을 이루어 순조로운 흐름이 예상됩니다.`;
        return { headline, evidence };
    }
    // Priority 3: Ten God (Dominant Energy)
    // Use Stem TenGod as primary
    headline = `${stemTenGod}의 기운이 강한 하루입니다.`;
    evidence = `천간에 ${stemTenGod}(${stemElem}), 지지에 ${branchTenGod}(${branchElem})이 들어옵니다.`;
    return { headline, evidence };
}
//# sourceMappingURL=precompute.js.map