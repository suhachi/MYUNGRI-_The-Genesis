/**
 * Kakao SDK Wrapper Logic
 */

declare global {
    interface Window {
        Kakao: any;
    }
}

export const isKakaoAvailable = (): boolean => {
    return !!window.Kakao;
};

export const initKakao = (): boolean => {
    if (!isKakaoAvailable()) return false;

    const key = import.meta.env.VITE_KAKAO_JS_KEY;
    if (!key) {
        console.warn("Kakao JS Key is missing in .env");
        return false;
    }

    if (!window.Kakao.isInitialized()) {
        try {
            window.Kakao.init(key);
        } catch (e) {
            console.error("Kakao init failed:", e);
            return false;
        }
    }
    return true;
};

export interface KakaoSharePayload {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}

export const shareToKakao = (payload: KakaoSharePayload) => {
    if (!initKakao()) return;

    window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: payload.title,
            description: payload.description,
            imageUrl: payload.imageUrl,
            link: {
                mobileWebUrl: payload.url,
                webUrl: payload.url,
            },
        },
        buttons: [
            {
                title: 'View Report',
                link: {
                    mobileWebUrl: payload.url,
                    webUrl: payload.url,
                },
            },
        ],
    });
};
