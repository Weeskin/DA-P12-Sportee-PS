import styles from './Header.module.css'
import logo from '../../assets/icon/logo.svg'

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="SportSee logo" className={styles.logo} />
      <nav className={styles.nav}>
        <a href="#">Accueil</a>
        <a href="#">Profil</a>
        <a href="#">Réglage</a>
        <a href="#">Communauté</a>
      </nav>
    </header>
  )
}

export default Header

