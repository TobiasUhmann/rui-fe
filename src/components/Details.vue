<template>
  <div v-if="node">

    {{ node.entities.length }} Entities:

    <ul class="entity-list">
      <li v-for="entity of node.entities" :key="entity.id">
        {{ entity.name }}
      </li>

      <li>
        <input @change="createEntity($event)"
               placeholder="New entity">
      </li>
    </ul>

  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import PostEntity from '@/models/entity/PostEntity'

export default defineComponent({
  name: 'Details',

  props: {
    node: Object as PropType<DeepNode>
  },

  methods: {
    createEntity(event: Event) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const node = this.node!

      const input = event.target as HTMLInputElement

      const postEntity: PostEntity = {
        nodeId: node.id,
        name: input.value
      }

      this.$emit('create', postEntity)

      input.value = ''
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.entity-list {
  margin-top: 4px;
  padding-left: 1.5em;
}

</style>
