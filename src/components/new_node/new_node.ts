import {defineComponent} from 'vue'

export default defineComponent({
    name: 'NewNode',

    emits: {
        createNode(entityNames: string[]) {
            return entityNames.length > 0
        }
    },

    data() {
        return {
            entityNames: [] as string[]
        }
    },

    methods: {
        addEntityName(event: Event) {
            const inputElement = event.target as HTMLInputElement
            const inputValue = inputElement.value

            this.entityNames.push(inputValue)

            inputElement.value = ''
        }
    }
})
