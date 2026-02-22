import { useParams } from 'react-router-dom'
import styles from './Dashboard.module.css'
import Header from '../../components/Header/Header'
import KeyData from '../../components/KeyData/KeyData'
import ActivityBarChart from '../../components/charts/BartChart/BartChart'
import AverageSessionsLineChart from '../../components/charts/LineChart/LineChart'
import PerformanceRadarChart from '../../components/charts/RadarChart/RadarChart'
import ScoreRadialChart from '../../components/charts/RadialChart/RadialChart'
import { useDashboard } from '../../hooks/useDashboard'
import yoga from '../../assets/icon/yoga.svg'
import velo from '../../assets/icon/velo.svg'
import natation from '../../assets/icon/natation.svg'
import musculation from '../../assets/icon/musculation.svg'
import caloriesIcon from '../../assets/icon/calories.svg'
import proteinIcon from '../../assets/icon/protein.svg'
import carbsIcon from '../../assets/icon/carbs.svg'
import fatIcon from '../../assets/icon/fat.svg'

function Dashboard() {
  const { id } = useParams()
  const { userInfo, activity, averageSessions, performance, isLoading, error } = useDashboard(id)

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.feedback}>Chargement...</div>
      </div>
    )
  }

  if (error || !userInfo) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.feedback}>
          {error ?? 'Utilisateur introuvable.'}
        </div>
      </div>
    )
  }

  const { firstName } = userInfo.userInfos
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userInfo.keyData

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav}>
            <div className={styles.iconBox}>
              <img src={yoga} alt="Yoga" />
            </div>
            <div className={styles.iconBox}>
              <img src={velo} alt="Vélo" />
            </div>
            <div className={styles.iconBox}>
              <img src={natation} alt="Natation" />
            </div>
            <div className={styles.iconBox}>
              <img src={musculation} alt="Musculation" />
            </div>
          </nav>
        </aside>
        <section className={styles.content}>
          <div className={styles.greeting}>
            <h1>
              Bonjour <span className={styles.firstName}>{firstName}</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          </div>

          <div className={styles.dashboard}>
            {/* Colonne principale */}
            <div className={styles.mainCol}>
              {/* Graphique barres — activité quotidienne */}
              <div className={styles.barChartBox}>
                <ActivityBarChart data={activity} />
              </div>

              {/* Ligne du bas : 3 petits graphiques */}
              <div className={styles.smallCharts}>
                <div className={styles.smallChart}>
                  <AverageSessionsLineChart data={averageSessions} />
                </div>
                <div className={styles.smallChart}>
                  <PerformanceRadarChart data={performance} />
                </div>
                <div className={styles.smallChart}>
                  <ScoreRadialChart score={userInfo.todayScore} />
                </div>
              </div>
            </div>

            {/* Colonne latérale — données clés */}
            <aside className={styles.keyDataCol}>
              <KeyData
                icon={caloriesIcon}
                iconBg="rgba(255, 0, 0, 0.07)"
                value={`${calorieCount.toLocaleString('fr-FR')}kCal`}
                label="Calories"
              />
              <KeyData
                icon={proteinIcon}
                iconBg="rgba(74, 184, 255, 0.1)"
                value={`${proteinCount}g`}
                label="Protéines"
              />
              <KeyData
                icon={carbsIcon}
                iconBg="rgba(249, 206, 35, 0.1)"
                value={`${carbohydrateCount}g`}
                label="Glucides"
              />
              <KeyData
                icon={fatIcon}
                iconBg="rgba(253, 81, 129, 0.1)"
                value={`${lipidCount}g`}
                label="Lipides"
              />
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
