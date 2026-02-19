import styles from './Dashboard.module.css'
import Header from '../../components/Header/Header'
import yoga from '../../assets/icon/yoga.svg'
import velo from '../../assets/icon/velo.svg'
import natation from '../../assets/icon/natation.svg'
import musculation from '../../assets/icon/musculation.svg'

function Dashboard() {
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
          <h1>Dashboard</h1>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
