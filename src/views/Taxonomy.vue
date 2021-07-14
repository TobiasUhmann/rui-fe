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
    fetch('https://rui-be-3-create-databas-oemcgs.herokuapp.com/db')
        // .then(response => response.json())
        .then(data => {
          console.log(data)
          this.taxonomy = data
        })
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
