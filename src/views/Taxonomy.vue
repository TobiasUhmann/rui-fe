<template>

  <main class="taxonomy-grid">
    <h1 class="grid-header">Taxonomy</h1>
    <h1 class="grid-header">Matches</h1>

    <!-- Taxonomy -->

    <section class="grid-section">
      <ul>
        <TreeItem v-for="node in nodes" :key="node.id"
                  :node="node"
                  :selected-node-id="selectedNode?.id"
                  @update="updateRootNodes"
                  @select="storeSelectedNodeAndGetMatches($event)"/>

        <li>
          <input @change="createNode($event)"
                 placeholder="New root node">
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

import DeepNode from '@/models/node/DeepNode'
import Match from '@/models/match/Match'
import MatchService from '@/services/MatchService'
import Node from '@/models/node/Node'
import NodeService from '@/services/NodeService'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Taxonomy',

  components: {TreeItem},

  data() {
    return {
      nodes: [] as Array<DeepNode>,
      selectedNode: null as null | Node,
      nameToMatches: {} as { [key: string]: Array<Match> }
    }
  },

  mounted() {
    this.updateRootNodes()
  },

  methods: {
    updateRootNodes(): void {
      NodeService.getNodes()
          .then((nodes: DeepNode[]) => this.nodes = nodes)
    },

    createNode(event: Event): void {
      const input = event.target as HTMLInputElement

      const node: Node = {
        id: null,
        names: input.value.split(' | '),
        parent: null
      }

      NodeService.postNode(node)
          .then(() => {
            this.updateRootNodes()
          })

      input.value = ''
    },

    storeSelectedNodeAndGetMatches(node: Node): void {
      this.selectedNode = node

      this.getMatches(node)
    },

    getMatches(node: Node): void {
      this.nameToMatches = {}

      for (let name of node.names) {
        MatchService.getMatches(name)
            .then(matches => {
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
