<template>
  <div v-if="node">

    <div v-for="(matchesData, entity) of entityToMatchesData" :key="entity">

      <h2 class="name-header">
        {{ matchesData.name }}
        ({{ matchesData.matches.length }} / {{ matchesData.matchesCount }})
      </h2>

      <!-- Contexts -->

      <template v-if="matchesData.matches.length > 0">
        <p v-for="(match, index) of matchesData.matches" :key="index"
           class="context"
           v-html="getMarkedContext(match)">
        </p>

        <!-- Load More -->

        <a v-if="matchesData.matches.length < matchesData.matchesCount"
           class="load-more-matches"
           @click="loadMoreMatches(entity)">
          Load more
        </a>
      </template>

      <!-- No Matches -->

      <p v-else class="no-matches">
        No matches for this name
      </p>
    </div>

  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import Match from '@/models/match/Match'
import MatchService from '@/services/MatchService'

export default defineComponent({
  name: 'Matches',

  props: {
    node: Object as PropType<DeepNode>
  },

  watch: {
    node: {
      immediate: true,
      handler(newNode: DeepNode | null) {
        this.loadMatches(newNode)
      }
    }
  },

  data() {
    return {
      entityToMatchesData: {} as {
        [entity: number]: {
          name: string,
          matchesCount: number,
          matches: Match[]
        }
      }
    }
  },

  methods: {

    loadMatches(node: DeepNode | null): void {
      this.entityToMatchesData = {}

      if (node) {
        for (let entity of node.entities) {
          MatchService.getMatches(entity.id).then((matches: Match[]) => {
            this.entityToMatchesData[entity.id] = {
              name: entity.name,
              matchesCount: entity.matchesCount,
              matches: matches
            }
          })
        }
      }
    },

    loadMoreMatches(entityId: number): void {
      const loadedEntityMatches = this.entityToMatchesData[entityId].matches

      MatchService.getMatches(entityId, loadedEntityMatches.length).then((matches: Match[]) => {
        this.entityToMatchesData[entityId].matches.push(...matches)
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

.name-header {
  margin: 12px 0;
  font-size: 1.2em;
}

.context {
  margin: 12px 0;
}

.context >>> .mention {
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
