<template>
    <ul>
      <TreeItem v-for="node in nodes" :key="node.id"
                :node="node"
                :selected-node-id="selectedNode?.id"
                @update="updateTaxonomy"
                @select="storeSelectedNodeAndPropagate($event)"/>

      <li>
        <input @change="createNode($event)"
               placeholder="New root node">
      </li>
    </ul>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import Node from '@/models/node/Node'
import NodeService from '@/services/NodeService'
import PostNode from '@/models/node/PostNode'
import PostNodeEntity from '@/models/entity/PostNodeEntity'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Footer',

  components: {TreeItem},

  data() {
    return {
      nodes: [] as DeepNode[],
      selectedNode: null as Node | null
    }
  },

  mounted() {
    this.updateTaxonomy()
  },

  methods: {
    updateTaxonomy(): void {
      NodeService.getNodes().then((nodes: DeepNode[]) => this.nodes = nodes)
    },

    createNode(event: Event): void {
      const input = event.target as HTMLInputElement

      const entityNames = input.value.split(' | ')
      const postNodeEntities = entityNames.map<PostNodeEntity>(name => {
        return {name}
      })

      const postNode: PostNode = {
        parentId: null,
        entities: postNodeEntities
      }

      NodeService.postNode(postNode)
          .then(() => this.updateTaxonomy())

      input.value = ''
    },

    storeSelectedNodeAndPropagate(node: Node): void {
      this.selectedNode = node

      this.$emit('select', node)
    }
  }
})

</script>

<!-- Nested CSS -->

<style>

ul {
  padding-left: 1em;
}

li {
  line-height: 1.5em;
}

</style>
