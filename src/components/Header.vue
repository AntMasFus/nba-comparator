<template>
    <header>
      <h1>NBA Comparator</h1>
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/comparador">Comparador</router-link></li>
          <li><router-link to="/estadisticas">Estadísticas</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
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
  </style>
  