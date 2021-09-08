import {defineComponent} from 'vue'

import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import TreeItem from '@/components/tree-item/tree-item.vue'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {DeepNode} from '@/models/node/deep-node'
import {NodeService} from '@/services/node-service'
import {PredictionService} from '@/services/prediction-service'

export default defineComponent({
    name: 'PredictionsView',

    components: {PredictionCard, TreeItem},

    data() {
        return {
            rootNode: null as DeepNode | null,
            predictedNode: null as DeepNode | null,
            candidateWithPredictionsList: null as CandidateWithPredictions[] | null
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
                this.findRootNode(rootNodes, nodeId)

                PredictionService.getPredictions(nodeId, 0, 10)
                    .then((candidateWithPredictionsList: CandidateWithPredictions[]) => {
                        this.candidateWithPredictionsList = candidateWithPredictionsList
                    })
            })
        },

        findRootNode(rootNodes: DeepNode[], nodeId: number): void {
            for (const rootNode of rootNodes) {
                const predictedNode = this.findNode(rootNode, nodeId)

                if (predictedNode) {
                    this.rootNode = rootNode
                    this.predictedNode = predictedNode
                    break
                }
            }
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
