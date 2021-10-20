import {mount} from '@vue/test-utils'

import PredictionCard from '@/components/prediction-card/prediction-card.vue'
import {CandidateWithPredictions} from '@/models/prediction/candidate-with-predictions'
import {Node} from '@/models/node/node'
import {PostNode} from '@/models/node/post-node'
import {PostEntity} from "@/models/entity/post-entity";
import {Entity} from "@/models/entity/entity";

it('renders', () => {

    // GIVEN a PredictionCard
    // THEN  it should be rendered

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

    const candidateText = wrapper.find('.candidate').text()
    expect(candidateText).toContain('Foo')
    expect(candidateText).toContain('Bar')
    expect(candidateText).toContain('Baz')

    const headers = wrapper.findAll('h1')
    expect(headers).toHaveLength(2)
    expect(headers[0].text()).toBe('Is Synonym of')
    expect(headers[1].text()).toBe('Is Child of')

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Dismiss')
    expect(buttons[1].text()).toBe('Annotate')
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

it('Annotate synonym', async () => {

    // GIVEN a "Prediction Card" with selected tokens
    // AND   a selected synonym prediction

    const entity: Entity = {id: 0, nodeId: 0, name: 'Entity 1', matchesCount: 7}
    const node: Node = {id: 0, parentId: null, entities: [entity]}

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

    // THEN  the card should emit a "createEntity" event

    const postEntity: PostEntity = {
        nodeId: 0,
        name: 'Foo Baz'
    }

    expect(wrapper.emitted().createEntity.length).toBe(1)
    expect(wrapper.emitted().createEntity[0]).toEqual([postEntity])
})
