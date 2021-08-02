<template>
  <div>
    <TaxonomyUpload @uploaded="updateTaxonomy"/>

    <h1>Taxonomy</h1>
    <ul>
      <TreeItem v-for="rootSymptom in taxonomy" :key="rootSymptom.id"
                :symptom="rootSymptom"
                @update="onUpdate"/>

      <li>
        <input @change="onCreate($event)"
               placeholder="New root symptom">
      </li>
    </ul>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import DeepSymptom from '@/models/DeepSymptom'
import SymptomService from '@/services/SymptomService'
import TaxonomyUpload from '@/components/TaxonomyUpload.vue'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {TaxonomyUpload, TreeItem},

  data() {
    return {
      taxonomy: [] as DeepSymptom[]
    }
  },

  mounted() {
    this.updateTaxonomy()
  },

  methods: {
    updateTaxonomy(): void {
      SymptomService.updateTaxonomy()
          .then((taxonomy: DeepSymptom[]) => this.taxonomy = taxonomy)
          .catch(error => console.error(error))
    },

    createSymptom(names: string[], parent: number | null): void {
      const symptom = {
        id: null,
        names: names,
        parent: parent
      }

      SymptomService.postSymptom(symptom)
          .then(() => {
            this.updateTaxonomy()
          })
          .catch(error => console.error(error))
    },

    onCreate(event: Event): void {
      const input = event.target as HTMLInputElement

      this.createSymptom(input.value.split(' | '), null)

      input.value = ''
    },

    onUpdate(): void {
      this.updateTaxonomy()
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

/* Other */

h1 {
  margin: 0.5em auto;
}

</style>

<!-- Nested CSS -->

<style>

ul {
  padding-left: 1em;
}

li {
  line-height: 1.5em;
}

</style>
