<template>
  <Tree v-for="rootSymptom in rootSymptoms" :key="rootSymptom.id"
        :tree-data="rootSymptom"/>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'
import Tree from '@/components/Tree.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {Tree},

  data() {
    return {
      rootSymptoms: []
    }
  },

  mounted() {
    fetch('https://rui-be.herokuapp.com/')
        .then(response => response.json())
        .then(data => this.rootSymptoms = data.taxonomy)
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
