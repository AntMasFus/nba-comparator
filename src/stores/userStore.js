
import { reactive } from 'vue'

export const userState = reactive({
  usuario: JSON.parse(localStorage.getItem('usuario')) || null,

  login(usuario) {
    this.usuario = usuario
    localStorage.setItem('usuario', JSON.stringify(usuario))
  },

  logout() {
    this.usuario = null
    localStorage.removeItem('usuario')
    localStorage.removeItem('token')
  }
})
