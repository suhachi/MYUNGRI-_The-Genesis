// @ts-nocheck
const { checkDensityMetrics } = require('../lib/engine/quality/densityMetrics');

console.log("=== Testing Density Metrics ===");

const createThinSection = () => ({
    result: "Too short.", interpretation: "Very short.", explain: "Brief.",
    resultFacts: { buckets: Array(9).fill({}) }
});

const createDenseSection = () => ({
    result: "A".repeat(150),
    interpretation: "B".repeat(100),
    explain: "C".repeat(150),
    resultFacts: { buckets: Array(9).fill({}) }
});

const thinReport = {
    sections: {
        executiveSummary: createThinSection(),
        originAudit: createDenseSection(),
        lifeFlow: createDenseSection(),
        rolling12: createDenseSection()
    }
};

const denseReport = {
    sections: {
        executiveSummary: createDenseSection(),
        originAudit: createDenseSection(),
        lifeFlow: createDenseSection(),
        rolling12: createDenseSection()
    }
};

// Test 1: Thin Report
const resultThin = checkDensityMetrics(thinReport);
if (resultThin.isLowDensity && resultThin.issues.some(i => i.includes('ExecutiveSummary'))) {
    console.log("PASS: Thin content detected");
} else {
    console.error("FAIL: Thin content NOT detected", resultThin);
}

// Test 2: Dense Report
const resultDense = checkDensityMetrics(denseReport);
if (!resultDense.isLowDensity) {
    console.log("PASS: Dense content accepted");
} else {
    console.error("FAIL: Dense content rejected", resultDense);
}
