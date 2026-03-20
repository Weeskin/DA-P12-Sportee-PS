import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import styles from './BarChart.module.css';

/**
 * Tooltip personnalisé pour le graphique d'activité
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // Trouver les données pour kilogram et calories
    const kilogramData = payload.find(
      (item) => item.dataKey === 'kilogram'
    );
    const caloriesData = payload.find(
      (item) => item.dataKey === 'calories'
    );

    return (
      <div
        className={styles.tooltip}
        style={{
          backgroundColor: '#E60000',
          color: '#FFFFFF',
          padding: '10px 10px',
          margin: '10px',
        }}
      >
        {kilogramData && (
          <span>{kilogramData.value}kg</span>
        )}
        {caloriesData && (
          <span>{caloriesData.value}kCal</span>
        )}
      </div>
    );
  }
  return null;
};

/**
 * Graphique en barres — activité quotidienne (poids + calories)
 * @param {Array} data - sessions formatées par dataFormatter.formatActivity()
 */
export default function ActivityBarChart({
  data,
}) {
  if (!data) return null;

  const legendData = [
    { dataKey: 'kilogram', label: 'Poids (kg)' },
    {
      dataKey: 'calories',
      label: 'Calories brûlées (kCal)',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>
          Activité quotidienne
        </h2>
        <div className={styles.legendContainer}>
          {legendData.map((item) => (
            <div
              key={item.dataKey}
              className={styles.legendItem}
            >
              <span
                className={styles.legendDot}
                style={{
                  backgroundColor:
                    item.dataKey === 'kilogram'
                      ? '#282D30'
                      : '#E60000',
                }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer
        width="100%"
        height={200}
        backgroundColor={'#9B9EAC'}
      >
        <BarChart
          data={data}
          barGap={8}
          margin={{
            top: 20,
            right: -30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#DEDEDE"
          />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: '#9B9EAC',
              fontSize: 14,
            }}
          />
          <YAxis
            yAxisId="kg"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: '#9B9EAC',
              fontSize: 14,
            }}
            domain={[
              'dataMin - 1',
              'dataMax + 1',
            ]}
            tickCount={3}
          />
          <YAxis
            yAxisId="cal"
            orientation="left"
            hide
          />
          <ReferenceLine
            strokeDasharray="3 3"
            yAxisId="kg"
            y={79}
            stroke="#DEDEDE"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="kg"
            dataKey="kilogram"
            name="kilogram"
            fill="#282D30"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
          <Bar
            yAxisId="cal"
            dataKey="calories"
            name="calories"
            fill="#E60000"
            radius={[3, 3, 0, 0]}
            barSize={7}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
