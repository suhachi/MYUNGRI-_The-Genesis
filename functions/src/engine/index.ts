import { calculatePillars, PillarsInput, PillarsResult } from './pillars';
import { calculateDaewoon, DaewoonResult } from './daewoon';
import { calculateSewoon, SewoonResult } from './sewoon';
import { calculateRollingRange, RollingRange } from './calendar365';
import { precomputeDailyLuck } from './calendar365/precompute';
import { analyzeNaming, NamingResult } from './naming';
import { generateDeterminismHash } from './hash';

export interface DeterministicPacket {
    algorithmVersion: string;
    computedAt: string;
    determinismHash: string;
    input: PillarsInput;
    pillars: PillarsResult;
    daewoon: DaewoonResult;
    sewoon: SewoonResult;
    calendar365: {
        range: RollingRange;
        dailyLuck: any;
    };
    naming?: NamingResult;
}

/**
 * [Phase 28] ATOMIC-R2-02: Deterministic Engine Entry Point
 * - No LLM, No Network.
 * - Pure data packet output.
 */
export function generateDeterministicPacket(input: PillarsInput, userName?: string): DeterministicPacket {
    // 1. Core Pillars (Ipchun-based)
    const pillars = calculatePillars(input);

    // 2. Daewoon (3 days = 1 year, minute precision)
    const daewoon = calculateDaewoon({
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
    const sewoon = calculateSewoon(currentYear, pillars);

    // 4. Calendar 365 (Rolling 12 Months)
    const range = calculateRollingRange(pillars.normalization.solarDate);
    const dailyLuck = precomputeDailyLuck(pillars.normalization.solarDate, pillars);

    // 5. Naming (Conditional)
    let naming: NamingResult | undefined;
    if (userName) {
        naming = analyzeNaming(userName);
    }

    // [ATOMIC-R2-05] Determinism Hash
    const hashData = {
        input,
        pillars: {
            year: pillars.year,
            month: pillars.month,
            day: pillars.day,
            hour: pillars.hour
        },
        daewoon: {
            direction: daewoon.direction,
            startAge: daewoon.startAge,
            segments: daewoon.segments.map(s => ({ age: s.startAge, stem: s.ganzhi.stem, branch: s.ganzhi.branch }))
        }
    };
    const determinismHash = generateDeterminismHash(hashData);

    return {
        algorithmVersion: "Genesis-V6.0-PURE",
        computedAt: new Date().toISOString(),
        determinismHash,
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
