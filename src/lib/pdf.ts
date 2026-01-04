/**
 * PDF Utility for Phase 26
 * Opens print-optimized report page in new window
 */

export const openPrintWindow = (reportId: string): void => {
    const printUrl = `/report/${reportId}/print`;
    const printWindow = window.open(printUrl, '_blank', 'width=1200,height=800');

    if (!printWindow) {
        console.error('[PDF] Failed to open print window. Check popup blocker.');
        alert('팝업 차단을 해제해 주세요.');
    }
};
