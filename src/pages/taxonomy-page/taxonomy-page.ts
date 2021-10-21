import {defineComponent} from 'vue'

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

    components: {NewNode, NodeDetails, Matches, Taxonomy},

    data() {
        return {
            rootNodes: [] as DeepNode[],

            selectedNode: null as DeepNode | null,

            creatingNewNode: false
        }
    },

    mounted() {
        this.loadTaxonomy()
    },

    methods: {
        loadTaxonomy(): void {
            NodeService.getNodes().then((rootNodes: DeepNode[]) => this.rootNodes = rootNodes)
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

            NodeService.getNodes().then((nodes: DeepNode[]) => {
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

            NodeService.postNode(postNode).then(() =>
                this.reloadTaxonomy())

            this.creatingNewNode = false
        },

        deleteNode(node: DeepNode): void {
            NodeService.deleteNode(node.id).then(() => {
                if (this.selectedNode && node.id === this.selectedNode.id) {
                    this.selectedNode = null
                }

                this.reloadTaxonomy();
            })
        },

        createEntity(postEntity: PostEntity): void {
            EntityService.postEntity(postEntity).then(() => this.reloadTaxonomy())
        },

        deleteEntity(entityId: number): void {
            EntityService.deleteEntity(entityId).then(() => this.reloadTaxonomy())
        }
    }
})
