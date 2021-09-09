import {PredictionResponse} from '@/models/prediction/prediction-response'
import {PredictionPatch} from '@/models/prediction/prediction-patch'

export const PredictionService = {

    getPredictions(nodeId: number, offset = 0, limit = 3): Promise<PredictionResponse> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}/predictions?offset=${offset}&limit=${limit}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    patchPrediction(candidate: string, predictionPatch: PredictionPatch): Promise<void> {
        const fetchOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(predictionPatch)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/predictions/${encodeURIComponent(candidate)}`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    }
}
