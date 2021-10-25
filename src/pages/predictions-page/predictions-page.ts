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

            loadingMessages: [] as string[],
            showLoading: false,
            showLoadingTimeout: -1
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
        startLoading(loadingMessage: string): void {
            this.loadingMessages.push(loadingMessage)

            if (this.showLoadingTimeout === -1) {
                this.showLoadingTimeout = window.setTimeout(() => this.showLoading = true, 500);
            }
        },

        stopLoading(loadingMessage: string): void {

            // Remove loading message
            const index = this.loadingMessages.indexOf(loadingMessage)
            if (index !== -1) {
                this.loadingMessages.splice(index, 1)
            }

            // Stop timeout if there are no further loading messages
            if (this.loadingMessages.length === 0) {
                window.clearTimeout(this.showLoadingTimeout);
                this.showLoadingTimeout = -1
                this.showLoading = false
            }
        },

        loadRootNode(nodeId: number): void {
            this.startLoading('Loading nodes...')
            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                this.findRootNode(rootNodes, nodeId)

                this.loadPredictions(nodeId, this.offset, 3)

                this.stopLoading('Loading nodes...')
            })
        },

        loadPredictions(nodeId: number, offset: number, limit: number): void {
            this.offset = offset

            this.startLoading('Loading predictions...')
            PredictionService.getPredictions(nodeId, this.offset, limit).then((predictionResponse: PredictionResponse) => {
                this.candidateWithPredictionsList = predictionResponse.predictions
                this.numberOfPages = Math.ceil(predictionResponse.totalPredictions / 3)

                this.stopLoading('Loading predictions...')
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

            this.startLoading('Updating prediction...')
            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {
                this.loadPredictions(nodeId, this.offset, 3)

                this.stopLoading('Updating prediction...')
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

            this.startLoading('Updating prediction...')
            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {

                this.startLoading('Creating entity...')
                EntityService.postEntity(postEntity).then(() => {
                    this.loadRootNode(nodeId)

                    this.stopLoading('Creating entity...')
                })

                this.stopLoading('Updating prediction...')
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

            this.startLoading('Updating prediction...')
            PredictionService.patchPrediction(candidate, predictionPatch).then(() => {

                this.startLoading('Creating node...')
                NodeService.postNode(postNode).then(() => {
                    this.loadRootNode(nodeId)

                    this.stopLoading('Creating node...')
                })

                this.stopLoading('Updating prediction...')
            })
        }
    }
})
