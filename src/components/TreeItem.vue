<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- Editable, clickable entity name -->
    <input v-if="editing"
           @change="updateEntityAndStopEditing($event)"
           :value="entity.names.join(' | ')"/>
    <span v-else
          class="entity-name"
          :class="{selected: entity.id === selectedEntityId}"
          @click="toggleAndEmitSelect">
      {{ entity.names.join(' | ') }}
    </span>

    <!-- Edit -->
    <span class="edit" @click="editing = true">
      (edit)
    </span>

    <!-- Delete -->
    <span class="delete" @click="deleteEntity">
      (delete)
    </span>

    <!-- Child entities & Input new child entity-->
    <ul v-if="extended">
      <TreeItem v-for="(child, index) in entity.children" :key="index"
                :entity="child"
                :selected-entity-id="selectedEntityId"
                @update="$emit('update', $event)"
                @select="$emit('select', $event)"/>

      <li>
        <input @change="updateEntity($event)"
               placeholder="New sub entity">
      </li>
    </ul>

  </li>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepEntity from '@/models/DeepEntity'
import Entity from '@/models/Entity'
import EntityService from '@/services/EntityService'

export default defineComponent({
  name: 'TreeItem',

  props: {
    entity: {
      type: Object as PropType<DeepEntity>,
      required: true
    },
    selectedEntityId: Number
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

      this.$emit('select', this.entity)
    },

    updateEntity(event: Event): void {
      const input = event.target as HTMLInputElement

      const entity: Entity = {
        id: 0,
        names: input.value.split(' | '),
        parent: this.entity.id
      }

      EntityService.postEntity(entity)
          .then(() => this.$emit('update'))
    },

    updateEntityAndStopEditing(event: Event): void {
      const input = event.target as HTMLInputElement

      const patchedEntity: Entity = {
        ...this.entity,

        names: input.value.split(' | ')
      }

      EntityService.putEntity(patchedEntity)
          .then(() => this.$emit('update'))

      this.editing = false
    },

    deleteEntity(): void {
      EntityService.deleteEntity(this.entity.id as number)
          .then(() => this.$emit('update'))
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.entity-name {
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
