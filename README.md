# Weather & Task Planner

A responsive React and TypeScript web application built with Vite and Tailwind CSS that combines live weather lookup with a daily task planner.

## Features

- **Live Weather Lookup:** Search cities to view current weather information powered by the OpenWeather API.
- **Task Planner:** Add and organize daily tasks alongside weather planning in a clean, responsive layout.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **API:** OpenWeather API

## Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/Aisha8094/weather-task-app.git](https://github.com/Aisha8094/weather-task-app.git)
cd weather-task-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

> **Note:** Never commit your `.env` file or expose your API key in source code or Git history.

### 4. Run the Development Server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the application for production
- `npm run preview` — Preview the production build locally
