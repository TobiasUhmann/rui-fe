<template>
  <header>

    <div class="title">
      <h1>RUI</h1>
      <h2>Hunting<br/>Entities</h2>
    </div>

    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/explore">Explore</router-link>
      <router-link to="/taxonomy">Taxonomy</router-link>
    </nav>

    <div class="logo">
      <img src="@/assets/logo-lavis.svg" alt="LAVIS Logo">
    </div>

  </header>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Header'
})

</script>

<!-- CSS -->

<style scoped>

/* Header Flex Layout */

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title, .logo {
  width: 200px;
}

/* Header Padding and Border */

header {
  padding: 16px;
  border-bottom: 1px solid lightgrey;
}

/* Title */

.title {
  display: flex;
}

h1, h2 {
  padding: 8px;
  font-size: 1.2em;
}

h2 {
  text-transform: uppercase;
  color: darkgrey;
  border-left: 2px solid darkgrey;
}

/* Nav Links */

a {
  margin: 8px;
  color: black;
  text-decoration: none;
}

/* LAVIS Logo */

img {
  width: 64px;
  height: 64px;
  float: right;
}

</style>
