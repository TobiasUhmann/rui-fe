<template>
  <li :class="[extended ? 'extended' : 'collapsed']">

    <!-- (Clickable) symptom name -->
    <span @click="toggle">
      {{ item.name }}
    </span>

    <!-- Child symptoms & Input new child symptom-->
    <ul v-if="extended">
      <TreeItem v-for="(child, index) in item.children" :key="index"
                :item="child"
                @add-item="$emit('add-item', $event)"/>

      <li>
        <input @change="$emit('add-item', item)"
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
    item: {
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
