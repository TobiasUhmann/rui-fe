import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import TreeItem from '@/components/tree_item/tree_item.vue'

export default defineComponent({
    name: 'Taxonomy',

    components: {TreeItem},

    props: {
        nodes: {
            type: Array as PropType<Array<DeepNode>>,
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
    }
})
