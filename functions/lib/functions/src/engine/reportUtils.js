"use strict";
// Report Utilities
// P4-ATOMIC-004: Disclaimer Injection
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIME_UNKNOWN_DISCLAIMER = void 0;
exports.injectDisclaimer = injectDisclaimer;
exports.validateReportQuality = validateReportQuality;
exports.TIME_UNKNOWN_DISCLAIMER = "※ 태어난 시각을 알 수 없어 '시주(時柱)' 판단을 유보하며, 관련 분석이 배제됩니다. 정확한 시각 입력 시 결과가 달라질 수 있습니다.";
function injectDisclaimer(meta) {
    if (meta.timeUnknown) {
        return {
            ...meta,
            mainDisclaimer: exports.TIME_UNKNOWN_DISCLAIMER
        };
    }
    return meta;
}
function validateReportQuality(meta) {
    if (meta.timeUnknown && !meta.mainDisclaimer) {
        // Quality Gate Fail
        return false;
    }
    return true;
}
//# sourceMappingURL=reportUtils.js.map