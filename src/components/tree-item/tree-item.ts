import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/deep-node'

export default defineComponent({
    name: 'TreeItem',

    props: {
        node: {
            type: Object as PropType<DeepNode>,
            required: true
        },

        selectedNode: Object as PropType<DeepNode>,

        showNewNodeButton: {
            type: Boolean,
            default: true
        },
        newNodeParentSelected: Boolean,
        newNodeParent: Object as PropType<DeepNode>
    },

    computed: {
        extendable(): boolean {
            return !this.extended && (this.node.children.length > 0 || this.showNewNodeButton)
        }
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
            if (this.extendable) {
                this.extended = true
            } else if (this.extended) {
                this.extended = false
            }

            this.$emit('select', this.node)
        }
    }
})
