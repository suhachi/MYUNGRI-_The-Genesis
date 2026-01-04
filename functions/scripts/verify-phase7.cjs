const { hasHan, extractHan } = require('../lib/engine/name/hasHan');
const { getKangxiData } = require('../lib/engine/name/kangxi');
const { getFallbackAnalysis, NAME_ANALYSIS_LABELS } = require('../lib/engine/name/fallbackPhonetic');

console.log("=== Phase 7 Verification: Naming Analysis ===");

async function verify() {
    // 1. Han Detection
    const cases = [
        { input: "홍길동", expected: false },
        { input: "Hong", expected: false },
        { input: "洪길동", expected: true },
        { input: "金민수", expected: true },
        { input: "이李", expected: true }
    ];

    let regexPass = true;
    for (const c of cases) {
        const result = hasHan(c.input);
        if (result !== c.expected) {
            console.error(`FAIL: hasHan('${c.input}') = ${result}, expected ${c.expected}`);
            regexPass = false;
        }
    }
    if (regexPass) console.log("PASS: Han Detection Regex");

    // 2. Kangxi Data Load
    const kim = getKangxiData("金");
    // "金" in KANGXI_DATA: strokes 8, element Metal.
    if (kim.strokes === 8 && kim.element === "Metal" && !kim.missing) {
        console.log("PASS: Kangxi Data Lookup (金)");
    } else {
        console.error("FAIL: Kangxi Data Lookup", kim);
    }

    const missing = getKangxiData("깖"); // Random char not in DB
    if (missing.missing) {
        console.log("PASS: Missing Data Handling");
    } else {
        console.error("FAIL: Missing Data Handling (Should be missing)", missing);
    }

    // 3. Fallback Policy
    const fallback = getFallbackAnalysis("X", "가"); // '가' starts with ㄱ -> Wood
    if (fallback.phoneticElement === "Wood" && fallback.isReferenceOnly === true) {
        console.log("PASS: Fallback Logic (Hangul Initial)");
    } else {
        console.error("FAIL: Fallback Logic", fallback);
    }

    // 4. UI Labels
    if (NAME_ANALYSIS_LABELS.MISSING_DATA === "확정 불가") {
        console.log("PASS: UI Labels Integrity");
    }
}

verify();
