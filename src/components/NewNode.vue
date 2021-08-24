<template>
  <div>

    {{ entityNames.length }}
    {{ entityNames.length === 1 ? 'Entity' : 'Entities' }}:

    <ul class="entity-list">

      <!-- Entities -->

      <li v-for="(entityName, index) of entityNames" :key="index">
        {{ entityName }}

        <!-- Delete Entity -->

        <span class="delete-entity"
              @click="entityNames.splice(index, 1)">
          (delete)
        </span>
      </li>

      <!-- Add Entity -->

      <li>
        <input @change="addEntityName($event)"
               placeholder="New Entity">
      </li>
    </ul>

    <!-- Create Node Button -->

    <button class="create-node"
            :disabled="entityNames.length === 0"
            @click="$emit('createNode', entityNames)">
      Create Node
    </button>

  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'NewNode',

  emits: {
    createNode(entityNames: string[]) {
      return entityNames.length > 0
    }
  },

  data() {
    return {
      entityNames: [] as string[]
    }
  },

  methods: {
    addEntityName(event: Event) {
      const inputElement = event.target as HTMLInputElement
      const inputValue = inputElement.value

      this.entityNames.push(inputValue)

      inputElement.value = ''
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

/* Delete Entity Link */

.delete-entity {
  color: lightgrey;
  cursor: pointer;
}

.delete-entity:hover {
  color: grey;
}

/* Create Node Button */

.create-node {
  margin-top: 16px;
}

</style>
