import {defineComponent, PropType} from 'vue'

import {AssertionError} from 'assert'
import {PredictionItem} from '@/models/prediction/prediction-item'
import {Prediction} from '@/models/prediction/prediction'
import {PostEntity} from '@/models/entity/post-entity'
import {PostNode} from '@/models/node/post-node'
import {PredictionType} from '@/components/prediction-card/prediction-type'
import {getNodeName} from '@/models/node/node'

export default defineComponent({

    computed: {
        totalScore(): number {
            const synonymPredictions = this.prediction.synonymPredictions
            const childPredictions = this.prediction.parentPredictions

            if (synonymPredictions.length > 0 && childPredictions.length > 0) {
                return (synonymPredictions[0].score + childPredictions[0].score) / 2

            } else if (synonymPredictions.length === 0) {
                return childPredictions[0].score

            } else if (childPredictions.length === 0) {
                return synonymPredictions[0].score

            } else {
                throw new AssertionError({message: 'Should never be called'})
            }
        },

        totalScoreNorm(): number {
            const synonymPredictions = this.prediction.synonymPredictions
            const childPredictions = this.prediction.parentPredictions

            if (synonymPredictions.length > 0 && childPredictions.length > 0) {
                return (synonymPredictions[0].scoreNorm + childPredictions[0].scoreNorm) / 2

            } else if (synonymPredictions.length === 0) {
                return childPredictions[0].scoreNorm

            } else if (childPredictions.length === 0) {
                return synonymPredictions[0].scoreNorm

            } else {
                throw new AssertionError({message: 'Should never be called'})
            }
        }
    },

    data() {
        return {
            tokens: undefined as undefined | string[],
            tokenSelections: undefined as undefined | boolean[],

            mentionInput: '',

            selectedPrediction: undefined as undefined | {
                type: PredictionType,
                index: number
            },

            getNodeName,
            PredictionType
        }
    },

    emits: {
        dismiss() {
            return true
        },

        createEntity(postEntity: PostEntity) {
            return true
        },

        createNode(postNode: PostNode) {
            return true
        }
    },

    methods: {

        /**
         * Emit "createEntity" event if synonym prediction is selected or "createNode"
         * event if child prediction is selected.
         *
         * Must only be called when a prediction is selected.
         */
        annotate() {
            const selectedPrediction = this.selectedPrediction!

            const mentionInput = this.$refs.mention as HTMLInputElement
            const mention = mentionInput.value

            if (selectedPrediction.type === PredictionType.SYNONYM) {
                const synonymPredictions = this.prediction.synonymPredictions
                const selectedSynonymPrediction: PredictionItem = synonymPredictions[selectedPrediction.index]
                const selectedNode = selectedSynonymPrediction.node

                const postEntity: PostEntity = {
                    nodeId: selectedNode.id,
                    name: mention
                }

                this.$emit('createEntity', postEntity)

            } else if (selectedPrediction.type === PredictionType.CHILD) {
                const parentPredictions = this.prediction.parentPredictions
                const selectedParentPrediction: PredictionItem = parentPredictions[selectedPrediction.index]
                const selectedNode = selectedParentPrediction.node

                const postNode: PostNode = {
                    parentId: selectedNode.id,
                    entities: [{name: mention}]
                }

                this.$emit('createNode', postNode)
            }
        },

        isPredictionSelected(type: PredictionType, index: number): boolean {
            const selectedPrediction = this.selectedPrediction!

            return type === selectedPrediction.type && index === selectedPrediction.index
        }
    },

    name: 'PredictionCard',

    props: {
        prediction: {
            type: Object as PropType<Prediction>,
            required: true
        },

        currentNodeId: {
            type: Number,
            required: true
        }
    },

    watch: {
        prediction: {
            immediate: true,
            handler(prediction: Prediction) {
                this.tokens = prediction.candidate.split(' ')
                this.tokenSelections = new Array<boolean>(this.tokens.length).fill(false)
            }
        },

        tokenSelections: {
            deep: true,
            handler(tokenSelections: boolean[]) {
                const tokens = this.tokens!

                this.mentionInput = tokenSelections
                    .map((tokenSelection, index) => tokenSelection ? tokens[index] : null)
                    .filter(token => token !== null)
                    .join(' ')
            }
        },

        /**
         * Select the synonym prediction for the current node. If there is none, select
         * the child prediction for the current node. There must be one or both of these.
         */
        currentNodeId: {
            immediate: true,
            handler(currentNodeId: number) {
                const synonymPredictions = this.prediction.synonymPredictions
                for (let i = 0; i < synonymPredictions.length; i++) {
                    const synonymPrediction = synonymPredictions[i]
                    if (synonymPrediction.node.id === currentNodeId) {
                        this.selectedPrediction = {type: PredictionType.SYNONYM, index: i}
                        return
                    }
                }

                const parentPredictions = this.prediction.parentPredictions
                for (let i = 0; i < parentPredictions.length; i++) {
                    const parentPrediction = parentPredictions[i]
                    if (parentPrediction.node.id === currentNodeId) {
                        this.selectedPrediction = {type: PredictionType.CHILD, index: i}
                        return
                    }
                }

                throw 'There is neither a synonym nor a parent prediction about the current node.'
            }
        }
    }
})
