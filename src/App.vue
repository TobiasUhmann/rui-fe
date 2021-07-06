<template>
  <div>
    <Header/>
    <router-view/>
  </div>
</template>

<!-- TypeScript -->

<script>

import Header from '@/components/Header';

export default {
  components: {Header}
}

</script>

<!-- CSS -->

<style>

* {
  margin: 0;
}

div {
  font-family: Helvetica, Arial, sans-serif;
}

</style>
