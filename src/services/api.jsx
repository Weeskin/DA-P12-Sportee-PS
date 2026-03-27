import {
  getMockUserInfo,
  getMockUserActivity,
  getMockUserAverageSessions,
  getMockUserPerformance,
} from "./mockData.js";
import { status } from "http-status";

/**
 * Mettre à true pour utiliser les données mockées (sans backend)
 * Mettre à false pour utiliser l'API réelle
 */
const USE_MOCK = false;

const BASE_URL = "/user";

function buildApiError(status) {
  const err = new Error();
  err.status = status;
  return err;
}

async function fetchApi(path, notFoundMessage) {
  let response;

  // 1) Erreur réseau / backend down
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw buildApiError(0);
  }

  // 2) Erreur HTTP
  if (!response.ok) {
    if (response.status === status.INTERNAL_SERVER_ERROR) {
      throw buildApiError(response.status);
    }
    if (response.status === status.NOT_FOUND) {
      throw buildApiError(
        status.NOT_FOUND,
        notFoundMessage || "Ressource introuvable"
      );
    }
    throw buildApiError(response.status, "Erreur de récupération des données.");
  }

  // 3) Succès
  const json = await response.json();
  return json.data;
}

/**
 * Récupère les informations principales de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserInfo(userId) {
  if (USE_MOCK) return getMockUserInfo(Number(userId));
  return fetchApi(`/${userId}`, `Utilisateur ${userId} introuvable`);
}

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserActivity(userId) {
  if (USE_MOCK) return getMockUserActivity(Number(userId));
  return fetchApi(
    `/${userId}/activity`,
    `Activité de l'utilisateur ${userId} introuvable`
  );
}

/**
 * Récupère les sessions moyennes de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserAverageSessions(userId) {
  if (USE_MOCK) return getMockUserAverageSessions(Number(userId));
  return fetchApi(
    `/${userId}/average-sessions`,
    `Sessions moyennes de l'utilisateur ${userId} introuvables`
  );
}

/**
 * Récupère les performances de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserPerformance(userId) {
  if (USE_MOCK) return getMockUserPerformance(Number(userId));
  return fetchApi(
    `/${userId}/performance`,
    `Performances de l'utilisateur ${userId} introuvables`
  );
}
