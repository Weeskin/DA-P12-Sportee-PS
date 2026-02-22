import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts'
import styles from './LineChart.module.css'

/**
 * Tooltip personnalisé
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span>{payload[0].value} min</span>
      </div>
    )
  }
  return null
}

/**
 * Curseur personnalisé — assombrit la zone à droite du curseur
 */
const CustomCursor = ({ points, width, height }) => {
  const { x } = points[0]
  return <Rectangle x={x} y={0} width={width} height={height + 100} fill="rgba(0,0,0,0.1)" />
}

/**
 * Graphique linéaire — durée moyenne des sessions
 * @param {Array} data - sessions formatées par dataFormatter.formatAverageSessions()
 */
function AverageSessionsLineChart({ data }) {
  if (!data) return null

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 0, right: 10, bottom: 10, left: 10 }}>
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
          />
          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#ffffff', stroke: 'rgba(255,255,255,0.5)', strokeWidth: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AverageSessionsLineChart

