<template>
  <header>
   <h1><img src="\logos-equipos\NBA.png" alt="NBA Comparator" width="10%"/>NBA Comparator</h1>
    
    <nav>
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/comparador">Comparador Jugadores</router-link></li>
        <li><router-link to="/comparador-equipos">Comparador Equipos</router-link></li>
        <li><router-link to="/estadisticas">Estadísticas</router-link></li>
        <li><router-link to="/comunidad">Comunidad</router-link></li>
        <li v-if="!userState.usuario"><router-link to="/login">Iniciar Sesión</router-link></li>
        <li v-if="!userState.usuario"><router-link to="/registro">Registrarse</router-link></li>
        <li v-if="userState.usuario" class="usuario-info">
          <router-link to="/perfil">{{ userState.usuario.nickname }}</router-link> |
          <a href="#" @click.prevent="cerrarSesion">Cerrar sesión</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { userState } from '../stores/userStore'

const router = useRouter()

// Obtener el usuario desde localStorage
const usuario = computed(() => {
  const data = localStorage.getItem('usuario')
  return data ? JSON.parse(data) : null
})

const cerrarSesion = () => {
  userState.logout()
  router.push('/login')
}
</script>

<style scoped>
header {
  font-family: 'Poppins', sans-serif;
  background-color: #0d47a1;
  color: white;
  padding: 1rem;
  text-align: center;
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
}

nav ul li {
  margin: 0 1rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav ul li a.router-link-exact-active {
  text-decoration: underline;
}

.usuario-info {
  font-weight: bold;
}
</style>
