<template>
  <ul id="demo">
    <TreeItem class="item"
              :item="treeData"
              @make-folder="makeFolder"
              @add-item="addItem"></TreeItem>
  </ul>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'
import TreeItem from '@/components/TreeItem.vue'
import Symptom from '@/models/symptom'

export default defineComponent({
  name: 'Tree',

  props: {
    treeData: Object as PropType<Symptom>
  },

  components: {TreeItem},

  methods: {
    makeFolder: function (item: Symptom): void {
      this.addItem(item)
    },

    addItem: function (item: Symptom): void {
      item.children.push({
        id: 0,
        name: 'New Cat',
        children: []
      })
    }
  }
})

</script>

<!-- CSS -->

<style>

ul {
  padding-left: 1em;
  line-height: 1.5em;
}

</style>
