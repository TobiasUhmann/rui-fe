<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- (Clickable) symptom name -->
    <span @click="toggle">
      {{ symptom.name }}
    </span>

    <!-- Child symptoms & Input new child symptom-->
    <ul v-if="extended">
      <TreeItem v-for="(child, index) in symptom.children" :key="index"
                :symptom="child"
                @create-symptom="$emit('create-symptom', $event)"/>

      <li>
        <input @change="emitCreateSymptom($event)"
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
      extended: false
    }
  },

  methods: {
    toggle: function (): void {
      this.extended = !this.extended
    },

    emitCreateSymptom(event: Event): void {
      const input = event.target as HTMLInputElement

      this.$emit('create-symptom', {name: input.value, parent: this.symptom.id})

      input.value = ''
    }
  }
})

</script>

<!-- CSS -->

<style scoped>

li {
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

</style>
