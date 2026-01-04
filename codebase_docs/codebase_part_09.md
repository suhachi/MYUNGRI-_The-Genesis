# 📦 프로젝트 코드베이스 - Part 9/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs/core_config_complete.md`
- `fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md`
- `scripts/generate-structured-docs.cjs`
- `src/components/report/LuckCalendar.module.css`
- `src/pages/Processing.module.css`
- `scripts/debug-v1.cts`
- `README.md`
- `index.html`
- `scripts/gen-build-info.mjs`
- `tsconfig.app.json`
- `src/config/shareMeta.ts`
- `functions/tsconfig.json`
- `src/buildInfo.ts`
- `firestore.indexes.json`

---

## 📄 파일 내용

## 📄 project_docs/core_config_complete.md

```markdown
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

```

---

## 📄 fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md

```markdown
# Fate Forensics — 초원자단위 PRD·와이어프레임·개발로드맵(v2)

> **목표**: “Digital Ancient Book(디지털 고서)” 경험으로 **원국 분석 리포트(32p+)**를 생성하는 웹서비스.
>
> **핵심 원칙(제품 고정)**
> 1) **계산(만세력/절기/진태양시/표준시 예외)** = 100% 하드코딩(알고리즘) / AI 개입 금지
> 2) **해석(리포트 본문)** = Rule Engine이 산출한 **Reason Card만 사용**
> 3) LLM = **문장 리라이팅 전용**(Reason Card 외 내용 창작 금지) + Negative Constraints 강제
>
> **룩앤필 고정 기준**: 첨부 `333.html`의 Look & Feel을 100% 준수 (배경/폰트 대비/여백/권위감).

---

## 0. 산출물(이번 v2에서 확정)

1) **전체 프로젝트 개발 기획서/계획서**
2) **초원자단위 기능상세 PRD(v2)** (페이지/기능/검증 포함)
3) **와이어프레임(v2)** (페이지별 구조 + 버튼 위치/라벨 + 반응형 규칙)
4) **원국 분석 리포트 구현 지시서(Genesis Book Style)** (디자인 토큰/컴포넌트/레이아웃)
5) **초원자단위 개발 로드맵(v2)** (작업 순서/완료 조건/검증)
6) **오류/수정 대응 시나리오(v1)** (실패 유형별 진단/대응/롤백)
7) **Anti-Gravity(개발 시작) 초원자단위 프롬프트 묶음** (Role/Context/Task/Constraints/Output)

---

# PART A. 제품 정의(기획서/계획서)

## A1. 제품 포지션
- **학술적 분석 리포트의 권위감** + **상담형 문장(이해 쉬움)**
- “놀이”가 아닌 **근거 기반(Reason Card)**, **출처(원전명+룰 제목) 공개(B 정책)**

## A2. 사용자 플로우(핵심)
1) **Intro** → 2) **Home**(Hero + 입력 진입) → 3) **Input**(생년월일시/성별/출생지/옵션) → 4) **Processing**(Trivia/Quiz 롤링) → 5) **Report**(32p+) → 6) **Share**(카카오 링크 카드) → 7) **Archive(선택)**

## A3. 데이터/엔진 철학(하이브리드)
- **Calculation Engine**: 만세력/절기/진태양시/표준시 예외/윤달/서머타임 등 오차 0 목표
- **Rule Engine**: 조건 충족 룰(Reason Card) 추출 + Conflict 해결(Topic 단위) + Weight 우선
- **LLM Rewriter**: Reason Card를 **상담형 에세이**로 연결(의미 변경 금지)

---

# PART B. 디자인 시스템(고정) — Fate Forensics: The Genesis Style

## B1. 컨셉
- Modern Heritage / Authentic / Raw / Intellectual / Scientific
- “오래된 고서의 질감 위에 현대 데이터 분석이 얹힌 느낌”

## B2. 디자인 토큰(반드시 변수로)
> **주의**: #000/#FFF “직접 사용 금지”. 아래 토큰만 사용.

### B2-1. CSS Variables (필수)
```css
:root{
  --bg:#EBE7E0;        /* bg-paper_raw */
  --card:#FDFCF8;      /* bg-card */
  --ink:#1C1C1C;       /* text-ink_wet */
  --muted:#5A5A5A;     /* text-gray-600 */
  --accent:#D9381E;    /* text-cinnabar */
  --line:rgba(28,28,28,.12);
  --kakao:#FAE100;
}
```

### B2-2. Typography
- Headings/Art: **Noto Serif KR** (700/900)
- Body/UI: **Noto Sans KR** (300~500)
- 본문 line-height: **1.75**
- **Google Fonts 로딩 필수**: Serif 900 포함

### B2-3. Background Texture
- `--bg` 위에 종이 텍스처(노이즈) 오버레이 필수
- (예) transparenttextures `natural-paper` 또는 자체 noise.png
- blend: multiply, opacity 0.25~0.45

### B2-4. Kanji Watermark (매우 중요)
- 폰트: Noto Serif KR 900
- opacity 0.03~0.10 + `mix-blend-mode: multiply`
- desktop: 우측 대형 / mobile: 배경으로 축소/재배치

### B2-5. Highlight (붉은 밑줄)
- accent(#D9381E) 0.15~0.25 opacity
- 텍스트 하단 20% 지점에 깔리게

## B3. UI 컴포넌트 스펙(모듈화)

### B3-1. Buttons
- Primary: bg `--ink`, text white, radius 0~4px, hover 시 미세 밝아짐 + 화살표 이동
- Secondary: 투명 + underline(하단 border), hover 시 라인 진해짐

### B3-2. Report Card
- 배경 `--card`
- 상단 4px accent bar
- shadow: `0 20px 50px -12px rgba(0,0,0,.05)`

### B3-3. Context Box(해석/설명)
- 목적: **“요즘 사람용 쉬운 설명”**을 “해석/설명”으로 표기
- 배경 #F7F5F0(또는 유사), left border 4px `--muted`

### B3-4. Advice Box(Action Plan)
- 배경: `rgba(217,56,30,.02)`
- border: 1px `--accent`
- 뱃지: “Action Plan” (accent 배경, white 텍스트)

---

# PART C. 정보구조(IA) + 페이지별 와이어프레임(v2)

> 모든 페이지: **모바일 자동 반응형 필수** (≤768px)
> - 좌우 padding 24px 이상
> - 데스크탑 2열 → 모바일 1열 스택

## P0. Intro (/intro)
**목적**: 첫 진입에서 “권위/신뢰”를 2초 안에 전달.

### 레이아웃
- 중앙 정렬 1컬럼
- 상단 35%: 큰 한자 심볼(예: 命) (Serif 900)
- 중단: 브랜드명 “Fate Forensics” (letter-spacing 0.28em, accent dot 가능)
- 하단: CTA 버튼 1개

### 구성요소
- [Logo/Seal] 좌상단 미니(선택)
- [Main Symbol] `命`
- [Brand Line] “FATE FORENSICS”
- [CTA Primary] “시작하기 →”

### 인터랙션
- 1) CTA 클릭 → Home
- 2) 2.5초 후 자동 전환 옵션(설정 가능) — MVP에서는 **자동 전환 OFF** 권장

---

## P1. Home (/)
**참조 구조**: `saju_design_preview_genesis_v2`의 레이아웃을 유지하되, **배경/타입/여백은 333 스타일**로 통일.

### 데스크탑(2열)
- 좌측: 헤드라인 + 서브카피 + CTA
- 우측: 대형 Kanji watermark + “서비스 원칙” 카드(불투명/가독 확보)

### 모바일(1열)
- 헤드라인 → CTA → 원칙 카드 → (하단) 입력 섹션 프리뷰

### 버튼 위치
- Primary CTA: “내 사주 분석하기 →” (좌측 본문 하단)
- Secondary: “샘플 리포트” (Primary 오른쪽)

### ‘서비스 원칙’ 카드(가독 규칙)
- **카드 배경은 불투명(최소 0.92)**
- 내부에 워터마크 금지(배경과 중복되어 산만)

---

## P2. Input (/input)
**목적**: “정확한 질문”으로 신뢰를 만든다.

### 입력 항목(기본)
- 생년월일(양력/음력 토글)
- 출생 시간(HH:MM) + “모름” 체크(모름이면 시간 추정/분석 제한 안내)
- 성별
- 출생지(시/군/구)

### 버튼
- Primary: “분석 실행”
- Secondary: “정밀 옵션 보기”

### 검증(프론트)
- 날짜 범위(예: 1900~현재)
- 시간 포맷
- 출생지 자동완성(데이터 없으면 시/도까지만 허용)

---

## P3. Options (/options) — (P2에서 모달/슬라이드로도 가능)
- 야자시 처리: 표준(제품 고정) 표시
- 진태양시: 옵션 ON/OFF (ON 기본)
- 표준시/서머타임 예외: 자동 적용(ON 고정)
- 개인정보 안내: 입력 최소화 원칙

---

## P4. Processing (/processing)
**필수 UX**: Trivia/Quiz 롤링(3~5초 간격) + 단계 메시지

### 구성
- 중앙 스피너 + 진행 텍스트
- 서브라인: “KASI 기준 검증 로직 적용 중…”
- Trivia 영역: 카드형(불투명) 1개

### Trivia/Quiz 요구사항
- 3~5초 간격 자동 교체
- 최소 15개 문구 내장(MVP)
- 문구 길이: 40~80자
- “정답/오답” UI는 MVP에서 선택(텍스트 롤링만 필수)

---

## P5. Report (/report/:id)
**목표**: 최소 **32페이지 분량(인쇄 기준)**의 “고서형 보고서”.

### 레이아웃(웹)
- 좌측: Sticky TOC(목차)
- 우측: 본문(챕터 카드)

### 목차(Sticky)
- width 240px
- `position: sticky; top: 40px;`
- 모바일: 숨김 또는 상단 드롭다운

### 본문(챕터 카드) 규칙
- 카드 padding 50px
- 챕터 간격 60px
- 각 챕터는 **(1) 상담형 본문** + **(2) 근거 카드(원전명+룰제목)** + **(3) 해석/설명 박스** 포함

### “요즘 사람용 쉬운 설명” 표기 규칙
- 라벨: **“해석/설명”**으로 표기
- 위치: 각 어려운 명리 항목 바로 아래
- 분량: 80~200자(최소) + 예시 1개(선택)

### 공유(필수)
- **카카오톡 공유(Kakao Link API)**
- 공유 카드 구성: “요약 멘트 + 썸네일 + 링크”

---

## P6. Archive (/archive)
- 최근 리포트 목록
- 필터: 날짜/주제
- 클릭 시 Report 이동

---

## P7. Admin (/admin)
**필수**: Rule Simulator(룰 엔진 시뮬레이터)

### 기능
- 룰 CRUD(Excel 업로드/다운로드)
- 룰 배포(버전)
- Simulator:
  - 입력(생년월일시/성별/출생지/옵션)
  - Hit Rules 리스트
  - Conflict 결과(Topic 단위)
  - 최종 리포트 Preview(요약/챕터 일부)

---

# PART D. 데이터/스키마/룰 엔진 설계(v2)

## D1. VAR_DICT(변수명 표준화) — 필수
- Condition_Script는 **100% 영문 소문자** 변수만 사용
- 가능한 경우 인덱스 기반(`*_idx`) 권장

### D1-1. 표준 변수(예시)
- `year_stem_idx, year_branch_idx` (0~9, 0~11)
- `month_stem_idx, month_branch_idx`
- `day_stem_idx, day_branch_idx`
- `hour_stem_idx, hour_branch_idx`
- `ten_god_counts` (dict)
- `element_balance` (wood/fire/earth/metal/water)
- `is_dst, tz_offset_minutes, true_solar_minutes`

### D1-2. 매핑(예시)
- `jia=0, yi=1 ... gui=9`
- `zi=0, chou=1 ... hai=11`

## D2. Conflict_Key(Topic 단위) — 필수
- 결과(좋다/나쁘다) 금지
- 반드시 주제 범주로 묶기

예)
- `WEALTH_TOTAL`, `LOVE_TOTAL`, `CAREER_TOTAL`, `HEALTH_TOTAL`

규칙)
- 동일 Conflict_Key 발견 시 **Weight 최상위 1개만 채택**

## D3. Base_Text 구조(LLM 대비) — 필수
- 단문 금지. 반드시 **[결론]+[이유]+[조언]** 구조.
- 추가로 “해석/설명(쉬운말)” 필드 분리 권장

### D3-1. Reason Card 권장 필드
- `conclusion`
- `reason`
- `advice`
- `interpretation_easy` (요즘 사람용)
- `evidence_title` (룰 제목)
- `source_work` (원전명)

---

# PART E. LLM 프롬프트/세이프티(v2)

## E1. Negative Constraints(강제)
- 단정 금지: “무조건/확실히/반드시” 등 사용 금지
- 의학/법률 조언 금지
- Reason Card 외 내용 **창작/추가 절대 금지**

## E2. LLM 역할
- 입력: Reason Card N개
- 출력: 상담형 에세이(톤 고정) + 섹션 연결 + 문장 자연화
- **의미 변경 금지**, 수치/근거 추가 금지

---

# PART F. QA/검증(골든 샘플 전략) — v2 강화

## F1. 검증 데이터셋(총 10,000건)
- **KASI 기준** 비교
- 20%(2,000건) = 오류 발생률 높은 구간에 집중
  - 예: **1954~1961 표준시/서머타임 변동 구간**
- 나머지 8,000건 = 일반 구간 랜덤/균형

## F2. 자동화 테스트
- Calculation Engine 단위 테스트
- Rule Engine 히트/충돌/Weight 선택 테스트
- PDF 렌더 테스트(페이지 수/깨짐/폰트 포함)

---

# PART G. PDF/Print CSS(운영 리스크 해결)

## G1. 한글 깨짐 방지(필수)
- Puppeteer/Playwright 런타임(Linux)에 **Noto Sans KR / Noto Serif KR 설치**
- PDF 전용 CSS(`@media print`) 필수

## G2. Print 템플릿 요구사항(32p)
- page break
- header/footer
- toc
- section break

---

# PART H. 개발 로드맵(v2) — 초원자 단위

> **원칙**: “UI 먼저”가 아니라, **Calculation → Rule Engine → Report Print → UI** 순으로 실패 확률을 줄인다.

## H0. 리포지토리/기술 스택(초기 고정)
- FE: Next.js(React)
- BE: FastAPI(Python)
- DB: PostgreSQL(+ JSONB)
- PDF: Playwright 또는 Puppeteer

## H1. Sprint 0 — 환경/골격
- [완료조건] 로컬에서 FE/BE 동시 구동 + 환경변수 템플릿
- [검증] smoke test

## H2. Sprint 1 — Calculation Engine(MVP)
- 만세력/절기/시간대/진태양시 기본
- DST/표준시 예외 구간 테이블 적용
- [완료조건] 골든 샘플 1,000건 1차 일치

## H3. Sprint 2 — Rule Engine + Excel 스키마 연동
- RULE_SCHEMA.xlsx 로딩
- Condition Script 실행(샌드박스)
- Conflict(Topic) 해결 + Weight 우선
- [완료조건] 샘플 원국 입력 시 Reason Card 30~80개 생성

## H4. Sprint 3 — Report 32p Print Template(333 style)
- 333 룩앤필 완전 적용
- print css/페이지 나눔/헤더/푸터/목차
- [완료조건] 더미 데이터로 32p 안정 생성

## H5. Sprint 4 — LLM Rewriter
- Negative Constraints 시스템 프롬프트
- Reason Card → 섹션별 상담형 본문 생성
- [완료조건] “근거 외 창작 없음” 테스트 통과

## H6. Sprint 5 — App UI(Intro/Home/Input/Processing/Report)
- 333 스타일 + Genesis 토큰
- Processing Trivia 롤링
- Kakao Share

## H7. Sprint 6 — Admin + Rule Simulator
- 룰 배포 전 Preview
- 배포 버전 관리

## H8. Sprint 7 — E2E + 배포
- PDF 폰트 포함 배포 스크립트
- 모니터링/로그

---

# PART I. 오류/수정 대응 시나리오(v1)

## I1. Calculation 오차 발생
- 증상: 특정 구간(1954~1961) 오차
- 진단: tz 테이블/윤달/절기 계산 단계 분리 로그
- 대응: 해당 구간 샘플 증분 추가(샘플 50건) + 회귀 테스트

## I2. Condition Script 실행 에러
- 증상: 룰 평가 중 예외
- 진단: VAR_DICT 미등록/타입 불일치
- 대응: 룰 로더에서 정적 검사(변수명/허용 연산) → 배포 차단

## I3. Conflict 처리 오류
- 증상: 같은 Topic에서 모순 문장 다수 노출
- 진단: Conflict_Key가 결과 기반으로 설계됨
- 대응: Topic 강제 정규화 + Weight 우선 1개 선택 테스트 추가

## I4. PDF 한글 깨짐
- 증상: 인쇄/PDF에서 글자 사각형
- 진단: 런타임 폰트 미설치
- 대응: 배포 스크립트에 폰트 설치 + pdf smoke test 파이프라인

## I5. LLM 할루시네이션
- 증상: 근거에 없는 주장
- 진단: 프롬프트에 “창작 금지” 약함 / 컨텍스트 혼합
- 대응: Negative Constraints 강화 + 출력 검증(근거 키워드 포함 여부)

---

# PART J. Anti-Gravity 개발 시작 프롬프트(초원자 단위)

> 아래 프롬프트는 **Anti-Gravity에 그대로 붙여넣는 용도**입니다.

## J0. 공통 Constraints(모든 작업에 적용)
- 디자인: **333.html 룩앤필 100%**
- 토큰: `--bg,--card,--ink,--muted,--accent,--line`만 사용
- 폰트: Noto Serif KR 900 / Noto Sans KR 300~500
- 모바일 반응형 필수
- #000/#fff 직접 사용 금지

---

## J1. ATOMIC-001: 프로젝트 골격 생성
**Role**: Senior Full-stack Engineer

**Context**: Fate Forensics. Next.js + FastAPI. 333.html 스타일.

**Task**:
1) FE(Next.js) / BE(FastAPI) 기본 골격 생성
2) `/intro`, `/`, `/input`, `/processing`, `/report/[id]`, `/admin` 라우트 생성(더미)
3) 공통 CSS variables + Google Fonts 로딩(Serif 900 포함)

**Constraints**:
- 스타일은 333.html 그대로 재현(배경/여백/타입 대비)
- 모바일 768px 기준 반응형

**Output**:
- 파일 트리
- 각 파일의 완성 코드
- 실행 명령
- smoke test 체크리스트

---

## J2. ATOMIC-002: Genesis Style 디자인 토큰/컴포넌트 구현
(… 동일 형식으로 ATOMIC-00N까지 이어서 작성 예정)

> 다음 단계부터는 오너 지시(‘진행’) 후 세부 ATOMIC 프롬프트를 순차 적용한다.


```

---

## 📄 scripts/generate-structured-docs.cjs

```javascript
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs_structured');

// Directories to exclude
const IGNORE_DIRS = [
    'node_modules',
    '.git',
    '.firebase',
    '.github',
    '.gemini',
    'dist',
    'build',
    'coverage',
    'lib',
    'project_docs',
    'project_docs_structured'
];

// Files to include (Allowlist extensions)
const ALLOW_EXTENSIONS = [
    '.ts', '.tsx',
    '.js', '.cjs', '.mjs',
    '.css', '.scss', '.module.css',
    '.html',
    '.json',
    '.md',
    '.rules',
    '.yaml', '.yml',
    '.env.example', '.env.production.example',
    '.gitignore',
    '.firebaserc'
];

// Files to explicitly ignore
const IGNORE_FILES = [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store'
];

// Structure categories
const CATEGORIES = {
    'frontend-pages': {
        name: 'Frontend - Pages',
        paths: ['src/pages'],
        description: '프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)'
    },
    'frontend-components': {
        name: 'Frontend - Components',
        paths: ['src/components'],
        description: '재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)'
    },
    'frontend-core': {
        name: 'Frontend - Core',
        paths: ['src/lib', 'src/config', 'src/types', 'src/hooks'],
        description: '프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)'
    },
    'frontend-styles': {
        name: 'Frontend - Styles',
        paths: ['src'],
        extensions: ['.css', '.module.css'],
        description: '전역 스타일 및 CSS 모듈'
    },
    'backend-functions': {
        name: 'Backend - Functions',
        paths: ['functions/src'],
        description: 'Firebase Functions (generateReport, generateLuckCalendar 등)'
    },
    'backend-engine': {
        name: 'Backend - Calculation Engine',
        paths: ['functions/src/engine'],
        description: '명리 계산 엔진 (사주 계산, 일진 계산 등)'
    },
    'config-root': {
        name: 'Configuration - Root',
        paths: ['.'],
        maxDepth: 1,
        extensions: ['.json', '.js', '.cjs', '.ts', '.yaml', '.yml', '.rules', '.gitignore', '.firebaserc'],
        description: '프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)'
    },
    'config-env': {
        name: 'Configuration - Environment',
        paths: ['.'],
        maxDepth: 1,
        patterns: ['.env'],
        description: '환경 변수 설정 파일'
    },
    'scripts': {
        name: 'Scripts',
        paths: ['scripts'],
        description: '빌드 및 유틸리티 스크립트'
    },
    'docs': {
        name: 'Documentation',
        paths: ['.'],
        extensions: ['.md'],
        description: '프로젝트 문서 (README, 작업 로그, 설정 문서 등)'
    },
    'public': {
        name: 'Public Assets',
        paths: ['public'],
        description: '정적 파일 (이미지, 아이콘, manifest 등)'
    }
};

// --- Helper Functions ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function shouldIncludeFile(filePath, relativePath, category) {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);

    // Check ignore list
    if (IGNORE_FILES.includes(fileName)) return false;

    // Check if file is in ignored directory
    const parts = relativePath.split(path.sep);
    if (parts.some(p => IGNORE_DIRS.includes(p))) return false;

    // Category-specific filters
    if (category.extensions) {
        return category.extensions.some(e => filePath.endsWith(e) || ext === e);
    }

    if (category.patterns) {
        return category.patterns.some(p => fileName.includes(p));
    }

    // Default: check against allow list
    return ALLOW_EXTENSIONS.some(e => filePath.endsWith(e) || ext === e);
}

function getFilesInCategory(category) {
    const files = [];

    for (const basePath of category.paths) {
        const fullPath = path.join(PROJECT_ROOT, basePath);

        if (!fs.existsSync(fullPath)) continue;

        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath, files, category, 0);
        } else if (stat.isFile()) {
            const relativePath = path.relative(PROJECT_ROOT, fullPath);
            if (shouldIncludeFile(fullPath, relativePath, category)) {
                files.push(fullPath);
            }
        }
    }

    return files.sort();
}

function scanDirectory(dir, fileList, category, depth) {
    if (category.maxDepth && depth >= category.maxDepth) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(PROJECT_ROOT, filePath);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                scanDirectory(filePath, fileList, category, depth + 1);
            }
        } else {
            if (shouldIncludeFile(filePath, relativePath, category)) {
                fileList.push(filePath);
            }
        }
    });
}

function generateCategoryMarkdown(categoryKey, category) {
    console.log(`\n📂 Processing category: ${category.name}`);

    const files = getFilesInCategory(category);

    if (files.length === 0) {
        console.log(`   ⚠️  No files found in this category`);
        return;
    }

    console.log(`   ✨ Found ${files.length} files`);

    // Generate markdown content
    let content = `# ${category.name}\n\n`;
    content += `> ${category.description}\n\n`;
    content += `**생성 시각**: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;

    // Table of Contents
    content += `## 📋 목차 (${files.length}개 파일)\n\n`;
    files.forEach((filePath, index) => {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        content += `${index + 1}. [${relativePath}](#file-${index + 1})\n`;
    });
    content += `\n---\n\n`;

    // File contents
    files.forEach((filePath, index) => {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'txt';
            const stat = fs.statSync(filePath);
            const sizeKB = (stat.size / 1024).toFixed(2);

            content += `## File ${index + 1}: \`${relativePath}\` {#file-${index + 1}}\n\n`;
            content += `**크기**: ${sizeKB} KB | **확장자**: ${ext}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n`;
            content += `---\n\n`;

            console.log(`   ✓ ${relativePath} (${sizeKB} KB)`);
        } catch (err) {
            console.error(`   ❌ Error reading ${relativePath}:`, err.message);
            content += `## File ${index + 1}: \`${relativePath}\` {#file-${index + 1}}\n\n`;
            content += `**오류**: 파일을 읽을 수 없습니다 - ${err.message}\n\n`;
            content += `---\n\n`;
        }
    });

    // Save to file
    const outputFileName = `${categoryKey}.md`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);
    fs.writeFileSync(outputPath, content, 'utf8');

    const sizeKB = (content.length / 1024).toFixed(1);
    console.log(`   📦 Created: ${outputFileName} (${sizeKB} KB)`);
}

function generateIndexMarkdown() {
    let content = `# 프로젝트 전체 코드 문서 - 인덱스\n\n`;
    content += `**프로젝트**: MYUNGRI - The Genesis\n`;
    content += `**생성 시각**: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;
    content += `## 📚 문서 구조\n\n`;
    content += `이 문서는 프로젝트의 전체 코드를 구조별로 분류하여 생성되었습니다.\n`;
    content += `각 카테고리별로 별도의 MD 파일이 생성되어 있습니다.\n\n`;

    content += `## 📂 카테고리 목록\n\n`;

    Object.entries(CATEGORIES).forEach(([key, category], index) => {
        const fileName = `${key}.md`;
        content += `### ${index + 1}. [${category.name}](${fileName})\n\n`;
        content += `${category.description}\n\n`;
        content += `**파일**: \`${fileName}\`\n\n`;
    });

    content += `---\n\n`;
    content += `## 🚀 사용 방법\n\n`;
    content += `1. 각 카테고리별 MD 파일을 열어 해당 영역의 전체 코드를 확인하세요.\n`;
    content += `2. 각 파일 내부에는 목차(TOC)가 포함되어 있어 빠른 탐색이 가능합니다.\n`;
    content += `3. 모든 파일은 마크다운 코드 블록으로 포맷되어 있어 가독성이 높습니다.\n\n`;

    content += `## 🔄 재생성\n\n`;
    content += `문서를 다시 생성하려면 다음 명령어를 실행하세요:\n\n`;
    content += `\`\`\`bash\n`;
    content += `node scripts/generate-structured-docs.cjs\n`;
    content += `\`\`\`\n`;

    const outputPath = path.join(OUTPUT_DIR, 'INDEX.md');
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`\n📋 Created index: INDEX.md`);
}

function main() {
    console.log('🚀 Starting structured documentation generation...');
    console.log(`📁 Project root: ${PROJECT_ROOT}`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

    // Clean and create output directory
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    ensureDir(OUTPUT_DIR);

    // Generate documentation for each category
    Object.entries(CATEGORIES).forEach(([key, category]) => {
        generateCategoryMarkdown(key, category);
    });

    // Generate index
    generateIndexMarkdown();

    console.log('\n✅ Documentation generation complete!');
    console.log(`📂 Check '${OUTPUT_DIR}' directory for all generated files.\n`);
}

// --- Execute ---
main();

```

---

## 📄 src/components/report/LuckCalendar.module.css

```css
.calendarModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
}

.modalContent {
    background-color: #F3F0EB;
    border: 1px solid var(--ink);
    border-radius: 2px;
    max-width: 900px;
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.modalHeader h2 {
    font-family: "Noto Serif KR", serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c1c1c;
}

.closeButton {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1c1c1c;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
}

.closeButton:hover {
    color: #c62828;
}

.loadingState,
.errorState {
    text-align: center;
    padding: 3rem;
}

.loadingState p {
    font-size: 1rem;
    color: #1c1c1c;
    margin-bottom: 0.5rem;
}

.loadingHint {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.errorState p {
    font-size: 1rem;
    color: #c62828;
    margin-bottom: 1rem;
}

.calendarContainer {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    padding: 20px 0;
    margin-bottom: 2rem;
}

.yearGrid {
    display: grid;
    grid-template-rows: repeat(7, 12px);
    /* Sun to Sat as rows if we do GitHub style, or vice versa as spec */
    grid-auto-flow: column;
    grid-auto-columns: 12px;
    gap: 3px;
}

/* Definition spec says: Columns 7, Rows 53. Let's strictly follow. */
.strictGrid {
    display: grid;
    grid-template-columns: repeat(7, 12px);
    grid-auto-rows: 12px;
    gap: 3px;
    justify-content: center;
}

.dayHead {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-bottom: 0.25rem;
}

.dayCell {
    width: 12px;
    height: 12px;
    border-radius: 1px;
    cursor: pointer;
    transition: transform 0.1s;
    background-color: rgba(0, 0, 0, 0.05);
    /* Base */
}

.dayCell:hover {
    transform: scale(1.4);
    z-index: 100;
}

.todayCell {
    border: 1.5px solid var(--accent);
    transform: scale(1.2);
    z-index: 10;
}

/* Tooltip from spec */
.tooltip {
    position: absolute;
    background: #000;
    color: #FFF;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 2px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -100%);
    margin-top: -10px;
}

.dayNum {
    font-weight: 600;
}

.dayScore {
    font-size: 0.6rem;
    opacity: 0.8;
}

/* 점수별 테마 */
.gradeGood {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.gradeWarn {
    background-color: #fffde7;
    color: #fbc02d;
}

.gradeCaution {
    background-color: #ffebee;
    color: #c62828;
}

.emptyCell {
    visibility: hidden;
}

.detailPanel {
    margin-top: 1.5rem;
    background-color: #fdfcf8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-height: 180px;
}

.noSelection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    font-style: italic;
}

.detailCard {
    padding: 1.5rem;
}

.detailHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.detailTitle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detailDate {
    font-size: 1.1rem;
    font-weight: 700;
}

.detailGrade {
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
}

.detailScore {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.detailScore strong {
    font-size: 1.5rem;
    color: #1c1c1c;
    margin-left: 4px;
}

.detailBody {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.detailSection h5 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 0.75rem;
}

.detailSection ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detailSection li {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 4px;
}

.detailSection li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #c62828;
}

.emptyMsg {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.4);
}

.modalFooter {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.legend {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
}

.legendItem {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.generatedAt {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
    .calendarModal {
        padding: 0.5rem;
    }

    .modalContent {
        padding: 1rem;
        max-height: 95vh;
    }

    .calendarGrid {
        grid-template-columns: 1fr;
    }

    .detailBody {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
```

---

## 📄 src/pages/Processing.module.css

```css
.processingPage {
    min-height: 100vh;
    background-color: #0F0F0F;
    /* Deep Black */
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.processingPage::after {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url('/assets/paper-noise.png');
    background-repeat: repeat;
    background-size: 150px;
    opacity: 0.1;
    /* Stronger CRT noise */
    pointer-events: none;
    z-index: 100;
}

.container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.terminal {
    width: 100%;
    max-width: 800px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    color: #33FF00;
    /* Terminal Green */
    background: rgba(0, 0, 0, 0.4);
    padding: 40px;
    border-radius: 4px;
    border: 1px solid rgba(51, 255, 0, 0.2);
    box-shadow: 0 0 40px rgba(0, 0, 0, 1);
}

.logLine {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 8px;
    display: block;
}

.cursor {
    display: inline-block;
    width: 10px;
    height: 2px;
    background-color: #33FF00;
    margin-left: 4px;
    animation: blink 0.5s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.footer {
    padding: 24px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.copyright {
    font-size: 0.8rem;
    color: var(--muted);
    text-align: center;
}

/* Phase 27: Error UI */
.errorCard {
    max-width: 500px;
    width: 90%;
    padding: 40px;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(198, 40, 40, 0.3);
    text-align: center;
    backdrop-filter: blur(10px);
}

.errorHeader {
    margin-bottom: 24px;
}

.errorTitle {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff5252;
    margin-bottom: 8px;
}

.errorCode {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: rgba(255, 82, 82, 0.6);
    background: rgba(255, 82, 82, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.errorText {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-main);
    margin-bottom: 32px;
}

.detailsBox {
    background: rgba(0, 0, 0, 0.3);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 32px;
    text-align: left;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.detailsBox pre {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #888;
    white-space: pre-wrap;
    word-break: break-all;
}

.actionRow {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.retryBtn {
    padding: 12px 24px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.retryBtn:hover {
    background: #e53935;
    transform: translateY(-2px);
}

.cancelBtn {
    padding: 12px 24px;
    background: transparent;
    color: var(--text-main);
    border: 1px solid var(--border-main);
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancelBtn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--text-main);
}

.subtext {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
}

/* Accessibility: Strict prefers-reduced-motion enforcement */
@media (prefers-reduced-motion: reduce) {
    .spinner {
        animation: none;
        border-top-color: var(--line);
    }

    .triviaText {
        animation: none;
        transition: none;
    }

    .dot {
        transition: none;
        animation: none;
    }

    * {
        animation: none !important;
        transition: none !important;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 1.5rem;
    }

    .triviaText {
        font-size: 1rem;
    }
}
```

---

## 📄 scripts/debug-v1.cts

```typescript

// Using require for CJS compatibility
const { calculateV1 } = require('../functions/src/engine/calculation/v1');

const testCases = [
    {
        name: "Solar Standard (2023-01-01 13:20)",
        input: { birthDate: "2023-01-01", birthTime: "13:20", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" }
    },
    {
        name: "Lunar Leap (2023-05-15 13:20 - Leap Month)",
        input: { birthDate: "2023-05-15", birthTime: "13:20", timeUnknown: false, sex: "male", calendar: "lunar", isLeapMonth: true, timezone: "Asia/Seoul" }
    },
    {
        name: "Forensic Boundary (2023-01-01 00:05)",
        input: { birthDate: "2023-01-01", birthTime: "00:05", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" }
    },
    {
        name: "Fail Safe (1800 - Should Error)",
        input: { birthDate: "1800-01-01", birthTime: "12:00", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" },
        expectError: true
    }
];

async function runTests() {
    console.log("🚀 Starting Hardened Engine Verification (v1.2) [CJS]\n");

    for (const tc of testCases) {
        console.log(`[TEST] ${tc.name}`);
        try {
            const result = calculateV1(tc.input);

            if (tc.expectError) {
                console.error("❌ FAILED: Expected error but got success.");
            } else {
                console.log("✅ Pillars:", `${result.pillars.year.label} ${result.pillars.month.label} ${result.pillars.day.label}`);
                if (result.forensicTime) {
                    console.log(`   Forensic: ${result.forensicTime.localTime} -> ${result.forensicTime.trueSolarHHmm} (${result.forensicTime.classification}, Shift: ${result.forensicTime.dayShift})`);
                }
                if (result.warnings.length > 0) {
                    console.log("   Warnings:", result.warnings);
                }
                // Validation checks
                // For Leap Month, we expect month pillar to handle empty/unknown gracefully.
                // UNKNOWN label logic: if library returns empty, we set UNKNOWN.
                // If the Month label is UNKNOWN, we print special verified message.
                if (result.pillars.month.label === "UNKNOWN") {
                    console.log("   --> Verified UNKNOWN month handling (Safe).");
                }

                if (tc.name.includes("Boundary") && result.forensicTime.classification === "야자시") {
                    console.log("   --> Verified Forensic Boundary (Ya-Jasi).");
                }
            }
        } catch (e: any) {
            if (tc.expectError) {
                console.log(`✅ Expected Error Caught: ${e.message}`);
            } else {
                console.error("❌ ERROR:", e.message);
                console.error(e.stack);
            }
        }
        console.log("---------------------------------------------------");
    }
}

runTests();

```

---

## 📄 README.md

```markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

---

## 📄 index.html

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

## 📄 scripts/gen-build-info.mjs

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const buildTimeISO = new Date().toISOString();
const appVersion = pkg.version || '0.0.0';

// Simple build info content
const content = `// This file is auto-generated by scripts/gen-build-info.mjs
export const buildInfo = {
  buildTimeISO: "${buildTimeISO}",
  appVersion: "${appVersion}",
  env: "${process.env.NODE_ENV || 'production'}"
};
`;

const outputPath = path.join(__dirname, '../src/buildInfo.ts');
fs.writeFileSync(outputPath, content, 'utf-8');

console.log(`[BuildInfo] Generated stamp: ${appVersion} at ${buildTimeISO}`);

```

---

## 📄 tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

---

## 📄 src/config/shareMeta.ts

```typescript
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

```

---

## 📄 functions/tsconfig.json

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "outDir": "lib",
        "sourceMap": true,
        "strict": true,
        "target": "es2020",
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "lib": [
            "es2020"
        ],
        "allowJs": true,
        "checkJs": false
    },
    "compileOnSave": true,
    "include": [
        "src"
    ]
}
```

---

## 📄 src/buildInfo.ts

```typescript
// This file is auto-generated by scripts/gen-build-info.mjs
export const buildInfo = {
  buildTimeISO: "2026-01-03T11:20:41.092Z",
  appVersion: "0.0.0",
  env: "production"
};

```

---

## 📄 firestore.indexes.json

```json
{
    "indexes": [],
    "fieldOverrides": []
}
```

---

---

**Part 9/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 8](./codebase_part_08.md) | [Part 10 →](./codebase_part_10.md)