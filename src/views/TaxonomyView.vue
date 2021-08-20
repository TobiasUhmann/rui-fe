<template>

  <main class="taxonomy-grid">
    <section class="grid-section">
      <h1 class="grid-header">Taxonomy</h1>
      <Taxonomy @select="selectedNode = $event"/>
    </section>

    <section class="grid-section">
      <h1 class="grid-header">Matches</h1>
      <Matches :node="selectedNode"/>
    </section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import Matches from '@/components/Matches.vue'
import Node from '@/models/node/Node'
import Taxonomy from '@/components/Taxonomy.vue'

export default defineComponent({
  name: 'TaxonomyView',

  components: {Matches, Taxonomy},

  data() {
    return {
      selectedNode: null as Node | null
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.taxonomy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 32px;

  max-width: 1000px;
  margin: auto;
}

.grid-section {
  padding: 16px;
}

.grid-header {
  margin-bottom: 12px;
  padding: 16px;
  color: grey;
  border-bottom: 1px solid grey;
  text-align: center;
}

</style>
