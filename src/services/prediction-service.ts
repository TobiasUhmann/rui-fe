import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'

export const PredictionService = {

    getPredictions(nodeId: number, offset = 0, limit = 3): Promise<CandidateWithPredictions[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}/predictions?offset=${offset}&limit=${limit}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    }
}
