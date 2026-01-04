// Basic Kangxi Stroke Data for common Korean name characters
// Format: "Char": { strokes: number, element: "Wood"|"Fire"|"Earth"|"Metal"|"Water" }
// Note: Kangxi strokes can differ from regular stroke count (e.g. Water radical).

// P7-ATOMIC-002: Dataset
export const KANGXI_DATA: Record<string, { strokes: number, element: string }> = {
    "金": { strokes: 8, element: "Metal" },
    "李": { strokes: 7, element: "Wood" },
    "朴": { strokes: 6, element: "Wood" },
    "崔": { strokes: 11, element: "Earth" },
    "鄭": { strokes: 19, element: "Earth" },
    "姜": { strokes: 9, element: "Wood" },
    "趙": { strokes: 14, element: "Fire" },
    "尹": { strokes: 4, element: "Earth" },
    "張": { strokes: 11, element: "Fire" },
    "林": { strokes: 8, element: "Wood" },
    "韓": { strokes: 17, element: "Water" }, // or Earth? Check source. Usually Water.
    // Five Elements
    "木": { strokes: 4, element: "Wood" },
    "火": { strokes: 4, element: "Fire" },
    "土": { strokes: 3, element: "Earth" },
    "水": { strokes: 4, element: "Water" },
    // Etc
    "大": { strokes: 3, element: "Fire" }, // Often Fire or Wood depending on context, Kangxi 3.
    "明": { strokes: 8, element: "Fire" },
    "理": { strokes: 12, element: "Fire" }, // Simplification of logic
};
