import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue';
import Comparador from "../pages/Comparador.vue";
import Estadisticas from "../pages/Estadisticas.vue";
import ComparadorEquipos from "../pages/ComparadorEquipos.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router