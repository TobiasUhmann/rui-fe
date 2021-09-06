import {defineComponent, PropType} from 'vue'

import {PredictionInfo} from '@/components/prediction-card/prediction-info'

export default defineComponent({
    name: 'PredictionCard',

    props: {
        candidate: {
            type: String,
            required: true
        },

        parentPredictions: {
            type: Array as PropType<PredictionInfo[]>,
            required: true
        },

        synonymPredictions: {
            type: Array as PropType<PredictionInfo[]>,
            required: true
        }
    }
})
