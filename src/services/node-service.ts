import {DeepNode} from '@/models/node/deep-node'
import {NodePatch} from '@/models/node/node-patch'
import {PostNode} from '@/models/node/post-node'

export const NodeService = {

    getNodes(): Promise<DeepNode[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .catch(error => console.error(error))
    },

    postNode(postNode: PostNode): Promise<void> {
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postNode)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    },

    patchNode(nodePatch: NodePatch): Promise<void> {
        const fetchOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(nodePatch)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    },

    deleteNode(nodeId: number): Promise<void> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}`, fetchOptions)
            .then(response => console.debug(response))
            .catch(error => console.error(error))
    }
}
