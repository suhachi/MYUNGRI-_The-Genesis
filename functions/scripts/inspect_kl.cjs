const kl = require('kor-lunar');

console.log("Keys:", Object.keys(kl));
console.log("SolarData Sample:", JSON.stringify(kl.SolarData?.slice && kl.SolarData.slice(0, 2), null, 2));
console.log("SolarData Type:", typeof kl.SolarData);
console.log("LunarData Sample:", JSON.stringify(kl.LunarData?.slice && kl.LunarData.slice(0, 2), null, 2));
console.log("LunarData Type:", typeof kl.LunarData);
