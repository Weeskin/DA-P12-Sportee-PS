/**
 * Normalise les données utilisateur provenant de l'API.
 * Le backend peut retourner `score` ou `todayScore` selon l'utilisateur.
 * On harmonise en utilisant toujours `todayScore`.
 *
 * @param {object} data - données brutes de l'API /user/:id
 * @returns {object} données normalisées
 */
export function formatUserInfo(data) {
  return {
    ...data,
    todayScore: data.todayScore ?? data.score ?? 0,
  }
}

/**
 * Formate les données d'activité pour Recharts.
 * Extrait le numéro du jour à partir de la date (ex: '2020-07-01' → 1).
 *
 * @param {object} data - données brutes de l'API /user/:id/activity
 * @returns {Array}
 */
export function formatActivity(data) {
  return data.sessions.map((session, index) => ({
    day: index + 1,
    kilogram: session.kilogram,
    calories: session.calories,
  }))
}

/**
 * Formate les sessions moyennes pour Recharts.
 * Traduit le numéro du jour en lettre (L, M, M, J, V, S, D).
 *
 * @param {object} data - données brutes de l'API /user/:id/average-sessions
 * @returns {Array}
 */
export function formatAverageSessions(data) {
  const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  return data.sessions.map((session) => ({
    day: dayLabels[session.day - 1],
    sessionLength: session.sessionLength,
  }))
}

/**
 * Formate les données de performance pour Recharts RadarChart.
 * Traduit les clés numériques de `kind` en labels français.
 *
 * @param {object} data - données brutes de l'API /user/:id/performance
 * @returns {Array}
 */
export function formatPerformance(data) {
  const translations = {
    cardio: 'Cardio',
    energy: 'Énergie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité',
  }

  return data.data.map((item) => ({
    subject: translations[data.kind[item.kind]] ?? data.kind[item.kind],
    value: item.value,
  }))
}

