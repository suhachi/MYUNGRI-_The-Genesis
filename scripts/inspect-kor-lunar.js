const kl = require('kor-lunar');

console.log("Inspecting kor-lunar output:");
try {
    const lunar = kl.toLunar(2024, 2, 4); // Li Chun (Ibchun) is around Feb 4
    console.log("2024-02-04 (Ibchun?):", JSON.stringify(lunar, null, 2));

    const solar = kl.toSolar(2024, 1, 1, false);
    console.log("Lunar 2024-01-01:", JSON.stringify(solar, null, 2));
} catch (e) {
    console.error(e);
}
