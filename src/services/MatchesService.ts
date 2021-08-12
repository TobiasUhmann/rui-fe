import Match from '@/models/Match'

export default {

    getMatches(name: string, offset = 0, limit = 3): Promise<Match[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/matches?entity=${name}&offset=${offset}&limit=${limit}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .then(data => data.matches)
            .catch(error => console.error(error))
    }
}
