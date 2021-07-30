<template>
  <div>
    <h1>Taxonomy Upload</h1>
    <form @submit.prevent="onSubmit">
      <label for="nodesTxtUpload">Nodes TXT</label>
      <input id="nodesTxtUpload" type="file" name="nodesTxt">

      <label for="edgesTxtUpload">Edges TXT</label>
      <input id="edgesTxtUpload" type="file" name="edgesTxt">

      <label for="metaYmlUpload">Meta YML</label>
      <input id="metaYmlUpload" type="file" name="metaYml">

      <input type="submit" value="Upload"/>
    </form>
  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import SymptomService from '@/services/SymptomService'

export default defineComponent({
  name: 'TaxonomyUpload',

  methods: {
    onSubmit(event: Event) {
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)

      SymptomService.putTaxonomy(formData)
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

h1 {
  margin: 0.5em auto;
}

form {
  display: grid;
  grid-template-columns: 100px 200px;
  grid-gap: 16px;
}

input {
  grid-column: 2;
}

</style>
