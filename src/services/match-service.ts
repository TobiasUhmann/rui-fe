import {Match} from '@/models/match/match'

export const MatchService = {

    getMatches(entity: number, offset = 0, limit = 3): Promise<Match[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/matches?entity=${entity}&offset=${offset}&limit=${limit}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    }
}
