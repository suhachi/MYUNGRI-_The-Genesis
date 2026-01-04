import { PillarsResult } from '../pillars';
import { ReportSectionOutput, validateReportStructure } from './validator';
import { checkAndRepairText } from '../quality/gate';
import { hasHan } from '../name/hasHan';

// Define the fixed ToC
export const REQUIRED_SECTIONS = [
    'ExecutiveSummary',
    'OriginAudit',
    'LifeFlow',
    'TurningPoints',
    'Rolling12',
    'DateDetail'
    // 'Naming' is conditional
];

export interface ReportInput {
    pillars: PillarsResult;
    userName?: string;
    // ... other inputs
}

export interface ReportAssemblyResult {
    sections: ReportSectionOutput[];
    qualityFlags: {
        needsRegeneration: boolean;
        details: string[];
    };
}

/**
 * P8-ATOMIC-001: Report Assembly Pipeline
 * Single Entry Point
 */
export function assembleReport(input: ReportInput): ReportAssemblyResult {
    const sections: ReportSectionOutput[] = [];
    const qualityDetails: string[] = [];
    let needsRegeneration = false;

    // 1. Generate Sections (Simulated Generators for Pipeline)
    // In real impl, these would call specific engines.
    
    // ExecutiveSummary
    sections.push(generateSection('ExecutiveSummary', '요약', 'SUMMARY', input));
    
    // OriginAudit
    sections.push(generateSection('OriginAudit', '원국 분석', 'CORE', input));
    
    // LifeFlow
    sections.push(generateSection('LifeFlow', '대운 흐름', 'STRATEGY', input));
    
    // TurningPoints
    sections.push(generateSection('TurningPoints', '인생의 전환점', 'ROADMAP', input));
    
    // Rolling12
    sections.push(generateSection('Rolling12', '1년 운세', 'STATUS', input));
    
    // DateDetail
    sections.push(generateSection('DateDetail', '일일 상세', 'DEBUG', input));

    // Naming (Conditional)
    if (input.userName && hasHan(input.userName)) {
        sections.push(generateSection('Naming', '성명학 분석', 'META', input));
    }

    // 2. Validate Presence of Required Sections
    for (const reqId of REQUIRED_SECTIONS) {
        if (!sections.find(s => s.id === reqId)) {
            throw new Error(`CRITICAL: Missing required section '${reqId}'. Pipeline failed.`);
        }
    }

    // 3. Validate Fields (3-Field Rule)
    try {
        validateReportStructure(sections);
    } catch (e: any) {
        throw new Error(`CRITICAL: Validation failed - ${e.message}`);
    }

    // 4. Quality Gate Check
    for (const section of sections) {
        const fields = [section.result, section.explain, section.interpretation];
        for (const text of fields) {
            const check = checkAndRepairText(text);
            if (!check.passed) {
                needsRegeneration = true;
                qualityDetails.push(`Section ${section.id}: ${check.violation}`);
            } else if (check.repairedText) {
                // Apply repair
                if (text === section.result) section.result = check.repairedText;
                if (text === section.explain) section.explain = check.repairedText;
                if (text === section.interpretation) section.interpretation = check.repairedText;
            }
        }
    }

    return {
        sections,
        qualityFlags: {
            needsRegeneration,
            details: qualityDetails
        }
    };
}

// Mock Generator for Pipeline Testing
function generateSection(id: string, title: string, category: string, input: any): ReportSectionOutput {
    // In a real scenario, this would switch on ID and call specific engines.
    // For now, we return a valid structure to pass the pipeline.
    return {
        id,
        title,
        category,
        result: `${title} 결과입니다.`,
        explain: `${title}에 대한 설명입니다.`,
        interpretation: `${title}에 대한 해석입니다.`
    };
}
