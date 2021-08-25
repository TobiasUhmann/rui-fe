import {defineComponent} from 'vue'

import DeepNode from '@/models/node/DeepNode'
import NodeDetails from '@/components/node_details/node_details.vue'
import EntityService from '@/services/EntityService'
import Matches from '@/components/matches/matches.vue'
import NewNode from '@/components/new_node/new_node.vue'
import NodeService from '@/services/NodeService'
import PostEntity from '@/models/entity/PostEntity'
import PostNode from '@/models/node/PostNode'
import Taxonomy from '@/components/taxonomy/taxonomy.vue'

export default defineComponent({
    name: 'TaxonomyView',

    components: {NewNode, NodeDetails, Matches, Taxonomy},

    data() {
        return {
            nodes: [] as DeepNode[],

            selectedNode: null as DeepNode | null,

            newNodeParentSelected: false,
            newNodeParent: null as DeepNode | null
        }
    },

    mounted() {
        this.loadTaxonomy()
    },

    methods: {
        loadTaxonomy(): void {
            NodeService.getNodes().then((nodes: DeepNode[]) => this.nodes = nodes)
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
                this.nodes = nodes

                this.selectedNode = findNodeInNodes(nodes, selectedNodeId)
            })
        },

        selectNode(node: DeepNode): void {
            this.selectedNode = node

            this.newNodeParentSelected = false
            this.newNodeParent = null
        },

        showCreateNode(node: DeepNode | null): void {
            this.selectedNode = null

            this.newNodeParentSelected = true
            this.newNodeParent = node
        },

        createNode(entityNames: string[]) {
            const postNodeEntities = entityNames.map(name => {
                return {name}
            })

            const postNode: PostNode = {
                parentId: this.newNodeParent ? this.newNodeParent.id : null,
                entities: postNodeEntities
            }

            NodeService.postNode(postNode).then(() =>
                this.reloadTaxonomy())

            this.selectedNode = null

            this.newNodeParentSelected = false
            this.newNodeParent = null
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
