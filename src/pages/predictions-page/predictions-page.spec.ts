import {flushPromises, shallowMount} from '@vue/test-utils'

import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import PredictionsPage from '@/pages/predictions-page/predictions-page.vue'
import TreeItem from '@/components/tree-item/tree-item.vue'
import {PostNode} from '@/models/node/post-node'

import {createFetchResponse} from '../../../tests/unit/util'
import {getNodesResponse, getNodesResponseWithNewNode} from '@/pages/predictions-page/fixtures/nodes'
import {getPredictionsResponseWithoutAnnotatedPrediction} from '@/pages/predictions-page/fixtures/predictions'
import {getPredictionsResponse} from '@/pages/predictions-page/fixtures/predictions'

it('Annotate child prediction', async () => {

    // GIVEN the "Predictions" page with some predictions

    global.fetch = jest.fn()
        .mockReturnValueOnce(createFetchResponse(getNodesResponse))
        .mockReturnValueOnce(createFetchResponse(getPredictionsResponse))
        .mockReturnValueOnce(createFetchResponse({}))
        .mockReturnValueOnce(createFetchResponse(getNodesResponseWithNewNode))
        .mockReturnValueOnce(createFetchResponse(getPredictionsResponseWithoutAnnotatedPrediction))

    const wrapper = shallowMount(PredictionsPage, {
        global: {mocks: {$route: {params: {node: '0'}}}}
    })

    await flushPromises()

    // WHEN  a prediction emits a "createNode" event

    const postNode: PostNode = {
        parentId: 0,
        entities: [{name: 'foo'}]
    }

    await wrapper.findAllComponents(PredictionCard)[0].vm.$emit('createNode', postNode)

    await flushPromises()

    // THEN  POST /nodes should have been called
    // AND   the node should be added to the taxonomy
    // AND   the prediction should vanish

    // GET /nodes
    // GET /nodes/0/predictions
    // POST /nodes
    // GET /nodes
    // GET /nodes/0/predictions
    expect(global.fetch).toBeCalledTimes(5)

    const treeItem = wrapper.findComponent(TreeItem)
    expect(treeItem.vm.node.children[2].entities[0].name).toBe('Ac-1')

    expect(wrapper.findAllComponents(PredictionCard)).toHaveLength(2)
})
