<template>

  <main class="grid">
    <section class="grid-section grid-left">
      <h1 class="grid-header">Taxonomy</h1>
      <Taxonomy class="grid-content"
                :nodes="nodes"
                :selected-node="selectedNode"
                @select="selectNode($event)"
                @create="createNode($event)"/>
    </section>

    <section v-if="state === State.NewNode"
             class="grid-section grid-top-right">
      <h1 class="grid-header">New Node</h1>
      <NewNode></NewNode>
    </section>

    <section v-if="state === State.NodeDetails"
             class="grid-section grid-top-right">
      <h1 class="grid-header">Node Details</h1>
      <NodeDetails class="grid-content"
                   :node="selectedNode"
                   @createEntity="createEntity($event)"
                   @deleteEntity="deleteEntity($event)"
                   @deleteNode="deleteNode($event)"/>
    </section>

    <section v-if="state === State.NodeDetails"
             class="grid-section grid-bottom-right">
      <h1 class="grid-header">Matches</h1>
      <Matches class="grid-content"
               :node="selectedNode"/>
    </section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import NodeDetails from '@/components/NodeDetails.vue'
import EntityService from '@/services/EntityService'
import Matches from '@/components/Matches.vue'
import NewNode from '@/components/NewNode.vue'
import Node from '@/models/node/Node'
import NodeService from '@/services/NodeService'
import PostEntity from '@/models/entity/PostEntity'
import PostNode from '@/models/node/PostNode'
import Taxonomy from '@/components/Taxonomy.vue'

enum State {
  Default,
  NodeDetails,
  NewNode
}

export default defineComponent({
  name: 'TaxonomyView',

  components: {NewNode, NodeDetails, Matches, Taxonomy},

  data() {
    return {
      nodes: [] as DeepNode[],
      selectedNode: null as DeepNode | null,
      state: State.Default,

      State
    }
  },

  mounted() {
    this.loadTaxonomy()
  },

  methods: {
    loadTaxonomy(): void {
      NodeService.getNodes().then((nodes: DeepNode[]) => this.nodes = nodes)
    },

    reloadTaxonomy(): void {
      if (this.selectedNode) {
        this.reloadTaxonomyWithSelectedNode(this.selectedNode)
      } else {
        this.loadTaxonomy()
      }
    },

    reloadTaxonomyWithSelectedNode(selectedNode: Node): void {
      const selectedNodeId = selectedNode.id

      function findNodeInNodes(nodes: DeepNode[], id: number): DeepNode | null {
        for (let node of nodes) {
          if (node.id === id) {
            return node
          }

          const foundNode = findNodeInNodes(node.children, id)

          if (foundNode) {
            return foundNode
          }
        }

        return null
      }

      NodeService.getNodes().then((nodes: DeepNode[]) => {
        this.nodes = nodes

        this.selectedNode = findNodeInNodes(nodes, selectedNodeId)
      })
    },

    selectNode(node: DeepNode): void {
      this.selectedNode = node
      this.state = State.NodeDetails
    },

    createNode(postNode: PostNode): void {
      this.state = State.NewNode
      // NodeService.postNode(postNode).then(() => this.reloadTaxonomy())
    },

    deleteNode(node: Node): void {
      NodeService.deleteNode(node.id).then(() => {
        if (this.selectedNode && node.id === this.selectedNode.id) {
          this.selectedNode = null
        }

        this.reloadTaxonomy();
      })
    },

    createEntity(postEntity: PostEntity): void {
      EntityService.postEntity(postEntity).then(() => this.reloadTaxonomy())
    },

    deleteEntity(entityId: number): void {
      EntityService.deleteEntity(entityId).then(() => this.reloadTaxonomy())
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.grid {
  display: grid;
  grid-template-areas:
    "left top-right"
    "left bottom-right";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 32px;

  max-width: 1000px;
  margin: auto;
  padding: 16px;
}

.grid-content {
  padding: 16px;
}

.grid-left {
  grid-area: left;
}

.grid-top-right {
  grid-area: top-right;
}

.grid-bottom-right {
  grid-area: bottom-right;
}

.grid-header {
  padding: 16px;
  color: grey;
  border-bottom: 1px solid grey;
  text-align: center;
}

</style>
