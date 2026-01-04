# 📦 프로젝트 코드베이스 - Part 7/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/scripts.md`
- `src/pages/Report.module.css`
- `project_docs_structured/frontend-core.md`
- `src/config/reportTemplate.ts`
- `src/pages/Home.module.css`
- `scripts/check-env.cjs`
- `project_docs_structured/INDEX.md`
- `src/components/report/ReasonCards.module.css`
- `functions/src/engine/calculation/index.ts`
- `src/App.module.css`
- `.env.production.example`
- `src/components/ui/AdviceBox.module.css`
- `src/components/layout/Container.module.css`

---

## 📄 파일 내용

## 📄 project_docs_structured/scripts.md

```markdown
# Scripts

> 빌드 및 유틸리티 스크립트

**생성 시각**: 2026-01-03T09:38:11.874Z

---

## 📋 목차 (6개 파일)

1. [scripts/check-env.cjs](#file-1)
2. [scripts/ci-gate.cjs](#file-2)
3. [scripts/generate-code-docs.cjs](#file-3)
4. [scripts/generate-design-docs.cjs](#file-4)
5. [scripts/generate-structured-docs.cjs](#file-5)
6. [scripts/test-generateReport.ts](#file-6)

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

## File 2: `scripts/ci-gate.cjs` {#file-2}

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

## File 3: `scripts/generate-code-docs.cjs` {#file-3}

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

## File 4: `scripts/generate-design-docs.cjs` {#file-4}

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

## File 5: `scripts/generate-structured-docs.cjs` {#file-5}

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

## File 6: `scripts/test-generateReport.ts` {#file-6}

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


```

---

## 📄 src/pages/Report.module.css

```css
.reportPage {
    min-height: 100vh;
    background-color: var(--bg);
    overflow-x: hidden;
}

.mainLayout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    position: relative;
}

/* 사이드바 스타일 */
.sidebar {
    position: sticky;
    top: 6rem;
    height: calc(100vh - 8rem);
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    z-index: 10;
}

.sidebarHeader {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebarHeader h3 {
    font-size: 1.1rem;
    color: var(--ink);
}

.closeBtn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--muted);
    cursor: pointer;
}

.nav {
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.navItem {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.8rem;
    background: transparent;
    border: none;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
}

.navItem:hover {
    background-color: color-mix(in srgb, var(--bg) 50%, transparent);
}

.pageNum {
    background: rgba(198, 40, 40, 0.05);
}

.navItem .pageNum {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
    width: 20px;
}

.navItem .pageTitle {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reportContent {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
}

.reportHeader {
    margin-bottom: 80px;
    text-align: left;
}

.mainTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.mainSummary {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.6;
    max-width: 600px;
}

.pageSection {
    margin-bottom: 120px;
    scroll-margin-top: 40px;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid #1c1c1c;
    padding-bottom: 8px;
}

.categoryTag {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1c1c1c;
}

.pageIdentifier {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--muted);
}

.contentCard {
    background: #FFFFFF !important;
    border-left: 4px solid #CC3D3D !important;
    border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05) !important;
    padding: 40px !important;
    margin-bottom: 3rem;
}

.sectionTitle {
    font-family: var(--font-serif);
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--ink);
}

.textContent p {
    margin-bottom: 24px;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
    text-align: justify;
}

.visualBox {
    border: 2px solid #1c1c1c;
    padding: 32px;
    margin: 40px 0;
}

.visualTitle {
    font-family: "Noto Serif KR", serif;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #1c1c1c;
}

.placeholder {
    height: 180px;
    background: rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    gap: 0.5rem;
}

.placeholder::before {
    content: "SERVICE PREPARING";
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    opacity: 0.5;
}

.disclaimerSection {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
}

.disclaimerSection p {
    font-size: 0.85rem;
    margin-bottom: 8px;
    line-height: 1.6;
}

.disclaimerEn {
    font-size: 0.75rem !important;
    font-style: italic;
}

.mobileNavTrigger {
    display: none;
}

@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }

    .sidebarOpen {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #f7f5f0;
    }

    .mobileNavTrigger {
        display: block;
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 900;
        background: #1c1c1c;
        color: #fff;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .mainTitle {
        font-size: 2.25rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .sidebar {
        transition: none;
    }

    .navItem {
        transition: none;
    }
}

/* Phase 26: Action Buttons */
.actionButtons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.pdfButton,
.calendarButton {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.pdfButton {
    background-color: #1c1c1c;
    color: #fff;
}

.pdfButton:hover {
    background-color: #333;
}

.calendarButton {
    background-color: #fff;
    color: #1c1c1c;
    border: 1px solid #1c1c1c;
}

.calendarButton:hover {
    background-color: #f7f5f0;
}

/* Phase 26: Reason Cards */
.reasonCardsContainer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.reasonCardsTitle {
    font-size: 0.9rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1rem;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 3px solid #c62828;
    padding: 1rem;
    margin-bottom: 1rem;
}

.reasonCard h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1c1c1c;
}

.reasonCard p {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
}

/* Phase 26: Print Optimization */
@media print {
    .reportPage {
        background: #FFFFFF !important;
        padding: 0 !important;
    }

    body::before,
    body::after {
        display: none !important;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .actionButtons,
    .shareActions,
    .header {
        display: none !important;
    }

    .mainLayout {
        display: block !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    .reportContent {
        max-width: 100% !important;
        padding: 0 !important;
    }

    .pageSection {
        page-break-before: always;
        margin-bottom: 40px;
    }

    .contentCard {
        box-shadow: none !important;
        border: 1px solid #EEEEEE !important;
        padding: 30px !important;
    }

    .visualBox {
        page-break-inside: avoid;
    }

    @page {
        size: A4;
        margin: 20mm;
    }
}

/* Print Mode Class */
.printMode .sidebar,
.printMode .mobileNavTrigger,
.printMode .actionButtons {
    display: none;
}

.printMode .mainLayout {
    grid-template-columns: 1fr;
}

/* Phase 27: Legacy Warning Styles */
.legacyWarning {
    padding: 80px 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.legacyCard {
    max-width: 600px;
    text-align: center;
}

.legacyTitle {
    font-size: 2rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
}

.legacyText {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
}

.legacyFeatures {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.legacyFeatures li {
    font-size: 1rem;
    padding: 0.5rem 0;
    color: #1c1c1c;
}

.regenerateButton {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    background-color: #c62828;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
}

.regenerateButton:hover {
    background-color: #a52020;
    transform: translateY(-2px);
}

/* Phase 27: 3단 블록 스타일 */
.sectionBlock {
    margin: 32px 0;
    padding: 24px 0;
    border-top: 1px solid rgba(28, 28, 28, 0.1);
}

.sectionBlock:first-child {
    border-top: none;
    padding-top: 0;
}

.blockTitle {
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 1rem;
    display: none;
    /* Hide internal block titles as they are implied by components */
}

/* 3단 구조 컴포넌트 스타일 보정 */
.resultBlock {
    margin-bottom: 2rem;
}

.explainBlock {
    background-color: #F7F7F7;
    border-left: 4px solid var(--muted);
    padding: 20px;
    margin-bottom: 2rem;
}

.interpretationBlock {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--ink);
    line-height: 1.7;
}

.interpretationBlock::before {
    content: "💡 ";
    font-style: normal;
    margin-right: 8px;
}

@media print {
    .sectionBlock {
        page-break-inside: avoid;
        margin: 24px 0;
    }

    .blockTitle {
        page-break-after: avoid;
    }

    .qualityAlert {
        display: none !important;
    }
}

/* Phase 28: Quality Alert Banner */
.qualityAlert {
    background: #FFF9C4;
    border: 2px solid #FBC02D;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.alertIcon {
    font-size: 2rem;
}

.alertContent h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #F57F17;
    margin-bottom: 8px;
}

.alertContent p {
    font-size: 0.95rem;
    color: #5D4037;
    margin-bottom: 16px;
    line-height: 1.5;
}

.regenerateBtn {
    background: #F57F17;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}

.regenerateBtn:hover:not(:disabled) {
    background: #E65100;
    transform: translateY(-2px);
}

.regenerateBtn:disabled {
    opacity: 0.6;
    cursor: wait;
}
```

---

## 📄 project_docs_structured/frontend-core.md

```markdown
# Frontend - Core

> 프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)

**생성 시각**: 2026-01-03T09:38:11.832Z

---

## 📋 목차 (6개 파일)

1. [src/config/brand.ts](#file-1)
2. [src/config/reportTemplate.ts](#file-2)
3. [src/config/shareMeta.ts](#file-3)
4. [src/config/tokens.ts](#file-4)
5. [src/config/trivia.ts](#file-5)
6. [src/types/report.ts](#file-6)

---

## File 1: `src/config/brand.ts` {#file-1}

**크기**: 0.35 KB | **확장자**: ts

```ts
/**
 * MYUNGRI: The Genesis - Brand Naming Constants
 * 
 * [Usage Rules]
 * - APP_NAME_EN: Used for <title>, meta tags, SEO, and technical documentation/reports.
 * - BRAND_LOCKUP_KR: Used ONLY for Intro and Home visible brand headlines.
 */

export const APP_NAME_EN = "MYUNGRI: The Genesis";
export const BRAND_LOCKUP_KR = "命理: The Genesis";

```

---

## File 2: `src/config/reportTemplate.ts` {#file-2}

**크기**: 5.01 KB | **확장자**: ts

```ts
export interface ReportPage {
    id: number;
    title: string;
    category: string;
    content: string;
    type: 'cover' | 'index' | 'summary' | 'analysis' | 'action' | 'appendix';
}

export const REPORT_SECTIONS: ReportPage[] = [
    { id: 1, title: "분석 엔진 리포트", category: "Cover", content: "당신의 우주적 설계도와 현대적 데이터의 만남", type: 'cover' },
    { id: 2, title: "리포트 목차", category: "Index", content: "32페이지에 걸친 상세 분석 지도", type: 'index' },
    { id: 3, title: "탄생 데이터 요약", category: "Summary", content: "입력된 탄생 정보 및 환경 변수 확인", type: 'summary' },
    { id: 4, title: "원전 근거 (Reason Card 01)", category: "Evidence", content: "고전 문헌에 근거한 본질적 자아 분석", type: 'analysis' },
    { id: 5, title: "오행의 균형 분석", category: "Overview", content: "목(木), 화(火), 토(土), 금(金), 수(水) 분포도", type: 'analysis' },
    { id: 6, title: "십신(十神)의 상호작용", category: "Overview", content: "사회적 관계와 내면적 욕구의 구조", type: 'analysis' },
    { id: 7, title: "신강/신약 측정 결과", category: "Analysis", content: "일간의 힘과 주변 기운의 조화", type: 'analysis' },
    { id: 8, title: "격국(格局) 판정", category: "Analysis", content: "삶의 큰 틀과 사회적 그릇의 정의", type: 'analysis' },
    { id: 9, title: "용신(用神)과 희신(喜神)", category: "Analysis", content: "균형을 맞추는 핵심 기운과 반가운 기운", type: 'analysis' },
    { id: 10, title: "천간(天干) 에너지 분석", category: "Details", content: "드러난 성정과 외부적 기질", type: 'analysis' },
    { id: 11, title: "지지(地支) 잠재력 분석", category: "Details", content: "내면의 에너지와 현실적 기반", type: 'analysis' },
    { id: 12, title: "지장간(地藏干)의 암시", category: "Details", content: "숨겨진 재능과 예상치 못한 기회", type: 'analysis' },
    { id: 13, title: "십이운성(十二運星) 주기", category: "Cycles", content: "에너지의 성쇠와 생애 변곡점", type: 'analysis' },
    { id: 14, title: "대운(大運)의 흐름: 1단계", category: "Cycles", content: "생애 첫 번째 대운의 도전과 성과", type: 'analysis' },
    { id: 15, title: "대운(大運)의 흐름: 2단계", category: "Cycles", content: "청년기 에너지 방향성과 확장성", type: 'analysis' },
    { id: 16, title: "현재 대운 집중 분석", category: "Cycles", content: "현재 당신이 서 있는 인생의 계절", type: 'analysis' },
    { id: 17, title: "세운(歲運) 흐름: 올해의 운", category: "Cycles", content: "현재 연도의 기운적 특징과 활용법", type: 'analysis' },
    { id: 18, title: "월별 흐름 예측: 상반기", category: "Cycles", content: "기운의 변화 리듬과 월별 전략", type: 'analysis' },
    { id: 19, title: "월별 흐름 예측: 하반기", category: "Cycles", content: "안정적 마무리를 위한 기운 조율", type: 'analysis' },
    { id: 20, title: "액션 플랜: 커리어 전략", category: "Action", content: "직업적 성취를 위한 최적의 타이밍", type: 'action' },
    { id: 21, title: "액션 플랜: 재무적 흐름", category: "Action", content: "리스크 관리와 자산 형성의 시기", type: 'action' },
    { id: 22, title: "액션 플랜: 인간관계", category: "Action", content: "귀인의 원조와 조심해야 할 인연", type: 'action' },
    { id: 23, title: "액션 플랜: 조언(Advice Card)", category: "Action", content: "현재 직면한 과제에 대한 명확한 지침", type: 'action' },
    { id: 24, title: "건강 및 심리적 조언", category: "Health", content: "신체적 에너지 보강과 멘탈 관리", type: 'action' },
    { id: 25, title: "공간적 활용: 행운의 방향", category: "Action", content: "주거 및 활동 공간의 에너지 최적화", type: 'action' },
    { id: 26, title: "컬러 및 상징 활용법", category: "Action", content: "일상의 소품으로 기운을 보강하는 방법", type: 'action' },
    { id: 27, title: "원전 근거 (Reason Card 02)", category: "Evidence", content: "심화 분석 데이터 대조 결과", type: 'analysis' },
    { id: 28, title: "심층 분석: 성격의 이면", category: "Deep Dive", content: "타인이 모르는 당신만의 본질", type: 'analysis' },
    { id: 29, title: "미래 전략: 3년 내 핵심 과제", category: "Action", content: "가장 우선순위를 두어야 할 삶의 영역", type: 'action' },
    { id: 30, title: "분석 학술적 Appendix", category: "Appendix", content: "사용된 전문 용어와 분석 기법 해설", type: 'appendix' },
    { id: 31, title: "리포트 요약 및 맺음말", category: "Appendix", content: "변화를 위한 마지막 한마디", type: 'appendix' },
    { id: 32, title: "정밀 분석 보증서", category: "Appendix", content: "데이터 정확성 및 분석 권위 보증", type: 'appendix' },
];

```

---

## File 3: `src/config/shareMeta.ts` {#file-3}

**크기**: 0.61 KB | **확장자**: ts

```ts
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

## File 4: `src/config/tokens.ts` {#file-4}

**크기**: 0.47 KB | **확장자**: ts

```ts
/**
 * Genesis Design Tokens
 * 
 * Strict Rule: NO pure #000 or #FFF allowed.
 */

export const colors = {
    bg: "#EBE7E0",
    card: "#FDFCF8",
    ink: "#1C1C1C",
    muted: "#5A5A5A",
    accent: "#D9381E",
    line: "color-mix(in srgb, var(--ink) 12%, transparent)",
} as const;

export const fonts = {
    serif: '"Noto Serif KR", serif',
    sans: '"Noto Sans KR", "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
} as const;

```

---

## File 5: `src/config/trivia.ts` {#file-5}

**크기**: 1.26 KB | **확장자**: ts

```ts
export const TRIVIA_LINES = [
    "만세력 알고리즘으로 당신의 탄생 좌표를 정밀 측정 중입니다.",
    "오행의 균형과 기운의 흐름을 초원자 단위로 분석하고 있습니다.",
    "십신(十神)의 상호작용을 통해 성격과 기질을 파악하는 중입니다.",
    "대운과 세운의 교차점을 분석하여 미래의 기회를 탐색합니다.",
    "근거 카드(Reason Card) 엔진이 원전 데이터를 대조하고 있습니다.",
    "역학적 균형을 맞추기 위해 정교한 수치 연산을 수행 중입니다.",
    "하드코딩된 분석 엔진이 좌표를 도출하고 있습니다.",
    "음양의 조화가 당신의 삶에 미치는 영향을 검토하고 있습니다.",
    "정확한 해석을 위해 60갑자의 순환 정보를 재정렬하고 있습니다.",
    "데이터 기반의 명확한 Action Plan을 구성하는 중입니다.",
    "당신의 고유한 기운이 현대적 해석과 만나는 과정입니다.",
    "불필요한 미신을 배제하고 학술적 근거에 집중하여 분석합니다.",
    "사주 원국의 강약을 측정하여 인생의 계절을 파악 중입니다.",
    "Genesis Book Style의 고전적 미학을 리포트에 담고 있습니다."
];

```

---

## File 6: `src/types/report.ts` {#file-6}

**크기**: 1.09 KB | **확장자**: ts

```ts
// Report Types for Phase 26
export interface ReasonCard {
    title: string;
    evidence: string[];
    patchCode: string[];
    riskIfIgnored: string;
}

export interface Section {
    id: string;
    title: string;
    content?: string; // Legacy support
    category: string;
    type?: string;
    reasonCards?: ReasonCard[];
    // Phase 27: 3단 구조
    result?: string;
    explain?: string;
    interpretation?: string;
}

export interface ReportMeta {
    title: string;
    summary: string;
    fateRuntimeModel?: string; // 命/運 모델 요약
    strategistMeta?: {
        disclaimer?: string;
    };
}

export interface DayEntry {
    date: string; // YYYY-MM-DD
    score: number;
    grade: "GOOD" | "WARN" | "CAUTION";
    dayGanji?: string;
    reasons: string[];
    actionPlan: string[];
    eventFit: {
        contract: string;
        signboard: string;
        launch: string;
    };
}

export interface LuckCalendar {
    year: number;
    generatedAt: string | any; // Supports ISO String or Timestamp object
    calendar: DayEntry[];
}

```

---


```

---

## 📄 src/config/reportTemplate.ts

```typescript
export interface ReportPage {
    id: number;
    title: string;
    category: string;
    content: string;
    type: 'cover' | 'index' | 'summary' | 'analysis' | 'action' | 'appendix';
}

export const REPORT_SECTIONS: ReportPage[] = [
    { id: 1, title: "분석 엔진 리포트", category: "Cover", content: "당신의 우주적 설계도와 현대적 데이터의 만남", type: 'cover' },
    { id: 2, title: "리포트 목차", category: "Index", content: "32페이지에 걸친 상세 분석 지도", type: 'index' },
    { id: 3, title: "탄생 데이터 요약", category: "Summary", content: "입력된 탄생 정보 및 환경 변수 확인", type: 'summary' },
    { id: 4, title: "원전 근거 (Reason Card 01)", category: "Evidence", content: "고전 문헌에 근거한 본질적 자아 분석", type: 'analysis' },
    { id: 5, title: "오행의 균형 분석", category: "Overview", content: "목(木), 화(火), 토(土), 금(金), 수(水) 분포도", type: 'analysis' },
    { id: 6, title: "십신(十神)의 상호작용", category: "Overview", content: "사회적 관계와 내면적 욕구의 구조", type: 'analysis' },
    { id: 7, title: "신강/신약 측정 결과", category: "Analysis", content: "일간의 힘과 주변 기운의 조화", type: 'analysis' },
    { id: 8, title: "격국(格局) 판정", category: "Analysis", content: "삶의 큰 틀과 사회적 그릇의 정의", type: 'analysis' },
    { id: 9, title: "용신(用神)과 희신(喜神)", category: "Analysis", content: "균형을 맞추는 핵심 기운과 반가운 기운", type: 'analysis' },
    { id: 10, title: "천간(天干) 에너지 분석", category: "Details", content: "드러난 성정과 외부적 기질", type: 'analysis' },
    { id: 11, title: "지지(地支) 잠재력 분석", category: "Details", content: "내면의 에너지와 현실적 기반", type: 'analysis' },
    { id: 12, title: "지장간(地藏干)의 암시", category: "Details", content: "숨겨진 재능과 예상치 못한 기회", type: 'analysis' },
    { id: 13, title: "십이운성(十二運星) 주기", category: "Cycles", content: "에너지의 성쇠와 생애 변곡점", type: 'analysis' },
    { id: 14, title: "대운(大運)의 흐름: 1단계", category: "Cycles", content: "생애 첫 번째 대운의 도전과 성과", type: 'analysis' },
    { id: 15, title: "대운(大運)의 흐름: 2단계", category: "Cycles", content: "청년기 에너지 방향성과 확장성", type: 'analysis' },
    { id: 16, title: "현재 대운 집중 분석", category: "Cycles", content: "현재 당신이 서 있는 인생의 계절", type: 'analysis' },
    { id: 17, title: "세운(歲運) 흐름: 올해의 운", category: "Cycles", content: "현재 연도의 기운적 특징과 활용법", type: 'analysis' },
    { id: 18, title: "월별 흐름 예측: 상반기", category: "Cycles", content: "기운의 변화 리듬과 월별 전략", type: 'analysis' },
    { id: 19, title: "월별 흐름 예측: 하반기", category: "Cycles", content: "안정적 마무리를 위한 기운 조율", type: 'analysis' },
    { id: 20, title: "액션 플랜: 커리어 전략", category: "Action", content: "직업적 성취를 위한 최적의 타이밍", type: 'action' },
    { id: 21, title: "액션 플랜: 재무적 흐름", category: "Action", content: "리스크 관리와 자산 형성의 시기", type: 'action' },
    { id: 22, title: "액션 플랜: 인간관계", category: "Action", content: "귀인의 원조와 조심해야 할 인연", type: 'action' },
    { id: 23, title: "액션 플랜: 조언(Advice Card)", category: "Action", content: "현재 직면한 과제에 대한 명확한 지침", type: 'action' },
    { id: 24, title: "건강 및 심리적 조언", category: "Health", content: "신체적 에너지 보강과 멘탈 관리", type: 'action' },
    { id: 25, title: "공간적 활용: 행운의 방향", category: "Action", content: "주거 및 활동 공간의 에너지 최적화", type: 'action' },
    { id: 26, title: "컬러 및 상징 활용법", category: "Action", content: "일상의 소품으로 기운을 보강하는 방법", type: 'action' },
    { id: 27, title: "원전 근거 (Reason Card 02)", category: "Evidence", content: "심화 분석 데이터 대조 결과", type: 'analysis' },
    { id: 28, title: "심층 분석: 성격의 이면", category: "Deep Dive", content: "타인이 모르는 당신만의 본질", type: 'analysis' },
    { id: 29, title: "미래 전략: 3년 내 핵심 과제", category: "Action", content: "가장 우선순위를 두어야 할 삶의 영역", type: 'action' },
    { id: 30, title: "분석 학술적 Appendix", category: "Appendix", content: "사용된 전문 용어와 분석 기법 해설", type: 'appendix' },
    { id: 31, title: "리포트 요약 및 맺음말", category: "Appendix", content: "변화를 위한 마지막 한마디", type: 'appendix' },
    { id: 32, title: "정밀 분석 보증서", category: "Appendix", content: "데이터 정확성 및 분석 권위 보증", type: 'appendix' },
];

```

---

## 📄 src/pages/Home.module.css

```css
.home {
    padding-bottom: 5rem;
}

.hero {
    padding: 6rem 0;
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.heroGrid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: center;
}

.heroTitle {
    font-family: var(--font-serif);
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
}

.heroSubtitle {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 3rem;
    max-width: 600px;
}

.ctaGroup {
    display: flex;
    gap: 1rem;
}

.primaryBtn {
    background-color: var(--ink);
    color: #FFF;
    border: none;
    height: 64px;
    padding: 0 32px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.primaryBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.secondaryBtn {
    background-color: transparent;
    color: var(--ink);
    border: 1px solid var(--ink);
    padding: 1.2rem 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 4px;
}

.heroVisual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.astrolabeContainer {
    position: absolute;
    width: 140%;
    height: 140%;
    z-index: -1;
    opacity: 0.08;
    animation: rotateAstrolabe 120s infinite linear;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.astrolabeSvg {
    width: 100%;
    height: 100%;
    stroke: #000;
    stroke-width: 1px;
    fill: none;
}

@keyframes rotateAstrolabe {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.kanjiWatermark {
    position: absolute;
    top: -50px;
    right: -20px;
    font-family: var(--font-serif);
    font-size: 25rem;
    font-weight: 900;
    color: var(--ink);
    opacity: 0.03;
    pointer-events: none;
    z-index: -2;
    line-height: 1;
}

.principleCard {
    z-index: 10;
}

.cardTitle {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
}

.principleList {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.principleList li {
    font-family: var(--font-sans);
    color: var(--muted);
    font-size: 0.95rem;
    padding-left: 1.5rem;
    position: relative;
}

.principleList li::before {
    content: '·';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: 900;
    font-size: 1.5rem;
    line-height: 0.8;
}

/* Features */
.features {
    padding: 4rem 0;
}

.sectionHeader {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--line);
    padding-bottom: 1rem;
}

.sectionTitle {
    font-size: 2rem;
}

.featureGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.featureCard h4 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
}

@media (max-width: 1024px) {
    .heroGrid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .kanjiWatermark {
        font-size: 15rem;
        top: -30px;
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 4rem 0;
    }

    .heroTitle {
        font-size: 2.5rem;
    }

    .ctaGroup {
        flex-direction: column;
        gap: 1rem;
    }

    .primaryBtn {
        height: 56px;
        width: 100%;
    }

    .featureGrid {
        grid-template-columns: 1fr;
    }
}
```

---

## 📄 scripts/check-env.cjs

```javascript
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

## 📄 project_docs_structured/INDEX.md

```markdown
# 프로젝트 전체 코드 문서 - 인덱스

**프로젝트**: MYUNGRI - The Genesis
**생성 시각**: 2026-01-03T09:38:11.895Z

---

## 📚 문서 구조

이 문서는 프로젝트의 전체 코드를 구조별로 분류하여 생성되었습니다.
각 카테고리별로 별도의 MD 파일이 생성되어 있습니다.

## 📂 카테고리 목록

### 1. [Frontend - Pages](frontend-pages.md)

프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)

**파일**: `frontend-pages.md`

### 2. [Frontend - Components](frontend-components.md)

재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)

**파일**: `frontend-components.md`

### 3. [Frontend - Core](frontend-core.md)

프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)

**파일**: `frontend-core.md`

### 4. [Frontend - Styles](frontend-styles.md)

전역 스타일 및 CSS 모듈

**파일**: `frontend-styles.md`

### 5. [Backend - Functions](backend-functions.md)

Firebase Functions (generateReport, generateLuckCalendar 등)

**파일**: `backend-functions.md`

### 6. [Backend - Calculation Engine](backend-engine.md)

명리 계산 엔진 (사주 계산, 일진 계산 등)

**파일**: `backend-engine.md`

### 7. [Configuration - Root](config-root.md)

프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)

**파일**: `config-root.md`

### 8. [Configuration - Environment](config-env.md)

환경 변수 설정 파일

**파일**: `config-env.md`

### 9. [Scripts](scripts.md)

빌드 및 유틸리티 스크립트

**파일**: `scripts.md`

### 10. [Documentation](docs.md)

프로젝트 문서 (README, 작업 로그, 설정 문서 등)

**파일**: `docs.md`

### 11. [Public Assets](public.md)

정적 파일 (이미지, 아이콘, manifest 등)

**파일**: `public.md`

---

## 🚀 사용 방법

1. 각 카테고리별 MD 파일을 열어 해당 영역의 전체 코드를 확인하세요.
2. 각 파일 내부에는 목차(TOC)가 포함되어 있어 빠른 탐색이 가능합니다.
3. 모든 파일은 마크다운 코드 블록으로 포맷되어 있어 가독성이 높습니다.

## 🔄 재생성

문서를 다시 생성하려면 다음 명령어를 실행하세요:

```bash
node scripts/generate-structured-docs.cjs
```

```

---

## 📄 src/components/report/ReasonCards.module.css

```css
.reasonCardsContainer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(198, 40, 40, 0.15);
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 4px solid #c62828;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0 4px 4px 0;
}

.cardTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1c1c1c;
    margin-bottom: 1rem;
}

.evidenceSection,
.patchSection,
.riskSection {
    margin-top: 1rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.5rem;
}

.evidenceList,
.patchList {
    margin: 0;
    padding-left: 1.5rem;
}

.evidenceList li,
.patchList li {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0.5rem;
}

.patchList li {
    font-weight: 500;
    color: #1c1c1c;
}

.riskText {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(198, 40, 40, 0.9);
    font-weight: 500;
}

@media print {
    .reasonCardsContainer {
        page-break-inside: avoid;
    }

    .reasonCard {
        page-break-inside: avoid;
        background-color: rgba(198, 40, 40, 0.05);
    }
}
```

---

## 📄 functions/src/engine/calculation/index.ts

```typescript
/**
 * Calculation Engine Placeholder (Server-side Only)
 * 지적 재산권(IP) 보호를 위해 명리 계산 알고리즘은 서버사이드에만 격리됩니다.
 */
export const calculateAstroData = (input: {
    birthDate: string;
    birthTime: string | null;
    timeUnknown: boolean;
    sex: string;
    calendar: string;
    timezone: string;
}) => {
    // [Placeholder] 실제 만세력 및 명리 엔진 로직은 Sprint 3-B에서 이식됩니다.
    return {
        engine: "Genesis-M-v1",
        computedAt: new Date().toISOString(),
        chart: {
            status: "calculated_placeholder",
            elements: ["stub_wood", "stub_fire", "stub_earth", "stub_metal", "stub_water"]
        },
        metadata: {
            inputProvenance: "secure_server_context"
        }
    };
};

```

---

## 📄 src/App.module.css

```css
.introContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 2rem;
    text-align: center;
}

.heroBrand {
    font-size: clamp(3rem, 10vw, 6rem);
    transition: transform 0.8s ease-out;
}

.enterBtn {
    padding: 1.2rem 3rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.05em;
}

.enterBtn:hover {
    transform: translateY(-2px);
    /* Token-only hover shadow using color-mix */
    box-shadow: 0 10px 20px -10px color-mix(in srgb, var(--ink) 30%, transparent);
}
```

---

## 📄 .env.production.example

```text
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

## 📄 src/components/ui/AdviceBox.module.css

```css
.adviceBox {
    background-color: transparent;
    border: none;
    padding: 0;
    position: relative;
    margin: 2rem 0;
}

.badge {
    display: none;
    /* Hide badge, using icon instead */
}

.content {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--ink);
    line-height: 1.7;
    display: flex;
    align-items: flex-start;
}

.content::before {
    content: "💡";
    font-style: normal;
    margin-right: 12px;
    font-size: 1.2rem;
}
```

---

## 📄 src/components/layout/Container.module.css

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
}

@media (max-width: 768px) {
    .container {
        padding-left: 20px;
        padding-right: 20px;
    }
}
```

---

---

**Part 7/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 6](./codebase_part_06.md) | [Part 8 →](./codebase_part_08.md)