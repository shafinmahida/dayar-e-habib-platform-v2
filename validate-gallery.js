const fs = require('fs');
const path = require('path');

// Read app/gallery/page.tsx
const pagePath = path.join(__dirname, 'app', 'gallery', 'page.tsx');
if (!fs.existsSync(pagePath)) {
  console.error(`Error: File not found at ${pagePath}`);
  process.exit(1);
}

const content = fs.readFileSync(pagePath, 'utf8');

// Regular expression to find all src paths starting with /gallery/
const srcRegex = /src:\s*["']([^"']+)["']/g;
let match;
const referencedFiles = [];

while ((match = srcRegex.exec(content)) !== null) {
  const src = match[1];
  if (src.startsWith('/gallery/')) {
    referencedFiles.push(src);
  }
}

console.log(`Found ${referencedFiles.length} referenced media files in gallery page.`);

let missingCount = 0;
const publicDir = path.join(__dirname, 'public');

referencedFiles.forEach((file) => {
  const absolutePath = path.join(publicDir, file.replace('/', path.sep));
  const exists = fs.existsSync(absolutePath);
  if (exists) {
    console.log(`[OK] ${file} exists.`);
  } else {
    console.error(`[MISSING] ${file} NOT found at ${absolutePath}`);
    missingCount++;
  }
});

console.log('--- Summary ---');
console.log(`Total References: ${referencedFiles.length}`);
console.log(`Missing Files: ${missingCount}`);

if (missingCount > 0) {
  process.exit(1);
} else {
  console.log('Validation successful. Zero missing files.');
  process.exit(0);
}
