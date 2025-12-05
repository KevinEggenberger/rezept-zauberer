# Rezept Zauberer 🧙‍♂️

Eine Webanwendung, die aus einer Liste der bei dir zu Hause verfügbaren Zutaten köstliche Rezepte generiert.

## Features

- 🔍 Suche nach Rezepten basierend auf verfügbaren Zutaten
- 🤖 KI-generierte Rezeptideen mit Google Gemini
- 🎨 Modernes, responsives Design mit Tailwind CSS
- ⚡ Schnelle Performance mit Vite

## Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **AI:** Google Gemini API

## Installation

### Voraussetzungen

- Node.js 20+ (mit npm)
- Internet-Verbindung
- Google Gemini API-Key (kostenlos verfügbar)

### Setup

1. Projekt klonen:

```bash
git clone https://github.com/YOUR_USERNAME/rezept-zauberer.git
cd rezept-zauberer
```

2. Dependencies installieren:

```bash
npm install
```

3. `.env` datei erstellen mit deinem Gemini API-Key:

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Dev Server starten:

```bash
npm run dev
```

Die App lädt dann unter `http://localhost:5173/`

## Build & Deploy

Produktions-Build:

```bash
npm run build
```

Preview des Build:

```bash
npm run preview
```

## Lizenz

MIT

## Author

Erstellt für Bewerbungen und Portfolio.
