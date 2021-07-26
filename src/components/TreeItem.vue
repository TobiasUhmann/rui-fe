<template>
  <div>
    <div :class="{bold: isFolder}" @click="toggle" @dblclick="makeFolder">
      {{ item.name }}
      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <li v-for="(child, index) in item.children" :key="index">
        <TreeItem class="item"
                  :item="child"
                  @make-folder="$emit('make-folder', $event)"
                  @add-item="$emit('add-item', $event)"/>
      </li>
      <li class="add" @click="$emit('add-item', item)">+</li>
    </ul>
  </div>
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
      isOpen: false
    }
  },

  computed: {
    isFolder: function (): boolean {
      return this.item.children.length > 0
    }
  },

  methods: {
    toggle: function (): void {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },

    makeFolder: function (): void {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    }
  }
})

</script>

<!-- CSS -->

<style scoped>

.item {
  cursor: pointer;
}

.bold {
  font-weight: bold;
}

</style>
