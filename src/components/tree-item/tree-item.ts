import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/deep-node'
import {getNodeName} from '@/models/node/node'

export default defineComponent({
    name: 'TreeItem',

    props: {
        node: {
            type: Object as PropType<DeepNode>,
            required: true
        },

        selectedNode: Object as PropType<DeepNode>
    },

    computed: {
        extendable(): boolean {
            return !this.extended && this.node.children.length > 0
        }
    },

    watch: {
        selectedNode: {
            immediate: true,
            handler(selectedNode: DeepNode | null) {
                if (selectedNode) {
                    const contains = this.containsNode(this.node, selectedNode)
                    if (contains) {
                        this.extended = true
                    }
                }
            }
        }
    },

    emits: {
        select(node: DeepNode) {
            return true
        }
    },

    data() {
        return {
            extended: false,
            getNodeName: getNodeName
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
        },

        containsNode(checkNode: DeepNode, searchNode: DeepNode): boolean {
            for (const child of checkNode.children) {
                if (child === searchNode) {
                    return true
                }

                const childContainsNode = this.containsNode(child, searchNode)
                if (childContainsNode) {
                    return true
                }
            }

            return false
        }
    }
})
