import { FullReportData, ReportSection } from '../../contracts/output.schema';

// Constants
const MIN_CHARS_TOTAL = 300; // Minimum chars for text content per section
const MIN_BUCKETS_COUNT = 9;

export interface DensityCheckResult {
    isLowDensity: boolean;
    issues: string[];
}

export function checkDensityMetrics(report: FullReportData): DensityCheckResult {
    const issues: string[] = [];
    let isLowDensity = false;

    // Check each section
    checkSectionDensity(report.sections.executiveSummary, 'ExecutiveSummary', issues);
    checkSectionDensity(report.sections.originAudit, 'OriginAudit', issues);
    checkSectionDensity(report.sections.lifeFlow, 'LifeFlow', issues);
    checkSectionDensity(report.sections.rolling12, 'Rolling12', issues);
    if (report.sections.naming) {
        checkSectionDensity(report.sections.naming, 'Naming', issues);
    }

    // Check LifeFlow Buckets Structure specifically
    const buckets = report.sections.lifeFlow.resultFacts?.buckets;
    if (Array.isArray(buckets) && buckets.length < MIN_BUCKETS_COUNT) {
        issues.push(`LifeFlow buckets missing (${buckets.length}/${MIN_BUCKETS_COUNT})`);
        isLowDensity = true; // Structural issue is high priority
    }

    // Determine flag
    if (issues.length > 0) {
        isLowDensity = true;
    }

    return { isLowDensity, issues };
}

function checkSectionDensity(section: ReportSection | undefined, name: string, issues: string[]) {
    if (!section) return; // Validator handles missing

    const textContent = (section.result || "") + (section.interpretation || "") + (section.explain || "");
    const totalLen = textContent.replace(/\s/g, '').length;

    if (totalLen < MIN_CHARS_TOTAL) {
        issues.push(`${name}: Low text density (${totalLen}/${MIN_CHARS_TOTAL} chars)`);
    }

    // Check if placeholder is present (P8-ATOMIC-003 Banned Phrase Check in disguise)
    // Validator might pass valid placeholders, but Density Check marks them as low quality usually.
    if (textContent.includes("데이터가 제공되지 않았습니다")) {
        issues.push(`${name}: Placeholder detected`);
    }
}
