<template>
  <div>
    <h1>Taxonomy Upload</h1>
    <form>
      <label for="nodesTxtUpload">Nodes TXT</label>
      <input id="nodesTxtUpload" type="file">

      <label for="edgesTxtUpload">Edges TXT</label>
      <input id="edgesTxtUpload" type="file">

      <label for="metaYmlUpload">Meta YML</label>
      <input id="metaYmlUpload" type="file">

      <button>Upload</button>
    </form>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'TaxonomyUpload'
})

</script>

<!-- CSS -->

<style scoped>

h1 {
  margin: 0.5em auto;
}

form {
  display: grid;
  grid-template-columns: 100px 200px;
  grid-gap: 16px;
}

input,
button {
  grid-column: 2;
}

</style>
