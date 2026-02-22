import { useEffect, useState } from 'react'
import { getUserInfo, getUserActivity, getUserAverageSessions, getUserPerformance } from '../services/api'
import { formatUserInfo, formatActivity, formatAverageSessions, formatPerformance } from '../services/dataFormatter'

/**
 * Hook qui charge toutes les données nécessaires au Dashboard pour un utilisateur donné.
 * @param {string|number} userId
 */
export function useDashboard(userId) {
  const [userInfo, setUserInfo] = useState(null)
  const [activity, setActivity] = useState(null)
  const [averageSessions, setAverageSessions] = useState(null)
  const [performance, setPerformance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    setIsLoading(true)
    setError(null)

    Promise.all([
      getUserInfo(userId),
      getUserActivity(userId),
      getUserAverageSessions(userId),
      getUserPerformance(userId),
    ])
      .then(([info, activityData, avgSessions, perf]) => {
        setUserInfo(formatUserInfo(info))
        setActivity(formatActivity(activityData))
        setAverageSessions(formatAverageSessions(avgSessions))
        setPerformance(formatPerformance(perf))
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [userId])

  return { userInfo, activity, averageSessions, performance, isLoading, error }
}

