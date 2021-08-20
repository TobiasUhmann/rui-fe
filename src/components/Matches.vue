<template>
  <div>
    <div v-for="(matches, entity) of entityToMatches" :key="entity">
      <h2 class="name-header">{{ entityToName[entity] }}</h2>

      <template v-if="matches.length > 0">
        <p v-for="(match, index) of matches" :key="index"
           class="phrase"
           v-html="getMarkedContext(match)">
        </p>

        <a class="load-more-matches"
           @click="$emit('loadMoreMatches', entity)">
          Load more
        </a>
      </template>

      <p v-else class="no-matches">
        No matches for this name
      </p>
    </div>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import Match from '@/models/match/Match'

export default defineComponent({
  name: 'Matches',

  props: {
    entityToMatchesData: {
      type: Object as PropType<{
        [entity: number]: {
          name: string,
          matchesCount: number,
          matches: Match[]
        }
      }>,
      required: true
    }
  },

  methods: {

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
