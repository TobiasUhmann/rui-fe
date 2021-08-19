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
                  @update="updateTaxonomy"
                  @select="storeSelectedNodeAndGetMatches($event)"/>

        <li>
          <input @change="createNode($event)"
                 placeholder="New root node">
        </li>
      </ul>
    </section>

    <!-- Matches -->

    <section class="grid-section">
      <div v-for="(matches, entity) of entityToMatches" :key="entity">
        <h2 class="name-header">{{ entity }}</h2>

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

import DeepNode from '@/models/node/DeepNode'
import Match from '@/models/match/Match'
import MatchService from '@/services/MatchService'
import Node from '@/models/node/Node'
import NodeService from '@/services/NodeService'
import TreeItem from '@/components/TreeItem.vue'
import PostNode from "@/models/node/PostNode";

export default defineComponent({
  name: 'Taxonomy',

  components: {TreeItem},

  data() {
    return {
      nodes: [] as DeepNode[],
      selectedNode: null as null | Node,
      entityToMatches: {} as { [key: number]: Match[] }
    }
  },

  mounted() {
    this.updateTaxonomy()
  },

  methods: {
    updateTaxonomy(): void {
      NodeService.getNodes()
          .then((nodes: DeepNode[]) => this.nodes = nodes)
    },

    createNode(event: Event): void {
      const input = event.target as HTMLInputElement

      const entityNames = input.value.split(' | ')
      const postNodeEntities = entityNames.map(name => {
        name
      })

      const postNode: PostNode = {
        parent: null,
        entities: postNodeEntities
      }

      NodeService.postNode(postNode)
          .then(() => this.updateTaxonomy())

      input.value = ''
    },

    storeSelectedNodeAndGetMatches(node: Node): void {
      this.selectedNode = node

      this.getMatches(node)
    },

    getMatches(node: Node): void {
      this.entityToMatches = {}

      for (let entity of node.entities) {
        MatchService.getMatches(entity.id).then((matches: Match[]) => {
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

      for (let i = 0; i < match.mentionIdxs; i += 2) {
        const from = match.mentionIdxs[i]
        const until = match.mentionIdxs[i + 1]

        for (let j = from; j < until; j++) {
          markTokens += j
        }
      }

      const contextTokens = match.context.split()
      let htmlTokens: string[] = []

      for (let i = 0; i < contextTokens.length; i++) {

        if (markTokens.indexOf(i) !== -1) {
          htmlTokens += '<span class="mention">' + contextTokens[i] + '</span>'
        } else {
          htmlTokens += contextTokens[i]
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

<!-- Nested CSS -->

<style>

ul {
  padding-left: 1em;
}

li {
  line-height: 1.5em;
}

</style>
