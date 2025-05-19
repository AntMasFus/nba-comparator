<template>
  <div class="comunidad-container">
    <h2>Comunidad de Usuarios</h2>

    <div v-if="usuarios.length === 0">Cargando usuarios...</div>

    <div v-for="usuario in usuarios" :key="usuario.id" class="usuario-card">
      <h3>Usuario:  {{ usuario.nickname }}</h3>
      <p><strong>Equipo favorito:</strong> {{ usuario.equipo_favorito || 'No asignado' }}</p>
      <p><strong>Quinteto favorito:</strong></p>
      <ul>
        <li><strong>Base:</strong> {{ usuario.quinteto.base }}</li>
        <li><strong>Escolta:</strong> {{ usuario.quinteto.escolta }}</li>
        <li><strong>Alero:</strong> {{ usuario.quinteto.alero }}</li>
        <li><strong>Ala-Pívot:</strong> {{ usuario.quinteto.alapivot }}</li>
        <li><strong>Pívot:</strong> {{ usuario.quinteto.pivot }}</li>
      </ul>

      <textarea v-model="comentarios[usuario.id]" placeholder="Escribe un comentario..."></textarea>
      <button @click="enviarComentario(usuario.id)">Comentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const usuarios = ref([])
const comentarios = ref({})
const emisor = JSON.parse(localStorage.getItem('usuario'))

const cargarUsuarios = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/comunidad')
    usuarios.value = res.data
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

const enviarComentario = async (receptor_id) => {
  try {
    const mensaje = comentarios.value[receptor_id]
    if (!mensaje || mensaje.trim() === '') return

    await axios.post('http://localhost:3000/api/comunidad/comentarios', {
       emisor_id: emisor.id,
       receptor_id,
       contenido: mensaje
    })

    comentarios.value[receptor_id] = ''
    alert('Comentario enviado correctamente.')
  } catch (error) {
    console.error('Error al enviar comentario:', error)
  }
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<style scoped>
.comunidad-container {
  max-width: 800px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
}
.usuario-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
}
button {
  margin-top: 10px;
  background-color: #0d47a1;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
}
</style>
