const BASE_URL = "https://api.openweathermap.org/data/2.5";

const DEFAULT_API_KEY = "8219a1b47b5a9424bce110a3ada23240";

const DEMO_CITIES = {
  cairo: {
    name: "Cairo",
    country: "EG",
    isNight: false,
    coord: { lat: 30.0444, lon: 31.2357 },
    temp: 26,
    feels_like: 25,
    temp_min: 19,
    temp_max: 27,
    humidity: 40,
    pressure: 1016,
    visibility: 10000,
    wind_speed: 14,
    wind_deg: 35,
    wind_gust: 21,
    condition: "Clear",
    description: "sunny & clear sky",
    hourly: [
      { time: "Now", temp: 26, condition: "Clear", pop: 0 },
      { time: "15:00", temp: 27, condition: "Clear", pop: 0 },
      { time: "18:00", temp: 23, condition: "Clouds", pop: 5 },
      { time: "21:00", temp: 20, condition: "Clear", pop: 0 },
      { time: "00:00", temp: 18, condition: "Clear", pop: 0 },
      { time: "03:00", temp: 17, condition: "Clear", pop: 0 },
      { time: "06:00", temp: 18, condition: "Clouds", pop: 10 },
    ],
    daily: [
      {
        day: "Today",
        date: "17/11",
        condition: "Clear",
        temp_max: 27,
        temp_min: 17,
      },
      {
        day: "Wed",
        date: "18/11",
        condition: "Clouds",
        temp_max: 25,
        temp_min: 16,
      },
      {
        day: "Thu",
        date: "19/11",
        condition: "Clear",
        temp_max: 28,
        temp_min: 17,
      },
      {
        day: "Fri",
        date: "20/11",
        condition: "Clear",
        temp_max: 29,
        temp_min: 18,
      },
      {
        day: "Sat",
        date: "21/11",
        condition: "Clouds",
        temp_max: 24,
        temp_min: 15,
      },
    ],
  },
  hanoi: {
    name: "Hanoi",
    country: "VN",
    isNight: true,
    coord: { lat: 21.0285, lon: 105.8542 },
    temp: 28,
    feels_like: 30,
    temp_min: 25,
    temp_max: 29,
    humidity: 82,
    pressure: 1009,
    visibility: 9600,
    wind_speed: 11,
    wind_deg: 115,
    wind_gust: 19,
    condition: "Rain",
    description: "moderate rain",
    hourly: [
      { time: "Now", temp: 28, condition: "Rain", pop: 85 },
      { time: "15:00", temp: 28, condition: "Rain", pop: 80 },
      { time: "16:00", temp: 26, condition: "Thunderstorm", pop: 90 },
      { time: "17:00", temp: 29, condition: "Rain", pop: 70 },
      { time: "18:00", temp: 31, condition: "Clouds", pop: 35 },
      { time: "19:00", temp: 28, condition: "Rain", pop: 75 },
      { time: "22:00", temp: 26, condition: "Rain", pop: 60 },
    ],
    daily: [
      {
        day: "Today",
        date: "17/11",
        condition: "Rain",
        temp_max: 29,
        temp_min: 24,
      },
      {
        day: "Wed",
        date: "18/11",
        condition: "Rain",
        temp_max: 28,
        temp_min: 23,
      },
      {
        day: "Thu",
        date: "19/11",
        condition: "Thunderstorm",
        temp_max: 26,
        temp_min: 22,
      },
      {
        day: "Fri",
        date: "20/11",
        condition: "Rain",
        temp_max: 29,
        temp_min: 24,
      },
      {
        day: "Sat",
        date: "21/11",
        condition: "Clouds",
        temp_max: 31,
        temp_min: 25,
      },
    ],
  },
  london: {
    name: "London",
    country: "GB",
    isNight: false,
    coord: { lat: 51.5074, lon: -0.1278 },
    temp: 12,
    feels_like: 10,
    temp_min: 8,
    temp_max: 13,
    humidity: 78,
    pressure: 1004,
    visibility: 8500,
    wind_speed: 22,
    wind_deg: 245,
    wind_gust: 34,
    condition: "Clouds",
    description: "overcast clouds",
    hourly: [
      { time: "Now", temp: 12, condition: "Clouds", pop: 25 },
      { time: "15:00", temp: 13, condition: "Clouds", pop: 30 },
      { time: "18:00", temp: 11, condition: "Rain", pop: 65 },
      { time: "21:00", temp: 10, condition: "Rain", pop: 70 },
      { time: "00:00", temp: 9, condition: "Clouds", pop: 20 },
      { time: "03:00", temp: 8, condition: "Clouds", pop: 15 },
      { time: "06:00", temp: 9, condition: "Clear", pop: 10 },
    ],
    daily: [
      {
        day: "Today",
        date: "17/11",
        condition: "Clouds",
        temp_max: 13,
        temp_min: 8,
      },
      {
        day: "Wed",
        date: "18/11",
        condition: "Rain",
        temp_max: 11,
        temp_min: 7,
      },
      {
        day: "Thu",
        date: "19/11",
        condition: "Clear",
        temp_max: 12,
        temp_min: 6,
      },
      {
        day: "Fri",
        date: "20/11",
        condition: "Clouds",
        temp_max: 14,
        temp_min: 8,
      },
      {
        day: "Sat",
        date: "21/11",
        condition: "Rain",
        temp_max: 10,
        temp_min: 6,
      },
    ],
  },
  tokyo: {
    name: "Tokyo",
    country: "JP",
    isNight: true,
    coord: { lat: 35.6762, lon: 139.6503 },
    temp: 15,
    feels_like: 14,
    temp_min: 11,
    temp_max: 18,
    humidity: 54,
    pressure: 1021,
    visibility: 10000,
    wind_speed: 12,
    wind_deg: 18,
    wind_gust: 18,
    condition: "Clear",
    description: "starlit clear night",
    hourly: [
      { time: "Now", temp: 15, condition: "Clear", pop: 0 },
      { time: "00:00", temp: 14, condition: "Clear", pop: 0 },
      { time: "03:00", temp: 12, condition: "Clear", pop: 5 },
      { time: "06:00", temp: 13, condition: "Clouds", pop: 10 },
      { time: "09:00", temp: 16, condition: "Clear", pop: 0 },
      { time: "12:00", temp: 18, condition: "Clear", pop: 0 },
      { time: "15:00", temp: 17, condition: "Clear", pop: 0 },
    ],
    daily: [
      {
        day: "Today",
        date: "17/11",
        condition: "Clear",
        temp_max: 18,
        temp_min: 11,
      },
      {
        day: "Wed",
        date: "18/11",
        condition: "Clear",
        temp_max: 20,
        temp_min: 12,
      },
      {
        day: "Thu",
        date: "19/11",
        condition: "Clouds",
        temp_max: 18,
        temp_min: 11,
      },
      {
        day: "Fri",
        date: "20/11",
        condition: "Rain",
        temp_max: 15,
        temp_min: 10,
      },
      {
        day: "Sat",
        date: "21/11",
        condition: "Clear",
        temp_max: 18,
        temp_min: 11,
      },
    ],
  },
};

function resolveApiKey(customKey) {
  const candidate = (
    customKey ||
    import.meta.env.VITE_OPENWEATHER_API_KEY ||
    DEFAULT_API_KEY ||
    ""
  ).trim();

  if (
    !candidate ||
    candidate === "YOUR_OPENWEATHER_API_KEY" ||
    candidate === "your_openweathermap_api_key_here"
  ) {
    return "";
  }
  return candidate;
}

function formatTime(unixSeconds, timezoneOffset = 0) {
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const mins = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${mins}`;
}

function normalizeOpenWeatherData(current, forecast) {
  const tz = current.timezone || 0;
  const currentWeather = (current.weather && current.weather[0]) || {};
  const iconCode = currentWeather.icon || "";
  const isNight =
    iconCode.endsWith("n") ||
    current.dt < current.sys.sunrise ||
    current.dt > current.sys.sunset;

  const hourly = forecast.list.slice(0, 7).map((item, idx) => {
    const itemWeather = (item.weather && item.weather[0]) || {};
    return {
      time: idx === 0 ? "Now" : formatTime(item.dt, tz),
      temp: Math.round(item.main.temp),
      condition: itemWeather.main || "Clear",
      pop: Math.round((item.pop || 0) * 100),
    };
  });

  const dailyMap = new Map();
  forecast.list.forEach((item) => {
    const itemWeather = (item.weather && item.weather[0]) || {};
    const d = new Date((item.dt + tz) * 1000);
    const key = `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
    const dayName = d.toLocaleDateString("en-US", {
      weekday: "short",
      timeZone: "UTC",
    });

    if (!dailyMap.has(key)) {
      dailyMap.set(key, {
        day: dailyMap.size === 0 ? "Today" : dayName,
        date: `${String(d.getUTCDate()).padStart(2, "0")}/${String(d.getUTCMonth() + 1).padStart(2, "0")}`,
        condition: itemWeather.main || "Clear",
        temp_max: Math.round(item.main.temp_max),
        temp_min: Math.round(item.main.temp_min),
      });
    } else {
      const existing = dailyMap.get(key);
      existing.temp_max = Math.max(
        existing.temp_max,
        Math.round(item.main.temp_max),
      );
      existing.temp_min = Math.min(
        existing.temp_min,
        Math.round(item.main.temp_min),
      );
    }
  });

  const sysInfo = current.sys || {};
  const windInfo = current.wind || {};
  const windSpeed = windInfo.speed || 0;
  const windGust = windInfo.gust || windSpeed;

  return {
    source: "live",
    name: current.name,
    country: sysInfo.country || "",
    isNight,
    coord: current.coord,
    temp: Math.round(current.main.temp),
    feels_like: Math.round(current.main.feels_like),
    temp_min: Math.round(current.main.temp_min),
    temp_max: Math.round(current.main.temp_max),
    humidity: current.main.humidity,
    pressure: current.main.pressure,
    visibility:
      typeof current.visibility === "number" ? current.visibility : 10000,
    wind_speed: Math.round(windSpeed * 3.6),
    wind_deg: windInfo.deg || 0,
    wind_gust: Math.round(windGust * 3.6),
    condition: currentWeather.main || "Clear",
    description: currentWeather.description || "clear sky",
    sunriseText: formatTime(sysInfo.sunrise, tz),
    sunsetText: formatTime(sysInfo.sunset, tz),
    hourly,
    daily: Array.from(dailyMap.values()).slice(0, 5),
  };
}

export async function fetchWeatherByCity(cityQuery, apiKey) {
  const trimmedCity = cityQuery.trim();
  if (!trimmedCity) {
    throw new Error("Please enter a valid city name.");
  }

  const key = resolveApiKey(apiKey);

  if (key) {
    const encoded = encodeURIComponent(trimmedCity);
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${encoded}&units=metric&appid=${key}`),
      fetch(`${BASE_URL}/forecast?q=${encoded}&units=metric&appid=${key}`),
    ]);

    if (currentRes.status === 404) {
      throw new Error(
        `City "${trimmedCity}" was not found. Check spelling and try again.`,
      );
    }

    if (currentRes.status === 401) {
      const fallback = DEMO_CITIES[trimmedCity.toLowerCase()];
      if (fallback) {
        return {
          ...fallback,
          source: "demo-fallback",
          warning:
            "API key is still activating on OpenWeather servers (takes up to 2h). Showing calibrated preview.",
          sunriseText: "06:23",
          sunsetText: "17:01",
        };
      }
      throw new Error(
        "OpenWeather API key is pending activation (401). Try Cairo, Hanoi, London, or Tokyo meanwhile.",
      );
    }

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error(
        `Weather service error (${currentRes.status}). Please try again shortly.`,
      );
    }

    const [currentData, forecastData] = await Promise.all([
      currentRes.json(),
      forecastRes.json(),
    ]);

    return normalizeOpenWeatherData(currentData, forecastData);
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const preset = DEMO_CITIES[trimmedCity.toLowerCase()];
  if (preset) {
    return {
      ...preset,
      source: "demo",
      warning:
        "Preview Mode active. Configure your OpenWeather API key to query any city worldwide.",
      sunriseText: "06:23",
      sunsetText: "17:01",
    };
  }

  throw new Error(
    `City "${trimmedCity}" requires a live OpenWeather API key. Try Cairo, Hanoi, London, or Tokyo.`,
  );
}

export async function fetchWeatherByCoords(lat, lon, apiKey) {
  const key = resolveApiKey(apiKey);

  if (!key) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return {
      ...DEMO_CITIES.cairo,
      name: "Giza / Cairo",
      source: "demo",
      warning: "Location detected! Showing regional preview.",
      sunriseText: "06:24",
      sunsetText: "17:02",
    };
  }

  const [currentRes, forecastRes] = await Promise.all([
    fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`,
    ),
    fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`,
    ),
  ]);

  if (!currentRes.ok || !forecastRes.ok) {
    throw new Error(
      "Unable to fetch weather for your current GPS coordinates.",
    );
  }

  const [currentData, forecastData] = await Promise.all([
    currentRes.json(),
    forecastRes.json(),
  ]);

  return normalizeOpenWeatherData(currentData, forecastData);
}
