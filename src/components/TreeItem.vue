<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- Editable, clickable entity name -->
    <input v-if="editing"
           @change="onSaveEdit($event)"
           :value="entity.names.join(' | ')"/>
    <span v-else
          class="entity-name"
          @click="onToggle">
      {{ entity.names.join(' | ') }}
    </span>

    <!-- Edit -->
    <span class="edit" @click="onStartEdit">
      (edit)
    </span>

    <!-- Delete -->
    <span class="delete" @click="onDelete">
      (delete)
    </span>

    <!-- Child entities & Input new child entity-->
    <ul v-if="extended">
      <TreeItem v-for="(child, index) in entity.children" :key="index"
                entity="child"
                @update="$emit('update', $event)"/>

      <li>
        <input @change="onCreate($event)"
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
import TaxonomyService from '@/services/TaxonomyService'

export default defineComponent({
  name: 'TreeItem',

  props: {
    entity: {
      type: Object as PropType<DeepEntity>,
      required: true
    }
  },

  data() {
    return {
      extended: false,
      editing: false
    }
  },

  methods: {
    onToggle(): void {
      this.extended = !this.extended
    },

    onCreate(event: Event): void {
      const input = event.target as HTMLInputElement

      const entity: Entity = {
        id: 0,
        names: input.value.split(' | '),
        parent: this.entity.id
      }

      TaxonomyService.postEntity(entity)
          .then(() => this.$emit('update'))

      input.value = ''
    },

    onStartEdit(): void {
      this.editing = true
    },

    onSaveEdit(event: Event): void {
      const input = event.target as HTMLInputElement

      const patchedEntity: Entity = {
        ...this.entity,

        names: input.value.split(' | ')
      }

      TaxonomyService.putEntity(patchedEntity)
          .then(() => this.$emit('update'))

      this.editing = false
    },

    onDelete(): void {
      TaxonomyService.deleteEntity(this.entity.id as number)
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

</style>
