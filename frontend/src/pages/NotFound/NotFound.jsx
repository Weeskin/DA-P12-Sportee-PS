import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Oups! La page que vous demandez n'existe pas.</p>
      <Link to="/user/12" className={styles.link}>
        Retourner sur la page d'accueil
      </Link>
    </div>
  )
}

export default NotFound

