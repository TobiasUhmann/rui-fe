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
