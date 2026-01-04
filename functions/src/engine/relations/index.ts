import { PillarsResult } from '../pillars';
import {
    CHEONGAN_HAB, CHEONGAN_CHUNG,
    JIJI_YUKHAB, JIJI_CHUNG,
    JIJI_SAMHAB, JIJI_BANGHAB
} from './rules';
import { STEMS_HANJA, BRANCHES_HANJA } from '../calendar/ganzhi';

export interface RelationItem {
    type: 'Hab' | 'Chung' | 'Hyeong' | 'Hae' | 'Pa' | 'Gongmang';
    subtype: string; // e.g. 'YukHab', 'SamHab', 'GapGyeongChung'
    pillars: string[]; // e.g. ['year', 'month']
    value?: string; // Result element for Hab
    description: string;
}

export interface RelationsResult {
    list: RelationItem[];
    hasHab: boolean;
    hasChung: boolean;
    hasGongmang: boolean;
}

export function calculateRelations(pillars: PillarsResult): RelationsResult {
    const list: RelationItem[] = [];

    const pKeys = ['year', 'month', 'day', 'hour'] as const;
    const activePillars = pKeys.filter(k => pillars[k] !== null);

    // 1. Cheongan (Stems)
    // Check pairs
    for (let i = 0; i < activePillars.length; i++) {
        for (let j = i + 1; j < activePillars.length; j++) {
            const k1 = activePillars[i];
            const k2 = activePillars[j];
            const s1 = pillars[k1]!.stem;
            const s2 = pillars[k2]!.stem;
            const pair = s1 + s2;

            // Hab
            if (CHEONGAN_HAB[pair]) {
                list.push({
                    type: 'Hab', subtype: 'CheonganHab',
                    pillars: [k1, k2],
                    value: CHEONGAN_HAB[pair],
                    description: `${s1}${s2} 합화 ${CHEONGAN_HAB[pair]}`
                });
            }

            // Chung
            if (CHEONGAN_CHUNG[pair]) {
                list.push({
                    type: 'Chung', subtype: 'CheonganChung',
                    pillars: [k1, k2],
                    description: `${s1}${s2} 충`
                });
            }
        }
    }

    // 2. Jiji (Branches)
    // Check pairs for YukHab, Chung
    for (let i = 0; i < activePillars.length; i++) {
        for (let j = i + 1; j < activePillars.length; j++) {
            const k1 = activePillars[i];
            const k2 = activePillars[j];
            const b1 = pillars[k1]!.branch;
            const b2 = pillars[k2]!.branch;
            const pair = b1 + b2;

            // YukHab
            if (JIJI_YUKHAB[pair]) {
                list.push({
                    type: 'Hab', subtype: 'YukHab',
                    pillars: [k1, k2],
                    value: JIJI_YUKHAB[pair],
                    description: `${b1}${b2} 육합 (${JIJI_YUKHAB[pair]})`
                });
            }

            // Chung
            if (JIJI_CHUNG[pair]) {
                list.push({
                    type: 'Chung', subtype: 'JijiChung',
                    pillars: [k1, k2],
                    description: `${b1}${b2} 충`
                });
            }
        }
    }

    // Check SamHab / BangHab (Sets of 3)
    // Gather all branches
    const branchMap: Record<string, string> = {
        'year': pillars.year.branch,
        'month': pillars.month.branch,
        'day': pillars.day.branch
    };
    if (pillars.hour) branchMap['hour'] = pillars.hour.branch;

    const branches = Object.values(branchMap);

    // Check each SamHab rule
    for (const rule of JIJI_SAMHAB) {
        // rule.key is string "寅午戌"
        const target = rule.key.split('');
        // Check if branches contains ALL target chars?
        // Or if branches INTERSECT?
        // Full SamHab: All 3 present.
        // BanHab (Half): 2 present (usually Center + another, or Start + End).
        // Let's implement Full SamHab first for safety.

        const matches = target.filter(t => branches.includes(t));
        if (matches.length === 3) {
            list.push({
                type: 'Hab', subtype: 'SamHab',
                pillars: Object.keys(branchMap).filter(k => target.includes(branchMap[k])),
                value: rule.value,
                description: `${rule.key} 삼합 (${rule.value}국)`
            });
        }
    }

    // Check BangHab
    for (const rule of JIJI_BANGHAB) {
        const target = rule.key.split('');
        const matches = target.filter(t => branches.includes(t));
        if (matches.length === 3) {
            list.push({
                type: 'Hab', subtype: 'BangHab',
                pillars: Object.keys(branchMap).filter(k => target.includes(branchMap[k])),
                value: rule.value,
                description: `${rule.key} 방합 (${rule.value}방)`
            });
        }
    }

    // 3. Gongmang
    // Based on Day Pillar (Iljin)
    const dayStem = pillars.day.stem;
    const dayBranch = pillars.day.branch;

    const sIdx = STEMS_HANJA.indexOf(dayStem);
    const bIdx = BRANCHES_HANJA.indexOf(dayBranch);

    if (sIdx >= 0 && bIdx >= 0) {
        // Gap(0)..Gye(9). Ja(0)..Hae(11).
        // Xun Head (Start of 10-day cycle): BranchIdx - StemIdx.
        // Formula: Void1 = (10 + BranchIdx - StemIdx) % 12

        const v1Idx = (10 + bIdx - sIdx + 12) % 12;
        const v2Idx = (v1Idx + 1) % 12;

        const void1 = BRANCHES_HANJA[v1Idx];
        const void2 = BRANCHES_HANJA[v2Idx];
        const voidSet = [void1, void2];

        // internal check
        // GapJa(0,0) -> 10, 11 (Sul, Hae).
        // GapSul(0,10) -> (10+10-0)=20=8(Sin), 9(Yu).

        // Scan other pillars
        for (const k of activePillars) {
            if (k === 'day') continue; // Day cannot be void by itself (it DEFINES void)
            const b = pillars[k]!.branch;
            if (voidSet.includes(b)) {
                list.push({
                    type: 'Gongmang', subtype: 'Gongmang',
                    pillars: [k],
                    description: `${k} 공망 (${b})`
                });
            }
        }
    }

    return {
        list,
        hasHab: list.some(i => i.type === 'Hab'),
        hasChung: list.some(i => i.type === 'Chung'),
        hasGongmang: list.some(i => i.type === 'Gongmang')
    };
}
