# Vite Test App - Benutzerliste

Eine React-App zum Anzeigen und Durchsuchen von Benutzerdaten.

## Features

- 📋 Benutzerliste von JSONPlaceholder API
- 🔍 Echtzeit-Suche nach Namen
- 🌗 Dark/Light Mode Support
- ⚡ Gebaut mit Vite + React 19

## Installation & Start

### Option 1: Standalone (Empfohlen)

**Voraussetzung:** Nur Node.js (keine npm install nötig!)

```bash
# Release von GitHub herunterladen und entpacken
unzip vite-test1-v1.0.0.zip
cd vite-test1

# Server starten (nutzt nur Node.js Built-ins)
node server.cjs
```

Öffne im Browser: **http://localhost:3000**

### Option 2: Development

```bash
# Dependencies installieren
npm install

# Development Server
npm run dev

# Production Build
npm run build

# Production Preview
npm run preview
```

## Deployment

### Webserver (Apache/Nginx)

Kopiere den Inhalt des `dist/` Ordners auf deinen Webserver.

### Mit Node.js Server

```bash
# Umgebungsvariable für Port (optional)
PORT=8080 node server.cjs
```

## Technologie-Stack

- **React 19.2** - UI Framework
- **Vite 7.2** - Build Tool
- **Node.js** - Runtime für Server

## Lizenz

MIT
