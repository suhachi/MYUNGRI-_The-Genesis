import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator, collection, getDocs } from "firebase/firestore";

/**
 * Phase 3-C: Real Calculation Hardening Verification Script
 * 1. 윤달 월건 UNKNOWN 처리 검증
 * 2. 지원 연도 범위 (1890~2050) 외 차단 검증
 * 3. 한자 간지 정규화 검증
 */

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || "myungri-genesis",
};

if (!firebaseConfig.apiKey) {
    console.error("❌ Error: VITE_FIREBASE_API_KEY is missing in environment variables.");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'asia-northeast3');
const db = getFirestore(app);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

async function runVerification() {
    console.log("\n🧪 Starting Phase 3-C Hardening Verification...");

    const generateReport = httpsCallable(functions, 'generateReport');

    // Case 1: Leap Month (Expect wolgeon="" -> UNKNOWN pillar)
    console.log("\n1. Testing Leap Month (2023-05-15 lunar leap -> Expect UNKNOWN Month)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-05-15",
            sex: "female",
            calendar: "lunar",
            isLeapMonth: true,
            timeUnknown: true
        });
        const calc = res.data.calculation;
        console.log("✅ SUCCESS:", res.data.reportId);
        console.log("   - Month Pillar:", calc.pillars.month.label); // Expect UNKNOWN
        console.log("   - Day Pillar (Hanja):", calc.pillars.day.label); // Expect Hanja
        console.log("   - Warning:", calc.warnings[0]);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message, "| Details:", error.details);
    }

    // Case 2: Year Range (Expect Reject 1850)
    console.log("\n2. Testing Out-of-Range Year (1850 -> Expect Error)...");
    try {
        await generateReport({
            birthDate: "1850-01-01",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Should have been rejected.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Case 3: Year Range (Expect Reject 2080)
    console.log("\n3. Testing Out-of-Range Year (2080 -> Expect Error)...");
    try {
        await generateReport({
            birthDate: "2080-12-31",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Should have been rejected.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Case 4: Hanja Ganji Normalization Check
    console.log("\n4. Testing Hanja Normalization (2023-01-01 solar)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-01-01",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        const calc = res.data.calculation;
        console.log("✅ SUCCESS:", res.data.reportId);
        console.log("   - Year Pillar (Hanja):", calc.pillars.year.label);
        // 2023 is 壬寅 (임인) or 癸卯 (계묘) depending on solar date.
        // Let's check if it's Hanja.
        const isHanja = /[\u4e00-\u9fa5]/.test(calc.pillars.year.label);
        console.log("   - Is Hanja?:", isHanja);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message);
    }

    console.log("\n✨ Hardening Verification Completed.\n");
}

runVerification();
