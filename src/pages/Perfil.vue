<template>
  <div class="perfil-container">
    <h2>Perfil de Usuario</h2>

    <div class="info-usuario">
      <p><strong>Nombre:</strong> {{ usuario.nombre }}</p>
      <p><strong>Nickname:</strong> {{ usuario.nickname }}</p>
      <p><strong>Email:</strong> {{ usuario.email }}</p>
    </div>

    <!-- SELECCIÓN EQUIPO FAVORITO -->
    <div class="equipo-favorito">
      <label for="equipo">Selecciona tu equipo favorito:</label>
      <select v-model="equipoSeleccionado">
        <option disabled value="">-- Elige un equipo --</option>
        <option v-for="equipo in equipos" :key="equipo.id" :value="equipo.id">
          {{ equipo.full_name }}
        </option>
      </select>
      <button @click="guardarEquipo">Guardar</button>
    </div>

    <div v-if="equipoSeleccionado">
      <img :src="`/logos-equipos/${equipoAbreviatura}.png`" :alt="nombreEquipo" class="logo-equipo" />
    </div>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

    <!-- SELECCIÓN QUINTETO FAVORITO -->
    <h3>Selecciona tu quinteto favorito</h3>
    <div class="pista-container">
      <img src="/logos-equipos/court.png" alt="Pista de baloncesto" class="pista-img" />

      <div
        v-for="(pos, key) in posiciones"
        :key="key"
        class="posicion"
        :class="key"
      >
        <label>{{ pos.label }}</label>
        <input
          v-model="quinteto[key]"
          @input="buscarSugerencias(key)"
          placeholder="Nombre jugador"
        />
        <ul v-if="sugerencias[key].length" class="sugerencias-lista">
          <li
            v-for="jugador in sugerencias[key]"
            :key="jugador.id"
            @click="seleccionarJugador(key, jugador)"
          >
            {{ jugador.first_name }} {{ jugador.last_name }}
          </li>
        </ul>
      </div>
    </div>
    <button class="guardar-quinteto" @click="guardarQuinteto">Guardar Quinteto</button>

    <!-- COMENTARIOS RECIBIDOS -->
    <div class="comentarios-recibidos">
      <h3>Comentarios recibidos</h3>
      <div v-if="comentarios.length === 0">
        <p>No tienes comentarios aún.</p>
      </div>
      <ul v-else>
        <li v-for="comentario in comentarios" :key="comentario.id">
          <strong>{{ comentario.autor }}:</strong> {{ comentario.contenido }}
          <br />
          <small>{{ new Date(comentario.fecha).toLocaleString() }}</small>
          <br />
          <button @click="eliminarComentario(comentario.id)">Eliminar</button>

        </li>
      </ul>
    </div>
  </div>
  <!-- Botón para eliminar cuenta -->
<div class="eliminar-cuenta">
  <button @click="confirmarEliminacion">Eliminar cuenta</button>
</div>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { buscarJugador } from '../services/apiNBA'
import { useRouter } from 'vue-router'

const router = useRouter()

const usuario = JSON.parse(localStorage.getItem('usuario'))
const equipos = ref([])
const equipoSeleccionado = ref('')
const mensaje = ref('')

const quinteto = ref({
  base: '',
  escolta: '',
  alero: '',
  alapivot: '',
  pivot: ''
})

const sugerencias = ref({
  base: [],
  escolta: [],
  alero: [],
  alapivot: [],
  pivot: []
})

const comentarios = ref([])

const posiciones = {
  base: { label: 'Base' },
  escolta: { label: 'Escolta' },
  alero: { label: 'Alero' },
  alapivot: { label: 'Ala-Pívot' },
  pivot: { label: 'Pívot' }
}

const equipoAbreviatura = computed(() => {
  const equipo = equipos.value.find(e => e.id === equipoSeleccionado.value)
  return equipo ? equipo.abbreviation : ''
})

const nombreEquipo = computed(() => {
  const equipo = equipos.value.find(e => e.id === equipoSeleccionado.value)
  return equipo ? equipo.full_name : ''
})

const cargarEquipos = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/equipos')
    equipos.value = res.data
  } catch (error) {
    console.error('Error al cargar equipos:', error)
  }
}

const cargarEquipoFavorito = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/perfil/equipo-favorito/${usuario.id}`)
    if (res.data.equipo_id) {
      equipoSeleccionado.value = res.data.equipo_id
    }
  } catch (error) {
    console.error('Error al cargar equipo favorito:', error)
  }
}

const guardarEquipo = async () => {
  try {
    await axios.post('http://localhost:3000/api/perfil/equipo-favorito', {
      usuario_id: usuario.id,
      equipo_id: equipoSeleccionado.value
    })
    mensaje.value = 'Equipo favorito guardado correctamente'
    setTimeout(() => mensaje.value = '', 3000)
  } catch (error) {
    console.error('Error al guardar equipo favorito:', error)
  }
}

const buscarSugerencias = async (posicion) => {
  const texto = quinteto.value[posicion]
  if (texto.length < 2) {
    sugerencias.value[posicion] = []
    return
  }
  try {
    const resultados = await buscarJugador(texto)
    sugerencias.value[posicion] = resultados
  } catch (err) {
    console.error(`Error buscando jugador para ${posicion}:`, err)
  }
}

const seleccionarJugador = (posicion, jugador) => {
  quinteto.value[posicion] = `${jugador.first_name} ${jugador.last_name}`
  sugerencias.value[posicion] = []
}

const guardarQuinteto = async () => {
  try {
    await axios.post('http://localhost:3000/api/perfil/quinteto-favorito', {
      usuario_id: usuario.id,
      ...quinteto.value
    })
    mensaje.value = 'Quinteto guardado correctamente'
    setTimeout(() => mensaje.value = '', 3000)
  } catch (error) {
    console.error('Error al guardar quinteto:', error)
  }
}

const cargarQuinteto = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/perfil/quinteto-favorito/${usuario.id}`)
    if (res.data) {
      quinteto.value = {
        base: res.data.base || '',
        escolta: res.data.escolta || '',
        alero: res.data.alero || '',
        alapivot: res.data.alapivot || '',
        pivot: res.data.pivot || ''
      }
    }
  } catch (error) {
    console.error('Error al cargar quinteto:', error)
  }
}

const cargarComentarios = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/comunidad/comentarios/${usuario.id}`)
    comentarios.value = res.data
  } catch (error) {
    console.error('Error al cargar comentarios:', error)
  }
}

const eliminarComentario = async (comentarioId) => {
  try {
    await axios.delete(`http://localhost:3000/api/comunidad/comentarios/${comentarioId}`);
    await cargarComentarios(); // Refresca la lista
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
  }
};

const confirmarEliminacion = async () => {
  const confirmar = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
  if (!confirmar) return;

  try {
  await axios.delete(`http://localhost:3000/api/perfil/eliminar-cuenta/${usuario.id}`);
localStorage.removeItem('usuario');
window.location.href = '/'; // ✅ Redirección limpia fuera del router

  } catch (error) {
    console.error('Error al eliminar cuenta:', error);
    alert('Hubo un error al intentar eliminar la cuenta.');
  }
};





onMounted(() => {
  cargarEquipos()
  cargarEquipoFavorito()
  cargarQuinteto()
  cargarComentarios()
 // eliminarComentario()
})
</script>

<style scoped>
.perfil-container {
  max-width: 800px;
  margin: auto;
  font-family: 'Poppins', sans-serif;
}
.info-usuario, .equipo-favorito {
  margin-bottom: 20px;
}
select {
  padding: 10px;
  font-size: 1em;
  margin-right: 10px;
  margin-left: 10px;
}
button {
  padding: 10px 20px;
  background-color: #0d47a1;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}
.mensaje {
  margin-top: 15px;
  color: green;
  font-weight: bold;
}
.logo-equipo {
  margin-top: 20px;
  max-width: 120px;
  height: auto;
  display: block;
  margin: auto;

}
.pista-container {
  position: relative;
  margin-top: 40px;
}
.pista-img {
  width: 100%;
  max-width: 700px;
  display: block;
  margin: auto;
}
.posicion {
  position: absolute;
  width: 120px;
  text-align: center;
}
.posicion input {
  width: 100%;
  margin-top: 5px;
}
.sugerencias-lista {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  width: 100%;
}
.sugerencias-lista li {
  padding: 6px;
  cursor: pointer;
}
.sugerencias-lista li:hover {
  background: #eee;
}
.base { top: 25%; left: 50%; transform: translate(-50%, -50%); }
.escolta { top: 40%; left: 30%; transform: translate(-50%, -50%); }
.alero { top: 40%; left: 70%; transform: translate(-50%, -50%); }
.alapivot { top: 70%; left: 30%; transform: translate(-50%, -50%); }
.pivot { top: 70%; left: 70%; transform: translate(-50%, -50%); }

.comentarios-recibidos {
  margin-top: 40px;
}
.comentarios-recibidos ul {
  list-style: none;
  padding: 0;
}
.comentarios-recibidos li {
  margin-bottom: 10px;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
}
.btn-eliminar {
  margin-top: 5px;
  background-color: #c62828;
  color: white;
  border: none;
  padding: 8px 15px;
  font-size: 0.85em;
  border-radius: 4px;
  cursor: pointer;
}
.btn-eliminar:hover {
  background-color: #b71c1c;
}

.eliminar-cuenta {
  margin-top: 30px;
  text-align: center;
}
.eliminar-cuenta button {
  background-color: #b71c1c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
.eliminar-cuenta button:hover {
  background-color: #d32f2f;
}

</style>
