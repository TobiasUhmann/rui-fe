import Match from '@/models/Match'

export default {

    getMatches(entity: string, limit = 3, offset = 0): Promise<Match[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/matches?entity=${entity}&limit=${limit}&offset=${offset}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .then(data => data.matches)
            .catch(error => console.error(error))
    }
}
