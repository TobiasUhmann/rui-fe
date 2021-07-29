<template>
  <div>
    <TaxonomyUpload/>

    <h1>Taxonomy</h1>
    <ul>
      <TreeItem v-for="rootSymptom in rootSymptoms" :key="rootSymptom.id"
                :symptom="rootSymptom"
                @update="onUpdate"/>

      <li>
        <input @change="onCreate($event)"
               placeholder="New symptom">
      </li>
    </ul>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import Symptom from '@/models/symptom'
import SymptomService from '@/services/SymptomService'
import TaxonomyUpload from '@/components/TaxonomyUpload.vue'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {TaxonomyUpload, TreeItem},

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

      SymptomService.postSymptom(symptom)
          .then(() => {
            this.getSymptoms()
          })
          .catch(error => console.error(error))
    },

    onCreate(event: Event): void {
      const input = event.target as HTMLInputElement

      this.createSymptom(input.value, null)

      input.value = ''
    },

    onUpdate(): void {
      this.getSymptoms()
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

h1 {
  margin: 0.5em auto;
}

</style>

<!-- Deep CSS -->

<style>

ul {
  padding-left: 1em;
}

li {
  line-height: 1.5em;
}

</style>
