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

import {defineComponent} from 'vue'
import TreeItem from '@/components/TreeItem.vue'
import Symptom from '@/models/symptom'

export default defineComponent({
  name: 'Tree',

  props: {
    treeData: Symptom
  },

  components: {TreeItem},

  methods: {
    makeFolder: function (item) {
      item.children = []
      this.addItem(item)
    },

    addItem: function (item) {
      item.children.push({
        name: 'new stuff'
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
