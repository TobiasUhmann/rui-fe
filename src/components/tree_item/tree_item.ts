import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'

export default defineComponent({
    name: 'TreeItem',

    props: {
        node: {
            type: Object as PropType<DeepNode>,
            required: true
        },

        selectedNode: Object as PropType<DeepNode>,

        newNodeParentSelected: Boolean,
        newNodeParent: Object as PropType<DeepNode>
    },

    emits: {
        select(node: DeepNode) {
            return true
        },

        createNode(node: DeepNode | null) {
            return true
        }
    },

    data() {
        return {
            extended: false
        }
    },

    methods: {
        toggleAndEmitSelect(): void {
            this.extended = !this.extended

            this.$emit('select', this.node)
        }
    }
})
