/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

/**
 * Firebase 초기화 및 보안 하드닝 [S2: App Check]
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

// App Check 초기화 (Web: reCAPTCHA v3)
if (typeof window !== 'undefined') {
    // 로컬 개발 환경(localhost)에서는 Debug Provider 활성화
    if (import.meta.env.DEV) {
        // @ts-ignore
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (siteKey) {
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(siteKey),
            isTokenAutoRefreshEnabled: true
        });
    } else if (!import.meta.env.DEV) {
        console.warn("App Check Site Key is missing in production environment.");
    }
}

// 가용 환경에서만 Analytics 초기화
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const db = getFirestore(app);
export const functions = getFunctions(app, 'asia-northeast3');

// 에뮬레이터 연결
if (import.meta.env.DEV) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export default app;
