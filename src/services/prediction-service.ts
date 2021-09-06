import Prediction from '@/models/prediction/prediction'

export default {

    getPredictions(nodeId: number, offset = 0, limit = 3): Promise<Prediction[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}/predictions?offset=${offset}&limit=${limit}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    }
}
