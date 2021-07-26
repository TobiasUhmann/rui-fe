<template>
  <ul>
    <li v-for="rootSymptom in rootSymptoms" :key="rootSymptom.id">
      <Tree :tree-data="rootSymptom"/>
    </li>

    <li>
      <input @change="onAddRootSymptom($event)">
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
  },

  methods: {
    onAddRootSymptom(event: Event): void {
      const input = event.target as HTMLInputElement

      const symptom = {
        id: 0,
        name: input.value,
        children: []
      }

      SymptomService.addSymptom(symptom)
          .then(result => console.log(result))
    }
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
