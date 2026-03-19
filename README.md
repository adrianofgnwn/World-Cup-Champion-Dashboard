# ⚽🏆 FIFA World Cup 2026 Predictor — Interactive Dashboard

An interactive React dashboard that predicts the 2026 FIFA World Cup using Elo-based machine learning models. Simulates 10,000 tournaments, profiles all 48 qualified teams, and lets users explore match predictions and bracket outcomes.

Companion to the [ML prediction pipeline](https://github.com/adrianofgnwn/World-Cup-2026-Predictor).

## Live Demo

🔗 **[View Dashboard →](https://world-cup-champion-dashboard.vercel.app)**

## Key Finding

> **The Big 3 are in a dead heat.** After 10,000 simulated tournaments, Argentina (11.3%), Spain (11.2%), and France (10.4%) are separated by less than 1 percentage point — well within statistical noise. What separates them isn't team quality — it's bracket path and group draw luck.

## Features

### Overview
Landing page with the top 3 predicted favourites (win %, Elo, group), key stat cards, the "dead heat" insight, and dark horse contenders.

### Rankings
All 48 qualified teams ranked by FIFA Elo rating. Interactive team profiles with radar charts overlaid against the World Cup champion DNA benchmark.

### Champion DNA
Historical analysis of what separates World Cup winners from the rest (1974–2022). 6 key metrics with champion vs non-champion comparisons, classification model performance (Logistic Regression, 84.7% ROC-AUC), and feature importance rankings.

### Match Predictor
Pick any two teams to see live win/draw/loss probabilities calculated from their Elo ratings. Includes head-to-head stats comparison and profile bar charts.

### Win Odds
Monte Carlo simulation results from 10,000 tournament runs. Stage-by-stage survival probability charts (R32 → Winner), toggleable team count, and full 48-team win probability rankings.

### Simulator
Interactive tournament bracket with live simulation. Two modes: "Most Likely Outcome" (higher Elo always wins) and "Random Simulation" (probabilistic with upsets). Full group stage → R32 → R16 → QF → SF → Final bracket with round-by-round animation.

## Project Structure

```
src/
├── components/
│   ├── pages/                   # One component per tab
│   │   ├── Overview.jsx
│   │   ├── Rankings.jsx
│   │   ├── ChampionDNA.jsx
│   │   ├── MatchPredictor.jsx
│   │   ├── WinOdds.jsx
│   │   └── Simulator.jsx
│   ├── simulator/               # Bracket simulation submodules
│   │   ├── simulatorUtils.js    # Pure logic (RNG, match sim, group sim)
│   │   ├── simulatorLayout.js   # Geometry constants
│   │   ├── Slot.jsx             # Match card component
│   │   ├── GroupCard.jsx        # Group standings component
│   │   └── Connectors.jsx       # SVG bracket connector lines
│   └── ui/                      # Shared/reusable components
│       ├── Header.jsx
│       ├── StatCard.jsx
│       └── TeamRow.jsx
├── data/
│   └── teams.js                 # Merged team data + Elo predictor function
├── styles/
│   ├── theme.js                 # Design tokens
│   └── App.css                  # Global styles + animations
├── App.jsx                      # Root component + tab routing
└── main.jsx                     # Entry point
```

## Data Pipeline

All data is pre-computed by the ML pipeline and embedded in `teams.js`:

- **Team profiles** — 48 teams with 9 performance metrics from 16 data sources (2023–2026)
- **Simulation results** — Stage-by-stage probabilities from 10,000 Monte Carlo runs
- **Match predictor** — Live Elo formula (`predictMatch()`) for any team pairing
- **Champion benchmarks** — Statistical profiles from 13 World Cups (1974–2022)

## Design

- **Theme:** Deep navy (#0d1829) with red/green accents
- **Typography:** Barlow + Barlow Condensed
- **Effects:** Floating animated orbs, glass-morphism cards
- **Charts:** Recharts (radar, area, bar)

## Getting Started

```bash
git clone https://github.com/adrianofgnwn/World-Cup-Champion-Dashboard.git
cd World-Cup-Champion-Dashboard
npm install
npm run dev
```

## Deployment

```bash
npm i -g vercel
vercel
```

## Tech Stack

- React 18 + Vite
- Recharts for data visualization
- CSS-in-JS with theme tokens
- Deployed on Vercel

## Author

Built as a BSc Computer Science portfolio project.
GitHub: [@adrianofgnwn](https://github.com/adrianofgnwn)