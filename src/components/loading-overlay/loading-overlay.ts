import {defineComponent} from 'vue'

export default defineComponent({
    name: 'LoadingOverlay',

    props: {
        message: {
            type: String,
            required: true
        }
    }
})
