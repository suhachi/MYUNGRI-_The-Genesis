/**
 * Share Metadata Configuration
 * Strict Rules: EN brand only ("MYUNGRI: The Genesis")
 */

const origin = import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin;

export const SHARE_META = {
    TITLE: "MYUNGRI: The Genesis",
    DESCRIPTION: "Modern Heritage & Astro-Data Analysis Report",
    IMAGE_URL: `${origin}/og-placeholder.png`, // 실제 운영 시 절대 경로 OG 이미지 필요
    URL_BASE: origin
};

export const getShareUrl = () => {
    // 리포트는 stateful하므로 직접 공유 대신 시작 페이지(/start) 공유 권장
    return `${SHARE_META.URL_BASE}/start`;
};
