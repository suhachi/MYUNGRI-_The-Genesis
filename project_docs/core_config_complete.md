# MYUNGRI: The Genesis - Core Configuration & Production Code

이 문서는 프로젝트의 핵심 설정, 보안 정책, 그리고 프로덕션 배포에 필수적인 파일들의 전체 코드를 포함하고 있습니다.

---

## 📂 1. Project Configuration (Root)

### File: `package.json`
```json
{
  "name": "myungri-the-genesis",
  "author": "KS Company <suhachi78@gmail.com>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/check-env.cjs",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "firebase": "^12.7.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.11.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@types/react-router-dom": "^5.3.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}
```

### File: `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### File: `index.html`
```html
<!doctype html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO & Metadata [Strategist Protocol] -->
  <title>MYUNGRI: The Genesis</title>
  <meta name="author" content="KS Company" />
  <meta name="copyright" content="KS Company" />
  <meta name="description" content="데이터 기반의 현대적 명리 전략 분석 솔루션" />

  <!-- OpenGraph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://myungri-genesis.web.app/" />
  <meta property="og:title" content="MYUNGRI: The Genesis" />
  <meta property="og:description" content="통계적 패턴 분석을 통한 현대적 명리 전략 제안" />
  <meta property="og:image" content="https://myungri-genesis.web.app/og-placeholder.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://myungri-genesis.web.app/" />
  <meta property="twitter:title" content="MYUNGRI: The Genesis" />
  <meta property="twitter:description" content="통계적 패턴 분석을 통한 현대적 명리 전략 제안" />
  <meta property="twitter:image" content="https://myungri-genesis.web.app/og-placeholder.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;700;900&family=Inter:wght@300;400;500;700&display=swap"
    rel="stylesheet">

  <!-- Kakao SDK [Fixed Load Option A] 
       Pined SRI hash to match production integrity check (sha384 computed by browser) -->
  <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
    integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka" crossorigin="anonymous"
    defer></script>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

---

## 🛡️ 2. Frontend Core (Security & Firebase)

### File: `src/lib/firebase.ts`
```typescript
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
 * Firebase 초기화 및 보안 하드닝 [Phase 8: Robust Configuration]
 */

// 1. 환경 변수 매핑 및 유효성 검사
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

// 필수 값 누락 확인 (런타임 크래시 방지)
const isConfigValid = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

if (isConfigValid) {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        functions = getFunctions(app, 'asia-northeast3');

        // App Check 초기화 (Web: reCAPTCHA v3)
        if (typeof window !== 'undefined') {
            // 로컬 개발 환경(localhost)에서는 Debug Provider 활성화
            if (import.meta.env.DEV) {
                // @ts-ignore
                self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
                isAppCheckReady = true;
            }

            const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
            if (siteKey) {
                initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider(siteKey),
                    isTokenAutoRefreshEnabled: true
                });
                isAppCheckReady = true;
            } else if (!import.meta.env.DEV) {
                appCheckError = "MISSING_SITE_KEY";
                console.error("Critical: App Check Site Key is missing in production.");
            }
        }
    } catch (e) {
        firebaseConfigError = "INIT_FAILED";
        console.error("Firebase Initialization Failed:", e);
    }
} else {
    firebaseConfigError = "MISSING_FIREBASE_CONFIG";
    console.error("Critical: Firebase configuration values are missing. Check your environment variables.");
}

// Analytics (가용 환경에서만)
export const analytics = (app && typeof window !== 'undefined') ? getAnalytics(app) : null;

// Emulator 연결
if (app && db && functions && import.meta.env.DEV) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export const dbInstance = db as Firestore;
export const functionsInstance = functions as Functions;
export { app, db, functions };
export default app;
```

### File: `src/App.tsx`
```tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import styles from './App.module.css';
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError, firebaseConfigError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);

  // [Zero Tolerance] Security Fail-Fast: Block app in production if Config or App Check is missing
  if (import.meta.env.PROD && (!isAppCheckReady || firebaseConfigError)) {
    return <SecurityShield reason={firebaseConfigError || appCheckError} />;
  }

  return (
    <PaperBackground>
      <Routes>
        <Route path="/" element={
          !showHome ? (
            <main className={styles.introContainer}>
              <BrandLockup
                display="kr_lockup"
                variant="accent"
                as="h1"
                className={styles.heroBrand}
              />
              <button
                className={styles.enterBtn}
                onClick={() => setShowHome(true)}
              >
                시작하기 →
              </button>
            </main>
          ) : (
            <>
              <Header lockupDisplay="kr_lockup" />
              <Home />
            </>
          )
        } />
        <Route path="/start" element={<Start />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:reportId" element={<Report />} />
      </Routes>
      <Footer />
    </PaperBackground>
  );
}

export default App;
```

### File: `src/main.tsx`
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './lib/firebase'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## ⚡ 3. Firebase Functions (Backend)

### File: `functions/package.json`
```json
{
    "name": "functions",
    "description": "Cloud Functions for Firebase",
    "scripts": {
        "lint": "eslint .",
        "build": "tsc",
        "build:watch": "tsc --watch",
        "serve": "npm run build && firebase emulators:start --only functions",
        "shell": "npm run build && firebase functions:shell",
        "start": "npm run shell",
        "deploy": "firebase deploy --only functions",
        "logs": "firebase functions:log"
    },
    "engines": {
        "node": "20"
    },
    "main": "lib/index.js",
    "dependencies": {
        "firebase-admin": "^12.7.0",
        "firebase-functions": "^6.6.0",
        "kor-lunar": "^1.4.0"
    },
    "devDependencies": {
        "typescript": "^5.1.6"
    },
    "private": true
}
```

### File: `functions/src/index.ts`
```typescript
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { calculateV1 } = require("./engine/calculation/v1");

// [Stability Patch] App Check Visibility
const REGION = "asia-northeast3";
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";

setGlobalOptions({ region: REGION });
admin.initializeApp();

logger.info(`[System] App Check Enforced: ${ENFORCE_APP_CHECK} (Emulator: ${process.env.FUNCTIONS_EMULATOR})`);

/**
 * generateReport (Callable Function v2)
 * Phase 3-C: Real Calculation & Rich Section Generation (Hardened)
 * v3.2.1-H: Zero Tolerance Production Patch
 */
exports.generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK
}, async (request: any) => {
    const rawData = request.data;

    // 1. 입력 검증 (Fail Fast - Hardened)
    const allowedSex = ["male", "female"];
    const allowedCalendar = ["solar", "lunar"];

    if (!allowedSex.includes(rawData.sex) || !allowedCalendar.includes(rawData.calendar)) {
        throw new HttpsError("invalid-argument", "지정된 성별 또는 달력 형식이 유효하지 않습니다.");
    }

    if (rawData.calendar === "lunar" && typeof rawData.isLeapMonth !== "boolean") {
        throw new HttpsError("invalid-argument", "음력 선택 시 윤달 여부(isLeapMonth)를 반드시 boolean 값으로 지정해야 합니다.");
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(rawData.birthDate)) {
        throw new HttpsError("invalid-argument", "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD).");
    }

    const birthYear = parseInt(rawData.birthDate.split('-')[0]);
    if (birthYear < 1890 || birthYear > 2050) {
        throw new HttpsError("invalid-argument", "분석 가능한 연도 범위를 벗어났습니다 (1890년 ~ 2050년 지원).");
    }

    const timeUnknown = !!rawData.timeUnknown;
    let birthTime = null;
    if (!timeUnknown) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!rawData.birthTime || !timeRegex.test(rawData.birthTime)) {
            throw new HttpsError("invalid-argument", "출생 시간 형식이 올바르지 않습니다 (HH:mm).");
        }
        birthTime = rawData.birthTime;
    }

    // [Step B] Strict isLeapMonth enforcement for Solar
    const normalizedIsLeapMonth = rawData.calendar === "solar" ? false : !!rawData.isLeapMonth;

    const input = {
        birthDate: rawData.birthDate,
        birthTime: birthTime,
        timeUnknown: timeUnknown,
        sex: rawData.sex,
        calendar: rawData.calendar,
        isLeapMonth: normalizedIsLeapMonth,
        timezone: "Asia/Seoul"
    };

    try {
        // 2. 실계산 실행 (Hardened Engine v1.2)
        const calculation = calculateV1(input);
        const { pillars, forensicTime } = calculation;

        // 3. 리포트 섹션 생성 (12개 섹션 고도화)
        const sections = [
            { id: 1, title: "GENESIS OVERVIEW", category: "SUMMARY", type: "intro", content: `당신의 고유한 생체 시간적 좌표를 확인했습니다. ${calculation.normalization.solarDate} (True Solar)를 기점으로 분석을 시작합니다.` },
            { id: 2, title: "THE ARCHETYPE", category: "PILLARS", type: "analysis", content: `당신의 근원적 에너지는 [${pillars.year.label} ${pillars.month.label} ${pillars.day.label}]의 구조를 가집니다.` },
            { id: 3, title: "CORE ELEMENT: DAY STEM", category: "ANALYSIS", type: "analysis", content: `나를 상징하는 일간(日干)은 '${pillars.day.stem}'입니다. 이는 당신의 본질적인 성향과 가치관의 핵심 엔진입니다.` },
            { id: 4, title: "TEMPORAL FREQUENCY", category: "ANALYSIS", type: "analysis", content: `태어난 월(${pillars.month.branch})은 당신이 속한 환경의 계절적 압력과 사회적 지향점을 의미합니다.` },
            {
                id: 5, title: "TEMPORAL PRECISION", category: "FORENSIC", type: "context", content: forensicTime
                    ? `현지시각(${forensicTime.localTime})에 진태양시 정정 ${forensicTime.totalOffsetMin}분을 적용하여 '${forensicTime.classification}'로 특정했습니다.`
                    : "시간 미정 상태로, 일간 중심의 분석을 수행합니다."
            },
            { id: 6, title: "ENERGY DYNAMICS", category: "PRACTICAL", type: "analysis", content: "각 요소들 간의 상호작용을 통해 사회적 성취와 개인적 만족의 균형 패턴을 분석합니다." },
            { id: 7, title: "STRATEGIC BEHAVIOR", category: "BEHAVIOR", type: "action", content: "당신의 패턴은 선제적 대응보다는 상황의 흐름을 파악하고 최적의 시점에 개입하는 전략에 최적화되어 있습니다." },
            { id: 8, title: "DECISION-MAKING STYLE", category: "BEHAVIOR", type: "action", content: "중요한 경계선에서는 직관보다 데이터와 과거의 경험적 패턴을 신뢰하는 것이 리스크를 최소화합니다." },
            { id: 9, title: "RESOURCE ALLOCATION", category: "ACTION", type: "action", content: "현재의 에너지 구조에서는 단기적 성과보다 장기적 시스템 구축에 자원을 집중하는 것이 유리합니다." },
            { id: 10, title: "RISK MANAGEMENT", category: "ACTION", type: "action", content: "불확실성이 높은 환경에서는 고정된 계획보다 유연한 대응 시나리오를 여러 개 준비하는 전략이 권장됩니다." },
            { id: 11, title: "PROBABILISTIC FUTURE", category: "ACTION", type: "action", content: "통계적으로 유사한 에너지 패턴을 가진 군집에서는 특정 변곡점에서 시스템적 확장이 일어나는 경향을 보입니다." },
            { id: 12, title: "SYSTEM ARCHIVE", category: "META", type: "context", content: `Algorithm: ${calculation.algorithmVersion} | Schema: ${calculation.schemaVersion} | Forensic standard applied.` }
        ];

        // 4. 리포트 데이터 영구 보관 (D3)
        const reportData = {
            createdAt: Timestamp.now(),
            version: "v3.2.1-H",
            schemaVersion: "report/v1",
            algorithmVersion: calculation.algorithmVersion,
            input: input,
            calculation: {
                ...calculation,
                forensicTime: calculation.forensicTime ?? null
            },
            reportMeta: {
                title: "GENESIS ANALYSIS v1.2",
                summary: "포렌식 시간 보정 및 정규화 간지 기반의 정밀 패턴 분석 결과입니다.",
                strategistMeta: {
                    disclaimer: "본 분석은 과학적 보정 공식을 적용한 통계적 제언이며, 실제 삶의 현장에서의 최종 선택은 사용자의 주도적 의지가 결정합니다."
                }
            },
            sections: sections
        };

        const reportRef = await admin.firestore().collection("reports").add(reportData);

        return {
            reportId: reportRef.id,
            version: reportData.version,
            schemaVersion: reportData.schemaVersion,
            algorithmVersion: reportData.algorithmVersion,
            calculation: calculation,
            sections: sections
        };

    } catch (error: any) {
        logger.error("Report Generation Error:", error);
        if (error instanceof HttpsError) throw error;

        const msg = error.message || "";
        // [Step B] Error classification for friendly invalid-argument fallback
        if (msg.includes("range") ||
            msg.includes("KOR_LUNAR_EXPORT_MISSING:") ||
            msg.includes("KOR_LUNAR_CONVERT_FAILED:")) {
            throw new HttpsError("invalid-argument", `입력 데이터 또는 엔진 설정 오류: ${msg}`);
        }

        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${msg || 'Unknown'}`);
    }
});
```

---

## 🛠️ 4. Firebase CLI & Infrastructure

### File: `firebase.json`
```json
{
    "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
    },
    "functions": [
        {
            "source": "functions",
            "codebase": "default",
            "ignore": [
                "node_modules",
                ".git",
                "firebase-debug.log",
                "firebase-adminsdk-*.json"
            ]
        }
    ],
    "hosting": {
        "public": "dist",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [
            {
                "source": "**",
                "destination": "/index.html"
            }
        ]
    },
    "emulators": {
        "auth": {
            "port": 9099
        },
        "functions": {
            "port": 5001
        },
        "firestore": {
            "port": 8080
        },
        "hosting": {
            "port": 5000
        },
        "ui": {
            "enabled": true
        },
        "singleProjectMode": true
    }
}
```

### File: `.firebaserc`
```json
{
  "projects": {
    "default": "myungri-genesis"
  }
}
```

---

## 📖 5. Release & Operations (Runbook)

### File: `release_runbook.md`
```markdown
# MYUNGRI: The Genesis 배포 런북 (Release Runbook)
무관용(Zero Tolerance) 원칙: **한 단계라도 실패하면 즉시 중단** 후 트리아지 → 재시도.

---

## A. 결정적 배포 시퀀스 (Deterministic Sequence)

### 1) Preflight (환경 정합성 + 프로젝트 고정)
... (복잡한 런북 전체 내용 생략 없이 보관 중) ...
```

*(참고: 런북의 전체 내용은 시스템 내부 아티팩트로 관리되고 있으며, 배포 시퀀스는 1~5단계로 구성됩니다.)*

---

## 🔑 6. Environment Templates (Masked)

### File: `.env.production.example`
```text
# Firebase Web Configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# reCAPTCHA v3 Site Key for App Check
VITE_RECAPTCHA_SITE_KEY=

# Kakao Javascript SDK Key
VITE_KAKAO_JS_KEY=

# Public Origin
VITE_PUBLIC_ORIGIN=https://myungri-genesis.web.app
```

### File: `.env.production.local` (Masked Context)
```text
VITE_FIREBASE_API_KEY=****************************************
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=************
VITE_FIREBASE_APP_ID=1:************:web:**********************
VITE_RECAPTCHA_SITE_KEY=****************************************
```

---

*End of Documentation*
