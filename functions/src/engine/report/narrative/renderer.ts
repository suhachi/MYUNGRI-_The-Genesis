import { OpenAI } from 'openai';
import { SYSTEM_PROMPT } from './prompt.system';
import { ReportPatchSchema, ReportPatch } from './patch.schema';

let openai: OpenAI | null = null;

function getClient() {
    if (!openai) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }
    return openai;
}

/**
 * Generate Narrative Patch using LLM.
 * Genesis Only - Hyper-precise 9-bucket support.
 */
export async function generateNarrativePatch(input: any): Promise<ReportPatch> {
    const client = getClient();

    const response = await client.chat.completions.create({
        model: "gpt-4o", // High density requirement
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: JSON.stringify(input) }
        ],
        response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    const parsed = JSON.parse(content);

    // Some models wrap in a 'patches' key or similar, ensure we get the array
    const patchArray = Array.isArray(parsed) ? parsed : (parsed.patches || []);

    const result = ReportPatchSchema.safeParse(patchArray);
    if (!result.success) {
        console.error("Invalid Patch from LLM:", result.error);
        throw new Error("LLM Generated invalid patch structure.");
    }

    return result.data;
}
