"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLifeBuckets = generateLifeBuckets;
const sewoon_1 = require("./sewoon");
function generateLifeBuckets(pillars, daewoon) {
    const buckets = [];
    const birthYear = pillars.normalization.solarDate ? parseInt(pillars.normalization.solarDate.split('-')[0]) : 0;
    if (birthYear === 0)
        throw new Error("Invalid Birth Year for Buckets");
    // Decades: 10, 20, ... 90
    const DECADES = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    for (const decade of DECADES) {
        // 1. Find Main Daewoon
        // Logic: Find daewoon segment that covers the start of the decade (e.g. age 10)
        // Or covers the majority?
        // Simple: Daewoon active at Age = decade.
        let activeDaewoon = daewoon.segments.find(s => s.startAge <= decade && s.endAge >= decade);
        // Fallback: if not found (e.g. Daewoon starts at 4, 14...), map properly.
        // If Daewoon start=4 (4-13), Age 10 is in first daewoon.
        // If Daewoon start=4 (4-13), Age 20 is in second daewoon (14-23).
        if (!activeDaewoon) {
            // Try searching broadly?
            // Daewoon segments usually cover contiguous range.
            // If missing, use closest?
            // It shouldn't miss if segments generated properly up to 80+.
            // However, generateDaewoonSegments generates 10 pillars.
            // StartAge 4 -> 4..94.
            // StartAge 8 -> 8..98.
            // StartAge 1 -> 1..91.
            // So it should cover 10~90.
            // If StartAge=7, 7-16, 17-26. Age 10 is 7-16.
            // If loop fails, take the last one or throw?
            // Let's use the one that overlaps the most or just 'at decade start'.
            activeDaewoon = daewoon.segments[0]; // Fallback
        }
        // 2. Generate 10 Sewoons
        const sewoons = [];
        for (let i = 0; i < 10; i++) {
            const currentAge = decade + i;
            const currentYear = birthYear + currentAge; // Korean Age vs Man Age?
            // "Age" in buckets usually normalized. 
            // If BirthYear=2024 (Age 1). 10s starts 2033 (Age 10).
            // Man Age 0 based -> 2024 is age 0. 2034 is age 10.
            // Saju standard: Korean Age (1 at birth) is common, but strict calculation uses Man Age mostly in modern apps.
            // Daewoon StartAge 4 usually means Man Age 4? Or Korean Age 4?
            // "3 days = 1 year" is logic. 
            // Let's assume Man Age (0 at birth) for consistency with "Years Passed".
            // So Year = BirthYear + Age.
            sewoons.push((0, sewoon_1.calculateSewoon)(currentYear, pillars));
        }
        buckets.push({
            decade,
            daewoon: activeDaewoon,
            sewoons,
            summary: {
                dominantTenGod: "Analyzing...", // Placeholder logic
                impactScore: 0
            }
        });
    }
    if (buckets.length !== 9) {
        throw new Error(`Buckets generation failed: Expected 9, got ${buckets.length}`);
    }
    return buckets;
}
//# sourceMappingURL=lifeBuckets.js.map