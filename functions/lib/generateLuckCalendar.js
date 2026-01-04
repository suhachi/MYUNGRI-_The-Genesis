"use strict";
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
/**
 * generateLuckCalendar (Phase 26)
 * Generates 365-day luck calendar with scores, grades, and action plans
 * Uses Firestore caching to reduce costs
 */
exports.generateLuckCalendar = onCall({
    region: "asia-northeast3",
    enforceAppCheck: process.env.FUNCTIONS_EMULATOR !== "true",
    timeoutSeconds: 300,
    memory: "512MiB"
}, async (request) => {
    const { reportId, year } = request.data;
    const uid = request.auth?.uid || "anonymous";
    try {
        // 1. Validation
        if (!reportId || typeof reportId !== 'string') {
            throw new HttpsError("invalid-argument", "reportId가 유효하지 않거나 누락되었습니다.");
        }
        const targetYear = year || new Date().getFullYear();
        if (targetYear < 1890 || targetYear > 2100) {
            throw new HttpsError("invalid-argument", "지원되지 않는 연도 범위입니다 (1890-2100).");
        }
        // 2. Load report (Verification)
        const reportRef = admin.firestore().collection("reports").doc(reportId);
        const reportDoc = await reportRef.get();
        if (!reportDoc.exists) {
            console.error(`[generateLuckCalendar] Report not found. ID: ${reportId}`);
            throw new HttpsError("not-found", "해당 리포트를 찾을 수 없습니다. 다시 시도해 주세요.");
        }
        const reportData = reportDoc.data();
        const input = reportData.input;
        if (!input || !input.birthDate) {
            console.error(`[generateLuckCalendar] Invalid report data structure. ID: ${reportId}`);
            throw new HttpsError("failed-precondition", "리포트 데이터 내 입력 정보(생년월일 등)가 누락되었습니다.");
        }
        // 3. Check cache
        const cacheId = `${reportId}_${targetYear}`;
        const cacheRef = admin.firestore().collection("luckCalendars").doc(cacheId);
        const cacheDoc = await cacheRef.get();
        if (cacheDoc.exists) {
            const cached = cacheDoc.data();
            const genAt = cached.generatedAt;
            const genTime = (genAt && typeof genAt.toMillis === 'function')
                ? genAt.toMillis()
                : new Date(genAt || 0).getTime();
            const cacheAge = Date.now() - genTime;
            if (cacheAge < 30 * 24 * 60 * 60 * 1000) {
                return cached;
            }
        }
        // 4. Generate 365/366 days
        const isLeapYear = (targetYear % 4 === 0 && targetYear % 100 !== 0) || (targetYear % 400 === 0);
        const totalDays = isLeapYear ? 366 : 365;
        const days = [];
        for (let dayOfYear = 1; dayOfYear <= totalDays; dayOfYear++) {
            const date = new Date(targetYear, 0, dayOfYear);
            const dateStr = date.toISOString().split('T')[0];
            const score = calculateDayScore(date, input);
            const grade = score >= 70 ? "GOOD" : score >= 40 ? "WARN" : "CAUTION";
            days.push({
                date: dateStr,
                dayGanji: "UNKNOWN",
                score,
                grade,
                reasons: generateReasons(score, grade),
                actionPlan: generateActionPlan(grade),
                eventFit: {
                    contract: score >= 65 ? "GOOD" : score >= 35 ? "WARN" : "CAUTION",
                    signboard: score >= 70 ? "GOOD" : score >= 40 ? "WARN" : "CAUTION",
                    launch: score >= 75 ? "GOOD" : score >= 45 ? "WARN" : "CAUTION"
                }
            });
        }
        const result = {
            year: targetYear,
            reportId,
            timezone: "Asia/Seoul",
            generatedAt: new Date().toISOString(),
            calendar: days
        };
        // Cache result
        await cacheRef.set(result);
        return result;
    }
    catch (err) {
        console.error("[generateLuckCalendar] Exception:", {
            reportId,
            uid,
            message: err.message,
            stack: err.stack,
            code: err.code
        });
        if (err instanceof HttpsError)
            throw err;
        throw new HttpsError("internal", `운기 캘린더 생성 실패: ${err.message || "UNKNOWN_ERROR"}`, {
            reportId,
            timestamp: new Date().toISOString()
        });
    }
});
/**
 * Deterministic day score calculation
 * Based on date patterns and birth data
 */
function calculateDayScore(date, birthInput) {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    // Simple deterministic algorithm (can be enhanced with actual 명리 logic)
    let score = 50; // Base score
    // Birth month affinity
    const birthMonth = parseInt(birthInput.birthDate.split('-')[1]);
    if (month === birthMonth)
        score += 15;
    if (Math.abs(month - birthMonth) === 6)
        score -= 10;
    // Day patterns
    if (dayOfWeek === 0 || dayOfWeek === 6)
        score += 5; // Weekend bonus
    if (dayOfMonth % 10 === 8)
        score += 10; // Lucky number 8
    if (dayOfMonth === 13)
        score -= 15; // Unlucky 13
    // Month patterns
    if ([1, 5, 9].includes(month))
        score += 5; // Spring/summer/autumn starts
    if ([2, 6, 10].includes(month))
        score -= 3; // Transition months
    // Clamp to 0-100
    return Math.max(0, Math.min(100, score));
}
function generateReasons(score, grade) {
    if (grade === "GOOD") {
        return [
            "시스템 트래픽이 안정적입니다",
            "에너지 흐름이 원활합니다",
            "외부 충돌 리스크가 낮습니다"
        ];
    }
    else if (grade === "WARN") {
        return [
            "시스템 부하가 중간 수준입니다",
            "일부 프로세스에서 병목이 예상됩니다",
            "주의 깊은 모니터링이 필요합니다"
        ];
    }
    else {
        return [
            "시스템 충돌 위험이 높습니다",
            "에너지 누수 구간입니다",
            "중요 결정은 연기를 권장합니다"
        ];
    }
}
function generateActionPlan(grade) {
    if (grade === "GOOD") {
        return [
            "중요한 계약이나 협상을 진행하세요",
            "새로운 프로젝트를 시작하기 좋은 날입니다",
            "대인 관계 확장에 적극적으로 나서세요"
        ];
    }
    else if (grade === "WARN") {
        return [
            "신중한 의사결정을 하세요",
            "기존 업무에 집중하고 새로운 시도는 최소화하세요",
            "건강 관리에 신경 쓰세요"
        ];
    }
    else {
        return [
            "중요한 결정은 미루세요",
            "방어적인 자세를 유지하세요",
            "휴식과 재충전에 집중하세요"
        ];
    }
}
//# sourceMappingURL=generateLuckCalendar.js.map