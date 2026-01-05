// P6-ATOMIC-001: Rolling 12-Month Range Calculation
import { parseYMDToUTCDate } from '../calendar/time';

export interface RollingRange {
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    totalDays: number;
    dates: string[]; // List of all YYYY-MM-DD strings
}

/**
 * Calculate a rolling 1 year range starting from analysisDate (inclusive).
 * Covers exactly 1 year length (e.g., 2024-01-01 -> 2024-12-31).
 * If leap year is involved, handles 366 days.
 */
export function calculateRollingRange(analysisDateYMD: string): RollingRange {
    const start = parseYMDToUTCDate(analysisDateYMD);

    // Calculate End Date: Same Month/Day next year, minus 1 day.
    // e.g. Start 2024-01-01 -> Next Year 2025-01-01 -> Minus 1 day -> 2024-12-31.
    // Logic: Add 1 year to year component, then subtract 1 day.

    // However, simply adding 1 year can be tricky with Feb 29.
    // 2024-02-29 + 1 year -> 2025-02-28 (automagically? or 03-01?)
    // Javascript Date usually handles this to 03-01 if 02-29 doesn't exist.
    // Let's stick to "Add 365 or 366 days"?
    // Definition of "1 Year":
    // User expects "Today until same day next year" or "Today until day before same day"?
    // Usually a "Year Calendar" includes the full cycle. 
    // Let's iterate day by day to be safe and strictly generate the list.

    // Wait, simpler approach:
    // Determine target end Date.
    // Actually, "Rolling 12 months" usually means [Start, End] where End is (Start + 1 Year - 1 Day).

    // Let's just generate the dates array by iterating. It's safer for list generation.
    const dates: string[] = [];
    let current = new Date(start.getTime());

    // We stop when we reach the date that is (StartYear + 1, StartMonth, StartDay).
    const limitYear = start.getUTCFullYear() + 1;
    const limitMonth = start.getUTCMonth();
    const limitDay = start.getUTCDate();

    // Safety break: 400 days
    for (let i = 0; i < 400; i++) {
        const y = current.getUTCFullYear();
        const m = current.getUTCMonth();
        const d = current.getUTCDate();

        if (y === limitYear && m === limitMonth && d === limitDay) {
            break; // Reached exact same date next year
        }

        dates.push(formatYMD(current));

        // Next day
        current.setUTCDate(current.getUTCDate() + 1);
    }

    return {
        startDate: dates[0],
        endDate: dates[dates.length - 1],
        totalDays: dates.length,
        dates
    };
}

function formatYMD(date: Date): string {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}
