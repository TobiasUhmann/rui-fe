<template>
  <footer>
    <img src="@/assets/logo-empolis.png" alt="Empolis Logo"/>
    <img src="@/assets/logo-hsrm.svg" alt="HSRM Logo"/>
  </footer>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Footer'
})

</script>

<!-- Scoped CSS -->

<style scoped>

/* Flex Layout */

footer {
  display: flex;
  justify-content: space-between;
}

img {
  height: 40px;
}

/* Padding and Border */

footer {
  padding: 16px;
  border-top: 1px solid lightgrey;
}

</style>
