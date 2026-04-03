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
const USE_MOCK = true;

const BASE_URL = "/user";

function buildApiError(statusCode, message = "Erreur API") {
  const err = new Error(message);
  err.status = statusCode;
  return err;
}

function normalizeUserId(userId) {
  const parsedId = Number(userId);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    throw buildApiError(status.NOT_FOUND, `Utilisateur ${userId} introuvable`);
  }
  return parsedId;
}

function ensureFound(data, notFoundMessage = "Ressource introuvable") {
  if (data == null) {
    throw buildApiError(status.NOT_FOUND, notFoundMessage);
  }
  return data;
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
  const id = normalizeUserId(userId);
  if (USE_MOCK) {
    return ensureFound(getMockUserInfo(id), `Utilisateur ${id} introuvable`);
  }
  return fetchApi(`/${id}`, `Utilisateur ${id} introuvable`);
}

/**
 * Récupère l'activité quotidienne de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserActivity(userId) {
  const id = normalizeUserId(userId);
  if (USE_MOCK) {
    return ensureFound(
      getMockUserActivity(id),
      `Activité de l'utilisateur ${id} introuvable`
    );
  }
  return fetchApi(
    `/${id}/activity`,
    `Activité de l'utilisateur ${id} introuvable`
  );
}

/**
 * Récupère les sessions moyennes de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserAverageSessions(userId) {
  const id = normalizeUserId(userId);
  if (USE_MOCK) {
    return ensureFound(
      getMockUserAverageSessions(id),
      `Sessions moyennes de l'utilisateur ${id} introuvables`
    );
  }
  return fetchApi(
    `/${id}/average-sessions`,
    `Sessions moyennes de l'utilisateur ${id} introuvables`
  );
}

/**
 * Récupère les performances de l'utilisateur
 * @param {number|string} userId
 * @returns {Promise<object>}
 */
export async function getUserPerformance(userId) {
  const id = normalizeUserId(userId);
  if (USE_MOCK) {
    return ensureFound(
      getMockUserPerformance(id),
      `Performances de l'utilisateur ${id} introuvables`
    );
  }
  return fetchApi(
    `/${id}/performance`,
    `Performances de l'utilisateur ${id} introuvables`
  );
}
