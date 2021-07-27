<template>
  <ul>
    <TreeItem v-for="rootSymptom in rootSymptoms" :key="rootSymptom.id"
              :symptom="rootSymptom"
              @create-symptom="createSymptom($event.name, $event.parent)"/>

    <li>
      <input @change="createRootSymptom($event)"
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

    createSymptom(name: string, parent: number | null): void {
      const symptom = {
        id: null,
        name: name,
        parent: parent,
        children: []
      }

      SymptomService.addSymptom(symptom)
          .then(() => {
            this.getSymptoms()
          })
          .catch(error => console.error(error))
    },

    createRootSymptom(event: Event): void {
      const input = event.target as HTMLInputElement

      this.createSymptom(input.value, null)

      input.value = ''
    }
  }
})

</script>

<!-- CSS -->

<style>

ul {
  padding-left: 1em;
}

li {
  line-height: 1.5em;
}

</style>
