import {defineComponent} from 'vue'

import PaginationBar from '@/components/pagination-bar/pagination-bar.vue'
import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import TreeItem from '@/components/tree-item/tree-item.vue'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {DeepNode} from '@/models/node/deep-node'
import {NodeService} from '@/services/node-service'
import {PostNode} from '@/models/node/post-node'
import {PredictionResponse} from '@/models/prediction/prediction-response'
import {PredictionService} from '@/services/prediction-service'
import {PostEntity} from "@/models/entity/post-entity";
import {EntityService} from "@/services/entity-service";

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

        dismissCandidateWithPredictions(candidate: string): void {
            PredictionService.patchPrediction(candidate, {dismissed: true}).then(() => {
                this.loadPredictions(this.nodeId!, this.offset, 3)
            })
        },

        /**
         * Post entity via EntityService and reload taxonomy.
         *
         * Expects nodeId to be set.
         */
        createEntity(postEntity: PostEntity) {
            const nodeId = this.nodeId!

            EntityService.postEntity(postEntity)
                .then(() => this.loadRootNode(nodeId))
        },

        /**
         * Post node via NodeService and reload taxonomy.
         *
         * Expects nodeId to be set.
         */
        createNode(postNode: PostNode) {
            const nodeId = this.nodeId!

            NodeService.postNode(postNode)
                .then(() => this.loadRootNode(nodeId))
        }
    }
})
