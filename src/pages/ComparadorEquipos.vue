<template>
    <div class="comparador-container">
      <h1>Comparador de Equipos</h1>
      <p>Compara equipos para contrastar información entre ellos</p>


      <div class="inputs-container">
        <select v-model="equipoId1">
          <option disabled value="">Selecciona equipo 1</option>
          <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">
            {{ equipo.full_name }}
          </option>
        </select>

        <select v-model="equipoId2">
          <option disabled value="">Selecciona equipo 2</option>
          <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">
            {{ equipo.full_name }}
          </option>
        </select>

        <button @click="buscarEquipos">Comparar</button>
      </div>

      <div v-if="equipo1 && equipo2" class="resultados">
        <div class="equipo">
          <h3>{{ equipo1.full_name }}</h3>
          <p>Conferencia: {{ equipo1.conference }}</p>
          <p>División: {{ equipo1.division }}</p>
          <p>Campeonatos: {{ equipo1.campeonatos }}</p>
          <p>Estadio: {{ equipo1.estadio }}</p>
          <p>Capacidad Estadio: {{ equipo1.capacidad_estadio }}</p>
        </div>

        <div class="equipo">
          <h3>{{ equipo2.full_name }}</h3>
          <p>Conferencia: {{ equipo2.conference }}</p>
          <p>División: {{ equipo2.division }}</p>
          <p>Campeonatos: {{ equipo2.campeonatos }}</p>
          <p>Estadio: {{ equipo2.estadio }}</p>
          <p>Capacidad Estadio: {{ equipo2.capacidad_estadio }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const equipoId1 = ref('')
const equipoId2 = ref('')
const equipo1 = ref(null)
const equipo2 = ref(null)
const equipos = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/equipos')
    equipos.value = res.data
    console.log('Equipos cargados:', equipos.value)
  } catch (error) {
    console.error('Error al cargar equipos:', error)
  }
})

const buscarEquipos = async () => {
  try {
    const [res1, res2] = await Promise.all([
      axios.get(`http://localhost:3000/api/equipos/${equipoId1.value}`),
      axios.get(`http://localhost:3000/api/equipos/${equipoId2.value}`)
    ])
    equipo1.value = res1.data
    equipo2.value = res2.data
  } catch (error) {
    console.error('Error al buscar equipos:', error)
  }
}
</script>

<style scoped>
.comparador-container {
  font-family: 'Poppins', sans-serif;
  padding: 20px;
  text-align: center;
}
.inputs-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
select {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
}
.resultados {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
}
.equipo {
  border: 2px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background: #f9f9f9;
  width: 300px;
}
</style>
