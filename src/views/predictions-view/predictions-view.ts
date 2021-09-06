import {defineComponent} from 'vue'

import DeepNode from '@/models/node/deep-node'
import NodeService from '@/services/node-service'
import Prediction from '@/models/prediction/prediction'
import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import PredictionService from '@/services/prediction-service'
import TreeItem from '@/components/tree-item/tree-item.vue'
import {PredictionInfo} from '@/components/prediction-card/prediction-info'
import {Relation} from '@/models/prediction/relation'

export default defineComponent({
    name: 'PredictionsView',

    components: {PredictionCard, TreeItem},

    data() {
        return {
            rootNode: null as DeepNode | null,
            predictedNode: null as DeepNode | null,
            predictions: null as Map<string, {
                parentPredictions: PredictionInfo[],
                synonymPredictions: PredictionInfo[]
            }> | null
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

                PredictionService.getPredictions(nodeId).then((predictions: Prediction[]) => {
                    this.fillPredictions(predictions)
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
        },

        fillPredictions(predictions: Prediction[]): void {
            this.predictions = new Map<string, {
                parentPredictions: PredictionInfo[],
                synonymPredictions: PredictionInfo[]
            }>()

            for (const prediction of predictions) {
                if (!this.predictions.get(prediction.candidate)) {
                    this.predictions.set(prediction.candidate, {
                        parentPredictions: [],
                        synonymPredictions: []
                    })
                }

                const predictionInfo = {
                    score: prediction.score,
                    nodeName: prediction.node.entities[0].name
                }

                const candidatePredictions = this.predictions.get(prediction.candidate)!

                if (prediction.relation === Relation.Parent) {
                    candidatePredictions.parentPredictions.push(predictionInfo)
                    candidatePredictions.parentPredictions.sort((a, b) => a.score - b.score)
                } else if (prediction.relation === Relation.Synonym) {
                    candidatePredictions.synonymPredictions.push(predictionInfo)
                    candidatePredictions.synonymPredictions.sort((a, b) => a.score - b.score)
                }
            }
        }
    }
})
