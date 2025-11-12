import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const shellPath = path.join(__dirname, '..', 'dist', 'client', '_shell.html');
const indexPath = path.join(__dirname, '..', 'dist', 'client', 'index.html');

const shell = fs.readFileSync(shellPath, 'utf-8');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resource Management POC</title>
</head>
<body>
    <div id="root">${shell}</div>
</body>
</html>`;

fs.writeFileSync(indexPath, html);
console.log('index.html created successfully');
