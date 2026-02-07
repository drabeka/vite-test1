#!/usr/bin/env node

/**
 * Standalone Static File Server
 * Keine Dependencies benötigt - nutzt nur Node.js Built-ins
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

  // Verhindere Directory Traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // 404 - Datei nicht gefunden, versuche index.html (für SPA Routing)
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Server läuft auf http://localhost:${PORT}`);
  console.log(`📁 Serviert Dateien aus: ${DIST_DIR}\n`);
  console.log('Drücke Ctrl+C zum Beenden\n');
});
