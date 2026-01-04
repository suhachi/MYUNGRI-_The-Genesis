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
