<template>

  <main class="taxonomy-grid">
    <h1 class="grid-header">Taxonomy</h1>
    <h1 class="grid-header">Matches</h1>

    <Taxonomy @select="loadMatches($event)"/>

    <!-- Matches -->

    <section class="grid-section">
      <div v-for="(matches, entity) of entityToMatches" :key="entity">
        <h2 class="name-header">{{ entityToName[entity] }}</h2>

        <template v-if="matches.length > 0">
          <p v-for="(match, index) of matches" :key="index"
             class="phrase"
             v-html="getMarkedContext(match)">
          </p>

          <a class="load-more-matches"
             @click="loadMoreMatches(entity)">
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

import Match from '@/models/match/Match'
import MatchService from '@/services/MatchService'
import Node from '@/models/node/Node'
import Taxonomy from '@/components/Taxonomy.vue'

export default defineComponent({
  name: 'TaxonomyView',

  components: {Taxonomy},

  data() {
    return {
      entityToName: {} as { [key: number]: string },
      entityToMatches: {} as { [key: number]: Match[] }
    }
  },

  methods: {

    loadMatches(node: Node): void {
      this.entityToName = {}
      this.entityToMatches = {}

      for (let entity of node.entities) {
        MatchService.getMatches(entity.id).then((matches: Match[]) => {
          this.entityToName[entity.id] = entity.name
          this.entityToMatches[entity.id] = matches
        })
      }
    },

    loadMoreMatches(entityId: number): void {
      const existingEntityMatches = this.entityToMatches[entityId]

      MatchService.getMatches(entityId, existingEntityMatches.length).then((matches: Match[]) => {
        const entityToMatches = this.entityToMatches
        entityToMatches[entityId] = [...existingEntityMatches, ...matches]
        this.entityToMatches = entityToMatches
      })
    },

    getMarkedContext(match: Match): string {
      let markTokens: number[] = []

      for (let i = 0; i < match.mentionIndexes.length; i += 2) {
        const from = match.mentionIndexes[i]
        const until = match.mentionIndexes[i + 1]

        for (let j = from; j < until; j++) {
          markTokens.push(j)
        }
      }

      const contextTokens = match.context.split(' ')
      let htmlTokens: string[] = []

      for (let i = 0; i < contextTokens.length; i++) {

        if (markTokens.indexOf(i) !== -1) {
          htmlTokens.push('<span class="mention">' + contextTokens[i] + '</span>')
        } else {
          htmlTokens.push(contextTokens[i])
        }
      }

      return htmlTokens.join(' ')
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
