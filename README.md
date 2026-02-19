v# Connections TR

A Turkish adaptation of the NYT Connections word puzzle game built with React + Vite.

## Core Features

- **Daily Puzzle**: A 4×4 grid of 16 words fetched from the backend, where players group words into 4 hidden categories
- **Category Matching**: Select 4 words and submit — correct guesses reveal the category with a color-coded difficulty (yellow → purple)
- **"One Away" Hint**: A toast notification warns you when 3 of your 4 selected words belong to the same category
- **4 Lives System**: Visual dot indicators track remaining attempts before game over
- **Animations**: Shake on wrong guesses, slide-down reveal on correct ones

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Separate Django REST API (not included in this repo) serving daily puzzles and validating guesses - [connections_tr_backend](https://github.com/ned1mefe/connections_tr)

## Status

⚠️ **Not deployed.** I couldn't find a maintainer who would come up with a new puzzle for each day, so this remains a local/demo project.

## Getting Started

```
git clone https://github.com/ned1mefe/connections-tr-front
cd connections-tr-front
npm i
npm run dev
```

Make sure the Django backend is running at `http://127.0.0.1:8000` with `/daily/` and `/check/` endpoints available.
