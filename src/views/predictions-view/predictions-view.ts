import {defineComponent} from 'vue'

import DeepNode from '@/models/node/deep-node'
import NodeService from '@/services/node-service'
import TreeItem from '@/components/tree-item/tree-item.vue'

export default defineComponent({
    name: 'PredictionsView',

    components: {TreeItem},

    data() {
        return {
            rootNodes: [] as DeepNode[]
        }
    },

    mounted() {
        this.loadRootNode()
    },

    methods: {
        loadRootNode(): void {
            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                this.rootNodes = rootNodes
            })
        }
    }
})
