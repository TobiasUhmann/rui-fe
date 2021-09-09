import {defineComponent} from 'vue'

export default defineComponent({
    name: 'PaginationBar',

    props: {
        numberOfPages: {
            type: Number,
            required: true
        }
    },

    emits: {
        input(currentPage: number) {
            return true
        }
    },

    data() {
        return {
            currentPage: 1
        }
    },

    watch: {
        currentPage: {
            immediate: true,
            handler(currentPage: number) {
                this.$emit('input', currentPage)
            }
        }
    },
})
