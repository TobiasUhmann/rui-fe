<template>

  <main class="taxonomy-grid">
    <h1 class="grid-header">Taxonomy</h1>
    <h1 class="grid-header">Matches</h1>

    <!-- Taxonomy -->

    <section class="grid-section">
      <ul>
        <TreeItem v-for="entity in entities" :key="entity.id"
                  :entity="entity"
                  :selected-entity-id="selectedEntity?.id"
                  @update="updateRootEntities"
                  @select="storeSelectedEntityAndGetMatches($event)"/>

        <li>
          <input @change="onCreate($event)"
                 placeholder="New root entity">
        </li>
      </ul>
    </section>

    <!-- Matches -->

    <section class="grid-section">
      <div v-for="(matches, name) of nameToMatches" :key="name">
        <h2 class="name-header">{{ name }}</h2>

        <template v-if="matches.length > 0">
          <p v-for="(match, index) of matches" :key="index"
             class="phrase"
             v-html="getMarkedPhrase(match)">
          </p>

          <a class="load-more-matches"
             @click="loadMoreMatches(name)">
            Load more
          </a>
        </template>

        <p v-else class="no-matches">
          No matches for this name
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
import MatchService from '@/services/MatchService'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {TreeItem},

  data() {
    return {
      entities: [] as Array<DeepEntity>,
      selectedEntity: null as null | Entity,
      nameToMatches: {} as { [key: string]: Array<Match> }
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

    storeSelectedEntityAndGetMatches(entity: Entity): void {
      this.selectedEntity = entity

      this.getMatches(entity)
    },

    getMatches(entity: Entity): void {
      this.nameToMatches = {}

      for (let name of entity.names) {
        MatchService.getMatches(name)
            .then(matches => {
              console.log(matches)
              const matchesDict = this.nameToMatches
              matchesDict[name] = matches
              this.nameToMatches = matchesDict
            })
      }
    },

    loadMoreMatches(name: string): void {
      const existingMatches = this.nameToMatches[name]

      MatchService.getMatches(name, existingMatches.length)
          .then(matches => {
            const matchesDict = this.nameToMatches
            matchesDict[name] = [...existingMatches, ...matches]
            this.nameToMatches = matchesDict
          })
    },

    getMarkedPhrase(match: Match): string {
      const phrase = match.phrase_text
      const mentionTokens = match.mention.split(' ')

      let html = ''
      let pos = 0

      for (let token of mentionTokens) {
        const phraseFromPos = phrase.substring(pos)

        const tokenStart = phraseFromPos.indexOf(token)
        const tokenEnd = tokenStart + token.length

        html += phraseFromPos.substring(0, tokenStart)
            + '<span class="mention">' + phraseFromPos.substring(tokenStart, tokenEnd) + '</span>'

        pos += tokenEnd
      }

      return html + phrase.substring(pos)
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

.grid-header {
  padding: 16px;
  color: grey;
  border-bottom: 1px solid grey;
  text-align: center;
}

.grid-section {
  padding: 16px;
}

.name-header {
  margin: 12px 0;
  font-size: 1.2em;
}

.phrase {
  margin: 12px 0;
}

.phrase >>> .mention {
  color: red;
  font-weight: bold;
}

.no-matches {
  color: grey;
}

.load-more-matches {
  color: grey;
  text-decoration: underline;
  cursor: pointer;
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
