import fs from 'fs';
import path from 'path';

const rootContracts = path.resolve('contracts');
const functionsContracts = path.resolve('functions/src/contracts');

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('Syncing contracts to functions...');
copyRecursive(rootContracts, functionsContracts);
console.log('Done.');
