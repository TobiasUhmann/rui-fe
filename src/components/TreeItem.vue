<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- (Clickable) symptom name -->
    <span class="symptom-name" @click="onToggle">
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
                @create-symptom="$emit('create-symptom', $event)"/>

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

import Symptom from '@/models/symptom'

export default defineComponent({
  name: 'TreeItem',

  props: {
    symptom: {
      type: Object as PropType<Symptom>,
      required: true
    }
  },

  data: function () {
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

      this.$emit('create-symptom', {name: input.value, parent: this.symptom.id})

      input.value = ''
    },

    onStartEdit(): void {
      this.editing = true
    },

    onSaveEdit(event: Event): void {
      const input = event.target as HTMLInputElement

      this.$emit('edit-symptom', {id: this.symptom.id, name: input.value})

      this.editing = false
    },

    onDelete(): void {
      this.$emit('delete-symptom', this.symptom.id)
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
