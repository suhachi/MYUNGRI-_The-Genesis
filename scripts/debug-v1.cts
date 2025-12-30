
// Using require for CJS compatibility
const { calculateV1 } = require('../functions/src/engine/calculation/v1');

const testCases = [
    {
        name: "Solar Standard (2023-01-01 13:20)",
        input: { birthDate: "2023-01-01", birthTime: "13:20", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" }
    },
    {
        name: "Lunar Leap (2023-05-15 13:20 - Leap Month)",
        input: { birthDate: "2023-05-15", birthTime: "13:20", timeUnknown: false, sex: "male", calendar: "lunar", isLeapMonth: true, timezone: "Asia/Seoul" }
    },
    {
        name: "Forensic Boundary (2023-01-01 00:05)",
        input: { birthDate: "2023-01-01", birthTime: "00:05", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" }
    },
    {
        name: "Fail Safe (1800 - Should Error)",
        input: { birthDate: "1800-01-01", birthTime: "12:00", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" },
        expectError: true
    }
];

async function runTests() {
    console.log("🚀 Starting Hardened Engine Verification (v1.2) [CJS]\n");

    for (const tc of testCases) {
        console.log(`[TEST] ${tc.name}`);
        try {
            const result = calculateV1(tc.input);

            if (tc.expectError) {
                console.error("❌ FAILED: Expected error but got success.");
            } else {
                console.log("✅ Pillars:", `${result.pillars.year.label} ${result.pillars.month.label} ${result.pillars.day.label}`);
                if (result.forensicTime) {
                    console.log(`   Forensic: ${result.forensicTime.localTime} -> ${result.forensicTime.trueSolarHHmm} (${result.forensicTime.classification}, Shift: ${result.forensicTime.dayShift})`);
                }
                if (result.warnings.length > 0) {
                    console.log("   Warnings:", result.warnings);
                }
                // Validation checks
                // For Leap Month, we expect month pillar to handle empty/unknown gracefully.
                // UNKNOWN label logic: if library returns empty, we set UNKNOWN.
                // If the Month label is UNKNOWN, we print special verified message.
                if (result.pillars.month.label === "UNKNOWN") {
                    console.log("   --> Verified UNKNOWN month handling (Safe).");
                }

                if (tc.name.includes("Boundary") && result.forensicTime.classification === "야자시") {
                    console.log("   --> Verified Forensic Boundary (Ya-Jasi).");
                }
            }
        } catch (e: any) {
            if (tc.expectError) {
                console.log(`✅ Expected Error Caught: ${e.message}`);
            } else {
                console.error("❌ ERROR:", e.message);
                console.error(e.stack);
            }
        }
        console.log("---------------------------------------------------");
    }
}

runTests();
