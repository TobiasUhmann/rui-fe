<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- Editable, clickable symptom name -->
    <input v-if="editing"
           @change="onSaveEdit($event)"
           :value="symptom.name"/>
    <span v-else
          class="symptom-name"
          @click="onToggle">
      {{ symptom.name }}
    </span>

    <!-- Edit -->
    <span class="edit" @click="onStartEdit">
      (edit)
    </span>

    <!-- Delete -->
    <span class="delete" @click="onDelete">
      (delete)
    </span>

    <!-- Child symptoms & Input new child symptom-->
    <ul v-if="extended">
      <TreeItem v-for="(child, index) in symptom.children" :key="index"
                :symptom="child"
                @update="$emit('update', $event)"/>

      <li>
        <input @change="onCreate($event)"
               placeholder="New symptom">
      </li>
    </ul>

  </li>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepSymptom from '@/models/DeepSymptom'
import SymptomService from '@/services/SymptomService'

export default defineComponent({
  name: 'TreeItem',

  props: {
    symptom: {
      type: Object as PropType<DeepSymptom>,
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

      const symptom: DeepSymptom = {
        id: 0,
        name: input.value,
        parent: this.symptom.id,
        children: []
      }

      SymptomService.postSymptom(symptom)
          .then(() => this.$emit('update'))

      input.value = ''
    },

    onStartEdit(): void {
      this.editing = true
    },

    onSaveEdit(event: Event): void {
      const input = event.target as HTMLInputElement

      const patchedSymptom: DeepSymptom = {
        ...this.symptom,

        name: input.value
      }

      SymptomService.putSymptom(patchedSymptom)
          .then(() => this.$emit('update'))

      this.editing = false
    },

    onDelete(): void {
      SymptomService.deleteSymptom(this.symptom.id as number)
          .then(() => this.$emit('update'))
    }
  }
})

</script>

<!-- CSS -->

<style scoped>

.symptom-name {
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
