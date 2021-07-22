<template>
  <Tree :tree-data="treeData"/>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'
import Tree from '@/components/Tree.vue'

export default defineComponent({
  name: `Taxonomy`,

  components: {Tree},

  data() {
    return {
      taxonomy: {},
      treeData: []
    }
  },

  mounted() {
    fetch('https://rui-be.herokuapp.com/')
        .then(response => response.json())
        .then(data => this.taxonomy = data)
        .then(d => {
          console.log(d)
          const data = d as any
          if (data.taxonomy.length > 0) {
            this.treeData = data.taxonomy[0]
          }
        })
  }
})

</script>

<!-- CSS -->

<style scoped>

</style>
