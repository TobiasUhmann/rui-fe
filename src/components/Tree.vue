<template>
  <h2>Tree View</h2>
  <p>
    A tree view represents a hierarchical view of information, where each item
    can have a number of sub items.
  </p>
  <p>
    Click on the arrow(s) to open or close the tree branches.
  </p>

  <ul id="myUL">
    <li>
      <span class="caret">Beverages</span>
      <ul class="nested">
        <li>Water</li>
        <li>Coffee</li>
        <li>
          <span class="caret">Tea</span>
          <ul class="nested">
            <li>Black Tea</li>
            <li>White Tea</li>
            <li>
              <span class="caret">Green Tea</span>
              <ul class="nested">
                <li>Sencha</li>
                <li>Gyokuro</li>
                <li>Matcha</li>
                <li>Pi Lo Chun</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue';

export default defineComponent({
  name: `Tree`
})

</script>

<!-- CSS -->

<style>

</style>
