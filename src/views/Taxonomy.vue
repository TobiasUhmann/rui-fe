<template>

  <!-- Upload -->

  <main v-if="entities.length === 0" class="upload-grid">
    <h1 class="grid-header">Upload</h1>

    <section class="grid-section">
      <Upload @uploaded="updateRootEntities"/>
    </section>
  </main>

  <!-- Taxonomy & Matches -->

  <main v-else class="taxonomy-grid">
    <h1 class="grid-header">Taxonomy</h1>
    <h1 class="grid-header">Matches</h1>

    <!-- Taxonomy -->

    <section class="grid-section">
      <ul>
        <TreeItem v-for="entity in entities" :key="entity.id"
                  :entity="entity"
                  :selected-entity-id="selectedEntity?.id"
                  @update="onUpdate"
                  @select="storeSelectedEntityAndGetMatches($event)"/>

        <li>
          <input @change="onCreate($event)"
                 placeholder="New root entity">
        </li>
      </ul>
    </section>

    <!-- Matches -->

    <section class="grid-section">
      <div v-for="(matches, name) of matches" :key="name">
        <h2>{{ name }}</h2>

        <p v-for="(match, index) of matches" :key="index">
          {{ match }}
        </p>
      </div>
    </section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import DeepEntity from '@/models/DeepEntity'
import Entity from '@/models/Entity'
import EntityService from '@/services/EntityService'
import Match from '@/models/Match'
import MatchesService from '@/services/MatchesService'
import TreeItem from '@/components/TreeItem.vue'
import Upload from '@/components/Upload.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {Upload, TreeItem},

  data() {
    return {
      entities: [] as DeepEntity[],
      selectedEntity: null as null | Entity,
      matches: {} as { [key: string]: Array<Match> }
    }
  },

  mounted() {
    this.updateRootEntities()
  },

  methods: {
    updateRootEntities(): void {
      EntityService.getEntities()
          .then((entities: DeepEntity[]) => this.entities = entities)
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
    },

    updateEntity(event: Event): void {
      const input = event.target as HTMLInputElement

      this.createEntity(input.value.split(' | '), null)

      input.value = ''
    },

    onUpdate(): void {
      this.updateRootEntities()
    },

    storeSelectedEntityAndGetMatches(entity: Entity): void {
      this.selectedEntity = entity

      this.matches = {}

      console.log(entity)

      for (let name of entity.names) {
        MatchesService.getMatches(name)
            .then(matches => {
              const newMatches = this.matches
              newMatches[name] = matches
              this.matches = newMatches
            })
      }
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
