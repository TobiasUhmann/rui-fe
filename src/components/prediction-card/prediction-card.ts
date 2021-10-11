import {defineComponent, PropType} from 'vue'

import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {getNodeName} from '@/models/node/node'
import {PostNode} from '@/models/node/post-node'

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

            getNodeName: getNodeName
        }
    },

    methods: {
        emitCreateNode() {
            const mentionInput = this.$refs.mention as HTMLInputElement
            const postNode = {
                parentId: this.selectedNodeId,
                entities: [{name: mentionInput.value}]
            }

            this.$emit('createNode', postNode)
        }
    }
})
