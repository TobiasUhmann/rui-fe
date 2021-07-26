<template>
  <ul>
    <li v-for="rootSymptom in rootSymptoms" :key="rootSymptom.id">
      <Tree :tree-data="rootSymptom"/>
    </li>
  </ul>


</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import Symptom from '@/models/symptom'
import SymptomService from '@/services/SymptomService'
import Tree from '@/components/Tree.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {Tree},

  data() {
    return {
      rootSymptoms: [] as Symptom[]
    }
  },

  mounted() {
    SymptomService.getSymptoms()
        .then((symptoms: Symptom[]) => this.rootSymptoms = symptoms)
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
