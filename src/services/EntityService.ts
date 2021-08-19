import PostEntity from '@/models/entity/PostEntity'

export default {

    postEntity(postEntity: PostEntity): Promise<void> {
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postEntity)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/entities`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    },

    deleteEntity(entityId: number): Promise<void> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`${process.env.VUE_APP_API_URL}/entities/${entityId}`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    }
}
