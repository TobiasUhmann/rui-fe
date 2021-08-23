<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- Node name -->

    <span class="node-name"
          :class="{selected: node === selectedNode}"
          @click="toggleAndEmitSelect">
      {{ `${node.entities[0].name} (+${node.entities.length - 1})` }}
    </span>

    <!-- Child nodes & Input new child node-->

    <ul v-if="extended">
      <TreeItem v-for="(child, index) in node.children" :key="index"
                :node="child"
                :selected-node="selectedNode"
                :new-node-parent-selected="newNodeParentSelected"
                :new-node-parent="newNodeParent"
                @select="$emit('select', $event)"
                @createNode="$emit('createNode', $event)"/>

      <li>
        <button
            :class="{'new-node-parent': newNodeParentSelected && newNodeParent === node}"
            @click="$emit('createNode', node)">New Child Node</button>
      </li>
    </ul>

  </li>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'

export default defineComponent({
  name: 'TreeItem',

  props: {
    node: {
      type: Object as PropType<DeepNode>,
      required: true
    },

    selectedNode: Object as PropType<DeepNode>,

    newNodeParentSelected: Boolean,
    newNodeParent: Object as PropType<DeepNode>
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    select(node: DeepNode) {
      return true
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createNode(node: DeepNode | null) {
      return true
    }
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

/* Selected */

.selected {
  font-weight: bold;
}

/* Create Node Button */

.new-node-parent {
  font-weight: bold;
}

</style>
