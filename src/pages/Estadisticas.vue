<template>
  <div class="estadisticas-container">
    <h1>Estadísticas por temporada</h1>

    <div class="filtro">
      <label for="temporada">Selecciona temporada:</label>
      <select v-model="temporadaSeleccionada" @change="cargarEstadisticas">
        <option disabled value="">-- Temporada --</option>
        <option v-for="t in temporadasDisponibles" :key="t" :value="t">{{ t }}</option>
      </select>
    </div>

    <div v-if="cargando">Cargando estadísticas...</div>

    <div v-if="!cargando">
      <div class="grafica">
        <h3>Puntos Totales</h3>
        <BarChart
          :labels="Array.isArray(jugadoresPuntos) ? jugadoresPuntos.map(j => j.nombre) : []"
          :data="Array.isArray(jugadoresPuntos) ? jugadoresPuntos.map(j => j.total) : []"
          label="Puntos"
          color="#3b82f6"
        />
      </div>

      <div class="grafica">
        <h3>Asistencias Totales</h3>
        <BarChart
          :labels="Array.isArray(jugadoresAsistencias) ? jugadoresAsistencias.map(j => j.nombre) : []"
          :data="Array.isArray(jugadoresAsistencias) ? jugadoresAsistencias.map(j => j.total) : []"
          label="Asistencias"
          color="#10b981"
        />
      </div>

      <div class="grafica">
        <h3>Rebotes Totales</h3>
        <BarChart
          :labels="Array.isArray(jugadoresRebotes) ? jugadoresRebotes.map(j => j.nombre) : []"
          :data="Array.isArray(jugadoresRebotes) ? jugadoresRebotes.map(j => j.total) : []"
          label="Rebotes"
          color="#ef4444"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import BarChart from '../components/BarChart.vue'

const temporadasDisponibles = ['2019', '2020', '2021', '2022', '2023']
const temporadaSeleccionada = ref('')
const jugadoresPuntos = ref([])
const jugadoresAsistencias = ref([])
const jugadoresRebotes = ref([])
const cargando = ref(false)

const cargarEstadisticas = async () => {
  if (!temporadaSeleccionada.value) return

    console.log('🟡 Cargando estadísticas para', temporadaSeleccionada.value) 


  cargando.value = true

  try {
    const [puntos, asistencias, rebotes] = await Promise.all([
      axios.get(`http://localhost:3000/api/estadisticas/puntos/${temporadaSeleccionada.value}`),

      axios.get(`http://localhost:3000/api/estadisticas/asistencias/${temporadaSeleccionada.value}`),

      axios.get(`http://localhost:3000/api/estadisticas/rebotes/${temporadaSeleccionada.value}`)

    ])
    console.log('📊 Respuesta puntos:', puntos.data)

    jugadoresPuntos.value = Array.isArray(puntos.data) ? puntos.data : []
    jugadoresAsistencias.value = Array.isArray(asistencias.data) ? asistencias.data : []
    jugadoresRebotes.value = Array.isArray(rebotes.data) ? rebotes.data : []
  } catch (error) {
    console.error('Error al cargar estadísticas:', error)
    jugadoresPuntos.value = []
    jugadoresAsistencias.value = []
    jugadoresRebotes.value = []
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.estadisticas-container {
  max-width: 900px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
}
.filtro {
  margin: 20px 0;
  text-align: center;
}
select {
  padding: 8px;
  font-size: 16px;
}
.grafica {
  margin: 40px 0;
}
</style>
