# Card Game Scorer

A sleek, modern Progressive Web Application (PWA) built specifically for scoring traditional card games like **Fish** and **Hajari**. The application keeps track of player scores across multiple rounds, automatic game-ending conditions, and interactive scoreboards for up to 4 players.

## Features

- **Fish Scorer:** Tracks game rounds. A fish game typically ends exactly after 8 rounds. The app automatically computes the highest score to determine the winner.
- **Hajari Scorer:** Tracks accumulated scores until a player reaches the 1000-point win condition. Includes an interactive leaderboard.
- **Progressive Web App (PWA):** Installable directly on your mobile device as a native-like application. Works offline or on poor network connections.
- **Responsive Dark Theme:** Provides a visually rich and immersive dark mode experience by default, optimized for mobile screens.

## Tech Stack

This project is built using modern front-end web technologies for maximum performance and portability:

- **Framework:** [Vue.js 3](https://vuejs.org/) (Composition API / `<script setup>`)
- **UI Component Library:** [Quasar Framework](https://quasar.dev/)
- **Build Tool / CLI:** `@quasar/app-vite` (Quasar native CLI utilizing [Vite](https://vitejs.dev/))
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/)

## Setup & Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
To launch the application in development mode with hot-module replacement (HMR), run:
```bash
npx quasar dev
# OR simply
npm run dev
```
Depending on your network settings, Quasar will start a dev server (usually available at `http://localhost:9000`).

### 3. Build for Production / PWA
To build a highly optimized Progressive Web Application, run:
```bash
npx quasar build -m pwa
```
The compiled, minified production assets will be generated inside the `dist/pwa/` directory.

## Contributing
Feel free to submit issues or pull requests to improve the card game scoring logic or add new game types!
