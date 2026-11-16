import React from "react";

export default function TemperatureWaveChart({
  hourly,
  convertTemp,
  isLightTheme = false,
  accentHex = "#38bdf8",
}) {
  if (!hourly || hourly.length === 0) return null;

  const temps = hourly.map((h) => convertTemp(h.temp));
  const minTemp = Math.min(...temps) - 2;
  const maxTemp = Math.max(...temps) + 2;
  const range = Math.max(maxTemp - minTemp, 1);

  const width = 680;
  const height = 110;
  const padX = 36;
  const padY = 26;

  const points = hourly.map((item, idx) => {
    const x =
      padX + (idx * (width - padX * 2)) / Math.max(hourly.length - 1, 1);
    const val = convertTemp(item.temp);
    const normalized = (val - minTemp) / range;
    const y = height - padY - normalized * (height - padY * 2);
    return { x, y, val, time: item.time };
  });

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX = (curr.x + next.x) / 2;
    pathD += ` C ${cpX} ${curr.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div className="w-full overflow-x-auto no-scrollbar pt-2">
      <div className="min-w-[540px]">
        <svg
          viewBox={`0 0 ${width} ${height + 28}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="tempWaveFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accentHex} stopOpacity="0.32" />
              <stop offset="100%" stopColor={accentHex} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={areaD} fill="url(#tempWaveFill)" />

          <path
            d={pathD}
            fill="none"
            stroke={
              isLightTheme ? "rgba(15,23,42,0.35)" : "rgba(255,255,255,0.45)"
            }
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {points.map((pt, index) => (
            <g key={pt.time + index}>
              <line
                x1={pt.x}
                y1={pt.y + 8}
                x2={pt.x}
                y2={height}
                stroke={
                  isLightTheme
                    ? "rgba(15,23,42,0.12)"
                    : "rgba(255,255,255,0.08)"
                }
                strokeDasharray="2 3"
              />

              <text
                x={pt.x}
                y={pt.y - 12}
                textAnchor="middle"
                fill={isLightTheme ? "#0f172a" : "#f8fafc"}
                fontSize="13"
                fontWeight="600"
              >
                {pt.val}°
              </text>

              <circle
                cx={pt.x}
                cy={pt.y}
                r={index === 0 ? 5.2 : 3.4}
                fill={index === 0 ? "#f59e0b" : accentHex}
                stroke={isLightTheme ? "#ffffff" : "#0b0d12"}
                strokeWidth="1.5"
              />

              <text
                x={pt.x}
                y={height + 18}
                textAnchor="middle"
                fill={
                  index === 0
                    ? isLightTheme
                      ? "#0f172a"
                      : "#f8fafc"
                    : isLightTheme
                      ? "#475569"
                      : "#94a3b8"
                }
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
              >
                {pt.time}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
