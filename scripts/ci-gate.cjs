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
