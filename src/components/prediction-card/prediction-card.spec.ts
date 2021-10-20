import {mount, shallowMount} from '@vue/test-utils'

import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {Entity} from '@/models/entity/entity'
import {Node} from '@/models/node/node'
import {PostEntity} from '@/models/entity/post-entity'
import {PostNode} from '@/models/node/post-node'

const entityA: Entity = {id: 0, nodeId: 0, name: 'A-1', matchesCount: 1}
const nodeA: Node = {id: 0, parentId: null, entities: [entityA]}

const entityB: Entity = {id: 1, nodeId: 1, name: 'B-1', matchesCount: 1}
const nodeB: Node = {id: 1, parentId: null, entities: [entityB]}

const entityC: Entity = {id: 2, nodeId: 2, name: 'C-1', matchesCount: 1}
const nodeC: Node = {id: 2, parentId: null, entities: [entityC]}

const candidateWithPredictions: CandidateWithPredictions = {
    candidate: 'Foo Bar Baz',
    dismissed: false,
    synonymPredictions: [
        {score: 1.0, node: nodeA},
        {score: 0.9, node: nodeB}
    ],
    parentPredictions: [
        {score: 0.8, node: nodeA},
        {score: 0.7, node: nodeC}
    ]
}

it('Render', () => {

    // GIVEN a prediction card with some predictions

    const wrapper = shallowMount(PredictionCard, {
        props: {
            candidateWithPredictions: candidateWithPredictions,
            selectedNodeId: nodeA.id
        }
    })

    // THEN  the prediction card scaffold should be rendered

    const headers = wrapper.findAll('h1')
    expect(headers).toHaveLength(2)
    expect(headers[0].text()).toBe('Is Synonym of')
    expect(headers[1].text()).toBe('Is Child of')

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Dismiss')
    expect(buttons[1].text()).toBe('Annotate')

    // THEN  the candidate text should be shown

    const candidateText = wrapper.find('.candidate').text()
    expect(candidateText).toContain('Foo')
    expect(candidateText).toContain('Bar')
    expect(candidateText).toContain('Baz')

    // THEN  the predictions that match the selected node should be highlighted
    // AND   the predictions that do not match the selected node should not be highlighted

    const synonymPredictions = wrapper.findAll('table')[0].findAll('td:nth-child(2)')
    expect(synonymPredictions[0].classes()).toContain('selected')
    expect(synonymPredictions[1].classes()).not.toContain('selected')

    const parentPredictions = wrapper.findAll('table')[1].findAll('td:nth-child(2)')
    expect(parentPredictions[0].classes()).toContain('selected')
    expect(parentPredictions[1].classes()).not.toContain('selected')
})

it('Select synonym prediction', async () => {

    // GIVEN a prediction card with some predictions

    const wrapper = shallowMount(PredictionCard, {
        props: {
            candidateWithPredictions: candidateWithPredictions,
            selectedNodeId: nodeA.id
        }
    })

    // WHEN  selecting another synonym prediction

    const synonymPredictions = wrapper.findAll('table')[0].findAll('td:nth-child(2)')
    await synonymPredictions[1].trigger('click')

    // THEN  the selected prediction should be highlighted
    // AND   the previously selected prediction should not be highlighted anymore

    expect(synonymPredictions[0].classes()).not.toContain('selected')
    expect(synonymPredictions[1].classes()).toContain('selected')

    const parentPredictions = wrapper.findAll('table')[1].findAll('td:nth-child(2)')
    expect(parentPredictions[0].classes()).not.toContain('selected')
    expect(parentPredictions[1].classes()).not.toContain('selected')
})

it('marks selected tokens', async () => {

    // GIVEN a PredictionCard
    // WHEN  selecting tokens in the candidate text by clicking them
    // THEN  the selected tokens should be highlighted
    // AND   the mention input should contain the selected tokens

    const wrapper = mount(PredictionCard, {
        props: {
            candidateWithPredictions: {
                candidate: 'Foo Bar Baz',

                parentPredictions: [],
                synonymPredictions: []
            },

            selectedNodeId: 0
        }
    })

    const spans = wrapper.findAll('.candidate span')
    await spans[0].trigger('click')
    await spans[2].trigger('click')

    expect(spans[0].classes()).toContain('marked')
    expect(spans[1].classes()).not.toContain('marked')
    expect(spans[2].classes()).toContain('marked')

    const input = wrapper.find('#mention').element as HTMLInputElement
    expect(input.value).toContain('Foo Baz')
})

it('Annotate child', async () => {

    // GIVEN a prediction card with a selected child prediction
    // AND   with selected tokens

    const entity = {id: 0, nodeId: 0, name: 'TestEntity', matchesCount: 42}
    const node = {id: 0, parentId: null, entities: [entity]}

    const candidateWithPredictions: CandidateWithPredictions = {
        candidate: 'Foo Bar Baz',
        dismissed: false,
        parentPredictions: [],
        synonymPredictions: [{score: 0.8, node}]
    }

    const wrapper = mount(PredictionCard, {
        props: {
            candidateWithPredictions,
            selectedNodeId: 0
        }
    })

    const spans = wrapper.findAll('.candidate span')
    await spans[0].trigger('click')
    await spans[2].trigger('click')

    // WHEN  clicking "Annotate"

    const annotateButton = wrapper.findAll('button')
        .filter(button => button.text().match(/Annotate/))[0]
    await annotateButton.trigger('click')

    // THEN  the card should emit a "createNode" event

    const postNode: PostNode = {
        parentId: 0,
        entities: [{name: 'Foo Baz'}]
    }

    expect(wrapper.emitted().createNode.length).toBe(1)
    expect(wrapper.emitted().createNode[0]).toEqual([postNode])
})

const entity: Entity = {id: 0, nodeId: 0, name: 'Entity 1', matchesCount: 7}
const node: Node = {id: 0, parentId: null, entities: [entity]}

const candidateWithPredictions0: CandidateWithPredictions = {
    candidate: 'Foo Bar Baz',
    dismissed: false,
    parentPredictions: [],
    synonymPredictions: [{score: 0.8, node}]
}

it('Annotate synonym', async () => {

    // GIVEN a "Prediction Card" with selected tokens
    // AND   a selected synonym prediction

    const wrapper = mount(PredictionCard, {
        props: {
            candidateWithPredictions: candidateWithPredictions0,
            selectedNodeId: 0
        }
    })

    const spans = wrapper.findAll('.candidate span')
    await spans[0].trigger('click')
    await spans[2].trigger('click')

    // WHEN  clicking "Annotate"

    const annotateButton = wrapper.findAll('button')
        .filter(button => button.text().match(/Annotate/))[0]

    await annotateButton.trigger('click')

    // THEN  the card should emit a "createEntity" event

    const postEntity: PostEntity = {
        nodeId: 0,
        name: 'Foo Baz'
    }

    expect(wrapper.emitted().createEntity.length).toBe(1)
    expect(wrapper.emitted().createEntity[0]).toEqual([postEntity])
})
