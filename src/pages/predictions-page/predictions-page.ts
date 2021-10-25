import {defineComponent} from 'vue'

import Loading from '@/components/loading/loading.vue'
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

    components: {Loading, PaginationBar, PredictionCard, TreeItem},

    data() {
        return {
            nodeId: null as number | null,
            rootNode: null as DeepNode | null,
            predictedNode: null as DeepNode | null,

            candidateWithPredictionsList: null as CandidateWithPredictions[] | null,
            numberOfPages: null as number | null,
            offset: 0,

            showLoadingGetNodes: false,
            showLoadingGetNodesTimeout: -1,

            showLoadingGetPredictions: false,
            showLoadingGetPredictionsTimeout: -1,

            showLoadingPatchPrediction: false,
            showLoadingPatchPredictionTimeout: -1,

            showLoadingPostNode: false,
            showLoadingPostNodeTimeout: -1,

            showLoadingPostEntity: false,
            showLoadingPostEntityTimeout: -1,
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
            this.showLoadingGetNodesTimeout = window.setTimeout(() => this.showLoadingGetNodes = true, 500)

            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                window.clearTimeout(this.showLoadingGetNodesTimeout)
                this.showLoadingGetNodesTimeout = -1
                this.showLoadingGetNodes = false

                this.findRootNode(rootNodes, nodeId)

                this.loadPredictions(nodeId, this.offset, 3)
            })
        },

        loadPredictions(nodeId: number, offset: number, limit: number): void {
            this.offset = offset

            this.showLoadingGetPredictionsTimeout = window.setTimeout(() => this.showLoadingGetPredictions = true, 500)

            PredictionService.getPredictions(nodeId, this.offset, limit).then((predictionResponse: PredictionResponse) => {
                window.clearTimeout(this.showLoadingGetPredictionsTimeout)
                this.showLoadingGetPredictionsTimeout = -1
                this.showLoadingGetPredictions = false

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

            this.showLoadingPatchPredictionTimeout = window.setTimeout(() => this.showLoadingPatchPrediction = true, 500)

            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {
                window.clearTimeout(this.showLoadingPatchPredictionTimeout)
                this.showLoadingPatchPredictionTimeout = -1
                this.showLoadingPatchPrediction = false

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

            this.showLoadingPatchPredictionTimeout = window.setTimeout(() => this.showLoadingPatchPrediction = true, 500)

            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {
                window.clearTimeout(this.showLoadingPatchPredictionTimeout)
                this.showLoadingPatchPredictionTimeout = -1
                this.showLoadingPatchPrediction = false

                this.showLoadingPostEntityTimeout = window.setTimeout(() => this.showLoadingPostEntity = true, 500)

                EntityService.postEntity(postEntity).then(() => {
                    window.clearTimeout(this.showLoadingPostEntityTimeout)
                    this.showLoadingPostEntityTimeout = -1
                    this.showLoadingPostEntity = false

                    this.loadRootNode(nodeId)
                })
            })
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

            this.showLoadingPatchPredictionTimeout = window.setTimeout(() => this.showLoadingPatchPrediction = true, 500)

            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {
                window.clearTimeout(this.showLoadingPatchPredictionTimeout)
                this.showLoadingPatchPredictionTimeout = -1
                this.showLoadingPatchPrediction = false

                this.showLoadingPostNodeTimeout = window.setTimeout(() => this.showLoadingPostNode = true, 500)

                NodeService.postNode(postNode).then(() => {
                    window.clearTimeout(this.showLoadingPostNodeTimeout)
                    this.showLoadingPostNodeTimeout = -1
                    this.showLoadingPostNode = false

                    this.loadRootNode(nodeId)
                })
            })
        }
    }
})
