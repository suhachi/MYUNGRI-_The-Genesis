// P5-ATOMIC-003: Data Packet for Narrative Guard
// LLM receives ONLY this structure. No raw calculation logic allowed in prompts.

export interface LifeFlowPacket {
    // 1. Facts (Immutable)
    resultFacts: {
        buckets: BucketFact[];
    };

    // 2. Interpretation (Engine verdict)
    interpretationFacts: {
        overallFlow: string; // e.g. "Early hardship, late success"
        keyDecade: number; // e.g. 40
    };

    // 3. Explanation Hints (Templates for narration)
    explainHints: {
        reasoning: string[]; // e.g. ["Daewoon Chung in 40s", "Yongshin aligned in 50s"]
    };
}

export interface BucketFact {
    decade: number;
    daewoonLabel: string;
    keySewoonYears: number[]; // Years with significant events (Hab/Chung)
    vibe: 'Good' | 'Bad' | 'Neutral'; // Simple signal
    keywords: string[]; // e.g. ["Wealth", "Promotion"]
}

// Guard Function Type
export type NarrativeGenerator = (packet: LifeFlowPacket) => string;
