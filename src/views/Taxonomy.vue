<template>

  <main v-if="entities.length === 0" class="upload-grid">
    <h1 class="grid-header">Upload</h1>

    <section class="grid-section">
      <Upload @uploaded="updateRootEntities"/>
    </section>
  </main>

  <main v-else class="taxonomy-grid">
    <h1 class="grid-header">Taxonomy</h1>
    <h1 class="grid-header">Matches</h1>

    <section class="grid-section">
      <ul>
        <TreeItem v-for="entity in entities" :key="entity.id"
                  :entity="entity"
                  @update="onUpdate"/>

        <li>
          <input @change="onCreate($event)"
                 placeholder="New root entity">
        </li>
      </ul>
    </section>

    <section class="grid-section">No entity selected</section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import DeepEntity from '@/models/DeepEntity'
import Entity from '@/models/Entity'
import EntityService from '@/services/EntityService'
import Upload from '@/components/Upload.vue'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {Upload, TreeItem},

  data() {
    return {
      entities: [] as DeepEntity[]
    }
  },

  mounted() {
    this.updateRootEntities()
  },

  methods: {
    updateRootEntities(): void {
      EntityService.getEntities()
          .then((entities: DeepEntity[]) => this.entities = entities)
          .catch(error => console.error(error))
    },

    createEntity(names: string[], parent: number | null): void {
      const entity: Entity = {
        id: null,
        names: names,
        parent: parent
      }

      EntityService.postEntity(entity)
          .then(() => {
            this.updateRootEntities()
          })
          .catch(error => console.error(error))
    },

    onCreate(event: Event): void {
      const input = event.target as HTMLInputElement

      this.createEntity(input.value.split(' | '), null)

      input.value = ''
    },

    onUpdate(): void {
      this.updateRootEntities()
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.taxonomy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 32px;

  max-width: 1000px;
  margin: auto;
}

.upload-grid {
  display: grid;
  grid-template-columns: 1fr;

  max-width: 500px;
  margin: auto;
}

.grid-header {
  padding: 16px;
  color: grey;
  border-bottom: 1px solid grey;
  text-align: center;
}

.grid-section {
  padding: 16px;
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
