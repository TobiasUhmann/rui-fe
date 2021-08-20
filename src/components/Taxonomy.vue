<template>
  <div>
    <ul>
      <TreeItem v-for="node in nodes" :key="node.id"
                :node="node"
                :selected-node="selectedNode"
                @select="this.$emit('select', node)"
                @create="$emit('create', $event)"/>

      <li>
        <input @change="emitCreate($event)"
               placeholder="New Roo Node">
      </li>
    </ul>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import PostNode from '@/models/node/PostNode'
import PostNodeEntity from '@/models/entity/PostNodeEntity'
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
  },

  methods: {

    emitCreate(event: Event): void {
      const input = event.target as HTMLInputElement

      const entityNames = input.value.split(' | ')
      const postNodeEntities = entityNames.map<PostNodeEntity>(name => {
        return {name}
      })

      const postNode: PostNode = {
        parentId: null,
        entities: postNodeEntities
      }

      this.$emit('create', postNode)

      input.value = ''
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
