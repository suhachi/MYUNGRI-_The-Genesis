# Configuration - Environment

> 환경 변수 설정 파일

**생성 시각**: 2026-01-05T11:35:22.113Z

---

## 📋 목차 (4개 파일)

1. [.env](#file-1)
2. [.env.example](#file-2)
3. [.env.production.example](#file-3)
4. [.env.production.local](#file-4)

---

## File 1: `.env` {#file-1}

**크기**: 0.65 KB | **확장자**: txt

```txt
VITE_KAKAO_JS_KEY=
VITE_PUBLIC_ORIGIN=http://localhost:5173
VITE_APP_URL=http://localhost:5173

VITE_FIREBASE_API_KEY=AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=850478803106
VITE_FIREBASE_APP_ID=1:850478803106:web:5184a93285afb9a002cffb
VITE_FIREBASE_MEASUREMENT_ID=G-RRKP53N8H8
VITE_FIREBASE_VAPID_KEY=BKY_nslFCghDrZu9-Tg5iU1bt76tvEBzmJrEesIHh9WcSZAjzyHldgAOZrY9i-xqWlQUDR_EQ_Ku2qYdKnjGgbY

VITE_RECAPTCHA_SITE_KEY=6Ld24zwsAAAAAOsfLHNZvt1mrn9BjbsrJwEF1i9E

```

---

## File 2: `.env.example` {#file-2}

**크기**: 0.12 KB | **확장자**: example

```example
# Kakao JavaScript SDK Key
VITE_KAKAO_JS_KEY=

# Public Origin (e.g. https://genesis.myungri.com)
VITE_PUBLIC_ORIGIN=

```

---

## File 3: `.env.production.example` {#file-3}

**크기**: 0.60 KB | **확장자**: example

```example
# [CRITICAL] Firebase Web Configuration (Production)
# 🚨 모든 값은 Firebase Console에서 직접 복사한 'non-empty' 실제값이어야 합니다.
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# [CRITICAL] App Check reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=

# [OPTIONAL] External SDKs
VITE_KAKAO_JS_KEY=

# [CONFIG] Public Origin
VITE_PUBLIC_ORIGIN=https://myungri-genesis.web.app

```

---

## File 4: `.env.production.local` {#file-4}

**크기**: 0.44 KB | **확장자**: local

```local
VITE_FIREBASE_API_KEY=AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=850478803106
VITE_FIREBASE_APP_ID=1:850478803106:web:5184a93285afb9a002cffb
VITE_FIREBASE_MEASUREMENT_ID=G-RRKP53N8H8
VITE_RECAPTCHA_SITE_KEY=6Ld24zwsAAAAAOsfLHNZvt1mrn9BjbsrJwEF1i9E

```

---

