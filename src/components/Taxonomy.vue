<template>
  <div>
    <ul>
      <TreeItem v-for="node in nodes" :key="node.id"
                :node="node"
                :selected-node="selectedNode"
                @select="this.$emit('select', node)"
                @createNode="$emit('createNode', $event)"/>

      <li>
        <button @click="$emit('createNode', null)">New Root Node</button>
      </li>
    </ul>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import TreeItem from '@/components/TreeItem.vue'

export default defineComponent({
  name: 'Footer',

  components: {TreeItem},

  props: {
    nodes: {
      type: Array as PropType<Array<DeepNode>>,
      required: true
    },
    selectedNode: Object as PropType<DeepNode>
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
