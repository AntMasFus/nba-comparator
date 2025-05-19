<template>
  <div class="home-container">
    <h1>Bienvenido a NBA Comparator!</h1>
    <p>Compara jugadores, equipos y estadísticas de la NBA de manera sencilla y visual.<br>
    Inicia sesión si ya estás registrado o regístrate con el link de abajo.</p>
  </div>

  <div class="login-container">
    <h2>Iniciar Sesión</h2>

    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>

    <p class="registro-link">
      ¿No tienes cuenta?
      <router-link to="/registro">Regístrate aquí</router-link>
    </p>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { userState } from '../stores/userStore'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  error.value = ''
  try {
    const res = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value
    })

    userState.login(res.data.usuario) // Guardar en estado global y localStorage
    router.push('/comparador')        // Redirige al comparador tras login

  } catch (err) {
    error.value = 'Credenciales incorrectas'
    console.error(err)
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  width: 97%;
  background-color: #0d47a1;
  color: white;
  border: none;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}

.registro-link {
  margin-top: 15px;
  font-size: 0.9em;
}

.home-container {
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20vh;
  text-align: center;
}
</style>
