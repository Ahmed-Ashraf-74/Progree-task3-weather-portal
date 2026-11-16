# 🌦️ AetherCast — Asynchronous REST API Weather Portal

A single-page, adaptive weather intelligence dashboard built with **React**, **Vite**, and **Tailwind CSS** as part of the **Progree Remote Internship Program (Task 3)**.

🔗 **Live Demo:** [View Live Portal](https://progree-task3-weather-portal.vercel.app/)

---

## ✨ Key Features

- **Asynchronous REST API Integration:** Fetches real-time current weather and 5-day/3-hour forecasts from **OpenWeatherMap API** using `fetch` with `async/await` and `Promise.all`.
- **Adaptive Atmospheric Themes:** Automatically switches between **Sunny Day**, **Clear Night**, **Overcast**, and **Rain & Storm** color themes based on live weather conditions and local day/night cycle (with manual preview toggles).
- **Graceful Loading & Error Handling:** Displays loading spinners during network requests and actionable error alerts for invalid city names (`404`), pending API key activations (`401`), or network interruptions.
- **Interactive Telemetry & Data Visualization:** Features a custom **SVG Smooth Temperature Wave Chart**, a dynamic **Wind Direction Compass**, **GPS Geolocation**, `°C / °F` unit conversion, and `localStorage` recent search history.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** OpenWeatherMap REST API (`Current Weather` & `5-Day Forecast`)

---

## 👨‍💻 Author

**Ahmed Ashraf** — Computer Science Student & Frontend / UI-UX Developer

- Internship Track: Frontend Development @ **Progree**
