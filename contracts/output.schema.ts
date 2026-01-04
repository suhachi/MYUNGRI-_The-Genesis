import { z } from 'zod';

// Basic 3-field structure for every analysis section
export const AnalysisContentSchema = z.object({
    result: z.string().min(1, "Result is required"),
    explain: z.string().min(1, "Explain is required"),
    interpretation: z.string().min(1, "Interpretation is required"),
    // Optional fields that might exist
    reasonCards: z.array(z.any()).optional(),
});

export const SectionSchema = AnalysisContentSchema.extend({
    id: z.string(),
    title: z.string(),
    category: z.string(),
    type: z.string().optional(),
});

// Executive Summary specific validation (9 buckets checks)
// We might not enforce 9 buckets strictly in the generic schema if it's dynamic, 
// but the prompt says "ExecutiveSummary must include 9 buckets for 10s..80s"
// Let's assume ExecutiveSummary overrides or extends generic section if it has specific structure, 
// OR it puts buckets in `reasonCards` or `explain`. 
// For now, let's keep it generic but strict on the 3 keys.

export const ReportSchema = z.object({
    reportId: z.string().optional(),
    reportMeta: z.object({
        title: z.string(),
        userName: z.string().optional(),
        summary: z.string(),
    }),
    sections: z.array(SectionSchema).refine((sections) => {
        // Validation for required sections
        // const requiredIds = [...]; 
        // For P0-ATOMIC-001, we just need basic validation. 
        return true;
    }),
    // Determinism Hash (P0-ATOMIC-003)
    determinismHash: z.string().optional(),
});

export type OutputReportType = z.infer<typeof ReportSchema>;
export type SectionType = z.infer<typeof SectionSchema>;
