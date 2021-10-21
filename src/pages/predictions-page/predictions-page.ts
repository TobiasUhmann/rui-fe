import {defineComponent} from 'vue'

import PaginationBar from '@/components/pagination-bar/pagination-bar.vue'
import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import TreeItem from '@/components/tree-item/tree-item.vue'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {DeepNode} from '@/models/node/deep-node'
import {EntityService} from '@/services/entity-service'
import {NodeService} from '@/services/node-service'
import {PostEntity} from '@/models/entity/post-entity'
import {PostNode} from '@/models/node/post-node'
import {PredictionPatch} from '@/models/prediction/prediction-patch'
import {PredictionResponse} from '@/models/prediction/prediction-response'
import {PredictionService} from '@/services/prediction-service'

export default defineComponent({
    name: 'PredictionsPage',

    components: {PaginationBar, PredictionCard, TreeItem},

    data() {
        return {
            nodeId: null as number | null,
            rootNode: null as DeepNode | null,
            predictedNode: null as DeepNode | null,

            candidateWithPredictionsList: null as CandidateWithPredictions[] | null,
            numberOfPages: null as number | null,
            offset: 0
        }
    },

    mounted() {
        this.nodeId = Number(this.$route.params.node)
        this.loadRootNode(this.nodeId)

        this.$watch(
            () => this.$route.params,
            () => {
                this.nodeId = Number(this.$route.params.node)
                this.loadRootNode(this.nodeId)
            }
        )
    },

    methods: {
        loadRootNode(nodeId: number): void {
            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                this.findRootNode(rootNodes, nodeId)

                this.loadPredictions(nodeId, this.offset, 3)
            })
        },

        loadPredictions(nodeId: number, offset: number, limit: number): void {
            this.offset = offset

            PredictionService.getPredictions(nodeId, this.offset, limit).then((predictionResponse: PredictionResponse) => {
                this.candidateWithPredictionsList = predictionResponse.predictions
                this.numberOfPages = Math.ceil(predictionResponse.totalPredictions / 3)
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

        /**
         * Dismiss the prediction with the specified candidate and reload the predictions.
         *
         * Expects nodeId to be set.
         */
        dismissCandidateWithPredictions(candidate: string): void {
            const nodeId = this.nodeId!

            const predictionPatch: PredictionPatch = {dismissed: true}

            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {
                this.loadPredictions(nodeId, this.offset, 3)
            })
        },

        /**
         * Post entity via EntityService and reload the taxonomy. Also, dismiss the
         * annotated prediction and reload the predictions.
         *
         * Expects nodeId and candidateWithPredictionsList to be set.
         */
        createEntityAndDismissPrediction(index: number, postEntity: PostEntity) {
            const nodeId = this.nodeId!
            const candidateWithPredictionsList = this.candidateWithPredictionsList!

            const candidate = candidateWithPredictionsList[index].candidate
            const predictionPatch: PredictionPatch = {dismissed: true}

            PredictionService.patchPrediction(candidate, predictionPatch).then(() =>
                EntityService.postEntity(postEntity).then(() =>
                    this.loadRootNode(nodeId)))
        },

        /**
         * Post node via NodeService and reload the taxonomy. Also, dismiss the
         * annotated prediction and reload the predictions.
         *
         * Expects nodeId and candidateWithPredictionsList to be set.
         */
        createNodeAndDismissPrediction(index: number, postNode: PostNode) {
            const nodeId = this.nodeId!
            const candidateWithPredictionsList = this.candidateWithPredictionsList!

            const candidate = candidateWithPredictionsList[index].candidate
            const predictionPatch: PredictionPatch = {dismissed: true}

            PredictionService.patchPrediction(candidate, predictionPatch).then(() =>
                NodeService.postNode(postNode)
                    .then(() => this.loadRootNode(nodeId)))
        }
    }
})
