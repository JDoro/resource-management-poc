import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, '..', 'dist', 'client');
const assetsDir = path.join(clientDir, 'assets');

// Find the CSS file in the assets directory
let cssFile = '';
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const cssFiles = files.filter(file => file.startsWith('main-') && file.endsWith('.css'));
  if (cssFiles.length > 0) {
    cssFile = `/resource-management-poc/assets/${cssFiles[0]}`;
  }
}

// Function to wrap shell content with HTML structure
function wrapShellWithHTML(shellContent) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Management POC</title>${cssFile ? `
    <link rel="stylesheet" href="${cssFile}" type="text/css">` : ''}
</head>
<body>
    <div id="root">${shellContent}</div>
</body>
</html>`;
}

// Process all HTML files in dist/client and subdirectories
function processHTMLFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory() && entry.name !== 'assets') {
      processHTMLFiles(fullPath);
    } else if (entry.name === 'index.html' || entry.name === '_shell.html') {
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Only process if it doesn't already have DOCTYPE
      if (!content.trim().startsWith('<!DOCTYPE')) {
        const wrappedHTML = wrapShellWithHTML(content);
        fs.writeFileSync(fullPath, wrappedHTML);
        console.log(`Processed: ${path.relative(clientDir, fullPath)}`);
      }
    }
  }
}

processHTMLFiles(clientDir);
console.log('HTML files processed successfully');
