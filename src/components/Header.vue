<template>
  <header>

    <div class="title">
      <h1>RUI</h1>
      <h2>Hunting<br/>Entities</h2>
    </div>

    <nav>
      <router-link to="/aaa">Dashboard</router-link>
      <router-link to="/bbb">Explore</router-link>
      <router-link to="/ccc">Taxonomy</router-link>
    </nav>

    <div class="logo">
      <img src="@/assets/logo-lavis.svg" alt="LAVIS Logo">
    </div>

  </header>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: `Header`
})

</script>

<!-- CSS -->

<style scoped>

/* Header flex layout */

header {
  display: flex;
  align-items: center;
}

.title {
  width: 200px;
}

nav {
  flex-grow: 1;
}

.logo {
  width: 200px;
}

/* Header padding and border */

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

/* Nav links */

a {
  margin: 8px;
  color: black;
  text-decoration: none;
}

/* LAVIS logo */

img {
  width: 64px;
  height: 64px;
  float: right;
}

</style>
