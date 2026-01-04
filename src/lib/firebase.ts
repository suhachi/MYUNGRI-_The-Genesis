/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import type { Functions } from "firebase/functions";
import { connectFunctionsEmulator } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

/**
 * Firebase 초기화 및 보안 하드닝 [Phase 12: Authoritative Patch]
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

export let firebaseConfigError: string | null = null;
export let isAppCheckReady = false;
export let appCheckError: string | null = null;

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let functions: Functions | undefined;

// [Zero Tolerance] 전 필드 엄격 검증 (PROD 크래시 차단)
const isConfigValid = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.projectId !== 'undefined'
);

if (isConfigValid) {
    try {
        console.log("[Firebase] Config validated. Initializing app...");
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        functions = getFunctions(app, 'asia-northeast3');

        if (typeof window !== 'undefined') {
            if (import.meta.env.DEV) {
                // @ts-ignore
                self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
                isAppCheckReady = true;
                console.log("[AppCheck] Debug mode enabled.");
            }

            const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
            if (siteKey && siteKey !== 'REPLACE') {
                try {
                    initializeAppCheck(app, {
                        provider: new ReCaptchaV3Provider(siteKey),
                        isTokenAutoRefreshEnabled: true
                    });
                    isAppCheckReady = true;
                    console.log("[AppCheck] Initialized successfully.");
                } catch (err) {
                    appCheckError = "APPCHECK_INIT_FAILED";
                    console.error("Critical: App Check initialization threw an error:", err);
                }
            } else if (import.meta.env.PROD) {
                appCheckError = "MISSING_SITE_KEY";
                console.error("Critical: App Check Site Key is missing in production.");
            }
        }
    } catch (e) {
        firebaseConfigError = "INIT_FAILED";
        console.error("Firebase Initialization Failed:", e);
    }
} else if (import.meta.env.PROD) {
    firebaseConfigError = "MISSING_FIREBASE_CONFIG";
    console.error("Critical: Firebase configuration values are missing or invalid in production.");
}

export const analytics = (app && typeof window !== 'undefined') ? getAnalytics(app) : null;

if (app && db && functions && import.meta.env.DEV) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export const dbInstance = db as Firestore;
/**
 * [Phase 27] Authoritative KR Region Instance
 * 모든 Callable 호출은 이 인스턴스를 통해 asia-northeast3로 강제됩니다.
 */
export const functionsKR = functions as Functions;
export const functionsInstance = functions as Functions; // 하위 호환성 유지
export { app, db, functions };
export default app;

