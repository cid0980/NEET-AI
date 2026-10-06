// Vercel build script - replaces __OR_KEY__ with OPENROUTER_KEY env var
const fs = require('fs');

const key = process.env.OPENROUTER_KEY;
if (!key) {
  console.error('ERROR: OPENROUTER_KEY environment variable not set');
  process.exit(1);
}

// Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace the placeholder
html = html.replace(/__OR_KEY__/g, key);

// Write back to index.html
fs.writeFileSync('index.html', html);

// Copy sw.js
if (fs.existsSync('sw.js')) {
  fs.copyFileSync('sw.js', 'sw.js');
}

console.log('Build complete - key injected');
