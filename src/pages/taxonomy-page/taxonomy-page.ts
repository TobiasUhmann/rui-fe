import {defineComponent} from 'vue'

import Loading from '@/components/loading/loading.vue'
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

    components: {Loading, NewNode, NodeDetails, Matches, Taxonomy},

    data() {
        return {
            rootNodes: [] as DeepNode[],

            selectedNode: null as DeepNode | null,

            creatingNewNode: false,

            showLoadingGetNodes: false,
            showLoadingGetNodesTimeout: -1,

            showLoadingPostNode: false,
            showLoadingPostNodeTimeout: -1,

            showLoadingDeleteNode: false,
            showLoadingDeleteNodeTimeout: -1,

            showLoadingPostEntity: false,
            showLoadingPostEntityTimeout: -1,

            showLoadingDeleteEntity: false,
            showLoadingDeleteEntityTimeout: -1
        }
    },

    mounted() {
        this.loadTaxonomy()
    },

    methods: {
        loadTaxonomy(): void {
            this.showLoadingGetNodesTimeout = window.setTimeout(() => this.showLoadingGetNodes = true, 500)

            NodeService.getNodes().then((rootNodes: DeepNode[]) => {
                window.clearTimeout(this.showLoadingGetNodesTimeout)
                this.showLoadingGetNodesTimeout = -1
                this.showLoadingGetNodes = false

                this.rootNodes = rootNodes
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

            this.showLoadingGetNodesTimeout = window.setTimeout(() => this.showLoadingGetNodes = true, 500)

            NodeService.getNodes().then((nodes: DeepNode[]) => {
                window.clearTimeout(this.showLoadingGetNodesTimeout)
                this.showLoadingGetNodesTimeout = -1
                this.showLoadingGetNodes = false

                this.rootNodes = nodes

                this.selectedNode = findNodeInNodes(nodes, selectedNodeId)
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

            this.showLoadingPostNodeTimeout = window.setTimeout(() => this.showLoadingPostNode = true, 500)

            NodeService.postNode(postNode).then(() => {
                window.clearTimeout(this.showLoadingPostNodeTimeout)
                this.showLoadingPostNodeTimeout = -1
                this.showLoadingPostNode = false

                this.reloadTaxonomy()
            })

            this.creatingNewNode = false
        },

        deleteNode(node: DeepNode): void {
            this.showLoadingDeleteNodeTimeout = window.setTimeout(() => this.showLoadingDeleteNode = true, 500)

            NodeService.deleteNode(node.id).then(() => {
                window.clearTimeout(this.showLoadingDeleteNodeTimeout)
                this.showLoadingDeleteNodeTimeout = -1
                this.showLoadingDeleteNode = false

                if (this.selectedNode && node.id === this.selectedNode.id) {
                    this.selectedNode = null
                }

                this.reloadTaxonomy()
            })
        },

        createEntity(postEntity: PostEntity): void {
            this.showLoadingPostEntityTimeout = window.setTimeout(() => this.showLoadingPostEntity = true, 500)

            EntityService.postEntity(postEntity).then(() => {
                window.clearTimeout(this.showLoadingPostEntityTimeout)
                this.showLoadingPostEntityTimeout = -1
                this.showLoadingPostEntity = false

                this.reloadTaxonomy()
            })
        },

        deleteEntity(entityId: number): void {
            this.showLoadingDeleteEntityTimeout = window.setTimeout(() => this.showLoadingDeleteEntity = true, 500)

            EntityService.deleteEntity(entityId).then(() => {
                window.clearTimeout(this.showLoadingDeleteEntityTimeout)
                this.showLoadingDeleteEntityTimeout = -1
                this.showLoadingDeleteEntity = false

                this.reloadTaxonomy()
            })
        }
    }
})
