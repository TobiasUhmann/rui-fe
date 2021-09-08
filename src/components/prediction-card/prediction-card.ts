import {defineComponent, PropType} from 'vue'

import CandidateWithPredictions from '@/models/prediction/candidate-with-predictions'

export default defineComponent({
    name: 'PredictionCard',

    props: {
        candidateWithPredictions: {
            type: Object as PropType<CandidateWithPredictions>,
            required: true
        }
    }
})
