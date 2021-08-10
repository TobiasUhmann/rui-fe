<template>
  <TaxonomyUploadWarning :class="[showUploadWarning ? 'd-block' : 'd-none']"
                         @cancel="onCancelUpload"
                         @overwrite="onConfirmUpload"/>

  <div>
    <h1>Taxonomy Upload</h1>
    <form ref="form" @submit.prevent="onSubmit">
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

import TaxonomyService from '@/services/TaxonomyService'
import TaxonomyUploadWarning from '@/components/TaxonomyUploadWarning.vue'

export default defineComponent({
  name: 'TaxonomyUpload',

  components: {TaxonomyUploadWarning},

  emits: ['uploaded'],

  data() {
    return {
      showUploadWarning: false
    }
  },

  methods: {
    onSubmit() {
      this.showUploadWarning = true
    },

    onCancelUpload(): void {
      this.showUploadWarning = false
    },

    onConfirmUpload(): void {
      const form = this.$refs.form as HTMLFormElement

      const formData = new FormData(form)
      TaxonomyService.putTaxonomy(formData)
          .then(() => this.$emit('uploaded'))

      this.showUploadWarning = false

      form.reset()
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

/* Modal */

.d-none {
  display: none;
}

.d-block {
  display: block;
}

</style>
