"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLuckCalendar = exports.generateReport = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const v2_1 = require("firebase-functions/v2");
const params_1 = require("firebase-functions/params");
const firebase_functions_1 = require("firebase-functions");
const input_schema_1 = require("./contracts/input.schema");
const nameSanitize_1 = require("./contracts/shared/nameSanitize");
// Luck Calendar Export
const generateLuckCalendar_1 = require("./generateLuckCalendar");
Object.defineProperty(exports, "generateLuckCalendar", { enumerable: true, get: function () { return generateLuckCalendar_1.generateLuckCalendar; } });
const REGION = "asia-northeast3";
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
const OPENAI_API_KEY = (0, params_1.defineSecret)("OPENAI_API_KEY");
(0, v2_1.setGlobalOptions)({ region: REGION });
if (!admin.apps.length) {
    admin.initializeApp();
}
const engine_1 = require("./engine");
const main_1 = require("./engine/assembler/main");
const gate_1 = require("./engine/quality/gate");
const reportValidator_1 = require("./engine/quality/reportValidator");
/**
 * [Phase 28] ATOMIC-R2-01: Shared Contract Implementation
 * - Same runtime schema for FE/BE.
 * - Deterministic Engine Separation.
 */
exports.generateReport = (0, https_1.onCall)({
    enforceAppCheck: ENFORCE_APP_CHECK,
    secrets: [OPENAI_API_KEY],
    timeoutSeconds: 300,
    memory: "1GiB"
}, async (request) => {
    const rawData = request.data;
    // 1. Runtime Schema Validation (Shared Contract)
    const parseResult = input_schema_1.InputSchema.safeParse(rawData);
    if (!parseResult.success) {
        throw new https_1.HttpsError("invalid-argument", "입력 정보가 올바르지 않습니다.", parseResult.error.flatten());
    }
    const input = parseResult.data;
    const userName = (input.userName || "익명").trim();
    const sanitizedName = (0, nameSanitize_1.sanitizeUserName)(userName);
    try {
        // [ATOMIC-R2-02] Deterministic Engine Call (A-Stage)
        const deterministicPacket = (0, engine_1.generateDeterministicPacket)({
            birthDate: input.birthDate,
            birthTime: input.birthTime || "",
            timeUnknown: input.timeUnknown,
            sex: input.sex,
            calendar: input.calendar,
            isLeapMonth: input.isLeapMonth || false,
            timezone: input.timezone || "Asia/Seoul"
        }, sanitizedName);
        // [ATOMIC-R2-03] Assembly (B-Stage)
        const report = (0, main_1.assembleReport)(deterministicPacket);
        // [ATOMIC-R2-04] Quality Gate Enforcement
        try {
            (0, gate_1.validateAndRepairReport)(report);
        }
        catch (error) {
            if (error instanceof reportValidator_1.QualityValidationError) {
                firebase_functions_1.logger.warn("Quality Gate Rejected Report:", error.details);
                throw new https_1.HttpsError("failed-precondition", "분석 리포트 품질 검증에 실패했습니다. 다시 시도해주시거나 관리자에게 문의해주세요.", { violations: error.details });
            }
            throw error;
        }
        // Save to Firestore
        const docRef = await admin.firestore().collection("reports").add({
            input,
            userName: sanitizedName,
            scriptType: (0, nameSanitize_1.detectScriptType)(sanitizedName),
            deterministicPacket,
            report,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        return {
            reportId: docRef.id,
            deterministicPacket,
            report
        };
    }
    catch (error) {
        if (error instanceof https_1.HttpsError)
            throw error;
        firebase_functions_1.logger.error("Report generation failed:", error);
        throw new https_1.HttpsError("internal", error.message);
    }
});
//# sourceMappingURL=index.js.map