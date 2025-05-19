import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue';
import Comparador from "../pages/Comparador.vue";
import Estadisticas from "../pages/Estadisticas.vue";
import ComparadorEquipos from "../pages/ComparadorEquipos.vue";
import Register from "../pages/Register.vue"
import Login from "../pages/Login.vue";
import Perfil from "../pages/Perfil.vue";
import Comunidad from "../pages/Comunidad.vue";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/comparador',
        name: 'Comparador',
        component: Comparador
    },
    {
        path: '/estadisticas',
        name: 'Estadisticas',   
        component: Estadisticas
    },
    {
        path: '/comparador-equipos',
        name: 'ComparadorEquipos',
        component: ComparadorEquipos
      },
      {
        path: '/registro',
        name: 'Registro',
        component: Register
        },
        {
          path: '/login',
          name: 'Login2',
          component: Login
        },
        {
            path:'/perfil',
            name:'Perfil',
            component: Perfil
        },
        {
            path:'/comunidad',
            name:'Comunidad',
            component: Comunidad
        }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router