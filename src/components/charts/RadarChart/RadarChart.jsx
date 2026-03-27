import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import styles from "./RadarChart.module.css";

/**
 * Graphique radar — performances sportives
 * @param {Array} data - performances formatées par dataFormatter.formatPerformance()
 */
function PerformanceRadarChart({ data }) {
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadarChart
          data={data}
          outerRadius="85%"
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 30,
          }}
        >
          <PolarGrid
            stroke="rgba(255,255,255)"
            radialLines={false}
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#ffffff",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={false}
          />
          <Radar
            dataKey="value"
            fill="#FF0101"
            fillOpacity={0.7}
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceRadarChart;
