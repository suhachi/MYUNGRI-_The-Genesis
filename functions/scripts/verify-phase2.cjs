const { calculatePillars } = require('../lib/engine/pillars');
const { calculateRelations } = require('../lib/engine/relations/index');
const { calculateFiveElements } = require('../lib/engine/fiveElements');
const { calculateYinYang } = require('../lib/engine/yinYang');

console.log("=== Phase 2 Verification ===");

// Scenario: 2024-02-04 12:30 (Ipchun day - Year changes from Gye-Myo to Gap-Jin around this time?)
// kor-lunar might flip year at lunar New Year or Ipchun?
// Standard Saju flips at Ipchun. kor-lunar typically follows Lunar New Year for Year Pillar? 
// WAIT. Deep issue: kor-lunar usually returns LUNAR year pillar (Secha).
// In Saju, Year Pillar flips at Ipchun (Solar).
// If kor-lunar uses Lunar New Year (Seolnal), then the Year Pillar might be wrong for Saju purposes between Seolnal and Ipchun.
// However, 'toLunar' usually returns the Ganji for the day, often respecting Solar Terms if it's a good library.
// Let's verify what 2024-02-04 gives.
// 2024 Lunar New Year was Feb 10. So Feb 4 is BEFORE Lunar New Year.
// If kor-lunar follows Lunar Year, it should be Gye-Myo.
// If kor-lunar follows Solar Term (Ipchun), it *might* be Gap-Jin if Ipchun passed.
// (Ipchun 2024 is Feb 4 ~17:27 KST).
// So at 12:30, it is Gye-Myo (technically).
// Let's check the output.

const input = {
    birthDate: '2024-02-04',
    birthTime: '12:30',
    timeUnknown: false,
    calendar: 'solar',
    sex: 'male',
    isLeapMonth: false,
    timezone: 'Asia/Seoul'
};

console.log("Input:", JSON.stringify(input, null, 2));

try {
    const pillars = calculatePillars(input);
    console.log("Pillars Result:", JSON.stringify(pillars, null, 2));

    // Check Relations
    const relations = calculateRelations(pillars);
    console.log("Relations Result:", JSON.stringify(relations, null, 2));

    // Check Five Elements
    const chars = [
        pillars.year.stem, pillars.year.branch,
        pillars.month.stem, pillars.month.branch,
        pillars.day.stem, pillars.day.branch,
        ...(pillars.hour ? [pillars.hour.stem, pillars.hour.branch] : [])
    ];

    const fiveElems = calculateFiveElements(chars);
    console.log("Five Elements:", JSON.stringify(fiveElems, null, 2));

    const yinYang = calculateYinYang(chars);
    console.log("Yin Yang:", JSON.stringify(yinYang, null, 2));

    console.log("VERIFICATION COMPLETE");
} catch (e) {
    console.error("VERIFICATION FAILED:", e);
    process.exit(1);
}
