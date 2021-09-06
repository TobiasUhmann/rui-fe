import {defineComponent, PropType} from 'vue'

import Prediction from '@/models/prediction/prediction'

export default defineComponent({
    name: 'PredictionCard',

    props: {
        candidate: {
            type: String,
            required: true
        },

        parentPredictions: {
            type: Array as PropType<Prediction[]>,
            required: true
        },

        synonymPredictions: {
            type: Array as PropType<Prediction[]>,
            required: true
        }
    }
})
