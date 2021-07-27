<template>
  <ul>
    <TreeItem v-for="rootSymptom in rootSymptoms" :key="rootSymptom.id"
              :item="rootSymptom"/>

    <li>
      <input @change="createSymptom($event, null)"
             placeholder="New symptom">
    </li>
  </ul>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import Symptom from '@/models/symptom'
import SymptomService from '@/services/SymptomService'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {TreeItem},

  data() {
    return {
      rootSymptoms: [] as Symptom[]
    }
  },

  mounted() {
    this.getSymptoms()
  },

  methods: {
    getSymptoms(): void {
      SymptomService.getSymptoms()
          .then((symptoms: Symptom[]) => this.rootSymptoms = symptoms)
          .catch(error => console.error(error))
    },

    createSymptom(event: Event, parent: number | null): void {
      const input = event.target as HTMLInputElement

      const symptom = {
        id: null,
        name: input.value,
        parent: parent,
        children: []
      }

      SymptomService.addSymptom(symptom)
          .then(() => this.getSymptoms())
          .catch(error => console.error(error))
    }
  }
})

</script>

<!-- CSS -->

<style>

li {
  line-height: 1.5em;
}

</style>
