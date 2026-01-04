const { calculatePillars } = require('../lib/engine/pillars');
const { calculateStrength, STRENGTH_THRESHOLDS } = require('../lib/engine/strengthScore');
const { applyJohuAdjustment } = require('../lib/engine/johuAdjustment');
const { injectDisclaimer, validateReportQuality } = require('../lib/engine/reportUtils');
const { STRENGTH_WEIGHTS } = require('../lib/engine/tables/strengthWeights');

console.log("=== Phase 4 Verification: Strength & Yongshin Engine ===");

// 0. Weight Table Check (Runtime)
const total = Object.values(STRENGTH_WEIGHTS).reduce((a, b) => a + b, 0);
console.log(`Weight Total: ${total} (Expected: 100)`);
if (total !== 100) console.error("FAIL: Weights != 100");
else console.log("PASS: Weights");

async function verify() {
    // Case 1: Standard Case (Time Known) - 2024-02-04 18:00 (Gap-Jin, Gap-Jin, Mu-Sul, Mu-O)
    // Strong Earth? (Mu, Sul, O...)
    const input = {
        birthDate: '2024-02-04',
        birthTime: '18:00',
        timeUnknown: false,
        calendar: 'solar',
        sex: 'male',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    };

    console.log("\n[Test 1] Strength Calculation (Time Known)");
    const pillars = calculatePillars(input);
    const strength = calculateStrength(pillars);

    console.log("Strength Score:", strength.score);
    console.log("Verdict:", strength.verdict);
    console.log("Breakdown:", JSON.stringify(strength.breakdown, null, 2));

    // Check Keys
    if (Object.keys(strength.breakdown).length > 0) console.log("PASS: Breakdown keys exist");
    else console.error("FAIL: Breakdown missing");

    // Johu Adjustment
    // Month uses NEW Ipchun Logic.
    // 2024-02-04 18:00 is Gap-Jin Year. Month is... 
    // Ipchun (Feb 4) starts "Tiger" Month (In-Wol)? 
    // Wait. In Saju, Ipchun starts the Year AND the first Month (Tiger).
    // Let's check Pillar Result.
    // Pillars Result from Phase 3 Test 2 was: Year 甲辰, Month ...?
    // Kor-lunar might return "Eul-Chuk" or "O-In"?
    // Ipchun is Feb 4. So Feb 4 18:00 is definitely In-Wol (Tiger).
    // Let's check pillars.month.branch.

    console.log("Month Branch:", pillars.month.branch);

    const johu = applyJohuAdjustment(pillars, strength);
    console.log("Johu Adjusted Score:", johu.finalScore);
    console.log("Johu Evidence:", johu.evidence);
    console.log("Yongshin:", johu.yongshin);

    if (typeof johu.finalScore === 'number') console.log("PASS: Johu Score computed");

    // Case 2: Time Unknown (Disclaimer Check)
    console.log("\n[Test 2] Time Unknown Disclaimer");
    const meta = { timeUnknown: true };
    const injected = injectDisclaimer(meta);

    if (injected.mainDisclaimer && injected.mainDisclaimer.includes("유보")) {
        console.log("PASS: Disclaimer injected");
    } else {
        console.error("FAIL: Disclaimer missing");
    }

    const quality = validateReportQuality(injected);
    console.log(`Quality Check: ${quality} (Expected true)`);
    if (!quality) console.error("FAIL: Quality Gate");

    // Fail Check
    const qualityFail = validateReportQuality({ timeUnknown: true });
    console.log(`Quality Fail Check: ${!qualityFail} (Expected true)`);
}

verify();
