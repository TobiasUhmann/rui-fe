<template>

  <UploadWarning :class="[showUploadWarning ? 'd-block' : 'd-none']"
                 @cancel="showUploadWarning = false"
                 @overwrite="uploadAndRedirect"/>

  <form class="upload-form"
        ref="form"
        @submit.prevent="showUploadWarning = true">

    <label for="nodesTxtUpload">Nodes TXT</label>
    <input id="nodesTxtUpload" class="upload-form-input"
           type="file" name="nodesTxt">

    <label for="edgesTxtUpload">Edges TXT</label>
    <input id="edgesTxtUpload" class="upload-form-input"
           type="file" name="edgesTxt">

    <label for="metaYmlUpload">Meta YML</label>
    <input id="metaYmlUpload" class="upload-form-input"
           type="file" name="metaYml">

    <label for="matchTxtUpload">Match TXT</label>
    <input id="matchTxtUpload" class="upload-form-input"
           type="file" name="matchTxt">

    <input type="submit" class="upload-form-input"
           value="Upload"/>
  </form>

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

/* Upload Warning Modal */

.d-none {
  display: none;
}

.d-block {
  display: block;
}

/* Form Position */

.upload-form {
  margin: 32px auto;
}

/* Form Layout */

.upload-form {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 16px;

  width: 360px;
}

.upload-form-input {
  grid-column: 2;
}

</style>
