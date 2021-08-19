<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- Node name -->

    <span class="node-name"
          :class="{selected: node.id === selectedNodeId}"
          @click="toggleAndEmitSelect">
      {{ `${node.entities[0].name} (+${node.entities.length - 1})` }}
    </span>

    <!-- Delete -->

    <span class="delete" @click="deleteNode">
      (delete)
    </span>

    <!-- Child nodes & Input new child node-->

    <ul v-if="extended">
      <TreeItem v-for="(child, index) in node.children" :key="index"
                :node="child"
                :selected-node-id="selectedNodeId"
                @update="$emit('update', $event)"
                @select="$emit('select', $event)"/>

      <li>
        <input placeholder="New child node"
               @change="createNode($event)">
      </li>
    </ul>

  </li>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import NodeService from '@/services/NodeService'
import PostNode from '@/models/node/PostNode'
import PostNodeEntity from '@/models/entity/PostNodeEntity'

export default defineComponent({
  name: 'TreeItem',

  props: {
    node: {
      type: Object as PropType<DeepNode>,
      required: true
    },
    selectedNodeId: Number
  },

  data() {
    return {
      extended: false
    }
  },

  methods: {
    toggleAndEmitSelect(): void {
      this.extended = !this.extended

      this.$emit('select', this.node)
    },

    createNode(event: Event): void {
      const input = event.target as HTMLInputElement

      const entityNames = input.value.split(' | ')
      const postNodeEntities = entityNames.map<PostNodeEntity>(name => {
        return {name}
      })

      const postNode: PostNode = {
        parentId: this.node.id,
        entities: postNodeEntities
      }

      NodeService.postNode(postNode)
          .then(() => this.$emit('update'))
    },

    deleteNode(): void {
      NodeService.deleteNode(this.node.id)
          .then(() => this.$emit('update'))
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.node-name {
  cursor: pointer;
}

/* List bullets */

ul {
  list-style-type: initial;
}

li.collapsed::marker {
  content: '+  ';
}

li.extended::marker {
  content: '-  ';
}

/* Edit, delete */

.delete {
  color: lightgrey;
  cursor: pointer;
}

.delete:hover {
  color: grey;
}

/* Selected */

.selected {
  font-weight: bold;
}

</style>
