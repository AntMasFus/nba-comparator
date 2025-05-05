import axios from 'axios';

const API_URL = '/api/v1/players';  // Ahora sí usa el proxy de vite
const API_KEY = "6b59b063-340f-4c4f-97db-08336e0c128e";

// Función para buscar jugadores por nombre
export async function buscarJugador(nombre) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        search: nombre,
      },
      headers: {
        Authorization: API_KEY // Aquí mandamos la API Key
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error al buscar el jugador:', error);
    throw error;
  }
}
export const obtenerEstadisticasJugador = async (playerId) => {
  try {
    const response = await fetch(`https://api.balldontlie.io/v1/stats?player_ids[]=${playerId}`, {
      headers: {
        Authorization: API_KEY // Igual que en buscarJugador
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.length > 0 ? data.data[0] : {};
  } catch (error) {
    console.error('Error al obtener estadísticas del jugador:', error);
    return {};
  }
}

// Nueva función: obtener promedios de los últimos X partidos de la temporada actual
export const obtenerPromediosJugador = async (playerId, partidos = 10) => {
  try {
    // Paso 1: obtener la temporada actual desde el último partido
    const ultimaResp = await fetch(`https://api.balldontlie.io/v1/stats?player_ids[]=${playerId}&per_page=1`, {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!ultimaResp.ok) {
      throw new Error(`HTTP error! status: ${ultimaResp.status}`);
    }

    const ultimaData = await ultimaResp.json();
    const ultimaEstadistica = ultimaData.data[0];

    if (!ultimaEstadistica) {
      return {};
    }

    const temporada = ultimaEstadistica.game.season;

    // Paso 2: obtener los últimos X partidos de esa temporada
    const statsResp = await fetch(`https://api.balldontlie.io/v1/stats?player_ids[]=${playerId}&seasons[]=${temporada}&per_page=${partidos}`, {
      headers: {
        Authorization: API_KEY
      }
    });

    if (!statsResp.ok) {
      throw new Error(`HTTP error! status: ${statsResp.status}`);
    }

    const statsData = await statsResp.json();
    const stats = statsData.data;
    const total = stats.length;

    if (total === 0) return {};

    const suma = stats.reduce((acc, partido) => {
      acc.pts += partido.pts;
      acc.reb += partido.reb;
      acc.ast += partido.ast;
      acc.stl += partido.stl;
      acc.blk += partido.blk;
      acc.turnover += partido.turnover;
      return acc;
    }, { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, turnover: 0 });

    return {
      pts: (suma.pts / total).toFixed(1),
      reb: (suma.reb / total).toFixed(1),
      ast: (suma.ast / total).toFixed(1),
      stl: (suma.stl / total).toFixed(1),
      blk: (suma.blk / total).toFixed(1),
      turnover: (suma.turnover / total).toFixed(1),
      partidos: total,
      temporada
    };
  } catch (error) {
    console.error('Error al obtener promedios del jugador:', error);
    return {};
  }
};



