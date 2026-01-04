const { validateReportStructure } = require('../lib/engine/assembler/validator');
const { enforceQualityGate } = require('../lib/engine/quality/gate');
// Mocking report structure for test
const mockReport = {
    meta: { version: '1.0', generatedAt: new Date().toISOString() },
    sections: {
        executiveSummary: {
            sectionId: 'test1',
            title: 'Test Section',
            resultFacts: { data: 1 },
            interpretationFacts: { text: "Good luck." },
            explainHints: { hint: "Focus." }
        }
    }
};

const badReport = {
    meta: { version: '1.0', generatedAt: new Date().toISOString() },
    sections: {
        executiveSummary: {
            sectionId: 'bad1',
            title: 'Bad Section',
            resultFacts: {}, // Empty -> Should Fail
            interpretationFacts: {},
            explainHints: {}
        }
    }
};

const bannedReport = {
    meta: { version: '1.0', generatedAt: new Date().toISOString() },
    sections: {
        executiveSummary: {
            sectionId: 'banned1',
            title: 'Banned',
            resultFacts: { ok: true },
            interpretationFacts: { text: "This is a placeholder for text." },
            explainHints: { hint: "Ok" }
        }
    }
};

async function verify() {
    console.log("=== Phase 8 Verification: Report Assembler ===");

    // 1. Structure Validation (Pass)
    try {
        validateReportStructure(mockReport);
        console.log("PASS: Valid Structure");
    } catch (e) {
        console.error("FAIL: Valid structure rejected", e);
    }

    // 2. Structure Validation (Fail)
    try {
        validateReportStructure(badReport);
        console.error("FAIL: Bad structure accepted");
    } catch (e) {
        console.log("PASS: Bad structure rejected");
    }

    // 3. Quality Gate (Banned)
    try {
        enforceQualityGate(bannedReport);
        console.error("FAIL: Banned phrase accepted (should fail or repair distinctively)");
    } catch (e) {
        if (e.message.includes("Quality Violation")) {
            console.log("PASS: Banned phrase rejected");
        } else {
            console.error("FAIL: Unexpected error", e);
        }
    }
}

verify();
