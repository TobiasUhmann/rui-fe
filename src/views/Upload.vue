<template>

  <UploadWarning :class="[showUploadWarning ? 'd-block' : 'd-none']"
                 @cancel="showUploadWarning = false"
                 @overwrite="uploadAndRedirect"/>

  <main class="upload-grid">
    <h1 class="grid-header">Upload</h1>

    <section class="grid-section">
      <form ref="form" @submit.prevent="showUploadWarning = true">

        <label for="nodesTxtUpload">Nodes TXT</label>
        <input id="nodesTxtUpload" type="file" name="nodesTxt">

        <label for="edgesTxtUpload">Edges TXT</label>
        <input id="edgesTxtUpload" type="file" name="edgesTxt">

        <label for="metaYmlUpload">Meta YML</label>
        <input id="metaYmlUpload" type="file" name="metaYml">

        <label for="matchTxtUpload">Match TXT</label>
        <input id="matchTxtUpload" type="file" name="matchTxt">

        <input type="submit" value="Upload"/>

      </form>
    </section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import UploadWarning from '@/components/UploadWarning.vue'
import UploadService from "@/services/UploadService";

export default defineComponent({
  name: 'UploadPage',

  components: {UploadWarning},

  emits: ['uploaded'],

  data() {
    return {
      showUploadWarning: false
    }
  },

  methods: {

    uploadAndRedirect(): void {
      const form = this.$refs.form as HTMLFormElement

      const formData = new FormData(form)
      UploadService.putUpload(formData)
          .then(() => this.$router.push('Taxonomy'))

      this.showUploadWarning = false

      form.reset()
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.upload-grid {
  display: grid;
  grid-template-columns: 1fr;

  max-width: 500px;
  margin: auto;
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
