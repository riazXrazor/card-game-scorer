# Card Game Scorer

A sleek, modern Progressive Web Application (PWA) built specifically for scoring traditional card games like **Fish** and **Hajari**. The application keeps track of player scores across multiple rounds, automatic game-ending conditions, and interactive scoreboards for up to 4 players.

## Features

- **Fish Scorer:** Tracks game rounds. A fish game typically ends exactly after 8 rounds. The app automatically computes the highest score to determine the winner.
- **Hajari Scorer:** Tracks accumulated scores until a player reaches the 1000-point win condition. Includes an interactive leaderboard.
- **Progressive Web App (PWA):** Installable directly on your mobile device as a native-like application. 
- **True Offline Support:** Fully integrated Service Workers and `Workbox` strategies ensure the app continues to operate flawlessly even strictly offline (such as in Airplane mode) across both Android and iOS devices.
- **Cross-Platform Installability:** 
  - **Android / Desktop:** Features a custom in-app `beforeinstallprompt` installation banner.
  - **iOS Safari / WebKit:** Features precise user-agent detection to guide iPhones/iPads through Apple’s strict manual "Add to Home Screen" Share processes.
- **Responsive Dark Theme:** Provides a visually rich and immersive dark mode experience by default, optimized for mobile screens.

## Tech Stack

This project is built using modern front-end web technologies for maximum performance, installability, and portability:

- **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API / `<script setup>`)
- **App Framework & CLI:** [Quasar Framework (v2)](https://quasar.dev/) natively powered by `@quasar/app-vite`
- **Compiler / Bundler:** [Vite](https://vitejs.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **PWA Service Worker:** Google [Workbox](https://developer.chrome.com/docs/workbox/) (`GenerateSW` mode with explicit offline fallbacks)
- **Deployment & Hosting:** Optimized exclusively for **Cloudflare Pages** serving `dist/pwa/`

## Setup & Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
To launch the application in development mode with hot-module replacement (HMR) and live PWA testing, run:
```bash
npm run dev
```
Depending on your network settings, Quasar will start a dev server (usually available at `http://localhost:9200`).

### 3. Build for Production / PWA
To build a highly optimized Progressive Web Application, run:
```bash
npm run build
```
The compiled, minified production assets, web manifest, and offline service worker will be exclusively generated inside the `dist/pwa/` directory. Check your hosting provider (such as Cloudflare Pages) to map the publishing output directory to `/dist/pwa`.

## Contributing
Feel free to submit issues or pull requests to improve the card game scoring logic or add new game types!
