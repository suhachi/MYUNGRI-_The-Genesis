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
