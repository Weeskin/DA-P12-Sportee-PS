import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styles from "./LineChart.module.css";

/**
 * Tooltip personnalisé
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span>{payload[0].value} min</span>
      </div>
    );
  }
  return null;
};

const CHART_MARGIN = {
  top: 56,
  right: 10,
  bottom: 20,
  left: 10,
};

const DAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

/**
 * Graphique linéaire — durée moyenne des sessions
 * @param {Array} data - sessions formatées par dataFormatter.formatAverageSessions()
 */
function AverageSessionsLineChart({ data }) {
  const [cursorX, setCursorX] = useState(null);

  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.cursorOverlay}
        style={{
          left: cursorX === null ? "100%" : `${cursorX}px`,
        }}
      />
      <h2 className={styles.title}>Durée moyenne des sessions</h2>
      <div className={styles.chartArea}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={CHART_MARGIN}
            onMouseMove={(state) => {
              if (state?.isTooltipActive && state.activeCoordinate) {
                setCursorX(state.activeCoordinate.x);
                return;
              }
              setCursorX(null);
            }}
            onMouseLeave={() => setCursorX(null)}
          >
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "rgba(255,255,255,0.7)",
                fontSize: 12,
              }}
              tickFormatter={(day) => DAY_LABELS[day - 1] ?? ""}
            />
            <YAxis
              hide
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />
            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#ffffff",
                stroke: "rgba(255,255,255,0.5)",
                strokeWidth: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AverageSessionsLineChart;
