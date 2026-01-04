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
