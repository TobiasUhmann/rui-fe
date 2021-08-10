import Match from '@/models/Match'

export default {

    getMatches(entity: string): Promise<Match[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/entities?entity=${entity}`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .then(data => data.entities)
            .catch(error => console.error(error))
    }
}
