const { calculatePillars } = require('../lib/engine/pillars');
const { calculateDaewoon, generateDaewoonSegments } = require('../lib/engine/daewoon');

// Stub dependencies? No, we use compiled lib.
// Make sure to rebuild functions before running!

console.log("=== Phase 3 Verification: Ipchun & Daewoon ===");

async function verify() {
    // Case 1: Before Ipchun (2024-02-04 15:00 KST) -> Ipchun is ~17:27
    // Should be Previous Year (Gye-Myo)
    const inputBefore = {
        birthDate: '2024-02-04',
        birthTime: '15:00',
        timeUnknown: false,
        calendar: 'solar',
        sex: 'male',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    };

    console.log("\n[Test 1] Before Ipchun (15:00):");
    try {
        const pBefore = calculatePillars(inputBefore);
        console.log(`Year Pillar: ${pBefore.year.label} (Expected: 癸卯)`);
        if (pBefore.year.label !== '癸卯') console.error("FAIL: 2024-02-04 15:00 Should be Gye-Myo (癸卯)");
        else console.log("PASS");

        // Daewoon Calculation
        // Male, Yin Year (Gye) -> Reverse (Backward).
        // Check Direction
        const daewoon = calculateDaewoon({ ...inputBefore, yearStem: pBefore.year.stem });
        console.log(`Direction: ${daewoon.direction} (Expected: backward)`);
        console.log(`StartAge: ${daewoon.startAge} (Precision check)`);

        if (daewoon.direction !== 'backward') console.error("FAIL: Direction mismatch");
        else console.log("PASS: Direction");

        if (daewoon.startAge % 1 === 0) console.warn("WARN: StartAge is exactly integer? Unlikely for 15:00.");
        else console.log("PASS: StartAge has decimals");

        // Segments
        const segments = generateDaewoonSegments(pBefore.month.stem, pBefore.month.branch, daewoon.direction, daewoon.startAge);
        console.log("Segments[0]:", segments[0]);
        // Month is Eul-Chuk (12th lunar month of Gye-Myo?).
        // Kor-lunar 2024-02-04 15:00 -> Month?
        // Let's assume Month is fixed. Backward from Eul-Chuk -> Gap-Ja.
        // Check first segment.
        if (segments[0].ganzhi.label === '甲子') console.log("PASS: First Daewoon is Gap-Ja (甲子)");
        else console.log(`CHECK: First Daewoon is ${segments[0].ganzhi.label} (Expected Gap-Ja 甲子?)`);

    } catch (e) {
        console.error("ERROR Test 1:", e);
    }

    // Case 2: After Ipchun (2024-02-04 18:00 KST) -> Ipchun Passed
    // Should be Current Year (Gap-Jin)
    const inputAfter = {
        birthDate: '2024-02-04',
        birthTime: '18:00',
        timeUnknown: false,
        calendar: 'solar',
        sex: 'male',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    };

    console.log("\n[Test 2] After Ipchun (18:00):");
    try {
        const pAfter = calculatePillars(inputAfter);
        console.log(`Year Pillar: ${pAfter.year.label} (Expected: 甲辰)`);
        if (pAfter.year.label !== '甲辰') console.error("FAIL: 2024-02-04 18:00 Should be Gap-Jin (甲辰)");
        else console.log("PASS");

        // Daewoon
        // Male, Yang Year (Gap) -> Forward.
        const daewoon = calculateDaewoon({ ...inputAfter, yearStem: pAfter.year.stem });
        console.log(`Direction: ${daewoon.direction} (Expected: forward)`);
        if (daewoon.direction !== 'forward') console.error("FAIL: Direction mismatch");
        else console.log("PASS: Direction");

    } catch (e) {
        console.error("ERROR Test 2:", e);
    }
}

verify();
