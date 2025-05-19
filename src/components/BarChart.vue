<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

const props = defineProps({
  labels: Array,
  data: Array,
  label: String,
   color: {
    type: String,
    default: '#3b82f6' // Azul por defecto
  }
})

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.label,
          data: props.data,
          backgroundColor: props.color

        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
})
</script>
