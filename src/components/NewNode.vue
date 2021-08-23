<template>
  {{ parent }}
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'

export default defineComponent({
  name: 'NewNode',

  props: {
    parent: Object as PropType<DeepNode>
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

</style>
