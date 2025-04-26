<template>
    <div class="comparador-container">
        <h1>Comparador de jugadores</h1>
        <p>Compara jugadores, equipos y estadísticas de la NBA de manera sencilla y visual.</p>

        <div class="inputs-container">
            <input
                type="text"
                placeholder="Buscar primer jugador"
                v-model="jugador1"
                class="input-jugador"
            />
            <input
                type="text"
                placeholder="Buscar segundo jugador"
                v-model="jugador2"
                class="input-jugador"
            />  

            <button @click="buscarJugadores" class="buscar-button">Buscar</button>
        </div>

        <div v-if="resultadosJugador1.length && resultadosJugador2.length" class="resultados-comparacion">
            <div class="jugador">
                <h2>{{ resultadosJugador1[0].first_name }} {{ resultadosJugador1[0].last_name }}</h2>
                <p>Altura: {{ resultadosJugador1[0].height || 'N/A' }}</p>
                <p>Peso: {{ resultadosJugador1[0].weight || 'N/A' }} lbs</p>
                <p>Posición: {{ resultadosJugador1[0].position || 'N/A' }}</p>
                <p>Equipo: {{ resultadosJugador1[0].team?.full_name || 'N/A' }}</p>
                <p>País: {{ resultadosJugador1[0].country || 'N/A' }}</p>
            </div>
            
            <div class="jugador">
                <h2>{{ resultadosJugador2[0].first_name }} {{ resultadosJugador2[0].last_name }}</h2>
                <p>Altura: {{ resultadosJugador2[0].height || 'N/A' }}</p>
                <p>Peso: {{ resultadosJugador2[0].weight || 'N/A' }} lbs</p>
                <p>Posición: {{ resultadosJugador2[0].position || 'N/A' }}</p>
                <p>Equipo: {{ resultadosJugador2[0].team?.full_name || 'N/A' }}</p>
                <p>País: {{ resultadosJugador2[0].country || 'N/A' }}</p>
            </div>
        </div>    
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { buscarJugador } from '../services/apiNBA'


const jugador1 = ref('')
const jugador2 = ref('')
const resultadosJugador1 = ref([])
const resultadosJugador2 = ref([])

async function buscarJugadores(){
    if (jugador1.value) {
        resultadosJugador1.value = await buscarJugador(jugador1.value)
        console.log('Jugador 1:', resultadosJugador1.value)
       
    }
    if (jugador2.value) {
        resultadosJugador2.value = await buscarJugador(jugador2.value)
        console.log('Jugador 2:', resultadosJugador2.value)

    }
}
</script>

<style scoped>
.comparador-container {
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
}
.input-jugador {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 5px;
    width: 250px;
    font-size: 16px;
}
.buscar-button {
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

.resultados-comparacion {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    width: 80%;
}

.jugador {
    padding: 20px;
    border: 1px solid #ccc;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 8px;
    width: 45%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.jugador h2 {
    font-size: 20px;
    margin-bottom: 15px;
}

.jugador p {
    margin: 5px 0;
}
</style>