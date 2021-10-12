import {PostEntity} from '@/models/entity/post-entity'

export const EntityService = {

    postEntity(postEntity: PostEntity): Promise<Response | void> {
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postEntity)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/entities`, fetchOptions)
            .catch(error => console.error(error))
    },

    deleteEntity(entityId: number): Promise<Response | void> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`${process.env.VUE_APP_API_URL}/entities/${entityId}`, fetchOptions)
            .catch(error => console.error(error))
    }
}
