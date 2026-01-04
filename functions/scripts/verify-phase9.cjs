const fs = require('fs');
const path = require('path');

console.log("=== Phase 9 Verification: UI Integrity & Calendar ===");

const files = [
    'src/components/report/LuckCalendar.tsx',
    'src/components/report/LuckCalendar.module.css',
    'src/components/report/LuckDetailPanel.tsx',
    'src/styles/print.css'
];

let allExist = true;

for (const f of files) {
    const p = path.join(process.cwd(), f);
    if (fs.existsSync(p)) {
        console.log(`PASS: File exists -> ${f}`);
    } else {
        console.error(`FAIL: Missing file -> ${f}`);
        allExist = false;
    }
}

// Check Content Content Strings
const calendarContent = fs.readFileSync('src/components/report/LuckCalendar.tsx', 'utf-8');
if (calendarContent.includes('styles.strictGrid') && calendarContent.includes('MonthBlock')) {
    console.log("PASS: Calendar 7-col logic detected");
} else {
    console.error("FAIL: Calendar logic missing strictGrid or MonthBlock");
}

const printContent = fs.readFileSync('src/styles/print.css', 'utf-8');
if (printContent.includes('@media print') && printContent.includes('page-break-inside: avoid')) {
    console.log("PASS: Print CSS logic detected");
} else {
    console.error("FAIL: Print CSS logic invalid");
}
