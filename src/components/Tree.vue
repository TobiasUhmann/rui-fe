<template>
  <ul id="demo">
    <TreeItem
        class="item"
        :item="treeData"
        @make-folder="makeFolder"
        @add-item="addItem"
    ></TreeItem>
  </ul>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue';
import TreeItem from '@/components/TreeItem.vue';

const treeData = {
  name: 'My Tree',
  children: [
    {name: 'hello'},
    {name: 'wat'},
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{name: 'hello'}, {name: 'wat'}]
        },
        {name: 'hello'},
        {name: 'wat'},
        {
          name: 'child folder',
          children: [{name: 'hello'}, {name: 'wat'}]
        }
      ]
    }
  ]
}

export default defineComponent({
  name: 'Tree',

  components: {TreeItem},

  data: function () {
    return {
      treeData: treeData
    }
  },

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
  list-style-type: dot;
}

</style>
