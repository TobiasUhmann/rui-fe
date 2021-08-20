<template>

  <main class="grid">
    <section class="grid-section grid-taxonomy">
      <h1 class="grid-header">Taxonomy</h1>
      <Taxonomy class="grid-content"
                @select="selectedNode = $event"/>
    </section>

    <section class="grid-section grid-details">
      <h1 class="grid-header">Details</h1>
      <Details class="grid-content"/>
    </section>

    <section class="grid-section grid-matches">
      <h1 class="grid-header">Matches</h1>
      <Matches class="grid-content"
               :node="selectedNode"/>
    </section>
  </main>

</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

import Matches from '@/components/Matches.vue'
import Node from '@/models/node/Node'
import Taxonomy from '@/components/Taxonomy.vue'
import Details from "@/components/Details.vue";

export default defineComponent({
  name: 'TaxonomyView',

  components: {Details, Matches, Taxonomy},

  data() {
    return {
      selectedNode: null as Node | null
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

.grid {
  display: grid;
  grid-template-areas:
    "taxonomy details"
    "taxonomy matches";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 32px;

  max-width: 1000px;
  margin: auto;
  padding: 16px;
}

.grid-content {
  padding: 16px;
}

.grid-taxonomy {
  grid-area: taxonomy;
}

.grid-details {
  grid-area: details;
}

.grid-matches {
  grid-area: matches;
}

.grid-header {
  padding: 16px;
  color: grey;
  border-bottom: 1px solid grey;
  text-align: center;
}

</style>
