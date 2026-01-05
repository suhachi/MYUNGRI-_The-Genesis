import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const FORBIDDEN_PATTERNS = [
    {
        regex: /\.replace\(\/\[\^/g,
        message: "Inline negated character class replace detected. Use sanitizeUserName() from SSOT instead."
    },
    {
        regex: /const\s+NAME_SANITIZE\s*=\s*\//g,
        message: "Local NAME_SANITIZE definition detected. Use the shared NAME_SANITIZE from SSOT instead."
    },
    {
        regex: /userName\.replace\(\//g,
        message: "Direct .replace call on userName detected. Use sanitizeUserName() from SSOT instead."
    }
];

const TARGET_FILES = [
    'src/pages/Start.tsx',
    'functions/src/index.ts',
    'functions/src/contracts/input.schema.ts'
];

const SSOT_FILES = [
    'src/lib/nameSanitize.ts',
    'functions/src/shared/nameSanitize.ts'
];

let hasError = false;

console.log("🔍 Running IME Policy Audit...");

TARGET_FILES.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    FORBIDDEN_PATTERNS.forEach(pattern => {
        lines.forEach((line, index) => {
            if (pattern.regex.test(line)) {
                // Double check it's not the SSOT file itself if we ever include them
                if (SSOT_FILES.includes(file)) return;

                console.error(`❌ Policy Violation in ${file}:${index + 1}`);
                console.error(`   Pattern: ${pattern.regex}`);
                console.error(`   Message: ${pattern.message}`);
                console.error(`   Line: ${line.trim()}`);
                hasError = true;
            }
        });
    });
});

if (hasError) {
    console.error("\n🚨 IME Policy Audit FAILED. Please fix the violations to ensure IME safety.");
    process.exit(1);
} else {
    console.log("✅ IME Policy Audit PASSED.");
    process.exit(0);
}
