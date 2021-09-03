import {defineComponent} from 'vue'

import DeepNode from '@/models/node/deep-node'
import NodeService from '@/services/node-service'
import TreeItem from '@/components/tree-item/tree-item.vue'

export default defineComponent({
    name: 'PredictionsView',

    components: {TreeItem},

    watch: {
        $route(to) {
            console.log(to)
        }
    },

    data() {
        return {
            rootNodes: [] as DeepNode[]
        }
    },

    mounted() {
        const nodeId = Number(this.$route.params.node)
        this.loadRootNode(nodeId)

        this.$watch(
            () => this.$route.params,
            () => {
                const nodeId = Number(this.$route.params.node)
                this.loadRootNode(nodeId)
            }
        )
    },

    methods: {
        loadRootNode(nodeId: number): void {
            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                this.rootNodes = rootNodes.filter(node => this.isNodeOrHasChildNode(node, nodeId))
            })
        },

        isNodeOrHasChildNode(node: DeepNode, nodeId: number): boolean {
            if (node.id === nodeId) {
                return true
            }

            for (const child of node.children) {
                if (this.isNodeOrHasChildNode(child, nodeId)) {
                    return true
                }
            }

            return false
        }
    }
})
