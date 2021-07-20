<template>
  <Tree/>
  {{ taxonomy }}
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'
import Tree from '@/components/Tree.vue'

export default defineComponent({
  name: `Taxonomy`,

  components: {Tree},

  data() {
    return {
      taxonomy: {}
    }
  },

  mounted() {
    fetch('https://rui-be.herokuapp.com/')
        .then(response => response.json())
        .then(data => this.taxonomy = data)
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
