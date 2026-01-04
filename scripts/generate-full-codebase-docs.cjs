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
