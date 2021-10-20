import {defineComponent, PropType} from 'vue'

import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {getNodeName} from '@/models/node/node'
import {PostNode} from '@/models/node/post-node'
import {PostEntity} from "@/models/entity/post-entity";
import {CandidatePrediction} from "@/models/prediction/candidate-prediction";

export default defineComponent({
    name: 'PredictionCard',

    props: {
        candidateWithPredictions: {
            type: Object as PropType<CandidateWithPredictions>,
            required: true
        },

        selectedNodeId: {
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

            getNodeName: getNodeName,

            selectedPrediction: undefined as undefined | {
                type: 'synonym' | 'parent',
                index: number
            }
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

            if (selectedPrediction.type === 'synonym') {
                const synonymPredictions = this.candidateWithPredictions.synonymPredictions
                const selectedSynonymPrediction: CandidatePrediction = synonymPredictions[selectedPrediction.index]
                const selectedNode = selectedSynonymPrediction.node

                const postEntity: PostEntity = {
                    nodeId: selectedNode.id,
                    name: mention
                }

                this.$emit('createEntity', postEntity)

            } else if (selectedPrediction.type === 'parent') {
                const parentPredictions = this.candidateWithPredictions.parentPredictions
                const selectedParentPrediction: CandidatePrediction = parentPredictions[selectedPrediction.index]
                const selectedNode = selectedParentPrediction.node

                const postNode: PostNode = {
                    parentId: selectedNode.id,
                    entities: [{name: mention}]
                }

                this.$emit('createNode', postNode)
            }
        }
    }
})
