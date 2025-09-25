// scripts/copy-200.js
const fs = require("fs");
const path = require("path");

const buildDir = fs.existsSync("dist") ? "dist" : "build";
const index = path.join(buildDir, "index.html");
const fallback = path.join(buildDir, "200.html");

try {
  if (fs.existsSync(index)) {
    fs.copyFileSync(index, fallback);
    console.log(`Copied ${index} -> ${fallback}`);
  } else {
    console.warn(`index.html not found in ${buildDir}. Did the build fail?`);
  }
} catch (err) {
  console.error("Failed to copy index.html to 200.html:", err);
  process.exit(1);
}
