import { PillarsInput } from '../src/engine/pillars';

export interface GoldenVector {
    id: string;
    description: string;
    input: PillarsInput;
    userName?: string;
    expectedHash?: string; // To be filled after first run
}

export const GOLDEN_VECTORS: GoldenVector[] = [
    {
        id: "GV_001",
        description: "Standard Solar Male",
        input: {
            birthDate: "1990-05-20",
            birthTime: "14:30",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "male",
            timezone: "Asia/Seoul"
        },
        userName: "홍길동"
    },
    {
        id: "GV_002",
        description: "Standard Solar Female",
        input: {
            birthDate: "1985-11-12",
            birthTime: "09:15",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "female",
            timezone: "Asia/Seoul"
        },
        userName: "김철수"
    },
    {
        id: "GV_003",
        description: "Lunar with Leap Month",
        input: {
            birthDate: "1995-08-23",
            birthTime: "18:45",
            timeUnknown: false,
            calendar: "lunar",
            isLeapMonth: true,
            sex: "male",
            timezone: "Asia/Seoul"
        },
        userName: "이영희"
    },
    {
        id: "GV_004",
        description: "Time Unknown Case",
        input: {
            birthDate: "1970-01-01",
            birthTime: "",
            timeUnknown: true,
            calendar: "solar",
            isLeapMonth: false,
            sex: "female",
            timezone: "Asia/Seoul"
        },
        userName: "박지성"
    },
    {
        id: "GV_005",
        description: "Hanja Name Analysis",
        input: {
            birthDate: "1999-12-31",
            birthTime: "23:59",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "male",
            timezone: "Asia/Seoul"
        },
        userName: "裵宗洙"
    },
    {
        id: "GV_006",
        description: "Short Name (1 char)",
        input: {
            birthDate: "2000-02-04",
            birthTime: "12:00",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "female",
            timezone: "Asia/Seoul"
        },
        userName: "혁"
    },
    {
        id: "GV_007",
        description: "Mixed Name Script",
        input: {
            birthDate: "1988-08-08",
            birthTime: "08:08",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "male",
            timezone: "Asia/Seoul"
        },
        userName: "Lee준호"
    },
    {
        id: "GV_008",
        description: "Early Year (1930s)",
        input: {
            birthDate: "1935-03-15",
            birthTime: "05:20",
            timeUnknown: false,
            calendar: "lunar",
            isLeapMonth: false,
            sex: "female",
            timezone: "Asia/Seoul"
        },
        userName: "어르신"
    },
    {
        id: "GV_009",
        description: "Future Date Case (2025)",
        input: {
            birthDate: "2025-05-05",
            birthTime: "10:00",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "male",
            timezone: "Asia/Seoul"
        },
        userName: "꿈나무"
    },
    {
        id: "GV_010",
        description: "Midnight Case",
        input: {
            birthDate: "1992-06-15",
            birthTime: "00:05",
            timeUnknown: false,
            calendar: "solar",
            isLeapMonth: false,
            sex: "female",
            timezone: "Asia/Seoul"
        },
        userName: "한여름"
    }
];
