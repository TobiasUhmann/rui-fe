<template>

  <UploadWarning :class="[showUploadWarning ? 'd-block' : 'd-none']"
                 @cancel="showUploadWarning = false"
                 @overwrite="uploadAndRedirect"/>

  <form class="upload-form"
        ref="form"
        @submit.prevent="showUploadWarning = true">

    <label for="symptaxUploadZip">Symptax Upload ZIP</label>
    <input id="symptaxUploadZip" class="upload-form-input"
           type="file" name="symptaxUploadZip">

    <input class="upload-form-input"
           type="submit"
           value="Upload"/>
  </form>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import UploadWarning from '@/components/UploadWarning.vue'
import UploadService from "@/services/UploadService";

export default defineComponent({
  name: 'UploadView',

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
  grid-template-columns: 160px 1fr;
  grid-gap: 16px;

  width: 400px;
}

.upload-form-input {
  grid-column: 2;
}

</style>
