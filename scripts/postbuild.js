import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shellPath = path.join(__dirname, '..', 'dist', 'client', '_shell.html');
const indexPath = path.join(__dirname, '..', 'dist', 'client', 'index.html');
const assetsDir = path.join(__dirname, '..', 'dist', 'client', 'assets');

const shell = fs.readFileSync(shellPath, 'utf-8');

// Find the CSS file in the assets directory
let cssFile = '';
if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const cssFiles = files.filter(file => file.startsWith('main-') && file.endsWith('.css'));
  if (cssFiles.length > 0) {
    cssFile = `/resource-management-poc/assets/${cssFiles[0]}`;
  }
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Management POC</title>${cssFile ? `
    <link rel="stylesheet" href="${cssFile}" type="text/css">` : ''}
</head>
<body>
    <div id="root">${shell}</div>
</body>
</html>`;

fs.writeFileSync(indexPath, html);
console.log('index.html created successfully');
