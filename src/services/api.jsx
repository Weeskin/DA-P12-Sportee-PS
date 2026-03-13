import { getMockUserInfo, getMockUserActivity, getMockUserAverageSessions, getMockUserPerformance } from './mockData.js'

/**
 * Mettre à true pour utiliser les données mockées (sans backend)
 * Mettre à false pour utiliser l'API réelle
 */
const USE_MOCK = false

const BASE_URL = '/user'

/**
 * Récupère les informations principales de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserInfo(userId) {
  if (USE_MOCK) return getMockUserInfo(Number(userId))
  const response = await fetch(`${BASE_URL}/${userId}`)
  if (!response.ok) throw new Error(`Utilisateur ${userId} introuvable`)
  const json = await response.json()
  return json.data
}

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserActivity(userId) {
  if (USE_MOCK) return getMockUserActivity(Number(userId))
  const response = await fetch(`${BASE_URL}/${userId}/activity`)
  if (!response.ok) throw new Error(`Activité de l'utilisateur ${userId} introuvable`)
  const json = await response.json()
  return json.data
}

/**
 * Récupère les sessions moyennes de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserAverageSessions(userId) {
  if (USE_MOCK) return getMockUserAverageSessions(Number(userId))
  const response = await fetch(`${BASE_URL}/${userId}/average-sessions`)
  if (!response.ok) throw new Error(`Sessions moyennes de l'utilisateur ${userId} introuvables`)
  const json = await response.json()
  return json.data
}

/**
 * Récupère les performances de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserPerformance(userId) {
  if (USE_MOCK) return getMockUserPerformance(Number(userId))
  const response = await fetch(`${BASE_URL}/${userId}/performance`)
  if (!response.ok) throw new Error(`Performances de l'utilisateur ${userId} introuvables`)
  const json = await response.json()
  return json.data
}

