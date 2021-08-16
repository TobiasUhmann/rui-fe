<template>

  <main class="upload-grid">
    <h1 class="grid-header">Upload</h1>

    <section class="grid-section">
      <UploadForm @uploaded="this.$router.push('Taxonomy')"/>
    </section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import UploadForm from '@/components/UploadForm.vue'

export default defineComponent({
  name: 'UploadPage',

  components: {UploadForm}
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

</style>
