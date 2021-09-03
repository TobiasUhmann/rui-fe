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
            rootNode: null as DeepNode | null,
            predictedNode: null as DeepNode | null
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
                for (const rootNode of rootNodes) {
                    const predictedNode = this.findNode(rootNode, nodeId)

                    if (predictedNode) {
                        this.rootNode = rootNode
                        this.predictedNode = predictedNode
                        break
                    }
                }
            })
        },

        findNode(node: DeepNode, nodeId: number): DeepNode | null {
            if (node.id === nodeId) {
                return node
            }

            for (const child of node.children) {
                const foundNode = this.findNode(child, nodeId)

                if (foundNode) {
                    return foundNode
                }
            }

            return null
        }
    }
})
