const fs = require('fs');
const path = require('path');

/**
 * [Zero Tolerance] Environment Validation Script (Authoritative)
 * 빌드 시점에 필수 변수가 없거나 비어 있으면 즉시 중단합니다.
 * 우선순위: .env.production.local > process.env (CI 오염 방지)
 */

const REQUIRED_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_RECAPTCHA_SITE_KEY'
];

function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] || '';
            // 따옴표 제거
            if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[match[1]] = value.trim();
        }
    });
    return env;
}

function checkEnv() {
    console.log('🔍 [Release Engineer] Hard-validating environment for production build...');

    // 1. .env.production.local 로드 (권위적 우선순위)
    const envPath = path.resolve(__dirname, '../.env.production.local');
    const fileEnv = parseEnvFile(envPath);

    const missingOrEmpty = [];

    REQUIRED_VARS.forEach(key => {
        // [Zero Tolerance] Local File 우선 (CI/쉘 잔류값 overriding 방지)
        const value = fileEnv[key] || process.env[key];

        const isEmpty = !value || value.trim() === '';
        const isPlaceholder = value && (
            value.includes('YOUR_') ||
            value.includes('REPLACE') ||
            value.includes('AIzaSyAL...') // 런북 예시값 방지
        );

        if (isEmpty || isPlaceholder) {
            missingOrEmpty.push(key);
        }
    });

    if (missingOrEmpty.length > 0) {
        console.error('\n❌ [CRITICAL FAIL] Production build aborted due to missing/empty environment variables:');
        missingOrEmpty.forEach(k => console.error(`   - ${k}`));
        console.error('\n👉 FIX: Update your .env.production.local with valid credentials.');
        console.error('👉 REF: Check .env.production.example for the list of required keys.\n');
        process.exit(1);
    }

    console.log('✅ Environment validation passed. Proceeding to build...\n');
}

checkEnv();
