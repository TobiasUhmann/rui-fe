import {defineComponent} from 'vue'

import LoadingOverlay from '@/components/loading-overlay/loading-overlay.vue'
import Matches from '@/components/matches/matches.vue'
import NewNode from '@/components/new-node/new-node.vue'
import NodeDetails from '@/components/node-details/node-details.vue'
import Taxonomy from '@/components/taxonomy/taxonomy.vue'
import {DeepNode} from '@/models/node/deep-node'
import {EntityService} from '@/services/entity-service'
import {NodeService} from '@/services/node-service'
import {PostEntity} from '@/models/entity/post-entity'
import {PostNode} from '@/models/node/post-node'

export default defineComponent({
    name: 'TaxonomyPage',

    components: {LoadingOverlay, NewNode, NodeDetails, Matches, Taxonomy},

    data() {
        return {
            rootNodes: [] as DeepNode[],

            selectedNode: null as DeepNode | null,

            creatingNewNode: false,

            loadingMessages: [] as string[],
            showLoading: false,
            showLoadingTimeout: -1
        }
    },

    mounted() {
        this.loadTaxonomy()
    },

    methods: {

        startLoading(loadingMessage: string): void {
            this.loadingMessages.push(loadingMessage)

            if (this.showLoadingTimeout === -1) {
                this.showLoadingTimeout = window.setTimeout(() => this.showLoading = true, 500)
            }
        },

        stopLoading(loadingMessage: string): void {

            // Remove loading message
            const index = this.loadingMessages.indexOf(loadingMessage)
            if (index !== -1) {
                this.loadingMessages.splice(index, 1)
            }

            // Stop timeout if there are no further loading messages
            if (this.loadingMessages.length === 0) {
                window.clearTimeout(this.showLoadingTimeout)
                this.showLoadingTimeout = -1
                this.showLoading = false
            }
        },

        loadTaxonomy(): void {
            this.startLoading('Loading nodes...')
            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                this.rootNodes = rootNodes

                this.stopLoading('Loading nodes...')
            })
        },

        reloadTaxonomy(): void {
            if (this.selectedNode) {
                this.reloadTaxonomyWithSelectedNode(this.selectedNode)
            } else {
                this.loadTaxonomy()
            }
        },

        reloadTaxonomyWithSelectedNode(selectedNode: DeepNode): void {
            const selectedNodeId = selectedNode.id

            function findNodeInNodes(nodes: DeepNode[], id: number): DeepNode | null {
                for (const node of nodes) {
                    if (node.id === id) {
                        return node
                    }

                    const foundNode = findNodeInNodes(node.children, id)

                    if (foundNode) {
                        return foundNode
                    }
                }

                return null
            }

            this.startLoading('Loading nodes...')
            NodeService.getNodes().then((nodes: DeepNode[]) => {
                this.rootNodes = nodes

                this.selectedNode = findNodeInNodes(nodes, selectedNodeId)

                this.stopLoading('Loading nodes...')
            })
        },

        selectNode(node: DeepNode): void {
            this.selectedNode = node
            this.creatingNewNode = false
        },

        showCreateRootNode(): void {
            this.selectedNode = null
            this.creatingNewNode = true
        },

        showCreateNode(): void {
            this.creatingNewNode = true
        },

        createNode(entityNames: string[]) {
            const postNodeEntities = entityNames.map(name => {
                return {name}
            })

            const postNode: PostNode = {
                parentId: this.selectedNode ? this.selectedNode.id : null,
                entities: postNodeEntities
            }

            this.startLoading('Creating node...')
            NodeService.postNode(postNode).then(() => {
                this.reloadTaxonomy()

                this.stopLoading('Creating node...')
            })

            this.creatingNewNode = false
        },

        deleteNode(node: DeepNode): void {
            this.startLoading('Deleting node...')
            NodeService.deleteNode(node.id).then(() => {
                if (this.selectedNode && node.id === this.selectedNode.id) {
                    this.selectedNode = null
                }

                this.reloadTaxonomy()

                this.stopLoading('Deleting node...')
            })
        },

        createEntity(postEntity: PostEntity): void {
            this.startLoading('Creating entity...')
            EntityService.postEntity(postEntity).then(() => {
                this.reloadTaxonomy()

                this.stopLoading('Creating entity...')
            })
        },

        deleteEntity(entityId: number): void {
            this.startLoading('Deleting entity...')
            EntityService.deleteEntity(entityId).then(() => {
                this.reloadTaxonomy()

                this.stopLoading('Deleting entity...')
            })
        }
    }
})
