import { convertToSolar, convertToLunar, SolarResult } from '../calendar/converter';
import { toHanjaGanji, Ganzhi, STEMS_HANJA, BRANCHES_HANJA } from '../calendar/ganzhi';
import { calculateTrueSolarTime, TrueSolarTimeResult, addDaysUTC, parseYMDToUTCDate } from '../calendar/time';
import { getSolarTermDate } from '../calendar/astronomy';

export interface Pillar extends Ganzhi {
    // Just the basic ganzhi info
}

export interface PillarsResult {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar | null;
    forensicTime?: TrueSolarTimeResult;
    normalization: {
        solarDate: string;
        isLeapMonth: boolean;
    };
}

export interface PillarsInput {
    birthDate: string; // YYYY-MM-DD
    birthTime: string; // HH:mm, or empty if unknown
    timeUnknown: boolean;
    calendar: 'solar' | 'lunar';
    isLeapMonth: boolean; // Only relevant for lunar
    sex: 'male' | 'female';
    timezone: string; // Default 'Asia/Seoul'
}

export function calculatePillars(input: PillarsInput): PillarsResult {
    const [yStr, mStr, dStr] = input.birthDate.split('-');
    const year = parseInt(yStr, 10);
    const month = parseInt(mStr, 10);
    const day = parseInt(dStr, 10);

    // 1. Calendar Normalization (Lunar -> Solar)
    // 1. Calendar Normalization (Lunar -> Solar)
    let solarDate: SolarResult;

    if (input.calendar === 'lunar') {
        solarDate = convertToSolar(year, month, day, input.isLeapMonth);
    } else {
        solarDate = { year, month, day, isLeapMonth: false };
    }

    // 2. Pillars Mapping with Ipchun Logic (P3-ATOMIC-001)

    // Convert SolarDate (Effective Date including Day Shift) to correct format
    const solarDateObj = parseYMDToUTCDate(`${solarDate.year}-${String(solarDate.month).padStart(2, '0')}-${String(solarDate.day).padStart(2, '0')}`);

    // Time Correction (already done logically if day shifted? No, let's refine)
    // We already moved to Step 3 for time correction? 
    // Need Time FIRST to compare with Ipchun accurately (Minute precision).

    let forensic: TrueSolarTimeResult | undefined;
    let effectiveDate = solarDateObj;
    let birthDateForIpchun = solarDateObj; // If no time, use Date 00:00

    if (!input.timeUnknown && input.birthTime) {
        forensic = calculateTrueSolarTime(solarDateObj, input.birthTime, input.timezone);
        // Apply day shift for Calendar Iljin?
        effectiveDate = addDaysUTC(solarDateObj, forensic.dayShift);

        // Accurate birth datetime for Ipchun check
        // birthDateForIpchun = solarDateObj + birthTime (Minutes)
        const [hh, mm] = input.birthTime.split(':').map(Number);
        birthDateForIpchun = new Date(Date.UTC(solarDate.year, solarDate.month - 1, solarDate.day, hh, mm));
    }

    // Standard Pillars from kor-lunar (Lunar New Year based)
    // We need to override Year Pillar IF Ipchun logic applies.

    // Re-fetch lunar data based on EFFECTIVE date (Day Shift applied)
    const effectiveYear = effectiveDate.getUTCFullYear();
    const effectiveMonth = effectiveDate.getUTCMonth() + 1;
    const effectiveDay = effectiveDate.getUTCDate();

    const finalLunar = convertToLunar(effectiveYear, effectiveMonth, effectiveDay);

    let yearPillar = toHanjaGanji(finalLunar.secha);
    const monthPillar = toHanjaGanji(finalLunar.wolgeon);
    const dayPillar = toHanjaGanji(finalLunar.iljin);

    // [P3-ATOMIC-001] Ipchun Correction
    // Calculate Ipchun for the birth year (Solar Year)
    // Note: If born early 2024 (Jan 1), we check Ipchun 2024 (Feb 4).
    // If born < Ipchun, it matches 2023 (Previous Year).
    // If born >= Ipchun, it matches 2024 (Current Year).

    // Which year to check? 
    // We base on the SOLAR year of birth.
    const solarY = solarDate.year;

    // Import dynamically or static? We are inside function. 
    // Ideally import at top level. We will add import.
    // For now assuming getSolarTermDate available via import.

    // 315 deg is Ipchun.
    const ipchunDate = getSolarTermDate(solarY, 315);

    // Adjust Ipchun Date to input Timezone? 
    // getSolarTermDate returns UTC Date.
    // birthDateForIpchun is UTC Date derived from Input (Local) Time?
    // Wait. input.birthTime is Local Time (e.g. KST).
    // We construct birthDateForIpchun as UTC (treating input components as UTC components).
    // This compares UTC to UTC? NO.
    // getSolarTermDate returns absolute UTC moment.
    // birthDateForIpchun constructed via Date.UTC(..., hh, mm) assumes input is UTC.
    // BUT input is Local Time (e.g. KST).
    // We must convert "Local Birth Time" to "Absolute UTC" to compare with Ipchun UTC.

    // Simple offset: KST = UTC+9.
    // UTC = Local - 9h.
    // However, input.timezone could be anything.
    // For Phase 3, we assume KST input mainly or handle simplified offset.
    // "functions/src/engine/calendar/time.ts" used 135.0 meridian/time offset logic.
    // Let's rely on timezone offset of the input date string?
    // We don't have a library for "Asia/Seoul" -> offset here easily without Intl.
    // Hardcode KST (UTC+9) for Phase 2/3 as per typical Saju requirement (Korean Saju).

    let birthTimeUTC = birthDateForIpchun.getTime() - (9 * 60 * 60 * 1000);
    if (input.timezone !== 'Asia/Seoul') {
        // TODO: Handle other timezones properly in future
        console.warn("Timezone support limited to KST in P3. Analyzing as KST-9h.");
    }

    let isBeforeIpchun = birthTimeUTC < ipchunDate.getTime();

    // Determine Correct Year Ganji
    // Ganji Cycle:
    // ... Gye-Myo(2023) -> Gap-Jin(2024) ...
    // Standard formula: (Year - 4) % 60.
    // 2024 - 4 = 2020. 2020 % 60 = 40. 
    // 0=GapJa ... 40=GapJin? No.
    // 1984 -> 0. 2024 -> 40. 
    // Gap(0) Jin(4). 

    // Calculate Index based on Solar Year
    // If before Ipchun, Year = SolarYear - 1.
    // If after/equal, Year = SolarYear.

    const sajuYear = isBeforeIpchun ? solarY - 1 : solarY;

    // Map sajuYear to Ganji
    // Base: 1984 = GapJa (0)
    // idx = (sajuYear - 1984 + 6000) % 60;
    const yearIdx = (sajuYear - 1984 + 6000) % 60;
    const stemIdx = yearIdx % 10;
    const branchIdx = yearIdx % 12;

    yearPillar = {
        stem: STEMS_HANJA[stemIdx],
        branch: BRANCHES_HANJA[branchIdx],
        label: `${STEMS_HANJA[stemIdx]}${BRANCHES_HANJA[branchIdx]}`
    };

    // 3. Hour Pillar Calculation
    let hourPillar: Pillar | null = null;
    if (!input.timeUnknown && forensic) {
        // Calculate Hour Index (0-11)
        // forensic.trueMinutes contains total true solar minutes (0-1440)
        // Rate: 120min per branch. Center 00:00 is Rat.
        // Rat: 23:00-01:00 (Standard) OR 23:30-01:30 (adjusted). 
        // Logic: (min + 30) / 120 % 12 covers the 23:30 shift naturally?
        // Let's trace: 
        // 23:30 = 1410 min. (1410 + 30) = 1440. 1440 / 120 = 12. 12 % 12 = 0 (Rat). Correct.
        // 01:29 = 89 min. (89 + 30) = 119. 119/120 = 0 (Rat). Correct.
        // 01:30 = 90 min. (90 + 30) = 120. 120/120 = 1 (Ox). Correct.

        let branchIdx = Math.floor((forensic.trueMinutes + 30) / 120) % 12;
        const hourBranch = BRANCHES_HANJA[branchIdx];

        // Hour Stem Formula (Dun-Si-Beop)
        // Depends on Day Stem.
        // Rule: 
        // Day 甲/己 -> Start Hour 甲 (0)
        // Day 乙/庚 -> Start Hour 丙 (2)
        // Day 丙/辛 -> Start Hour 戊 (4)
        // Day 丁/壬 -> Start Hour 庚 (6)
        // Day 戊/癸 -> Start Hour 壬 (8)

        const dayStemIdx = STEMS_HANJA.indexOf(dayPillar.stem);
        if (dayStemIdx !== -1) {
            const startStemIdx = ((dayStemIdx % 5) * 2) % 10;
            const hourStemIdx = (startStemIdx + branchIdx) % 10;

            hourPillar = {
                stem: STEMS_HANJA[hourStemIdx],
                branch: hourBranch,
                label: `${STEMS_HANJA[hourStemIdx]}${hourBranch}`
            };
        }
    }

    return {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        hour: hourPillar,
        forensicTime: forensic,
        normalization: {
            solarDate: `${solarDate.year}-${String(solarDate.month).padStart(2, '0')}-${String(solarDate.day).padStart(2, '0')}`,
            // Preserve input leap flag even if kor-lunar does not echo it back
            isLeapMonth: input.calendar === 'lunar' ? input.isLeapMonth : (solarDate.isLeapMonth || false)
        }
    };
}
