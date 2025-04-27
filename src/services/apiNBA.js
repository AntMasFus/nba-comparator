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
    const response = await fetch(`https://api.balldontlie.io/v1/stats?player_ids[]=${playerId}`);
    const data = await response.json();
    return data.data.length > 0 ? data.data[0] : {};  // Retorna las estadísticas del jugador
  } catch (error) {
    console.error('Error al obtener estadísticas del jugador:', error);
    return {};
  }
};
