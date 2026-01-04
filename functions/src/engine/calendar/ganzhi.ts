export const STEMS_HANJA = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
export const BRANCHES_HANJA = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEMS_KOR = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const BRANCHES_KOR = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];

export interface Ganzhi {
    stem: string;
    branch: string;
    label: string;
}

export function toHanjaGanji(label: string): Ganzhi {
    if (!label || label.length < 2) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }
    const s = label[0];
    const b = label[1];

    // Case 1: Hangul mapping
    const siKor = STEMS_KOR.indexOf(s);
    const biKor = BRANCHES_KOR.indexOf(b);

    if (siKor >= 0 && biKor >= 0) {
        return {
            stem: STEMS_HANJA[siKor],
            branch: BRANCHES_HANJA[biKor],
            label: `${STEMS_HANJA[siKor]}${BRANCHES_HANJA[biKor]}`
        };
    }

    // Case 2: Already Hanja or passthrough
    const siHanja = STEMS_HANJA.indexOf(s);
    const biHanja = BRANCHES_HANJA.indexOf(b);

    if (siHanja >= 0 && biHanja >= 0) {
        return {
            stem: STEMS_HANJA[siHanja],
            branch: BRANCHES_HANJA[biHanja],
            label: `${STEMS_HANJA[siHanja]}${BRANCHES_HANJA[biHanja]}`
        };
    }

    return { stem: "?", branch: "?", label: "UNKNOWN" };
}
