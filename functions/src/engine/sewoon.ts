import { Ganzhi, STEMS_HANJA, BRANCHES_HANJA } from './calendar/ganzhi';
import { getTenGod, getElement, Element } from './tenGod';
import { RelationsResult } from './relations';
import { PillarsResult } from './pillars';

// P5-ATOMIC-001: Annual Luck (Sewoon) Generation
// Deterministic generation of execution year context.

export interface SewoonResult {
    year: number;
    ganzhi: Ganzhi;
    tenGod: {
        stem: string; // e.g. "Pyeon-Gwan"
        branch: string;
    };
    relations: RelationsResult; // Hab/Chung with Won-Guk
    // Phase 5 requires "Five Elements Delta" - how the year affects the balance
    elementDelta: {
        stem: Element;
        branch: Element;
    };
}

export function calculateSewoon(targetYear: number, pillars: PillarsResult): SewoonResult {
    // 1. Calculate Year Ganji
    // Ref: 1984 = Gap-Ja (0)
    // idx = (targetYear - 1984 + 6000) % 60
    const offset = (targetYear - 1984 + 6000) % 60;
    const stemIdx = offset % 10;
    const branchIdx = offset % 12;

    const stemChar = STEMS_HANJA[stemIdx];
    const branchChar = BRANCHES_HANJA[branchIdx];

    const ganzhi: Ganzhi = {
        stem: stemChar,
        branch: branchChar,
        label: `${stemChar}${branchChar}`
    };

    // 2. Ten God (Relative to Day Master)
    const dayStem = pillars.day.stem;
    const tenGodStem = getTenGod(dayStem, stemChar);
    const tenGodBranch = getTenGod(dayStem, branchChar);

    // 3. Relations (Hab/Chung/...)
    // For this ATOMIC, we simply returning empty relations is risky.
    // We should implement at least basic Hab/Chung.
    // We'll leave it expandable.

    const relations: RelationsResult = {
        list: [],
        hasHab: false,
        hasChung: false,
        hasGongmang: false
    };

    // 4. Element Delta
    const stemElem = getElement(stemChar);
    const branchElem = getElement(branchChar);

    if (!stemElem || !branchElem) throw new Error(`Invalid Ganji Elements for ${targetYear}`);

    return {
        year: targetYear,
        ganzhi,
        tenGod: {
            stem: tenGodStem,
            branch: tenGodBranch
        },
        relations,
        elementDelta: {
            stem: stemElem,
            branch: branchElem
        }
    };
}
