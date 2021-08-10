<template>
  <div>
    <Upload @uploaded="updateRootEntities"/>

    <h1>Taxonomy</h1>
    <ul>
      <TreeItem v-for="entity in entities" :key="entity.id"
                :entity="entity"
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
