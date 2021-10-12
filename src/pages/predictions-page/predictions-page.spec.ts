import {flushPromises, shallowMount} from '@vue/test-utils'

import PredictionsPage from '@/pages/predictions-page/predictions-page.vue'

import {createFetchResponse} from '../../../tests/unit/util'
import {nodesResponse} from './fixtures/nodes-response'
import {predictionsResponse} from './fixtures/predictions-response'

it('Annotate child prediction', async () => {

    // GIVEN the "Predictions" page with some predictions

    global.fetch = jest.fn()
        .mockReturnValueOnce(createFetchResponse(nodesResponse))
        .mockReturnValueOnce(createFetchResponse(predictionsResponse))

    const wrapper = shallowMount(PredictionsPage, {
        global: {mocks: {$route: {params: {node: '0'}}}}
    })

    await flushPromises()

    // WHEN  a prediction emits a "createNode" event

    await wrapper.findAll('prediction-card-stub')[0].trigger('createNode')

    // THEN  POST /nodes should have been called
    // AND   the node should be added to the taxonomy
    // AND   the prediction should vanish

    // GET /nodes
    // GET /nodes/0/predictions
    // POST /nodes
    // GET /nodes
    // GET /nodes/0/predictions
    expect(global.fetch).toBeCalledTimes(5)
})
