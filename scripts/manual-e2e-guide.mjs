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
