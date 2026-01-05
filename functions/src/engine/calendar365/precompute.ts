import { calculateRollingRange } from './index';
import { convertToLunar } from '../calendar/converter';
import { toHanjaGanji, Ganzhi } from '../calendar/ganzhi';
import { getTenGod, getElement, Element } from '../tenGod';
import { PillarsResult } from '../pillars';
import { RelationsResult, RelationItem } from '../relations';
import { CHEONGAN_HAB, CHEONGAN_CHUNG, JIJI_YUKHAB, JIJI_CHUNG } from '../relations/rules';

export interface DailyLuckRecord {
    dateKey: string; // YYYY-MM-DD
    ganzhi: {
        year: Ganzhi;
        month: Ganzhi;
        day: Ganzhi;
    };
    tenGod: {
        dayStem: string; // TenGod of Day Stem vs Day Master
        dayBranch: string; // TenGod of Day Branch vs Day Master
    };
    fiveElementsDelta: {
        stem: Element;
        branch: Element;
    };
    eventFlags: {
        hasHab: boolean;
        hasChung: boolean;
        special: string[]; // e.g. "CheonganHab", "JijiChung"
    };
    headline: string;
    evidenceSummary: string;
    detailAnchorId: string;
}

export interface PrecomputeResult {
    range: { start: string; end: string };
    records: DailyLuckRecord[];
}

/**
 * P6-ATOMIC-002: Precompute Daily Luck Records
 * Generates 365+ daily records for the rolling year.
 */
export function precomputeDailyLuck(analysisDate: string, natalPillars: PillarsResult): PrecomputeResult {
    const range = calculateRollingRange(analysisDate);
    const records: DailyLuckRecord[] = [];

    const dayMaster = natalPillars.day.stem;

    for (const dateKey of range.dates) {
        const [y, m, d] = dateKey.split('-').map(Number);

        // 1. Get Lunar/Ganzhi for the day
        let lunar;
        try {
            lunar = convertToLunar(y, m, d);
        } catch (e) {
            console.warn(`Skipping date ${dateKey} due to conversion error`);
            continue;
        }

        const yearGanji = toHanjaGanji(lunar.secha);
        const monthGanji = toHanjaGanji(lunar.wolgeon);
        const dayGanji = toHanjaGanji(lunar.iljin);

        // 2. Ten God (Day Pillar vs Day Master)
        const stemTenGod = getTenGod(dayMaster, dayGanji.stem);
        const branchTenGod = getTenGod(dayMaster, dayGanji.branch);

        // 3. Five Elements
        const stemElem = getElement(dayGanji.stem);
        const branchElem = getElement(dayGanji.branch);

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
                stem: stemElem!,
                branch: branchElem!
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
function checkDailyRelations(daily: Ganzhi, natal: PillarsResult): RelationsResult {
    const list: RelationItem[] = [];
    const targets = [natal.year, natal.month, natal.day, natal.hour].filter(p => p !== null) as Ganzhi[];
    const targetNames = ['year', 'month', 'day', 'hour']; // Corresponding names

    // Check Stem (Cheongan)
    targets.forEach((target, idx) => {
        const pair = daily.stem + target.stem;
        const pairRev = target.stem + daily.stem;

        // Hab
        let habVal = CHEONGAN_HAB[pair] || CHEONGAN_HAB[pairRev];
        if (habVal) {
            list.push({
                type: 'Hab', subtype: 'CheonganHab',
                pillars: ['daily', targetNames[idx]],
                value: habVal,
                description: `일운 ${daily.stem}와 원국 ${target.stem}의 합`
            });
        }

        // Chung
        let chungVal = CHEONGAN_CHUNG[pair] || CHEONGAN_CHUNG[pairRev];
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
        let habVal = JIJI_YUKHAB[pair] || JIJI_YUKHAB[pairRev];
        if (habVal) {
            list.push({
                type: 'Hab', subtype: 'YukHab',
                pillars: ['daily', targetNames[idx]],
                value: habVal,
                description: `일운 ${daily.branch}와 원국 ${target.branch}의 육합`
            });
        }

        // Chung
        let chungVal = JIJI_CHUNG[pair] || JIJI_CHUNG[pairRev];
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
function generateDailyHeadline(
    stemTenGod: string,
    branchTenGod: string,
    relations: RelationsResult,
    stemElem: Element | null,
    branchElem: Element | null
): { headline: string, evidence: string } {
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
