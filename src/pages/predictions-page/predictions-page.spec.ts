import {flushPromises, shallowMount} from '@vue/test-utils'

import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import PredictionsPage from '@/pages/predictions-page/predictions-page.vue'
import TreeItem from '@/components/tree-item/tree-item.vue'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {DeepNode} from '@/models/node/deep-node'
import {EntityService} from "@/services/entity-service"
import {Entity} from '@/models/entity/entity'
import {NodeService} from '@/services/node-service'
import {PostEntity} from '@/models/entity/post-entity'
import {PostNode} from '@/models/node/post-node'
import {PredictionPatch} from '@/models/prediction/prediction-patch'
import {PredictionResponse} from '@/models/prediction/prediction-response'
import {PredictionService} from '@/services/prediction-service'

const entityAa1: Entity = {id: 1, nodeId: 1, name: 'Aa-1', matchesCount: 2}
const nodeAa: DeepNode = {id: 1, parentId: 0, entities: [entityAa1], children: []}

const entityAb1: Entity = {id: 2, nodeId: 2, name: 'Ab-1', matchesCount: 2}
const nodeAb: DeepNode = {id: 2, parentId: 0, entities: [entityAb1], children: []}

const entityA1: Entity = {id: 0, nodeId: 0, name: 'A-1', matchesCount: 2}
const nodeA: DeepNode = {id: 0, parentId: null, entities: [entityA1], children: [nodeAa, nodeAb]}

const entityBa1: Entity = {id: 4, nodeId: 4, name: 'Ba-1', matchesCount: 1}
const entityBa2: Entity = {id: 5, nodeId: 4, name: 'Ba-2', matchesCount: 1}
const entityBa3: Entity = {id: 6, nodeId: 4, name: 'Ba-3', matchesCount: 0}
const entityBa4: Entity = {id: 7, nodeId: 4, name: 'Ba-4', matchesCount: 1}
const entityBa5: Entity = {id: 8, nodeId: 4, name: 'Ba-5', matchesCount: 1}
const nodeBa: DeepNode = {
    id: 4,
    parentId: 3,
    entities: [entityBa1, entityBa2, entityBa3, entityBa4, entityBa5],
    children: []
}

const entityBb1: Entity = {id: 9, nodeId: 5, name: 'Bb-1', matchesCount: 1}
const entityBb2: Entity = {id: 10, nodeId: 5, name: 'Bb-2', matchesCount: 1}
const nodeBb: DeepNode = {id: 5, parentId: 3, entities: [entityBb1, entityBb2], children: []}

const entityB1: Entity = {id: 3, nodeId: 3, name: 'B-1', matchesCount: 1}
const nodeB = {id: 3, parentId: null, entities: [entityB1], children: [nodeBa, nodeBb]}

const entityC1: Entity = {id: 11, nodeId: 6, name: 'C-1', matchesCount: 1}
const nodeC = {id: 6, parentId: null, entities: [entityC1], children: []}

const getNodesResponse = [nodeA, nodeB, nodeC]

const prediction1: CandidateWithPredictions = {
    candidate: 'Erat imperdiet sed euismod nisi porta lorem mollis .',
    dismissed: false,
    totalScore: 12.34,
    totalScoreNorm: 1.0,
    parentPredictions: [{score: 12.34, scoreNorm: 1.0, node: nodeA}],
    synonymPredictions: []
}

const prediction2: CandidateWithPredictions = {
    candidate: 'Tempor orci dapibus ultrices in iaculis nunc sed .',
    dismissed: false,
    totalScore: 12.34,
    totalScoreNorm: 1.0,
    parentPredictions: [],
    synonymPredictions: [{score: 12.34, scoreNorm: 1.0, node: nodeA}]
}

const prediction3: CandidateWithPredictions = {
    candidate: 'Porta lorem mollis aliquam ut porttitor leo a diam .',
    dismissed: false,
    totalScore: 12.34,
    totalScoreNorm: 1.0,
    parentPredictions: [],
    synonymPredictions: [{score: 12.34, scoreNorm: 1.0, node: nodeA}]
}

const getPredictionsResponse: PredictionResponse = {
    totalPredictions: 3,
    predictions: [prediction1, prediction2, prediction3]
}

const getPredictionsResponseWithoutAnnotatedPrediction: PredictionResponse = {
    totalPredictions: 2,
    predictions: [prediction1, prediction2]
}

describe('PredictionsPage', () => {

    it('should render taxonomy and predictions', async () => {

        /// GIVEN   the backend with the following endpoints:
        ///         - GET    /nodes
        ///         - GET    /nodes/:nodeId/predictions

        NodeService.getNodes = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(getNodesResponse))

        PredictionService.getPredictions = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(getPredictionsResponse))

        /// GIVEN   the predictions page with some predictions

        const wrapper = await shallowMount(PredictionsPage, {
            global: {mocks: {$route: {params: {node: nodeA.id}}}}
        })

        await flushPromises()

        /// THEN    the node should be shown in the taxonomy
        /// AND     the predictions should be shown

        const treeItem = wrapper.findComponent(TreeItem)
        expect(treeItem.vm.node.entities[0].name).toBe(entityA1.name)

        expect(wrapper.findAllComponents(PredictionCard))
            .toHaveLength(getPredictionsResponse.totalPredictions)
    })

    it('should allow annotating synonym prediction', async () => {

        /// GIVEN   the backend with the following endpoints:
        ///         - POST   /entities
        ///         - GET    /nodes
        ///         - GET    /nodes/:nodeId/predictions
        ///         - PATCH  /predictions

        const entityA2: Entity = {id: 0, nodeId: 0, name: 'A-2', matchesCount: 2}
        const nodeAWithEntityA2: DeepNode = {
            id: 0,
            parentId: null,
            entities: [entityA1, entityA2],
            children: [nodeAa, nodeAb]
        }

        const getNodesResponseWithEntityA2 = [nodeAWithEntityA2, nodeB, nodeC]

        const postEntity: PostEntity = {nodeId: nodeA.id, name: 'A-2'}

        EntityService.postEntity = jest.fn()
            .mockImplementationOnce((postEntity2: PostEntity) => {
                    expect(postEntity2).toBe(postEntity)
                    return Promise.resolve({json: () => Promise.resolve({})} as Response)
                }
            )

        NodeService.getNodes = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(getNodesResponse))
            .mockImplementationOnce(() => Promise.resolve(getNodesResponseWithEntityA2))

        PredictionService.getPredictions = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(getPredictionsResponse))
            .mockImplementationOnce(() => Promise.resolve(getPredictionsResponseWithoutAnnotatedPrediction))

        PredictionService.patchPrediction = jest.fn()
            .mockImplementationOnce((candidate: string, predictionPatch: PredictionPatch) => {
                expect(predictionPatch.dismissed).toBe(true)
                return Promise.resolve({json: () => Promise.resolve({})} as Response)
            })

        /// GIVEN   the predictions page with some predictions

        const wrapper = await shallowMount(PredictionsPage, {
            global: {mocks: {$route: {params: {node: nodeA.id}}}}
        })

        await flushPromises()

        /// WHEN    a prediction card emits a "createEntity" event

        await wrapper.findAllComponents(PredictionCard)[0].vm.$emit('createEntity', postEntity)

        await flushPromises()

        /// THEN    POST /nodes should have been called with new node
        /// AND     PATCH /predictions should have been called to dismiss prediction
        /// AND     the node should be added to the taxonomy
        /// AND     the prediction should vanish

        expect(EntityService.postEntity).toHaveBeenCalled()
        expect(PredictionService.patchPrediction).toHaveBeenCalled()

        const treeItem = wrapper.findComponent(TreeItem)
        expect(treeItem.vm.node.entities[1].name).toBe('A-2')

        expect(wrapper.findAllComponents(PredictionCard))
            .toHaveLength(getPredictionsResponseWithoutAnnotatedPrediction.totalPredictions)
    })

    it('should allow annotating child prediction', async () => {

        /// GIVEN   the backend with the following endpoints:
        ///         - GET    /nodes
        ///         - POST   /nodes
        ///         - GET    /nodes/:nodeId/predictions
        ///         - PATCH  /predictions

        const entityAc1: Entity = {id: 12, nodeId: 7, name: 'Ac-1', matchesCount: 0}
        const nodeAc: DeepNode = {id: 7, parentId: 0, entities: [entityAc1], children: []}
        const nodeAWithChildNodeAc: DeepNode = {
            id: 0,
            parentId: null,
            entities: [entityA1],
            children: [nodeAa, nodeAb, nodeAc]
        }
        const getNodesResponseWithChildNodeAc = [nodeAWithChildNodeAc, nodeB, nodeC]

        const postNode: PostNode = {parentId: nodeA.id, entities: [{name: 'foo'}]}

        NodeService.getNodes = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(getNodesResponse))
            .mockImplementationOnce(() => Promise.resolve(getNodesResponseWithChildNodeAc))

        NodeService.postNode = jest.fn()
            .mockImplementationOnce((postNode2: PostNode) => {
                    expect(postNode2).toBe(postNode)
                    return Promise.resolve({json: () => Promise.resolve({})} as Response)
                }
            )

        PredictionService.getPredictions = jest.fn()
            .mockImplementationOnce(() => Promise.resolve(getPredictionsResponse))
            .mockImplementationOnce(() => Promise.resolve(getPredictionsResponseWithoutAnnotatedPrediction))

        PredictionService.patchPrediction = jest.fn()
            .mockImplementationOnce((candidate: string, predictionPatch: PredictionPatch) => {
                expect(predictionPatch.dismissed).toBe(true)
                return Promise.resolve({json: () => Promise.resolve({})} as Response)
            })

        /// GIVEN   the predictions page with some predictions

        const wrapper = shallowMount(PredictionsPage, {
            global: {mocks: {$route: {params: {node: '0'}}}}
        })

        await flushPromises()

        /// WHEN    a prediction emits a "createNode" event

        await wrapper.findAllComponents(PredictionCard)[0].vm.$emit('createNode', postNode)

        await flushPromises()

        /// THEN    POST /nodes should have been called with new node
        /// AND     PATCH /predictions should have been called to dismiss prediction
        /// AND     the node should be added to the taxonomy
        /// AND     the prediction should vanish

        expect(NodeService.postNode).toHaveBeenCalled()
        expect(PredictionService.patchPrediction).toHaveBeenCalled()

        const treeItem = wrapper.findComponent(TreeItem)
        expect(treeItem.vm.node.children[2].entities[0].name).toBe(entityAc1.name)

        expect(wrapper.findAllComponents(PredictionCard))
            .toHaveLength(getPredictionsResponseWithoutAnnotatedPrediction.totalPredictions)
    })
})
