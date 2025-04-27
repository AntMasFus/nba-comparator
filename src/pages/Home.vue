<template>
    <div class="home-container">
        <h1>Bienvenido a NBA Comparator!</h1>
        <p>Compara jugadores, equipos y estadísticas de la NBA de manera sencilla y visual.</p>
        <router-link to = "/comparador" class="home-button">
            ¡Comenzar comparación!
        </router-link>
    </div>
</template>


<script setup>
//No necesaria logica JavaScript en este componente
</script>


<style scoped>
.home-container {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    text-align: center;
}
.home-button {
    margin-top: 20px;
    background-color: #3b82f6;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
}
.home-button:hover {
    background-color: #2563eb;
}
</style>