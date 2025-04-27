<template>
    <div class="comparador-container">
      <h1>Comparador de jugadores</h1>
      <p>Compara jugadores, equipos y estadísticas de la NBA de manera sencilla y visual.</p>
  
      <div class="inputs-container">
        <!-- Input y autocompletado jugador 1 -->
        <div class="input-group">
          <input
            type="text"
            placeholder="Buscar primer jugador"
            v-model="nombreJugador1"
            @input="buscarSugerenciasJugador1"
            class="input-jugador"
          />
          <ul v-if="sugerenciasJugador1.length > 0" class="sugerencias-lista">
            <li
              v-for="jugador in sugerenciasJugador1"
              :key="jugador.id"
              @click="seleccionarJugador1(jugador)"
            >
              {{ jugador.first_name }} {{ jugador.last_name }}
            </li>
          </ul>
          <p v-if="cargandoJugador1">Cargando primer jugador...</p>
        </div>
  
        <!-- Input y autocompletado jugador 2 -->
        <div class="input-group">
          <input
            type="text"
            placeholder="Buscar segundo jugador"
            v-model="nombreJugador2"
            @input="buscarSugerenciasJugador2"
            class="input-jugador"
          />
          <ul v-if="sugerenciasJugador2.length > 0" class="sugerencias-lista">
            <li
              v-for="jugador in sugerenciasJugador2"
              :key="jugador.id"
              @click="seleccionarJugador2(jugador)"
            >
              {{ jugador.first_name }} {{ jugador.last_name }}
            </li>
          </ul>
          <p v-if="cargandoJugador2">Cargando segundo jugador...</p>
        </div>
  
        <button @click="buscarJugadores" class="buscar-button">Buscar</button>
      </div>
  
      <!-- Mostrar resultados -->
      <div v-if="jugador1Seleccionado && jugador2Seleccionado" class="resultados">
        <div class="jugador">
          <h3>{{ jugador1Seleccionado.first_name }} {{ jugador1Seleccionado.last_name }}</h3>
          <p>ID: {{ jugador1Seleccionado.id }}</p>
          <p>Altura: {{jugador1Seleccionado.height }} pies</p>
          <p>Peso: {{ jugador1Seleccionado.weight }} libras</p>
          <p>Posición: {{ jugador1Seleccionado.position || 'Desconocida' }}</p>
          <p>Equipo: {{ jugador1Seleccionado.team?.full_name || 'Desconocido' }}</p>
        </div>
  
        <div class="jugador">
          <h3>{{ jugador2Seleccionado.first_name }} {{ jugador2Seleccionado.last_name }}</h3>
          <p>Altura: {{ jugador2Seleccionado.height}} pies </p>
          <p>Peso: {{ jugador2Seleccionado.weight }} libras</p>
          <p>Posición: {{ jugador2Seleccionado.position || 'Desconocida' }}</p>
          <p>Equipo: {{ jugador2Seleccionado.team?.full_name || 'Desconocido' }}</p>
        </div>
      </div>
  
      <!-- Mostrar estadísticas -->
      <div v-if="estadisticasJugador1 && estadisticasJugador2" class="estadisticas">
        <div class="estadisticas-jugador">
          <h4>Estadísticas de {{ jugador1Seleccionado.first_name }} {{ jugador1Seleccionado.last_name }}</h4>
          <p>Promedio de puntos: {{ estadisticasJugador1.points }}</p>
          <p>Promedio de asistencias: {{ estadisticasJugador1.assists }}</p>
          <p>Promedio de rebotes: {{ estadisticasJugador1.rebounds }}</p>
        </div>
  
        <div class="estadisticas-jugador">
          <h4>Estadísticas de {{ jugador2Seleccionado.first_name }} {{ jugador2Seleccionado.last_name }}</h4>
          <p>Promedio de puntos: {{ estadisticasJugador2.points }}</p>
          <p>Promedio de asistencias: {{ estadisticasJugador2.assists }}</p>
          <p>Promedio de rebotes: {{ estadisticasJugador2.rebounds }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { buscarJugador, obtenerEstadisticasJugador } from '../services/apiNBA'
  
  // Variables
  const nombreJugador1 = ref('')
  const nombreJugador2 = ref('')
  const sugerenciasJugador1 = ref([])
  const sugerenciasJugador2 = ref([])
  const jugador1Seleccionado = ref(null)
  const jugador2Seleccionado = ref(null)
  const estadisticasJugador1 = ref(null)
  const estadisticasJugador2 = ref(null)
  const cargandoJugador1 = ref(false)
  const cargandoJugador2 = ref(false)
  
  // Funciones
  
  // Buscar sugerencias para jugador 1
  async function buscarSugerenciasJugador1() {
    if (nombreJugador1.value.length >= 2) {
      cargandoJugador1.value = true
      try {
        sugerenciasJugador1.value = await buscarJugador(nombreJugador1.value)
      } catch (error) {
        console.error('Error buscando sugerencias jugador 1:', error)
      } finally {
        cargandoJugador1.value = false
      }
    } else {
      sugerenciasJugador1.value = []
    }
  }
  
  // Buscar sugerencias para jugador 2
  async function buscarSugerenciasJugador2() {
    if (nombreJugador2.value.length >= 2) {
      cargandoJugador2.value = true
      try {
        sugerenciasJugador2.value = await buscarJugador(nombreJugador2.value)
      } catch (error) {
        console.error('Error buscando sugerencias jugador 2:', error)
      } finally {
        cargandoJugador2.value = false
      }
    } else {
      sugerenciasJugador2.value = []
    }
  }
  
  // Cuando seleccionas un jugador de la lista de sugerencias
  function seleccionarJugador1(jugador) {
    jugador1Seleccionado.value = jugador
    nombreJugador1.value = `${jugador.first_name} ${jugador.last_name}`
    sugerenciasJugador1.value = []
    obtenerEstadisticasJugador1(jugador.id) // Obtener estadísticas al seleccionar el jugador
  }
  
  function seleccionarJugador2(jugador) {
    jugador2Seleccionado.value = jugador
    nombreJugador2.value = `${jugador.first_name} ${jugador.last_name}`
    sugerenciasJugador2.value = []
    obtenerEstadisticasJugador2(jugador.id) // Obtener estadísticas al seleccionar el jugador
  }
  
  // Obtener estadísticas de jugador 1
  async function obtenerEstadisticasJugador1(playerId) {
    estadisticasJugador1.value = await obtenerEstadisticasJugador(playerId)
  }
  
  // Obtener estadísticas de jugador 2
  async function obtenerEstadisticasJugador2(playerId) {
    estadisticasJugador2.value = await obtenerEstadisticasJugador(playerId)
  }
  
  // Cuando pulsas "Buscar"
  async function buscarJugadores() {
    if (!jugador1Seleccionado.value && nombreJugador1.value) {
      cargandoJugador1.value = true
      const resultados = await buscarJugador(nombreJugador1.value)
      jugador1Seleccionado.value = resultados.length > 0 ? resultados[0] : null
      cargandoJugador1.value = false
      if (jugador1Seleccionado.value) {
        obtenerEstadisticasJugador1(jugador1Seleccionado.value.id)
      }
    }
  
    if (!jugador2Seleccionado.value && nombreJugador2.value) {
      cargandoJugador2.value = true
      const resultados = await buscarJugador(nombreJugador2.value)
      jugador2Seleccionado.value = resultados.length > 0 ? resultados[0] : null
      cargandoJugador2.value = false
      if (jugador2Seleccionado.value) {
        obtenerEstadisticasJugador2(jugador2Seleccionado.value.id)
      }
    }
  }
  </script>

  
  <style scoped>
  .comparador-container {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
  }
  .inputs-container {
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 20px;
    position: relative;
  }
  .input-group {
    position: relative;
  }
  .input-jugador {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    width: 250px;
    font-size: 16px;
  }
  .sugerencias-lista {
    font-family: 'Poppins', sans-serif;
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 2px;
    z-index: 10;
  }
  .sugerencias-lista li {
    padding: 10px;
    cursor: pointer;
  }
  .sugerencias-lista li:hover {
    background-color: #f0f0f0;
  }
  .buscar-button {
    font-family: 'Poppins', sans-serif;
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  .buscar-button:hover {
    background-color: #059669;
  }
  .resultados {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-top: 40px;
    
  }
  .jugador {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: #434e61 2px solid;
  }
  </style>
  