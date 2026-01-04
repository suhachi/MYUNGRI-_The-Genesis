# Scripts

> 빌드 및 유틸리티 스크립트

**생성 시각**: 2026-01-04T15:48:38.391Z

---

## 📋 목차 (11개 파일)

1. [scripts/check-env.cjs](#file-1)
2. [scripts/check-golden.mjs](#file-2)
3. [scripts/ci-gate.cjs](#file-3)
4. [scripts/gen-build-info.mjs](#file-4)
5. [scripts/generate-code-docs.cjs](#file-5)
6. [scripts/generate-design-docs.cjs](#file-6)
7. [scripts/generate-full-codebase-docs.cjs](#file-7)
8. [scripts/generate-structured-docs.cjs](#file-8)
9. [scripts/inspect-kor-lunar.js](#file-9)
10. [scripts/manual-e2e-guide.mjs](#file-10)
11. [scripts/test-generateReport.ts](#file-11)

---

## File 1: `scripts/check-env.cjs` {#file-1}

**크기**: 2.62 KB | **확장자**: cjs

```cjs
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

```

---

## File 2: `scripts/check-golden.mjs` {#file-2}

**크기**: 3.70 KB | **확장자**: mjs

```mjs
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const VECTORS_PATH = path.join(ROOT_DIR, 'tests', 'golden_vectors.json');
const ENGINE_PATH = path.join(ROOT_DIR, 'functions', 'lib', 'engine', 'calculation', 'v1.js');

// Check engine existence (Security Constraint: Never pass silently)
if (!fs.existsSync(ENGINE_PATH)) {
    console.error("❌ CRTICAL ERROR: Deterministic Engine not found at", ENGINE_PATH);
    console.error("   Run 'npm run build:functions' first.");
    process.exit(1);
}

// Load Engine dynamically
const { calculateV1 } = await import(`file://${ENGINE_PATH}`);

// JSON Stable Stringify (Simple Recursive Sort)
function stableStringify(obj) {
    if (obj === null || typeof obj !== 'object') {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return '[' + obj.map(stableStringify).join(',') + ']';
    }
    const sortedKeys = Object.keys(obj).sort();
    const parts = sortedKeys.map(key => {
        return JSON.stringify(key) + ':' + stableStringify(obj[key]);
    });
    return '{' + parts.join(',') + '}';
}

function computeHash(payload) {
    const str = stableStringify(payload);
    return crypto.createHash('sha256').update(str).digest('hex');
}

// Load Vectors
console.log("🔍 Loading Golden Vectors...");
const vectors = JSON.parse(fs.readFileSync(VECTORS_PATH, 'utf-8'));
let failed = false;
let updatesValues = [];

console.log("---------------------------------------------------");
console.log("  DETERMINISM CHECK (Golden Vectors)");
console.log("---------------------------------------------------");

for (const vec of vectors) {
    try {
        const result = calculateV1(vec.input);

        // Extract Core Payload (Deterministic Fields)
        const corePayload = {
            algorithmVersion: result.algorithmVersion,
            normalization: result.normalization,
            pillars: result.pillars,
            forensicTime: result.forensicTime
            // Do not include 'computedAt' or 'warnings' if unstable
        };

        const currentHash = computeHash(corePayload);

        if (!vec.expectedHash) {
            console.warn(`⚠️  [${vec.id}] No expected hash. Captured: ${currentHash}`);
            vec.suggestedHash = currentHash;
            failed = true;
        } else if (currentHash !== vec.expectedHash) {
            console.error(`❌ [${vec.id}] Hash Mismatch!`);
            console.error(`   Expected: ${vec.expectedHash}`);
            console.error(`   Actual:   ${currentHash}`);
            failed = true;
        } else {
            console.log(`✅ [${vec.id}] Passed`);
        }
    } catch (err) {
        console.error(`❌ [${vec.id}] Execution Error:`, err.message);
        failed = true;
    }
}

if (failed) {
    console.log("\n⚠️  Some checks failed or need initialization.");
    const needsUpdate = vectors.filter(v => v.suggestedHash);
    if (needsUpdate.length > 0) {
        console.log("   Run the following command or update manually to lock vectors:");
        const newContent = JSON.stringify(vectors.map(v => ({
            ...v,
            expectedHash: v.suggestedHash || v.expectedHash,
            suggestedHash: undefined
        })), null, 2);
        console.log("\n   [Corrected Content for tests/golden_vectors.json]:");
        console.log(newContent);
    }
    process.exit(1);
} else {
    console.log("\n🎉 All 10 Golden Vectors Passed. Determinism Verified.");
    process.exit(0);
}

```

---

## File 3: `scripts/ci-gate.cjs` {#file-3}

**크기**: 2.32 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * [Zero Tolerance] CI Release Gate Script
 * 1. Pre-build: 환경 변수 엄격 검증 (check-env.cjs 재사용)
 * 2. Post-build: 빌드 결과물(Bundle) 내 필수 식별자(projectId 등) 존재 확인
 */

function runPreBuildCheck() {
    console.log('🚀 [CI Gate] Step 1: Pre-build Environment Validation...');
    try {
        execSync('node scripts/check-env.cjs', { stdio: 'inherit' });
    } catch (err) {
        console.error('❌ [CI Gate] Pre-build validation failed.');
        process.exit(1);
    }
}

function runPostBuildCheck() {
    console.log('🚀 [CI Gate] Step 2: Post-build Bundle Integrity Check...');
    const distPath = path.resolve(__dirname, '../dist');

    if (!fs.existsSync(distPath)) {
        console.error('❌ [CI Gate] Build directory (dist) not found. Run "npm run build" first.');
        process.exit(1);
    }

    // 번들 파일들 내에서 projectId가 실제로 포함되어 있는지 검색 (Vite define 검증)
    // 실제 projectId 값 대신 플레이스홀더나 빈 자리가 남지 않았는지 확인
    const assetsPath = path.join(distPath, 'assets');
    const files = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));

    let projectIdFound = false;
    for (const file of files) {
        const content = fs.readFileSync(path.join(assetsPath, file), 'utf8');
        // projectId가 실제 빌드될 때 "myungri-genesis"와 같은 문자열로 박혔는지 확인
        // (참고: 빌드 시 환경변수는 문자열 리터럴로 치환됨)
        if (content.includes('myungri-genesis')) {
            projectIdFound = true;
            break;
        }
    }

    if (!projectIdFound) {
        console.error('❌ [CI Gate] INTEGRITY FAIL: "projectId" (myungri-genesis) was not detected in JS bundles.');
        console.error('👉 This indicates a failed Vite environment injection at build time.');
        process.exit(1);
    }

    console.log('✅ [CI Gate] Bundle integrity verified. "projectId" detected.');
}

function main() {
    const isPostBuild = process.argv.includes('--post-build');

    if (isPostBuild) {
        runPostBuildCheck();
    } else {
        runPreBuildCheck();
    }
}

main();

```

---

## File 4: `scripts/gen-build-info.mjs` {#file-4}

**크기**: 1.08 KB | **확장자**: mjs

```mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

let commitHash = 'unknown';
try {
  commitHash = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('[BuildInfo] Failed to get git commit hash');
}

const buildTimeISO = new Date().toISOString();
const appVersion = pkg.version || '0.0.0';

// Simple build info content
const content = `// This file is auto-generated by scripts/gen-build-info.mjs
export const buildInfo = {
  buildTimeISO: "${buildTimeISO}",
  appVersion: "${appVersion}",
  commitHash: "${commitHash}",
  env: "${process.env.NODE_ENV || 'production'}"
};
`;

const outputPath = path.join(__dirname, '../src/buildInfo.ts');
fs.writeFileSync(outputPath, content, 'utf-8');

console.log(`[BuildInfo] Generated stamp: ${appVersion} at ${buildTimeISO}`);

```

---

## File 5: `scripts/generate-code-docs.cjs` {#file-5}

**크기**: 4.34 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..'); // 스크립트가 scripts 폴더에 있다고 가정
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB per markdown file (approx characters)

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
    'lib', // functions/lib 등 컴파일된 결과물
    'project_docs' // 자기 자신 출력 폴더 제외
];

// Files to include (Allowlist extensions)
const ALLOW_EXTENSIONS = [
    '.ts', '.tsx',
    '.js', '.cjs', '.mjs',
    '.css', '.scss',
    '.html',
    '.json',
    '.md',
    '.rules', // firestore.rules
    '.yaml', '.yml'
];

// Files to explicitly ignore
const IGNORE_FILES = [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store'
];

// --- Helper Functions ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                getFileList(filePath, fileList);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ALLOW_EXTENSIONS.includes(ext) && !IGNORE_FILES.includes(file)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateMarkdown() {
    console.log(`🔍 Scanning directory: ${PROJECT_ROOT}`);
    const allFiles = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${allFiles.length} files to process.`);

    ensureDir(OUTPUT_DIR);

    let partCount = 1;
    let currentContent = `# Project Code Documentation - Part ${partCount}\n\n`;
    let currentSize = 0;

    for (const filePath of allFiles) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

        // Skip files in hidden directories checking relative path segments
        const parts = relativePath.split('/');
        if (parts.some(p => p.startsWith('.') && p !== '.' && p !== '..') && !relativePath.includes('.env')) {
            // .env 등은 포함하고 싶을 수 있으나 보통 .git, .firebase 등은 위에서 걸러짐.
            // 위 IGNORE_DIRS에서 이미 1차 필터링 됨. 추가 필터링 필요 시 여기서.
        }

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1);

            // Markdown code block formatting
            const codeBlock = `\n## File: ${relativePath}\n\n\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;

            if (currentSize + codeBlock.length > MAX_FILE_SIZE) {
                // Save current file
                const outPath = path.join(OUTPUT_DIR, `code_part_${String(partCount).padStart(3, '0')}.md`);
                fs.writeFileSync(outPath, currentContent, 'utf8');
                console.log(`📦 Created: ${path.relative(PROJECT_ROOT, outPath)} (${(currentSize / 1024).toFixed(1)} KB)`);

                // Reset for next file
                partCount++;
                currentContent = `# Project Code Documentation - Part ${partCount}\n\n` + codeBlock;
                currentSize = codeBlock.length;
            } else {
                currentContent += codeBlock;
                currentSize += codeBlock.length;
            }
        } catch (err) {
            console.error(`❌ Error reading file ${relativePath}:`, err.message);
        }
    }

    // Save remaining content
    if (currentSize > 0) {
        const outPath = path.join(OUTPUT_DIR, `code_part_${String(partCount).padStart(3, '0')}.md`);
        fs.writeFileSync(outPath, currentContent, 'utf8');
        console.log(`📦 Created: ${path.relative(PROJECT_ROOT, outPath)} (${(currentSize / 1024).toFixed(1)} KB)`);
    }

    console.log(`\n✅ Documentation generation complete! Check '${OUTPUT_DIR}' directory.`);
}

// --- Execute ---
generateMarkdown();

```

---

## File 6: `scripts/generate-design-docs.cjs` {#file-6}

**크기**: 3.30 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'design_code_complete.md');

// Directories to focus on for "Design"
const DESIGN_PATHS = [
    'src/components',
    'src/pages',
    'src/styles',
    'src/config'
];

// Extensions to include
const ALLOW_EXTENSIONS = ['.tsx', '.css', '.module.css', '.ts'];

// Files to explicitly include even if not in DESIGN_PATHS
const SPECIFIC_FILES = [
    'index.html',
    'src/App.tsx',
    'src/main.tsx'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isDesignRelated(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

    // Check if it's in a design-related directory
    const isInDesignDir = DESIGN_PATHS.some(p => relativePath.startsWith(p));

    // Check if it's a specific file
    const isSpecific = SPECIFIC_FILES.includes(relativePath);

    // Check extension
    const ext = path.extname(filePath).toLowerCase();
    const isAllowedExt = ALLOW_EXTENSIONS.includes(ext);

    // Business logic exclusion: exclude calculation engine logic even if in src/config if it's not design
    if (relativePath.includes('engine') || relativePath.includes('functions/src')) {
        return false;
    }

    return (isInDesignDir || isSpecific) && isAllowedExt;
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && !file.startsWith('.')) {
                getFileList(filePath, fileList);
            }
        } else {
            if (isDesignRelated(filePath)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateDesignMarkdown() {
    console.log(`🎨 Gathering design-related code from: ${PROJECT_ROOT}`);
    const files = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${files.length} design-related files.`);

    ensureDir(OUTPUT_DIR);

    let content = `# MYUNGRI: The Genesis - Full Design Code Documentation\n`;
    content += `Generated on: ${new Date().toLocaleString()}\n\n`;
    content += `> [!NOTE]\n`;
    content += `> This document contains all CSS, UI Components, Layouts, and Design Tokens.\n\n---\n`;

    for (const filePath of files) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'text';

            content += `\n## File: ${relativePath}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;
        } catch (err) {
            console.error(`❌ Error reading ${relativePath}:`, err.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`✅ Success! Design documentation created at: ${OUTPUT_FILE}`);
}

generateDesignMarkdown();

```

---

## File 7: `scripts/generate-full-codebase-docs.cjs` {#file-7}

**크기**: 9.68 KB | **확장자**: cjs

```cjs
/**
 * 프로젝트 전체 코드를 와이어프레임 구조의 MD 파일로 생성
 * 모든 파일과 코드를 10개의 MD 파일로 분할하여 저장
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'codebase_docs');

// 제외할 디렉토리 및 파일
const EXCLUDE_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.vscode',
  '.idea',
  'codebase_docs',
  'lib' // functions/lib는 빌드 결과물이므로 제외
];

const EXCLUDE_FILES = [
  '.DS_Store',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.gitignore',
  '.env',
  '.env.local'
];

// 바이너리 파일 확장자
const BINARY_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp',
  '.woff', '.woff2', '.ttf', '.eot',
  '.pdf', '.zip', '.tar', '.gz',
  '.mp3', '.mp4', '.avi', '.mov'
];

/**
 * 파일이 바이너리인지 확인
 */
function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

/**
 * 디렉토리를 재귀적으로 순회하여 모든 파일 목록 가져오기
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.relative(ROOT_DIR, fullPath);

    // 제외 대상 확인
    if (EXCLUDE_DIRS.some(dir => relativePath.split(path.sep).includes(dir))) {
      return;
    }

    if (EXCLUDE_FILES.includes(file)) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * 파일 내용을 읽고 마크다운 형식으로 변환
 */
function fileToMarkdown(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const ext = path.extname(filePath);
  
  let content = `\n## 📄 ${relativePath}\n\n`;
  
  if (isBinaryFile(filePath)) {
    content += `*[Binary file - ${ext} format]*\n\n`;
    content += `---\n`;
    return content;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const language = getLanguageFromExtension(ext);
    
    content += `\`\`\`${language}\n`;
    content += fileContent;
    content += `\n\`\`\`\n\n`;
    content += `---\n`;
  } catch (error) {
    content += `*[Error reading file: ${error.message}]*\n\n`;
    content += `---\n`;
  }

  return content;
}

/**
 * 파일 확장자로부터 언어 추론
 */
function getLanguageFromExtension(ext) {
  const languageMap = {
    '.js': 'javascript',
    '.cjs': 'javascript',
    '.mjs': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.cts': 'typescript',
    '.jsx': 'jsx',
    '.json': 'json',
    '.css': 'css',
    '.html': 'html',
    '.md': 'markdown',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.sh': 'bash',
    '.ps1': 'powershell',
    '.py': 'python',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.go': 'go',
    '.rs': 'rust',
    '.rb': 'ruby',
    '.php': 'php',
    '.sql': 'sql',
    '.xml': 'xml',
    '.toml': 'toml',
    '.ini': 'ini'
  };

  return languageMap[ext.toLowerCase()] || 'text';
}

/**
 * 디렉토리 구조를 트리 형태로 생성
 */
function generateDirectoryTree(files) {
  const tree = {};

  files.forEach((file) => {
    const relativePath = path.relative(ROOT_DIR, file);
    const parts = relativePath.split(path.sep);
    
    let current = tree;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // 파일
        if (!current._files) current._files = [];
        current._files.push(part);
      } else {
        // 디렉토리
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    });
  });

  return tree;
}

/**
 * 트리를 마크다운 형식으로 변환
 */
function treeToMarkdown(tree, indent = '') {
  let output = '';

  Object.keys(tree).sort().forEach((key) => {
    if (key === '_files') {
      tree[key].sort().forEach((file) => {
        output += `${indent}├── ${file}\n`;
      });
    } else {
      output += `${indent}├── ${key}/\n`;
      output += treeToMarkdown(tree[key], indent + '│   ');
    }
  });

  return output;
}

/**
 * 파일들을 크기 기준으로 10개 그룹으로 분할
 */
function splitFilesIntoGroups(files, numGroups = 10) {
  // 각 파일의 크기 계산
  const filesWithSize = files.map((file) => {
    try {
      const stats = fs.statSync(file);
      return { path: file, size: stats.size };
    } catch (error) {
      return { path: file, size: 0 };
    }
  });

  // 크기순으로 정렬 (큰 것부터)
  filesWithSize.sort((a, b) => b.size - a.size);

  // 각 그룹의 현재 크기를 추적
  const groups = Array.from({ length: numGroups }, () => ({
    files: [],
    totalSize: 0
  }));

  // 그리디 알고리즘: 각 파일을 현재 가장 작은 그룹에 추가
  filesWithSize.forEach((file) => {
    // 가장 작은 그룹 찾기
    let minGroup = groups[0];
    let minIndex = 0;
    
    groups.forEach((group, index) => {
      if (group.totalSize < minGroup.totalSize) {
        minGroup = group;
        minIndex = index;
      }
    });

    // 해당 그룹에 파일 추가
    minGroup.files.push(file.path);
    minGroup.totalSize += file.size;
  });

  return groups.map(group => group.files);
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🚀 프로젝트 전체 코드 문서화 시작...\n');

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 모든 파일 가져오기
  console.log('📁 파일 스캔 중...');
  const allFiles = getAllFiles(ROOT_DIR);
  console.log(`✅ 총 ${allFiles.length}개의 파일 발견\n`);

  // 디렉토리 구조 생성
  console.log('🌳 디렉토리 구조 생성 중...');
  const tree = generateDirectoryTree(allFiles);
  const treeMarkdown = treeToMarkdown(tree);

  // 인덱스 파일 생성
  let indexContent = `# 📦 프로젝트 전체 코드베이스 문서\n\n`;
  indexContent += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;
  indexContent += `## 📊 프로젝트 개요\n\n`;
  indexContent += `- **총 파일 수**: ${allFiles.length}개\n`;
  indexContent += `- **문서 분할**: 10개 파트\n`;
  indexContent += `- **프로젝트 루트**: \`${ROOT_DIR}\`\n\n`;
  
  indexContent += `## 📑 문서 목록\n\n`;
  for (let i = 1; i <= 10; i++) {
    indexContent += `- [Part ${i}](./codebase_part_${String(i).padStart(2, '0')}.md)\n`;
  }
  
  indexContent += `\n## 🌳 전체 디렉토리 구조\n\n`;
  indexContent += `\`\`\`\n`;
  indexContent += `${path.basename(ROOT_DIR)}/\n`;
  indexContent += treeMarkdown;
  indexContent += `\`\`\`\n\n`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), indexContent, 'utf-8');
  console.log('✅ 인덱스 파일 생성 완료\n');

  // 파일들을 10개 그룹으로 분할
  console.log('📦 파일 그룹화 중...');
  const fileGroups = splitFilesIntoGroups(allFiles, 10);

  // 각 그룹별로 MD 파일 생성
  fileGroups.forEach((group, index) => {
    const partNumber = index + 1;
    const fileName = `codebase_part_${String(partNumber).padStart(2, '0')}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    console.log(`\n📝 Part ${partNumber} 생성 중... (${group.length}개 파일)`);

    let content = `# 📦 프로젝트 코드베이스 - Part ${partNumber}/10\n\n`;
    content += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;
    content += `[← 인덱스로 돌아가기](./INDEX.md)\n\n`;
    content += `## 📋 이 파트의 파일 목록\n\n`;
    
    group.forEach((file) => {
      const relativePath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
      content += `- \`${relativePath}\`\n`;
    });

    content += `\n---\n`;
    content += `\n## 📄 파일 내용\n`;

    // 각 파일의 내용 추가
    group.forEach((file, fileIndex) => {
      const progress = Math.round(((fileIndex + 1) / group.length) * 100);
      process.stdout.write(`\r   진행률: ${progress}% (${fileIndex + 1}/${group.length})`);
      
      content += fileToMarkdown(file);
    });

    content += `\n---\n\n`;
    content += `**Part ${partNumber}/10 완료**\n\n`;
    content += `[← 인덱스로 돌아가기](./INDEX.md) | `;
    
    if (partNumber > 1) {
      content += `[← Part ${partNumber - 1}](./codebase_part_${String(partNumber - 1).padStart(2, '0')}.md) | `;
    }
    if (partNumber < 10) {
      content += `[Part ${partNumber + 1} →](./codebase_part_${String(partNumber + 1).padStart(2, '0')}.md)`;
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    
    const fileSizeMB = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
    console.log(`\n   ✅ ${fileName} 생성 완료 (${fileSizeMB} MB)`);
  });

  console.log('\n\n🎉 모든 문서 생성 완료!');
  console.log(`📂 출력 위치: ${OUTPUT_DIR}\n`);
  console.log('📖 생성된 파일:');
  console.log('   - INDEX.md (메인 인덱스)');
  for (let i = 1; i <= 10; i++) {
    console.log(`   - codebase_part_${String(i).padStart(2, '0')}.md`);
  }
  console.log('');
}

// 스크립트 실행
try {
  main();
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  console.error(error.stack);
  process.exit(1);
}

```

---

## File 8: `scripts/generate-structured-docs.cjs` {#file-8}

**크기**: 10.18 KB | **확장자**: cjs

```cjs
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

## File 9: `scripts/inspect-kor-lunar.js` {#file-9}

**크기**: 0.40 KB | **확장자**: js

```js
const kl = require('kor-lunar');

console.log("Inspecting kor-lunar output:");
try {
    const lunar = kl.toLunar(2024, 2, 4); // Li Chun (Ibchun) is around Feb 4
    console.log("2024-02-04 (Ibchun?):", JSON.stringify(lunar, null, 2));

    const solar = kl.toSolar(2024, 1, 1, false);
    console.log("Lunar 2024-01-01:", JSON.stringify(solar, null, 2));
} catch (e) {
    console.error(e);
}

```

---

## File 10: `scripts/manual-e2e-guide.mjs` {#file-10}

**크기**: 2.56 KB | **확장자**: mjs

```mjs
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const steps = [
    {
        title: "1. 사전 준비 (Pre-flight)",
        check: "로컬 서버가 실행 중 (`npm run dev`)이고 브라우저에서 `localhost:5173`에 접속했나요?"
    },
    {
        title: "2. 입력 페이지 테스트 (Input Page)",
        check: "이름, 생년월일(1990-01-01), 양력/음력 선택, 시간 설정(모름 or 시간선택) 후 '분석 시작' 버튼을 눌렀나요?"
    },
    {
        title: "3. 리포트 생성 대기 (Generation)",
        check: "로딩 화면(스피너/문구)이 표시되고, 약 5-10초 후 리포트 페이지로 자동 전환되었나요? (크래시 없음)"
    },
    {
        title: "4. 리포트 메인 검증 (Main Report)",
        check: "제목, 요약, 그리고 왼쪽/상단의 'INDEX' 버튼이 보이나요? Footer에 'BUILD: ...' 정보가 표시되나요?"
    },
    {
        title: "5. 운기 캘린더 검증 (Calendar)",
        check: "상단/메뉴의 '운기 캘린더' 버튼을 클릭하면 팝업(모달)이 뜨나요? 그리드에 색상(초록/노랑/빨강)이 보이나요?"
    },
    {
        title: "6. 상세 패널 검증 (Detail Panel)",
        check: "캘린더의 날짜를 클릭하면 해당 날짜의 상세 정보(헤드라인, 점수 등)가 패널 내에 표시되나요?"
    },
    {
        title: "7. 인쇄 미리보기 (Print)",
        check: "'PDF 저장' 또는 브라우저 인쇄(Ctrl+P)를 하면 A4 포맷으로 깔끔하게(버튼 숨김) 나오나요?"
    }
];

let current = 0;

function ask() {
    if (current >= steps.length) {
        console.log("\n✅ E2E Smoke Test Completed successfully. All manual checks passed.");
        rl.close();
        return;
    }

    const step = steps[current];
    console.log(`\n[Step ${current + 1}/${steps.length}] ${step.title}`);
    rl.question(`👉 ${step.check} (y/n/q): `, (ans) => {
        const a = ans.trim().toLowerCase();
        if (a === 'y' || a === 'yes' || a === '') {
            current++;
            ask();
        } else if (a === 'q' || a === 'quit') {
            console.log("🚫 Test Aborted.");
            rl.close();
        } else {
            console.error("❌ Test Failed by User Assertion.");
            rl.close();
            process.exit(1);
        }
    });
}

console.log("=== Manual End-to-End Smoke Test Guide ===");
console.log("Follow the instructions in your browser.");
ask();

```

---

## File 11: `scripts/test-generateReport.ts` {#file-11}

**크기**: 3.84 KB | **확장자**: ts

```ts
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator, collection, getDocs } from "firebase/firestore";

/**
 * Phase 3-C: Real Calculation Hardening Verification Script
 * 1. 윤달 월건 UNKNOWN 처리 검증
 * 2. 지원 연도 범위 (1890~2050) 외 차단 검증
 * 3. 한자 간지 정규화 검증
 */

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || "myungri-genesis",
};

if (!firebaseConfig.apiKey) {
    console.error("❌ Error: VITE_FIREBASE_API_KEY is missing in environment variables.");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'asia-northeast3');
const db = getFirestore(app);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

async function runVerification() {
    console.log("\n🧪 Starting Phase 3-C Hardening Verification...");

    const generateReport = httpsCallable(functions, 'generateReport');

    // Case 1: Leap Month (Expect wolgeon="" -> UNKNOWN pillar)
    console.log("\n1. Testing Leap Month (2023-05-15 lunar leap -> Expect UNKNOWN Month)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-05-15",
            sex: "female",
            calendar: "lunar",
            isLeapMonth: true,
            timeUnknown: true
        });
        const calc = res.data.calculation;
        console.log("✅ SUCCESS:", res.data.reportId);
        console.log("   - Month Pillar:", calc.pillars.month.label); // Expect UNKNOWN
        console.log("   - Day Pillar (Hanja):", calc.pillars.day.label); // Expect Hanja
        console.log("   - Warning:", calc.warnings[0]);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message, "| Details:", error.details);
    }

    // Case 2: Year Range (Expect Reject 1850)
    console.log("\n2. Testing Out-of-Range Year (1850 -> Expect Error)...");
    try {
        await generateReport({
            birthDate: "1850-01-01",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Should have been rejected.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Case 3: Year Range (Expect Reject 2080)
    console.log("\n3. Testing Out-of-Range Year (2080 -> Expect Error)...");
    try {
        await generateReport({
            birthDate: "2080-12-31",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Should have been rejected.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Case 4: Hanja Ganji Normalization Check
    console.log("\n4. Testing Hanja Normalization (2023-01-01 solar)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-01-01",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        const calc = res.data.calculation;
        console.log("✅ SUCCESS:", res.data.reportId);
        console.log("   - Year Pillar (Hanja):", calc.pillars.year.label);
        // 2023 is 壬寅 (임인) or 癸卯 (계묘) depending on solar date.
        // Let's check if it's Hanja.
        const isHanja = /[\u4e00-\u9fa5]/.test(calc.pillars.year.label);
        console.log("   - Is Hanja?:", isHanja);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message);
    }

    console.log("\n✨ Hardening Verification Completed.\n");
}

runVerification();

```

---

