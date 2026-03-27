/**
 * Normalise les données utilisateur provenant de l'API.
 * Le backend peut retourner `score` ou `todayScore` selon l'utilisateur.
 * On harmonise en utilisant toujours `todayScore`.
 *
 * @param {object} data - données brutes de l'API /user/:id
 * @returns {object} données normalisées
 */
export function formatUserInfo(data) {
  if (!data) return null;
  return {
    ...data,
    todayScore: data.todayScore ?? data.score ?? 0,
  };
}

/**
 * Formate les données d'activité pour Recharts.
 * Extrait le numéro du jour à partir de la date (ex: '2020-07-01' → 1).
 *
 * @param {object} data - données brutes de l'API /user/:id/activity
 * @returns {Array}
 */
export function formatActivity(data) {
  if (!data || !data.sessions) return [];
  return data.sessions.map((session, index) => ({
    day: index + 1,
    kilogram: session.kilogram,
    calories: session.calories,
  }));
}

/**
 * Formate les sessions moyennes pour Recharts.
 * Traduit le numéro du jour en lettre (L, M, M, J, V, S, D).
 *
 * @param {object} data - données brutes de l'API /user/:id/average-sessions
 * @returns {Array}
 */
export function formatAverageSessions(data) {
  if (!data || !data.sessions) return [];
  return data.sessions.map((session) => ({
    day: session.day,
    sessionLength: session.sessionLength,
  }));
}

/**
 * Formate les données de performance pour Recharts RadarChart.
 * Traduit les clés numériques de `kind` en labels français.
 *
 * @param {object} data - données brutes de l'API /user/:id/performance
 * @returns {Array}
 */
export function formatPerformance(data) {
  if (!data || !data.data) return [];

  const translations = {
    cardio: "Cardio",
    energy: "Énergie",
    endurance: "Endurance",
    strength: "Force",
    speed: "Vitesse",
    intensity: "Intensité",
  };

  const desiredOrder = [
    "intensity",
    "speed",
    "strength",
    "endurance",
    "energy",
    "cardio",
  ];

  const order = Object.fromEntries(desiredOrder.map((k, i) => [k, i]));

  return [...data.data]
    .sort((a, b) => {
      const aKey = data.kind[a.kind];
      const bKey = data.kind[b.kind];
      return (order[aKey] ?? 999) - (order[bKey] ?? 999);
    })
    .map((item) => {
      const key = data.kind[item.kind];
      return {
        subject: translations[key] ?? key,
        value: item.value,
      };
    });
}
