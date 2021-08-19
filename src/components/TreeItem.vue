<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- Editable, clickable node name -->
    <input v-if="editing"
           @change="updateNodeAndStopEditing($event)"
           :value="node.names.join(' | ')"/>
    <span v-else
          class="node-name"
          :class="{selected: node.id === selectedNodeId}"
          @click="toggleAndEmitSelect">
      {{ node.names.join(' | ') }}
    </span>

    <!-- Edit -->
    <span class="edit" @click="editing = true">
      (edit)
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
        <input @change="createNode($event)"
               placeholder="New sub node">
      </li>
    </ul>

  </li>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/DeepNode'
import Node from '@/models/Node'
import NodeService from '@/services/NodeService'

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
      extended: false,
      editing: false
    }
  },

  methods: {
    toggleAndEmitSelect(): void {
      this.extended = !this.extended

      this.$emit('select', this.node)
    },

    createNode(event: Event): void {
      const input = event.target as HTMLInputElement

      const node: Node = {
        id: 0,
        names: input.value.split(' | '),
        parent: this.node.id
      }

      NodeService.postNode(node)
          .then(() => this.$emit('update'))
    },

    updateNodeAndStopEditing(event: Event): void {
      const input = event.target as HTMLInputElement

      const patchedNode: Node = {
        ...this.node,

        names: input.value.split(' | ')
      }

      NodeService.putNode(patchedNode)
          .then(() => this.$emit('update'))

      this.editing = false
    },

    deleteNode(): void {
      NodeService.deleteNode(this.node.id as number)
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

.edit, .delete {
  color: lightgrey;
  cursor: pointer;
}

.edit:hover, .delete:hover {
  color: grey;
}

/* Selected */

.selected {
  font-weight: bold;
}

</style>
