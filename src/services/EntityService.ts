import DeepNode from '@/models/node/DeepNode'
import Node from '@/models/node/Node'

export default {

    getNodes(): Promise<DeepNode[]> {
        return fetch(`${process.env.VUE_APP_API_URL}/nodes`)
            .then(response => {
                console.debug(response)
                return response.json()
            })
            .then(data => data.rootNodes)
            .catch(error => console.error(error))
    },

    postNode(node: Node): Promise<void> {
        const fetchOptions = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(node)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes`, fetchOptions)
            .then(response => {
                console.debug(response)
            })
            .catch(error => console.error(error))
    },

    putNode(node: Node): Promise<void> {
        const fetchOptions = {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(node)
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes`, fetchOptions)
            .then(response => {
                console.debug(response)
            })
            .catch(error => console.error(error))
    },

    deleteNode(nodeId: number): Promise<void> {
        const fetchOptions = {
            method: 'DELETE'
        }

        return fetch(`${process.env.VUE_APP_API_URL}/nodes/${nodeId}`, fetchOptions)
            .then(response => {
                console.debug(response)
            })
            .catch(error => console.error(error))
    }
}
