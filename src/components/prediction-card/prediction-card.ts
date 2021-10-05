import {defineComponent, PropType} from 'vue'

import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {getNodeName} from '@/models/node/node'

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
                    this.mentionInput = tokenSelections!.reduce((a, b, i) =>
                        tokenSelections![i] ? a + ' ' + this.tokens![i] : a, '')
                }
            }
        }
    },

    emits: {
        dismiss() {
            return true
        }
    },

    data() {
        return {
            tokens: undefined as undefined | string[],
            tokenSelections: undefined as undefined | boolean[],

            mentionInput: '',
            userEditsMentionInput: false,

            getNodeName: getNodeName
        }
    }
})
