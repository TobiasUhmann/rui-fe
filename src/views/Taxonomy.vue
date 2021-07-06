<template>
  {{ taxonomy }}
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: `Taxonomy`,

  data() {
    return {
      taxonomy: {}
    }
  },

  mounted() {
    fetch('https://rui-be-1-create-backend-jnqvtr.herokuapp.com/')
        .then(response => response.json())
        .then(data => this.taxonomy = data)
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
