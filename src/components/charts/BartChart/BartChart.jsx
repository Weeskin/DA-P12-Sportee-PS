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
    // Trouver les données pour kilogram et calories
    const kilogramData = payload.find(item => item.dataKey === 'kilogram')
    const caloriesData = payload.find(item => item.dataKey === 'calories')

    return (
      <div className={styles.tooltip} style={{ backgroundColor: '#E60000', color: '#FFFFFF', padding: '5px 10px', borderRadius: '5px' }}>
        {kilogramData && <span>{kilogramData.value}kg</span>}
        {caloriesData && <span>{caloriesData.value}kCal</span>}
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

  const legendMapping = {
    kilogram: 'Poids (kg)',
    calories: 'Calories brûlées (kCal)',
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Activité quotidienne</h2>
      <ResponsiveContainer width="100%" height={200} backgroundColor={'#9B9EAC'}>
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
              <span className={styles.legendLabel}>{legendMapping[value]}</span>
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

