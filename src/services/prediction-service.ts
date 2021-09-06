import Prediction from '@/models/prediction/prediction'

export default {

    getPredictions(nodeId: number): Promise<Prediction[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}/predictions`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    }
}
