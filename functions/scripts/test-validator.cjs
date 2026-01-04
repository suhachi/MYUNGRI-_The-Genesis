// @ts-nocheck
const { validateReportStructure, QualityValidationError } = require('../lib/engine/quality/reportValidator');

console.log("=== Testing Report Validator ===");

// Mock Data Generators
const createValidSection = () => ({
    sectionId: 'TEST', result: 'OK', interpretation: 'OK', explain: 'OK',
    resultFacts: { buckets: Array(9).fill({}) } // for LifeFlow
});

const validReport = {
    sections: {
        executiveSummary: createValidSection(),
        originAudit: createValidSection(),
        lifeFlow: createValidSection(),
        rolling12: createValidSection(),
        naming: undefined
    },
    meta: {}
};

// Test 1: Valid Report
try {
    validateReportStructure(validReport);
    console.log("PASS: Valid Report accepted");
} catch (e) {
    console.error("FAIL: Valid Report rejected", e);
}

// Test 2: Missing Section
const missingReport = { ...validReport, sections: { ...validReport.sections, lifeFlow: undefined } };
try {
    validateReportStructure(missingReport);
    console.error("FAIL: Missing Section MUST throw");
} catch (e) {
    if (e.name === 'QualityValidationError' && e.message.includes('Missing LifeFlow')) {
        console.log("PASS: Missing Section detected");
    } else {
        console.error("FAIL: Unexpected error for missing section", e);
    }
}

// Test 3: Bad LifeFlow Buckets
const badBucketReport = {
    ...validReport,
    sections: {
        ...validReport.sections,
        lifeFlow: { ...createValidSection(), resultFacts: { buckets: [1, 2, 3] } }
    }
};
try {
    validateReportStructure(badBucketReport);
    console.error("FAIL: Bad Buckets MUST throw");
} catch (e) {
    if (e.message.includes('9 buckets')) {
        console.log("PASS: Bad Buckets detected");
    } else {
        console.error("FAIL: Unexpected error for bad buckets", e);
    }
}
