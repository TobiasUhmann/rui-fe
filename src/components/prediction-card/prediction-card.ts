import {defineComponent, PropType} from 'vue'

import DeepNode from '@/models/node/deep-node'

export default defineComponent({
    name: 'PredictionCard',

    props: {
        candidate: {
            type: String,
            required: true
        },

        parentPredictions: {
            type: Array as PropType<Array<{score: number, node: DeepNode}>>,
            required: true
        },

        synonymPredictions: {
            type: Array as PropType<Array<{score: number, node: DeepNode}>>,
            required: true
        }
    }
})
