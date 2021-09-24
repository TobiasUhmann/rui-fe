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
            currentPage: 0
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

    methods: {
        setCurrentPage(event: Event) {
            const inputElement = event.target as HTMLInputElement
            const inputValue = Number(inputElement.value)
            const newCurrentPage = inputValue - 1

            this.currentPage = Math.min(Math.max(newCurrentPage, 0), this.numberOfPages - 1)
            this.$forceUpdate()
        }
    }
})
