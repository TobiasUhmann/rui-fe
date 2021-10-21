import {DeepNode} from '@/models/node/deep-node'
import {PostNode} from '@/models/node/post-node'

export const NodeService = {

    getNodes(): Promise<DeepNode[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes`)
            .then(response => response.json())
            .catch(error => console.error(error))
    },

    postNode(postNode: PostNode): Promise<Response | void> {
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postNode)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes`, fetchOptions)
            .catch(error => console.error(error))
    },

    deleteNode(nodeId: number): Promise<Response | void> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}`, fetchOptions)
            .catch(error => console.error(error))
    }
}
