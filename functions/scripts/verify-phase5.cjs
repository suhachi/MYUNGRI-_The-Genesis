const { calculatePillars } = require('../lib/engine/pillars');
const { calculateDaewoon, generateDaewoonSegments } = require('../lib/engine/daewoon');
const { calculateSewoon } = require('../lib/engine/sewoon');
const { generateLifeBuckets } = require('../lib/engine/lifeBuckets');

console.log("=== Phase 5 Verification: Life Flow & Buckets ===");

async function verify() {
    // 1. Standard Input
    const input = {
        birthDate: '2024-02-04',
        birthTime: '18:00',
        timeUnknown: false,
        calendar: 'solar',
        sex: 'male',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    };

    try {
        const pillars = calculatePillars(input);

        // Daewoon Setup
        // Check yearStem for Direction
        // Need Month Pillar for Segments
        const yearStem = pillars.year.stem;
        const daewoonCommon = calculateDaewoon({
            ...input,
            yearStem,
            // Pass month info if needed by updated interface?
            // Updated calculateDaewoon in Phase 3 calls generateDaewoonSegments internally if we map args?
            // Wait, calculateDaewoon signature changed in Phase 3 end to include monthStem/Branch?
            // Let's check the code or assume helper usage.
            // In daewoon.ts, we updated calculateDaewoon to use calculateDaewoon(input).
            // Input needed: monthStem, monthBranch.
            monthStem: pillars.month.stem,
            monthBranch: pillars.month.branch
        });

        console.log("Daewoon StartAge:", daewoonCommon.startAge);

        // 2. Sewoon Test (2024)
        // 2024 is Gap-Jin (甲辰).
        const sewoon2024 = calculateSewoon(2024, pillars);
        console.log(`Sewoon 2024: ${sewoon2024.ganzhi.label} (Expected: 甲辰)`);

        if (sewoon2024.ganzhi.label === '甲辰') console.log("PASS: Sewoon Generation");
        else console.error(`FAIL: Expected 甲辰, got ${sewoon2024.ganzhi.label}`);

        // 3. Life Buckets Test
        // Requires pillars & daewoon
        const buckets = generateLifeBuckets(pillars, daewoonCommon);
        console.log(`Buckets Generated: ${buckets.length} (Expected: 9)`);

        if (buckets.length === 9) console.log("PASS: 9 Buckets confirmed (10s..90s)");
        else console.error(`FAIL: Bucket count ${buckets.length}`);

        // Check content of first bucket (10s)
        const b10 = buckets[0];
        console.log(`Bucket 10s: Decade=${b10.decade}, Daewoon=${b10.daewoon.ganzhi.label}, Sewoons=${b10.sewoons.length}`);

        if (b10.sewoons.length === 10) console.log("PASS: 10 Sewoons in bucket");
        else console.error("FAIL: Sewoon count in bucket");

    } catch (e) {
        console.error("ERROR Phase 5 Verification:", e);
    }
}

verify();
