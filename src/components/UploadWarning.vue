<template>
  <div class="modal-background">

    <div class="modal">
      <header class="modal-header">
        <h1>Caution</h1>
        <div class="close-button" @click="onCancel">&times;</div>
      </header>

      <main class="modal-content">
        <p class="message">Uploading will <b>overwrite</b> the existing taxonomy and matches!</p>
        <div class="buttons">
          <button class="button cancel" @click="onCancel">Cancel</button>
          <button class="button continue" @click="onOverwrite">Overwrite</button>
        </div>
      </main>
    </div>

  </div>
</template>

<!-- TypeScript -->

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'UploadWarning',

  emits: {
    cancel() {
      return true
    },

    overwrite() {
      return true
    }
  },

  methods: {
    onCancel(): void {
      this.$emit('cancel')
    },

    onOverwrite(): void {
      this.$emit('overwrite')
    }
  }
})

</script>

<!-- Scoped CSS -->

<style scoped>

/* Fullscreen Background */

.modal-background {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);
}

/* Centered Modal */

.modal {
  width: 400px;

  margin: 15vh auto;
}

/* Modal Style */

.modal {
  border: 1px solid black;
}

/* Modal Header */

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px;

  background-color: red;
  color: white;
}

.close-button {
  margin-right: 12px;

  font-size: 2em;

  cursor: pointer;
}

/* Modal Content */

.modal-content {
  padding: 12px;

  background-color: white;
}

.message {
  line-height: 1.2;
}

.buttons {
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
}

.buttons button:not(:last-child) {
  margin-right: 12px;
}

/* Buttons */

.button {
  padding: 8px;

  border: none;

  font-size: 1.0em;
  font-weight: bold;

  cursor: pointer;
}

.cancel {
  background-color: white;
  color: black;
}

.continue {
  background-color: red;
  color: white;
}

</style>
