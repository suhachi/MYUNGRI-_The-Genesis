import { OpenAI } from 'openai';
import { SYSTEM_PROMPT } from './prompt.system';
import { ReportPatch, ReportPatchSchema } from './patch.schema';
import { NarrativeInputPacket } from './packetBuilders/main';

const openai = new OpenAI();

/**
 * Renders a narrative patch for the report using OpenAI.
 * Strict JSON output validated against ReportPatchSchema.
 */
export async function renderNarrativePatch(input: NarrativeInputPacket): Promise<ReportPatch> {
    const userPrompt = `아래 정제된 사주 데이터를 기반으로 리포트 서술 패치를 생성하십시오.
데이터: ${JSON.stringify(input)}
결과 형식은 반드시 JSON Patch 배열이어야 합니다.`;

    const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o",
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2, // 낮은 온도로 일관성 유지
    });

    const content = response.choices[0].message.content || "[]";
    const rawPatch = JSON.parse(content);

    // Zod 검증 (Renderer Contract)
    const parseResult = ReportPatchSchema.safeParse(Array.isArray(rawPatch) ? rawPatch : (rawPatch.patch || []));

    if (!parseResult.success) {
        throw new Error(`Narrative Patch validation failed: ${parseResult.error.message}`);
    }

    return parseResult.data;
}
