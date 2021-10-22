import {defineComponent} from 'vue'

export default defineComponent({
    name: 'Loading',

    props: {
        message: {
            type: String,
            required: true
        }
    }
})
