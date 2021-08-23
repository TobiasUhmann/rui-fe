<template>
  <div v-if="node">

    {{ node.entities.length }}
    {{ node.entities.length === 1 ? 'Entity' : 'Entities' }}:

    <ul class="entity-list">

      <!-- Entities -->

      <li v-for="entity of node.entities" :key="entity.id">
        {{ entity.name }}

        <!-- Delete -->

        <span class="delete-entity" @click="deleteEntity(entity.id)">
          (delete)
        </span>
      </li>

      <!-- New Entity -->

      <li>
        <input @change="createEntity($event)"
               placeholder="New Entity">
      </li>
    </ul>

    <!-- Delete Node -->

    <button class="delete-node"
            @click="$emit('deleteNode', node)">
      Delete Node
    </button>

  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import PostEntity from '@/models/entity/PostEntity'

export default defineComponent({
  name: 'NodeDetails',

  props: {
    node: Object as PropType<DeepNode>
  },

  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteNode(node: DeepNode) {
      return true
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createEntity(postEntity: PostEntity) {
      return true
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteEntity(entityId: number) {
      return true
    }
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

      this.$emit('createEntity', postEntity)

      input.value = ''
    },

    deleteEntity(entityId: number): void {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const node = this.node!

      if (node.entities.length > 1) {
        this.$emit('deleteEntity', entityId)
      }
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

/* Delete Link */

.delete-entity {
  color: lightgrey;
  cursor: pointer;
}

.delete-entity:hover {
  color: grey;
}

/* Delete Button */

.delete-node {
  margin-top: 16px;
}

</style>
