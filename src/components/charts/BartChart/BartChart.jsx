import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from './BarChart.module.css'


/**
 * Tooltip personnalisé pour le graphique d'activité
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <span>{payload[0].value}kg</span>
        <span>{payload[1].value}kCal</span>
      </div>
    )
  }
  return null
}

/**
 * Graphique en barres — activité quotidienne (poids + calories)
 * @param {Array} data - sessions formatées par dataFormatter.formatActivity()
 */
function ActivityBarChart({ data }) {
  if (!data) return null

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barGap={8} barCategoryGap="35%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#DEDEDE" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} />
          <YAxis
            yAxisId="kg"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#9B9EAC', fontSize: 14 }}
            domain={['dataMin - 1', 'dataMax + 1']}
          />
          <YAxis yAxisId="cal" orientation="left" hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            formatter={(value) =>
              value === 'kilogram' ? (
                <span className={styles.legendLabel}>Poids (kg)</span>
              ) : (
                <span className={styles.legendLabel}>Calories brûlées (kCal)</span>
              )
            }
          />
          <Bar yAxisId="kg" dataKey="kilogram" name="kilogram" fill="#282D30" radius={[3, 3, 0, 0]} barSize={7} />
          <Bar yAxisId="cal" dataKey="calories" name="calories" fill="#E60000" radius={[3, 3, 0, 0]} barSize={7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ActivityBarChart

