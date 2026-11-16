import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Navigation,
  Droplets,
  Eye,
  Wind,
  Thermometer,
  Gauge,
  Sunrise,
  Sunset,
  CloudRain,
  Sun,
  Cloud,
  CloudLightning,
  Moon,
  AlertCircle,
  Loader2,
  KeyRound,
  Sparkles,
  Calendar,
  Clock,
} from "lucide-react";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
} from "./services/weatherApi";
import TemperatureWaveChart from "./components/TemperatureWaveChart";

const QUICK_CITIES = ["Cairo", "Hanoi", "London", "Tokyo"];

// Adaptive Themes for Day, Night, Cloudy, and Rainy Conditions
const WEATHER_THEMES = {
  day: {
    id: "day",
    label: "Sunny Day",
    isLight: true,
    accentHex: "#2563eb",
    pageBg: "from-sky-200 via-blue-100 to-indigo-100 text-slate-900",
    shell:
      "bg-white/85 border-white/80 shadow-[0_25px_70px_rgba(37,99,235,0.16)]",
    topBar: "border-slate-200/80 bg-sky-50/70",
    heroCard:
      "from-sky-500 via-blue-500 to-blue-600 text-white border-sky-400/40",
    heroSubCard: "bg-white/15 border-white/25 text-white",
    moduleCard: "bg-white/90 border-slate-200/80 text-slate-900",
    miniSlot: "bg-sky-50/80 border-sky-100 text-slate-800",
    miniSlotActive:
      "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20",
    mutedText: "text-slate-500",
    divider: "border-slate-200/80",
    pillBg:
      "bg-slate-900/5 hover:bg-slate-900/10 border-slate-300/70 text-slate-700",
  },
  night: {
    id: "night",
    label: "Clear Night",
    isLight: false,
    accentHex: "#818cf8",
    pageBg: "from-[#070913] via-[#0c1024] to-[#05070e] text-slate-100",
    shell:
      "bg-[#0e1224]/88 border-indigo-400/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)]",
    topBar: "border-indigo-300/10 bg-indigo-950/30",
    heroCard:
      "from-[#171d3b] via-[#11162e] to-[#0b0e1f] text-white border-indigo-400/20",
    heroSubCard: "bg-black/35 border-indigo-300/10 text-slate-100",
    moduleCard: "bg-[#12162b]/90 border-indigo-300/12 text-slate-100",
    miniSlot: "bg-black/30 border-indigo-300/10 text-slate-200",
    miniSlotActive: "bg-indigo-500/25 border-indigo-400/50 text-white",
    mutedText: "text-slate-400",
    divider: "border-indigo-300/10",
    pillBg: "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300",
  },
  cloudy: {
    id: "cloudy",
    label: "Overcast",
    isLight: false,
    accentHex: "#94a3b8",
    pageBg: "from-[#1c2026] via-[#15181e] to-[#0f1115] text-slate-100",
    shell:
      "bg-[#181b21]/90 border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.65)]",
    topBar: "border-white/10 bg-white/[0.02]",
    heroCard:
      "from-[#282d37] via-[#1f232b] to-[#171a20] text-white border-white/15",
    heroSubCard: "bg-black/30 border-white/10 text-slate-100",
    moduleCard: "bg-[#1e222a]/90 border-white/10 text-slate-100",
    miniSlot: "bg-black/25 border-white/8 text-slate-200",
    miniSlotActive: "bg-white/15 border-white/30 text-white",
    mutedText: "text-slate-400",
    divider: "border-white/10",
    pillBg: "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300",
  },
  rainy: {
    id: "rainy",
    label: "Rain & Storm",
    isLight: false,
    accentHex: "#38bdf8",
    pageBg: "from-[#0b1320] via-[#0e192b] to-[#070b12] text-slate-100",
    shell:
      "bg-[#101724]/90 border-sky-400/15 shadow-[0_25px_80px_rgba(2,132,199,0.22)]",
    topBar: "border-sky-400/10 bg-sky-950/25",
    heroCard:
      "from-[#16273d] via-[#111d2e] to-[#0c1420] text-white border-sky-400/20",
    heroSubCard: "bg-black/35 border-sky-300/10 text-slate-100",
    moduleCard: "bg-[#131c2b]/90 border-sky-400/12 text-slate-100",
    miniSlot: "bg-black/30 border-sky-300/10 text-slate-200",
    miniSlotActive: "bg-sky-500/20 border-sky-400/50 text-white",
    mutedText: "text-slate-400",
    divider: "border-sky-300/10",
    pillBg: "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300",
  },
};

function detectWeatherTheme(weather) {
  if (!weather) return WEATHER_THEMES.day;

  const cond = (weather.condition || "").toLowerCase();
  const desc = (weather.description || "").toLowerCase();

  // 1. Rain, Drizzle, or Thunderstorm
  if (
    cond.includes("rain") ||
    cond.includes("drizzle") ||
    cond.includes("thunder") ||
    cond.includes("storm")
  ) {
    return WEATHER_THEMES.rainy;
  }

  // 2. Heavy Overcast / Fog / Mist (exclude "few clouds" & "scattered clouds" so sunny days stay bright)
  if (
    desc.includes("overcast") ||
    desc.includes("broken clouds") ||
    cond.includes("mist") ||
    cond.includes("fog") ||
    cond.includes("haze") ||
    cond.includes("dust") ||
    cond.includes("sand")
  ) {
    return WEATHER_THEMES.cloudy;
  }

  // 3. Nighttime (based on OpenWeather icon ending in 'n' or sunset/sunrise)
  if (weather.isNight) {
    return WEATHER_THEMES.night;
  }

  // 4. Default Daytime (Clear / Sunny / Few Clouds)
  return WEATHER_THEMES.day;
}

function WeatherConditionIcon({
  condition,
  isNight = false,
  className = "w-6 h-6",
}) {
  const normalized = (condition || "").toLowerCase();
  if (normalized.includes("thunder")) {
    return <CloudLightning className={`${className} text-amber-400`} />;
  }
  if (normalized.includes("rain") || normalized.includes("drizzle")) {
    return <CloudRain className={`${className} text-sky-400`} />;
  }
  if (normalized.includes("cloud")) {
    return <Cloud className={`${className} text-slate-300`} />;
  }
  if (isNight) {
    return <Moon className={`${className} text-indigo-300`} />;
  }
  return <Sun className={`${className} text-amber-400`} />;
}

export default function App() {
  const [cityInput, setCityInput] = useState("Cairo");
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("owm_api_key") || "",
  );
  const [showKeyModal, setShowKeyModal] = useState(false);

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C");
  const [themeOverride, setThemeOverride] = useState("auto"); // 'auto' | 'day' | 'night' | 'cloudy' | 'rainy'

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("recent_weather_cities")) || [
          "Cairo",
          "Hanoi",
          "London",
          "Tokyo",
        ]
      );
    } catch {
      return ["Cairo", "Hanoi", "London", "Tokyo"];
    }
  });

  const activeTheme =
    themeOverride === "auto"
      ? detectWeatherTheme(weather)
      : WEATHER_THEMES[themeOverride];

  const convertTemp = (celsius) => {
    if (unit === "F") return Math.round((celsius * 9) / 5 + 32);
    return Math.round(celsius);
  };

  const loadCityWeather = async (targetCity, customKey = apiKey) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherByCity(targetCity, customKey);
      setWeather(data);
      setCityInput(data.name);
      setThemeOverride("auto");

      setRecentSearches((prev) => {
        const updated = [
          data.name,
          ...prev.filter((c) => c.toLowerCase() !== data.name.toLowerCase()),
        ].slice(0, 5);
        localStorage.setItem("recent_weather_cities", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.message || "Failed to retrieve weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
            apiKey,
          );
          setWeather(data);
          setCityInput(data.name);
        } catch (err) {
          setError(err.message || "Could not load location weather.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission denied. Search any city manually above.");
      },
    );
  };

  useEffect(() => {
    loadCityWeather("Cairo");
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loadCityWeather(cityInput);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem("owm_api_key", apiKey.trim());
    setShowKeyModal(false);
    loadCityWeather(cityInput || "Cairo", apiKey.trim());
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${activeTheme.pageBg} p-4 sm:p-6 lg:p-10 transition-colors duration-700`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-[28px] ${activeTheme.shell} backdrop-blur-2xl border overflow-hidden transition-all duration-700`}
      >
        {/* Top Utility & Adaptive Theme Bar */}
        <header
          className={`px-5 sm:px-8 py-4 border-b ${activeTheme.topBar} flex flex-wrap items-center justify-between gap-4 transition-colors duration-500`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="font-semibold tracking-tight text-base">
                AetherCast
              </span>
              <span
                className={`hidden md:inline-block ml-2.5 text-xs font-mono-tech ${activeTheme.mutedText}`}
              >
                // THEME: {activeTheme.label.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Theme Mode Switcher (Auto + 4 Atmospheric Presets) */}
            <div
              className={`hidden sm:flex items-center rounded-full p-1 text-[11px] font-mono-tech border ${activeTheme.pillBg}`}
            >
              {[
                { key: "auto", label: "AUTO" },
                { key: "day", label: "DAY" },
                { key: "night", label: "NIGHT" },
                { key: "cloudy", label: "CLOUD" },
                { key: "rainy", label: "RAIN" },
              ].map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setThemeOverride(t.key)}
                  className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                    themeOverride === t.key
                      ? "bg-sky-500 text-slate-950 font-semibold"
                      : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Unit Switcher (°C / °F) */}
            <div
              className={`flex items-center rounded-full p-1 text-xs font-mono-tech border ${activeTheme.pillBg}`}
            >
              <button
                type="button"
                onClick={() => setUnit("C")}
                className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                  unit === "C"
                    ? "bg-sky-500 text-slate-950 font-semibold"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => setUnit("F")}
                className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                  unit === "F"
                    ? "bg-sky-500 text-slate-950 font-semibold"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                °F
              </button>
            </div>

            {/* API Key Config Button */}
            <button
              type="button"
              onClick={() => setShowKeyModal((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech border transition cursor-pointer ${activeTheme.pillBg}`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>{apiKey ? "KEY SAVED" : "API KEY"}</span>
            </button>
          </div>
        </header>

        {/* Collapsible API Key Bar */}
        {showKeyModal && (
          <form
            onSubmit={handleSaveApiKey}
            className="px-5 sm:px-8 py-3.5 bg-sky-500/10 border-b border-sky-500/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
          >
            <div className="text-xs">
              Paste your{" "}
              <strong className="text-sky-500">OpenWeather API Key</strong> to
              override or test live global weather:
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Paste OpenWeather API Key..."
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-white/15 text-xs font-mono-tech text-white focus:outline-none focus:border-sky-400 w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs transition cursor-pointer shrink-0"
              >
                Save Key
              </button>
            </div>
          </form>
        )}

        {/* Preview Notice Banner */}
        {weather?.warning && !error && (
          <div className="px-5 sm:px-8 py-2.5 bg-amber-500/15 border-b border-amber-500/25 flex items-center justify-between gap-2 text-xs">
            <span>{weather.warning}</span>
            <div className="hidden md:flex items-center gap-1.5 shrink-0">
              {QUICK_CITIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => loadCityWeather(c)}
                  className="px-2.5 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 font-mono-tech transition cursor-pointer"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mx-5 sm:mx-8 mt-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-3 text-rose-500">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="text-sm flex-1">
              <p className="font-semibold">Unable to Fetch Weather Data</p>
              <p className="opacity-85 mt-0.5">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => loadCityWeather("Cairo")}
              className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-xs font-mono-tech transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        )}

        {/* Main Split Bento Dashboard Grid */}
        <main className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Atmospheric Hero Card */}
          <section
            className={`lg:col-span-5 rounded-3xl bg-gradient-to-b ${activeTheme.heroCard} border p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-700`}
          >
            <div className="relative z-10">
              {/* Search Bar & GPS Location */}
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-white/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Search city (Cairo, Hanoi, London, Tokyo)..."
                    aria-label="Search city"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-black/25 border border-white/20 text-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Search"
                  className="p-2.5 rounded-full bg-white text-slate-950 hover:bg-sky-100 disabled:opacity-50 transition cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleGeolocation}
                  disabled={loading}
                  title="Use My Current Location"
                  aria-label="Use current location"
                  className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white transition cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                </button>
              </form>

              {/* Recent Search Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {recentSearches.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => loadCityWeather(city)}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech bg-white/15 hover:bg-white/25 text-white border border-white/15 transition cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Giant Temperature & Condition Display */}
              {loading && !weather ? (
                <div className="py-20 flex flex-col items-center justify-center text-white/80 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-mono-tech tracking-wider">
                    FETCHING TELEMETRY...
                  </span>
                </div>
              ) : (
                weather && (
                  <div className="my-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/20 border border-white/20 text-xs text-white mb-3">
                      <WeatherConditionIcon
                        condition={weather.condition}
                        isNight={weather.isNight}
                        className="w-4 h-4"
                      />
                      <span>
                        {weather.name}, {weather.country}
                      </span>
                    </div>

                    <div className="text-7xl sm:text-8xl font-light tracking-tighter text-white leading-none">
                      {convertTemp(weather.temp)}°
                    </div>

                    <h1 className="text-2xl font-normal text-white mt-3 capitalize">
                      {weather.description}
                    </h1>

                    <p className="text-xs text-white/80 max-w-xs mx-auto mt-2.5 leading-relaxed">
                      High of {convertTemp(weather.temp_max)}° and low of{" "}
                      {convertTemp(weather.temp_min)}° expected today.
                    </p>
                  </div>
                )
              )}
            </div>

            {/* 2x2 Sub-Metrics Grid inside Left Card */}
            {weather && (
              <div className="relative z-10 grid grid-cols-2 gap-3">
                <div
                  className={`rounded-2xl ${activeTheme.heroSubCard} border p-4 backdrop-blur-md`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-tech opacity-80 uppercase">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>FEELS LIKE</span>
                  </div>
                  <div className="text-2xl font-medium mt-1.5">
                    {convertTemp(weather.feels_like)}°
                  </div>
                  <p className="text-[11px] opacity-75 mt-1">
                    {weather.feels_like > weather.temp
                      ? "Humidity makes it feel warmer"
                      : "Aligned with actual air temp"}
                  </p>
                </div>

                <div
                  className={`rounded-2xl ${activeTheme.heroSubCard} border p-4 backdrop-blur-md`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-tech opacity-80 uppercase">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>HUMIDITY</span>
                  </div>
                  <div className="text-2xl font-medium mt-1.5">
                    {weather.humidity}%
                  </div>
                  <p className="text-[11px] opacity-75 mt-1">
                    {weather.humidity > 70
                      ? "High moisture level"
                      : "Comfortable air balance"}
                  </p>
                </div>

                <div
                  className={`rounded-2xl ${activeTheme.heroSubCard} border p-4 backdrop-blur-md`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-tech opacity-80 uppercase">
                    <Eye className="w-3.5 h-3.5" />
                    <span>VISIBILITY</span>
                  </div>
                  <div className="text-2xl font-medium mt-1.5">
                    {(weather.visibility / 1000).toFixed(1)} km
                  </div>
                  <p className="text-[11px] opacity-75 mt-1">
                    Clear optical horizon
                  </p>
                </div>

                <div
                  className={`rounded-2xl ${activeTheme.heroSubCard} border p-4 backdrop-blur-md`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-mono-tech opacity-80 uppercase">
                    <Gauge className="w-3.5 h-3.5" />
                    <span>PRESSURE</span>
                  </div>
                  <div className="text-2xl font-medium mt-1.5">
                    {weather.pressure} hPa
                  </div>
                  <p className="text-[11px] opacity-75 mt-1">
                    Barometric sea-level
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT COLUMN: Forecast & Telemetry Bento Modules */}
          <section className="lg:col-span-7 flex flex-col gap-5">
            {/* Module 1: Hourly Forecast + Smooth SVG Wave Chart */}
            <div
              className={`rounded-3xl ${activeTheme.moduleCard} border p-5 sm:p-6 transition-colors duration-500`}
            >
              <div
                className={`flex items-center justify-between pb-3 border-b ${activeTheme.divider}`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-mono-tech ${activeTheme.mutedText} uppercase tracking-wider`}
                >
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span>HOURLY TEMPERATURE TRAJECTORY</span>
                </div>
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                )}
              </div>

              {weather && (
                <>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-4">
                    {weather.hourly.map((slot, i) => (
                      <div
                        key={slot.time + i}
                        className={`rounded-2xl p-2.5 text-center border transition ${
                          i === 0
                            ? activeTheme.miniSlotActive
                            : activeTheme.miniSlot
                        }`}
                      >
                        <div className="text-[11px] font-mono-tech opacity-80">
                          {slot.time}
                        </div>
                        <div className="my-2 flex justify-center">
                          <WeatherConditionIcon
                            condition={slot.condition}
                            isNight={weather.isNight}
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="text-sm font-semibold">
                          {convertTemp(slot.temp)}°
                        </div>
                      </div>
                    ))}
                  </div>

                  <TemperatureWaveChart
                    hourly={weather.hourly}
                    convertTemp={convertTemp}
                    isLightTheme={activeTheme.isLight}
                    accentHex={activeTheme.accentHex}
                  />
                </>
              )}
            </div>

            {/* Module 2: 5-Day Forecast Matrix */}
            <div
              className={`rounded-3xl ${activeTheme.moduleCard} border p-5 sm:p-6 transition-colors duration-500`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-mono-tech ${activeTheme.mutedText} uppercase tracking-wider pb-3 border-b ${activeTheme.divider}`}
              >
                <Calendar className="w-3.5 h-3.5 text-sky-500" />
                <span>5-DAY OUTLOOK MATRIX</span>
              </div>

              {weather && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4">
                  {weather.daily.map((day, i) => (
                    <div
                      key={day.date + i}
                      className={`rounded-2xl p-3.5 border flex flex-col items-center text-center transition ${
                        i === 0
                          ? activeTheme.miniSlotActive
                          : activeTheme.miniSlot
                      }`}
                    >
                      <span className="text-xs font-semibold">{day.day}</span>
                      <span className="text-[11px] font-mono-tech opacity-70 mt-0.5">
                        {day.date}
                      </span>
                      <div className="my-3">
                        <WeatherConditionIcon
                          condition={day.condition}
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-sm font-semibold">
                        {convertTemp(day.temp_max)}°{" "}
                        <span className="text-xs font-normal opacity-75">
                          / {convertTemp(day.temp_min)}°
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Module 3: Solar Cycle & Wind Compass */}
            {weather && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div
                  className={`rounded-3xl ${activeTheme.moduleCard} border p-5 flex flex-col justify-between transition-colors duration-500`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-mono-tech ${activeTheme.mutedText} uppercase`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>SOLAR CYCLE & SPECTRUM</span>
                  </div>

                  <div className="my-5">
                    <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 relative">
                      <span
                        className="w-4 h-4 rounded-full bg-white border-2 border-slate-900 absolute top-1/2 -translate-y-1/2 shadow"
                        style={{
                          left: `${Math.min(Math.max((weather.temp / 45) * 100, 10), 90)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={`grid grid-cols-2 gap-3 pt-2 border-t ${activeTheme.divider} text-xs`}
                  >
                    <div className="flex items-center gap-2">
                      <Sunrise className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className={`${activeTheme.mutedText} text-[11px]`}>
                          Sunrise
                        </div>
                        <div className="font-mono-tech font-medium">
                          {weather.sunriseText}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sunset className="w-4 h-4 text-orange-500" />
                      <div>
                        <div className={`${activeTheme.mutedText} text-[11px]`}>
                          Sunset
                        </div>
                        <div className="font-mono-tech font-medium">
                          {weather.sunsetText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-3xl ${activeTheme.moduleCard} border p-5 flex items-center justify-between gap-4 transition-colors duration-500`}
                >
                  <div className="flex-1">
                    <div
                      className={`flex items-center gap-2 text-xs font-mono-tech ${activeTheme.mutedText} uppercase mb-3`}
                    >
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <span>WIND TELEMETRY</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold">
                        {weather.wind_speed}
                      </span>
                      <span
                        className={`text-xs font-mono-tech ${activeTheme.mutedText}`}
                      >
                        KM/H WIND
                      </span>
                    </div>

                    <div
                      className={`h-px my-2.5 border-t ${activeTheme.divider}`}
                    />

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-medium">
                        {weather.wind_gust}
                      </span>
                      <span
                        className={`text-xs font-mono-tech ${activeTheme.mutedText}`}
                      >
                        KM/H GUSTS
                      </span>
                    </div>
                  </div>

                  <div className="w-24 h-24 rounded-full border border-slate-400/30 bg-slate-900/15 relative flex items-center justify-center shrink-0">
                    <span className="absolute top-1.5 text-[9px] font-mono-tech opacity-70">
                      N
                    </span>
                    <span className="absolute bottom-1.5 text-[9px] font-mono-tech opacity-70">
                      S
                    </span>
                    <span className="absolute left-2 text-[9px] font-mono-tech opacity-70">
                      W
                    </span>
                    <span className="absolute right-2 text-[9px] font-mono-tech opacity-70">
                      E
                    </span>
                    <div
                      className="w-14 h-0.5 bg-gradient-to-r from-slate-400 via-sky-400 to-sky-500 relative transition-transform duration-500"
                      style={{
                        transform: `rotate(${weather.wind_deg - 90}deg)`,
                      }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500 absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-slate-800 border border-white/60 z-10" />
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
