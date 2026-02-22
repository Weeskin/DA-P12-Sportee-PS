import styles from './KeyData.module.css'

/**
 * Affiche une donnée clé (calories, protéines, glucides, lipides)
 * @param {string} icon - emoji ou image représentant la donnée
 * @param {string} iconBg - couleur de fond de l'icône
 * @param {string} value - valeur formatée (ex: "1 930kCal")
 * @param {string} label - libellé (ex: "Calories")
 */
function KeyData({ icon, iconBg, value, label }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper} style={{ backgroundColor: iconBg }}>
        <img src={icon} alt={label} className={styles.icon} />
      </div>
      <div className={styles.info}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  )
}

export default KeyData

