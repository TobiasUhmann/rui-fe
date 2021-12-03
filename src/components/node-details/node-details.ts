import {defineComponent, PropType} from 'vue'

import {DeepNode} from '@/models/node/deep-node'
import {Entity} from '@/models/entity/entity'
import {PostEntity} from '@/models/entity/post-entity'
import {PredictionResponse} from "@/models/prediction/prediction-response";
import {PredictionService} from "@/services/prediction-service";

export default defineComponent({
    name: 'NodeDetails',

    props: {
        node: Object as PropType<DeepNode>
    },

    watch: {
        node: {
            immediate: true,
            handler(node: DeepNode) {
                this.resetNodeData()

                const {shallowNodeMatches, deepNodeMatches} = this.countMatches(node)

                this.shallowNodeMatches = shallowNodeMatches
                this.deepNodeMatches = deepNodeMatches

                this.countPredictions(node)
            }
        }
    },

    emits: {
        createNode(parent: DeepNode) {
            return true
        },

        deleteNode(node: DeepNode) {
            return true
        },

        createEntity(postEntity: PostEntity) {
            return true
        },

        deleteEntity(entityId: number) {
            return true
        }
    },

    data() {
        return {
            shallowNodeMatches: null as number | null,
            deepNodeMatches: null as number | null,

            synonymPredictions: null as number | null,
            childPredictions: null as number | null
        }
    },

    methods: {
        resetNodeData() {
            this.shallowNodeMatches = null
            this.deepNodeMatches = null

            this.synonymPredictions = null
            this.childPredictions = null
        },

        createEntity(event: Event) {
            const node = this.node!

            const input = event.target as HTMLInputElement

            const postEntity: PostEntity = {
                nodeId: node.id,
                name: input.value
            }

            this.$emit('createEntity', postEntity)

            input.value = ''
        },

        deleteEntity(entityId: number): void {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const node = this.node!

            if (node.entities.length > 1) {
                this.$emit('deleteEntity', entityId)
            }
        },

        countMatches(node: DeepNode): { shallowNodeMatches: number, deepNodeMatches: number } {
            const shallowNodeMatches = this.countShallowNodeMatches(node)
            const deepNodeMatches = this.countDeepNodeMatches(node)

            return {shallowNodeMatches, deepNodeMatches}
        },

        countShallowNodeMatches(node: DeepNode): number {
            return node.entities.reduce((nodeMatches: number, entity: Entity) =>
                nodeMatches + entity.matchesCount, 0)
        },

        countDeepNodeMatches(node: DeepNode): number {
            let deepMatches = this.countShallowNodeMatches(node)

            for (const child of node.children) {
                deepMatches += this.countDeepNodeMatches(child)
            }

            return deepMatches
        },

        countPredictions(node: DeepNode) {
            PredictionService.getPredictions(node.id).then((predictionResponse: PredictionResponse) => {
                this.synonymPredictions = predictionResponse.totalSynonymPredictions
                this.childPredictions = predictionResponse.totalChildPredictions
            })
        }
    }
})
