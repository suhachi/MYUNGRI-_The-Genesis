const { calculateRollingRange } = require('../lib/engine/rollingRange');
const { precomputeLuckCalendar } = require('../lib/engine/luckCalendar/precompute');
const { getDailyDetail } = require('../lib/engine/luckCalendar/detail');
const { calculatePillars } = require('../lib/engine/pillars');

console.log("=== Phase 6 Verification: Rolling Luck Calendar ===");

async function verify() {
    // 1. Range Test
    const today = '2024-01-01'; // Leap Year!
    const range = calculateRollingRange(today);
    console.log(`Range: ${range.startDate} -> ${range.endDate}`);
    console.log(`Total Days: ${range.totalDays} (Expected 366 for 2024 leap coverage)`);

    // 2024 is leap year. Jan 1 to Dec 31 is 366 days.
    // calculateRollingRange logic iterates until (StartYear+1, StartMonth, StartDay).
    // From 2024-01-01 until it hits 2025-01-01.
    // The loop breaks AT 2025-01-01, exclusive. 
    // So distinct dates are 2024-01-01 ... 2024-12-31.
    // Total should be 366.

    if (range.totalDays >= 365) console.log("PASS: Range Length");
    else console.error(`FAIL: Range too short (${range.totalDays})`);

    // 2. Precompute Test
    const input = {
        birthDate: '2000-01-01',
        birthTime: '12:00',
        timeUnknown: false,
        calendar: 'solar',
        sex: 'male',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    };
    const pillars = calculatePillars(input);

    // Compute for small range (1 day for test speed, but engine assumes rolling range internally)
    // Actually precompute generates 366 records if we pass today's date.
    // For test verification, we check the first record.
    const records = precomputeLuckCalendar(pillars, today);
    console.log(`Records Computed: ${records.length}`);

    if (records.length > 0) {
        const r1 = records[0];
        console.log("First Record:", JSON.stringify(r1, null, 2));

        if (r1.ganzhi && r1.tenGod && r1.headline) console.log("PASS: Record Fields");
        else console.error("FAIL: Missing Fields");
    }

    // 3. Detail Test
    const detail = getDailyDetail(pillars, today);
    console.log("Detail Title:", detail.headline);
    console.log("Guided:", detail.extendedGuidance);

    if (detail.extendedGuidance) console.log("PASS: Detail Expansion");
}

verify();
