<template>
  <div>
    <TaxonomyUpload @uploaded="updateTaxonomy"/>

    <h1>Taxonomy</h1>
    <ul>
      <TreeItem v-for="rootEntity in taxonomy" :key="rootEntity.id"
                entity="rootEntity"
                @update="onUpdate"/>

      <li>
        <input @change="onCreate($event)"
               placeholder="New root entity">
      </li>
    </ul>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import DeepEntity from '@/models/DeepEntity'
import Entity from '@/models/Entity'
import TaxonomyService from '@/services/TaxonomyService'
import TaxonomyUpload from '@/components/TaxonomyUpload.vue'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {TaxonomyUpload, TreeItem},

  data() {
    return {
      taxonomy: [] as DeepEntity[]
    }
  },

  mounted() {
    this.updateTaxonomy()
  },

  methods: {
    updateTaxonomy(): void {
      TaxonomyService.getTaxonomy()
          .then((taxonomy: DeepEntity[]) => this.taxonomy = taxonomy)
          .catch(error => console.error(error))
    },

    createEntity(names: string[], parent: number | null): void {
      const entity: Entity = {
        id: null,
        names: names,
        parent: parent
      }

      TaxonomyService.postEntity(entity)
          .then(() => {
            this.updateTaxonomy()
          })
          .catch(error => console.error(error))
    },

    onCreate(event: Event): void {
      const input = event.target as HTMLInputElement

      this.createEntity(input.value.split(' | '), null)

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
