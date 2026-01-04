// Report Utilities
// P4-ATOMIC-004: Disclaimer Injection

export const TIME_UNKNOWN_DISCLAIMER = "※ 태어난 시각을 알 수 없어 '시주(時柱)' 판단을 유보하며, 관련 분석이 배제됩니다. 정확한 시각 입력 시 결과가 달라질 수 있습니다.";

export interface ReportMeta {
    timeUnknown: boolean;
    mainDisclaimer?: string;
}

export function injectDisclaimer(meta: ReportMeta): ReportMeta {
    if (meta.timeUnknown) {
        return {
            ...meta,
            mainDisclaimer: TIME_UNKNOWN_DISCLAIMER
        };
    }
    return meta;
}

export function validateReportQuality(meta: ReportMeta): boolean {
    if (meta.timeUnknown && !meta.mainDisclaimer) {
        // Quality Gate Fail
        return false;
    }
    return true;
}
