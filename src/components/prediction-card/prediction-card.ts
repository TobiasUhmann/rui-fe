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

    data() {
        return {
            getNodeName: getNodeName
        }
    }
})
