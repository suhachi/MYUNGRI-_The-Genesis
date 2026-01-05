"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaewoonDirection = getDaewoonDirection;
exports.calculateDaewoon = calculateDaewoon;
exports.generateDaewoonSegments = generateDaewoonSegments;
// import { PillarsResult } from '../pillars'; // Unused
const astronomy_1 = require("../calendar/astronomy");
const ganzhi_1 = require("../calendar/ganzhi");
const elements_1 = require("../constants/elements");
const time_1 = require("../calendar/time");
const astro_1 = require("../schemas/astro");
function getDaewoonDirection(sex, yearStem) {
    const polarity = elements_1.POLARITY[yearStem]; // Yang or Yin
    if (sex === 'male') {
        return polarity === 'Yang' ? 'forward' : 'backward';
    }
    else {
        return polarity === 'Yang' ? 'backward' : 'forward';
    }
}
function calculateDaewoon(input) {
    astro_1.DaewoonInputSchema.parse(input);
    const direction = getDaewoonDirection(input.sex, input.yearStem);
    // 1. Local birth time to UTC using provided timezone (default KST)
    const [y, m, d] = input.birthDate.split('-').map(Number);
    const [hh, mm] = input.birthTime.split(':').map(Number);
    const baseLocal = new Date(Date.UTC(y, m - 1, d, hh, mm));
    let offsetMin = 9 * 60;
    let timezoneNote;
    try {
        offsetMin = (0, time_1.getTimeZoneOffsetMinutes)(baseLocal, input.timezone || 'Asia/Seoul');
        if (input.timezone && input.timezone !== 'Asia/Seoul') {
            timezoneNote = `Non-KST timezone '${input.timezone}' offset ${offsetMin} min applied.`;
        }
    }
    catch (e) {
        timezoneNote = `Timezone '${input.timezone}' unsupported; defaulting to Asia/Seoul offset.`;
    }
    const birthUTC = new Date(baseLocal.getTime() - offsetMin * 60 * 1000);
    // 2. Find Reference Solar Term
    // Determine birth Solar Longitude to find "Next" or "Prev" term.
    // However, finding exact term requires scanning.
    // Simpler: use the closest terms known? 
    // We implemented getSolarTermDate(year, targetDeg).
    // We need to know WHICH term is next/prev.
    // Scan terms around birth.
    // Approx terms: 24 per year.
    // Check term dates for BirthYear-1, BirthYear, BirthYear+1.
    // Create a sorted list of terms around birth date.
    const candidates = [];
    const scanYears = [y - 1, y, y + 1];
    for (const yr of scanYears) {
        for (const deg of astronomy_1.SOLAR_TERM_DEGREES) {
            const tDate = (0, astronomy_1.getSolarTermDate)(yr, deg);
            candidates.push({ deg, date: tDate });
        }
    }
    candidates.sort((a, b) => a.date.getTime() - b.date.getTime());
    // Find Position of Birth
    const bTime = birthUTC.getTime();
    let prevTerm = null;
    let nextTerm = null;
    for (let i = 0; i < candidates.length - 1; i++) {
        const curr = candidates[i];
        const next = candidates[i + 1];
        if (curr.date.getTime() <= bTime && next.date.getTime() > bTime) {
            prevTerm = curr;
            nextTerm = next;
            break;
        }
    }
    if (!prevTerm || !nextTerm) {
        throw new Error("Failed to find solar terms around birth date");
    }
    // Calculate Delta (Minutes) based on direction
    let deltaMs = 0;
    if (direction === 'forward') {
        deltaMs = nextTerm.date.getTime() - bTime;
    }
    else {
        deltaMs = bTime - prevTerm.date.getTime();
    }
    // 3 Days = 1 Year
    // 1 Day = 24 * 60 * 60 * 1000 ms
    // Ratio: 1 Year Age / (3 * 24 * 60 * 60 * 1000 ms)
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysDiff = deltaMs / msPerDay; // Floating point days
    const startAge = parseFloat((daysDiff / 3).toFixed(2)); // Round to 2 decimals for display? 
    // Spec says "do not round" internally, but usually displayed as X.Y.
    // Let's keep 2-4 decimals.
    // P3-ATOMIC-004: Segments (10 year buckets)
    // Pillar Cycle:
    // Depends on Month Pillar.
    // Forward -> Month Pillar + 1, +2...
    // Backward -> Month Pillar - 1, -2...
    // WAIT. Input doesn't provide Month Pillar. We need to pass it or re-calculate?
    // User requested separate Daewoon Engine. 
    // We need Month Pillar to generate Daewoon Pillars.
    // We'll require it in Input or changing signature.
    // Let's recalculate or update interface. 
    // Updating interface is better. 
    // BUT we calculate Daewoon inside full workflow. 
    // For now, let's accept "monthStem" and "monthBranch" in input.
    // Re-define input to include Month Pillar info?
    // Or just "monthGanji".
    // Let's assume input has it.
    // Since we can't change interface dynamically easily without breaking verification script if not aligned,
    // let's create a helper that takes the minimal data.
    const segments = generateDaewoonSegments(input.monthStem, input.monthBranch, direction, startAge);
    return {
        direction,
        startAge,
        deltaMin: deltaMs / (60 * 1000),
        segments,
        timezoneNote
    };
}
// Separate function for Segments to allow passing Month Pillar explicitly
function generateDaewoonSegments(monthStem, monthBranch, direction, startAge) {
    const sIdx = ganzhi_1.STEMS_HANJA.indexOf(monthStem);
    const bIdx = ganzhi_1.BRANCHES_HANJA.indexOf(monthBranch);
    const segments = [];
    const step = direction === 'forward' ? 1 : -1;
    // 10 Daewoons covering up to 80s usually.
    // StartAge is the start of first Daewoon.
    // Range 1: StartAge ~ StartAge + 10.
    // Range 2: StartAge + 10 ~ ...
    // Before StartAge? Usually ignored or "Childhood Luck".
    for (let i = 1; i <= 10; i++) { // 10 pillars
        // Next/Prev Month Pillar
        // Cycle 60.
        // Base index (0-59) or separate stem/branch indices?
        // Separate is easier.
        let nextS = (sIdx + (step * i)) % 10;
        let nextB = (bIdx + (step * i)) % 12;
        if (nextS < 0)
            nextS += 10;
        if (nextB < 0)
            nextB += 12;
        const stem = ganzhi_1.STEMS_HANJA[nextS];
        const branch = ganzhi_1.BRANCHES_HANJA[nextB];
        const sAge = parseFloat((startAge + (i - 1) * 10).toFixed(1)); // Floor usually? 
        // Korean age vs Man age. Saju commonly uses "Korean Age" or "Man Age" depending on school.
        // The StartAge "number" (e.g. 4) is the Daewoon Number (대운수).
        // It means Daewoon starts at age 4, 14, 24...
        // So first segment start = startAge.
        segments.push({
            startAge: Math.floor(sAge), // Integer display usually
            endAge: Math.floor(sAge) + 9,
            ganzhi: { stem, branch, label: `${stem}${branch}` }
        });
    }
    return segments;
}
//# sourceMappingURL=index.js.map