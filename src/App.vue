<template>
  <div class="app">
    <Header/>
    <main>
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<!-- TypeScript -->

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {Footer, Header}
}

</script>

<!-- CSS -->

<style>

* {
  margin: 0;
}

.app {
  font-family: Helvetica, Arial, sans-serif;
}

/* App Layout */

.app {
  display: flex;
  flex-direction: column;

  height: 100vh;
}

.app main {
  flex-grow: 1;
}

/* */

main {
  padding: 12px;
}

.grid-header {
  padding: 16px;
  color: grey;
  border-bottom: 1px solid grey;
  text-align: center;
}

.grid-section {
  padding: 16px;
}

</style>
