import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts';
import styles from './RadialChart.module.css';

/**
 * Graphique radial — score de l'objectif atteint aujourd'hui
 * @param {number} score - valeur entre 0 et 1 (ex: 0.12 = 12%)
 */
export default function ScoreRadialChart({
  score,
}) {
  if (score === undefined || score === null)
    return null;

  const data = [
    { value: score * 100, fill: '#E60000' },
  ];
  const percent = Math.round(score * 100);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Score</h2>
      <div className={styles.chartContainer}>
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            startAngle={90}
            endAngle={90 + 360 * score}
            data={data}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={10}
            />
            <circle
              cx="50%"
              cy="50%"
              r="80"
              fill="#FFFFFF"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className={styles.center}>
          <span className={styles.percent}>
            {percent}%
          </span>
          <span className={styles.label}>
            de votre objectif
          </span>
        </div>
      </div>
    </div>
  );
}
