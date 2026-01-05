import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { defineSecret } from "firebase-functions/params";
import { logger } from "firebase-functions";
import { InputSchema } from "./contracts/input.schema";
import { sanitizeUserName, detectScriptType } from "./contracts/shared/nameSanitize";

// Luck Calendar Export
import { generateLuckCalendar } from "./generateLuckCalendar";

const REGION = "asia-northeast3";
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

setGlobalOptions({ region: REGION });

if (!admin.apps.length) {
    admin.initializeApp();
}

import { generateDeterministicPacket } from "./engine";
import { assembleReport } from "./engine/assembler/main";
import { validateAndRepairReport } from "./engine/quality/gate";
import { QualityValidationError } from "./engine/quality/reportValidator";

/**
 * [Phase 28] ATOMIC-R2-01: Shared Contract Implementation
 * - Same runtime schema for FE/BE.
 * - Deterministic Engine Separation.
 */
export const generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK,
    secrets: [OPENAI_API_KEY],
    timeoutSeconds: 300,
    memory: "1GiB"
}, async (request: any) => {
    const rawData = request.data;

    // 1. Runtime Schema Validation (Shared Contract)
    const parseResult = InputSchema.safeParse(rawData);
    if (!parseResult.success) {
        throw new HttpsError(
            "invalid-argument",
            "입력 정보가 올바르지 않습니다.",
            parseResult.error.flatten()
        );
    }

    const input = parseResult.data;
    const userName = (input.userName || "익명").trim();
    const sanitizedName = sanitizeUserName(userName);

    try {
        // [ATOMIC-R2-02] Deterministic Engine Call (A-Stage)
        const deterministicPacket = generateDeterministicPacket({
            birthDate: input.birthDate,
            birthTime: input.birthTime || "",
            timeUnknown: input.timeUnknown,
            sex: input.sex,
            calendar: input.calendar,
            isLeapMonth: input.isLeapMonth || false,
            timezone: input.timezone || "Asia/Seoul"
        }, sanitizedName);

        // [ATOMIC-R3] Phase 3: Narrative Rendering (C-Stage)
        let finalReport = assembleReport(deterministicPacket);

        // 1. Prepare LLM Input
        const { buildNarrativeInput } = await import("./engine/report/narrative/packetBuilders/main");
        const narrativeInput = buildNarrativeInput(deterministicPacket);

        // 2. Render Narrative Patch
        const { generateNarrativePatch } = await import("./engine/report/narrative/renderer");
        const { applyNarrativePatch } = await import("./engine/report/narrative/applyPatch");

        // Ensure API Key from secret is in env for the library
        process.env.OPENAI_API_KEY = OPENAI_API_KEY.value();

        try {
            const patch = await generateNarrativePatch(narrativeInput);
            finalReport = applyNarrativePatch(finalReport, patch);
        } catch (narrativeError: any) {
            logger.error("Narrative Generation Failed:", narrativeError);
            throw new HttpsError("internal", "리포트 서술 생성 중 오류가 발생했습니다.");
        }

        // [ATOMIC-R2-04 / R3-04] Quality Gate Enforcement
        try {
            const hasHanja = /\p{Script=Han}/u.test(userName);
            validateAndRepairReport(finalReport, parseResult.data.timeUnknown, hasHanja);
        } catch (error) {
            if (error instanceof QualityValidationError) {
                logger.warn("Quality Gate Rejected Report:", error.details);
                throw new HttpsError(
                    "failed-precondition",
                    "분석 리포트 품질 검증에 실패했습니다. (내용 밀도 또는 정책 위반)",
                    { violations: error.details }
                );
            }
            throw error;
        }

        // Save to Firestore
        const docRef = await admin.firestore().collection("reports").add({
            input,
            userName: sanitizedName,
            scriptType: detectScriptType(sanitizedName),
            deterministicPacket,
            report: finalReport,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        return {
            reportId: docRef.id,
            deterministicPacket,
            report: finalReport
        };
    } catch (error: any) {
        if (error instanceof HttpsError) throw error;
        logger.error("Report generation failed:", error);
        throw new HttpsError("internal", error.message);
    }
});

export { generateLuckCalendar };
