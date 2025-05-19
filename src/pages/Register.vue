<template>
  <div class="register-container">
    <h2>Registro de Usuario</h2>

    <form @submit.prevent="registrarUsuario">
      <input v-model="nombre" type="text" placeholder="Nombre completo" required />
      <input v-model="nickname" type="text" placeholder="Nickname" required />
      <input v-model="email" type="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const nombre = ref('')
const nickname = ref('')
const email = ref('')
const password = ref('')
const mensaje = ref('')
const error = ref('')

const router = useRouter()

const registrarUsuario = async () => {
  mensaje.value = ''
  error.value = ''

  try {
    const res = await axios.post('http://localhost:3000/api/register', {
      nombre: nombre.value,
      nickname: nickname.value,
      email: email.value,
      password: password.value
    })

    mensaje.value = res.data.mensaje || 'Usuario registrado correctamente'

    // Redirigir después de 3 segundos
    setTimeout(() => {
      router.push('/login')
    }, 3000)

  } catch (err) {
    error.value = err.response?.data?.error || 'Error al registrar usuario'
  }
}
</script>


<style scoped>
.register-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

button {
  padding: 10px 20px;
  width: 100%;
  background-color: #0d47a1;
  color: white;
  border: none;
  border-radius: 4px;
}

.mensaje {
  color: green;
  margin-top: 10px;
  font-weight: bold;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
