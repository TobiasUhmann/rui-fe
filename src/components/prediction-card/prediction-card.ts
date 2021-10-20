import {defineComponent, PropType} from 'vue'

import {CandidatePrediction} from '@/models/prediction/candidate-prediction'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {PostEntity} from '@/models/entity/post-entity'
import {PostNode} from '@/models/node/post-node'
import {PredictionType} from '@/components/prediction-card/prediction-type'
import {getNodeName} from '@/models/node/node'

export default defineComponent({
    name: 'PredictionCard',

    props: {
        candidateWithPredictions: {
            type: Object as PropType<CandidateWithPredictions>,
            required: true
        },

        currentNodeId: {
            type: Number,
            required: true
        }
    },

    watch: {
        candidateWithPredictions: {
            immediate: true,
            handler(candidateWithPredictions: CandidateWithPredictions) {
                this.tokens = candidateWithPredictions.candidate.split(' ')
                this.tokenSelections = new Array<boolean>(this.tokens.length).fill(false)
            }
        },

        tokenSelections: {
            deep: true,
            handler(tokenSelections: boolean[]) {
                if (!this.userEditsMentionInput) {
                    this.mentionInput = tokenSelections!
                        .map((tokenSelection, index) => tokenSelection ? this.tokens![index] : null)
                        .filter(token => token !== null)
                        .join(' ')
                }
            }
        },

        /**
         * Select the synonym prediction for the current node. If there is none, select
         * the child prediction for the current node. There must be one or both of these.
         */
        currentNodeId: {
            immediate: true,
            handler(currentNodeId: number) {
                const synonymPredictions = this.candidateWithPredictions.synonymPredictions
                for (let i = 0; i < synonymPredictions.length; i++) {
                    const synonymPrediction = synonymPredictions[i]
                    if (synonymPrediction.node.id === currentNodeId) {
                        this.selectedPrediction = {type: PredictionType.SYNONYM, index: i}
                        return
                    }
                }

                const parentPredictions = this.candidateWithPredictions.parentPredictions
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

    data() {
        return {
            tokens: undefined as undefined | string[],
            tokenSelections: undefined as undefined | boolean[],

            mentionInput: '',
            userEditsMentionInput: false,

            selectedPrediction: undefined as undefined | {
                type: PredictionType,
                index: number
            },

            getNodeName,
            PredictionType
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
            const mentionInput = this.$refs.mention as HTMLInputElement
            const mention = mentionInput.value

            const selectedPrediction = this.selectedPrediction!

            if (selectedPrediction.type === PredictionType.SYNONYM) {
                const synonymPredictions = this.candidateWithPredictions.synonymPredictions
                const selectedSynonymPrediction: CandidatePrediction = synonymPredictions[selectedPrediction.index]
                const selectedNode = selectedSynonymPrediction.node

                const postEntity: PostEntity = {
                    nodeId: selectedNode.id,
                    name: mention
                }

                this.$emit('createEntity', postEntity)

            } else if (selectedPrediction.type === PredictionType.CHILD) {
                const parentPredictions = this.candidateWithPredictions.parentPredictions
                const selectedParentPrediction: CandidatePrediction = parentPredictions[selectedPrediction.index]
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
        },

        selectPrediction(type: PredictionType, index: number): void {
            this.selectedPrediction = {type, index}
        }
    }
})
