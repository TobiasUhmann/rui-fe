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
                @select="$emit('select', $event)"
                @createNode="$emit('createNode', $event)"/>

      <li>
        <button @click="$emit('createNode', node)">New Root Node</button>
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
    selectedNode: Object as PropType<DeepNode>
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

</style>
