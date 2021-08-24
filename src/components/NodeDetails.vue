<template>
  <div v-if="node">

    <p>
      {{ shallowNodeMatches }} shallow matches, {{ deepNodeMatches }} deep matches
    </p>

    <p>
      {{ node.entities.length }}
      {{ node.entities.length === 1 ? 'Entity' : 'Entities' }}:
    </p>

    <ul class="entity-list">

      <!-- Entities -->

      <li v-for="entity of node.entities" :key="entity.id">
        {{ entity.name }}, {{ entity.matchesCount }} {{ entity.matchesCount === 1 ? 'match' : 'matches' }}

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
import Entity from '@/models/entity/Entity'
import PostEntity from '@/models/entity/PostEntity'

export default defineComponent({
  name: 'NodeDetails',

  props: {
    node: Object as PropType<DeepNode>
  },

  watch: {
    node: {
      immediate: true,
      handler(node: DeepNode) {
        const {shallowNodeMatches, deepNodeMatches} = this.countMatches(node)

        this.shallowNodeMatches = shallowNodeMatches
        this.deepNodeMatches = deepNodeMatches
      }
    }
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

  data() {
    return {
      shallowNodeMatches: undefined as number | undefined,
      deepNodeMatches: undefined as number | undefined
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
    },

    countMatches(node: DeepNode): { shallowNodeMatches: number, deepNodeMatches: number } {
      const shallowNodeMatches = this.countShallowNodeMatches(node)
      const deepNodeMatches = this.countDeepNodeMatches(node)

      return {shallowNodeMatches, deepNodeMatches}
    },

    countShallowNodeMatches(node: DeepNode): number {
      return node.entities.reduce((nodeMatches: number, entity: Entity) =>
          nodeMatches + entity.matchesCount, 0)
    },

    countDeepNodeMatches(node: DeepNode): number {
      let deepMatches = this.countShallowNodeMatches(node)

      for (let child of node.children) {
        deepMatches += this.countDeepNodeMatches(child)
      }

      return deepMatches
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

p {
  padding-top: 8px;
  padding-bottom: 8px;
}

.entity-list {
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
