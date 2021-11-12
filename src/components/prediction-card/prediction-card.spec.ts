import {shallowMount} from '@vue/test-utils'

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

    totalScore: 12.34,
    totalScoreNorm: 0.9,

    synonymPredictions: [
        {score: 12.34, scoreNorm: 1.0, node: nodeA},
        {score: 12.34, scoreNorm: 0.9, node: nodeC}
    ],

    parentPredictions: [
        {score: 12.34, scoreNorm: 0.8, node: nodeB},
        {score: 12.34, scoreNorm: 0.7, node: nodeC}
    ]
}

const candidateWithSynonymPredictions: CandidateWithPredictions = {
    ...candidateWithPredictions,
    parentPredictions: []
}

const candidateWithChildPredictions: CandidateWithPredictions = {
    ...candidateWithPredictions,
    synonymPredictions: []
}

describe('PredictionCard', () => {

    it('should render', async () => {

        /// GIVEN   a prediction card

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions: candidateWithPredictions,
                currentNodeId: nodeA.id
            }
        })

        /// THEN    the prediction card scaffold should be rendered

        const headers = wrapper.findAll('h1')
        expect(headers).toHaveLength(2)
        expect(headers[0].text()).toBe('Is Synonym of')
        expect(headers[1].text()).toBe('Is Child of')

        const buttons = wrapper.findAll('button')
        expect(buttons).toHaveLength(2)
        expect(buttons[0].text()).toBe('Dismiss')
        expect(buttons[1].text()).toBe('Annotate')

        /// THEN    the candidate text should be shown

        const candidateText = wrapper.find('.grid-candidate').text()
        expect(candidateText).toContain('Foo')
        expect(candidateText).toContain('Bar')
        expect(candidateText).toContain('Baz')
    })

    it('should show the correct total score', async () => {

        /// GIVEN   a prediction card with multiple synonym and child predictions

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions,
                currentNodeId: nodeB.id
            }
        })

        /// THEN    the header should show the average of the top synonym and child scores

        const predictionsHeader = wrapper.find('.grid-predictions-header')
        const synonymScore = candidateWithPredictions.synonymPredictions[0].score
        const childScore = candidateWithPredictions.parentPredictions[0].score
        const expectedScore = (synonymScore + childScore) / 2
        expect(predictionsHeader.text()).toContain(expectedScore.toString())
    })

    it('should show the correct total score when there are only synonym predictions', async () => {

        /// GIVEN   a prediction card with synonym predictions only

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions: candidateWithSynonymPredictions,
                currentNodeId: nodeA.id
            }
        })

        /// THEN    the header should show the top synonym prediction score

        const predictionsHeader = wrapper.find('.grid-predictions-header')
        const synonymScore = candidateWithPredictions.synonymPredictions[0].score
        expect(predictionsHeader.text()).toContain(synonymScore.toString())
    })

    it('should show the correct total score when there are only child predictions', async () => {

        /// GIVEN   a prediction card with child predictions only

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions: candidateWithChildPredictions,
                currentNodeId: nodeB.id
            }
        })

        /// THEN    the header should show the top child prediction score

        const predictionsHeader = wrapper.find('.grid-predictions-header')
        const childScore = candidateWithPredictions.parentPredictions[0].score
        expect(predictionsHeader.text()).toContain(childScore.toString())
    })

    it('should highlight the top synonym prediction for a candidate with synonym and child predictions', () => {

        /// GIVEN   a prediction card with a synonym prediction for the current node
        ///         and a child prediction for the current node

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions: candidateWithPredictions,
                currentNodeId: nodeC.id
            }
        })

        /// THEN    the synonym prediction for the current node should be highlighted
        /// AND     the child prediction for the current node should not be highlighted
        /// AND     the other predictions should not be highlighted

        const synonymPredictions = wrapper.findAll('table')[0].findAll('td:nth-child(2)')
        expect(synonymPredictions[0].classes()).not.toContain('selected')
        expect(synonymPredictions[1].classes()).toContain('selected')

        const parentPredictions = wrapper.findAll('table')[1].findAll('td:nth-child(2)')
        expect(parentPredictions[0].classes()).not.toContain('selected')
        expect(parentPredictions[1].classes()).not.toContain('selected')
    })

    it("should highlight the current node's first prediction", () => {

        /// GIVEN   a prediction card

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions,
                currentNodeId: nodeC.id
            }
        })

        /// THEN    the current node's prediction should be rendered
        /// AND     the other predictions should not be rendered

        const synonymPredictions = wrapper.findAll('table')[0].findAll('td:nth-child(2)')
        expect(synonymPredictions[0].classes()).not.toContain('selected')
        expect(synonymPredictions[1].classes()).toContain('selected')

        const parentPredictions = wrapper.findAll('table')[1].findAll('td:nth-child(2)')
        expect(parentPredictions[0].classes()).not.toContain('selected')
        expect(parentPredictions[1].classes()).not.toContain('selected')
    })

    it('should highlight the selected prediction', async () => {

        /// GIVEN   a prediction card with some predictions

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions: candidateWithPredictions,
                currentNodeId: nodeC.id
            }
        })

        /// WHEN    selecting a synonym prediction

        const synonymPredictions = wrapper.findAll('table')[0].findAll('td:nth-child(2)')
        await synonymPredictions[0].trigger('click')

        /// THEN    the selected synonym prediction should be highlighted
        /// AND     the other predictions should not be highlighted

        expect(synonymPredictions[0].classes()).toContain('selected')
        expect(synonymPredictions[1].classes()).not.toContain('selected')

        const parentPredictions = wrapper.findAll('table')[1].findAll('td:nth-child(2)')
        expect(parentPredictions[0].classes()).not.toContain('selected')
        expect(parentPredictions[1].classes()).not.toContain('selected')
    })

    it('should highlight the selected tokens', async () => {

        /// GIVEN   a prediction card

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions,
                currentNodeId: nodeA.id
            }
        })

        /// WHEN    changing the mention text manually

        await wrapper.find('#mention').setValue('foo bar baz')

        /// WHEN    selecting tokens in the candidate text by clicking them

        const spans = wrapper.findAll('.grid-candidate span')
        await spans[0].trigger('click')
        await spans[2].trigger('click')

        /// THEN    the selected tokens should be highlighted
        /// AND     the mention input should contain the selected tokens

        expect(spans[0].classes()).toContain('marked')
        expect(spans[1].classes()).not.toContain('marked')
        expect(spans[2].classes()).toContain('marked')

        const input = wrapper.find('#mention').element as HTMLInputElement
        expect(input.value).toContain('Foo Baz')
    })

    it('should allow annotating a synonym prediction', async () => {

        /// GIVEN   a prediction card with selected tokens
        /// AND     a selected synonym prediction

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions: candidateWithPredictions,
                currentNodeId: nodeA.id
            }
        })

        const spans = wrapper.findAll('.grid-candidate span')
        await spans[0].trigger('click')
        await spans[2].trigger('click')

        /// WHEN    clicking "Annotate"

        const annotateButton = wrapper.findAll('button')
            .filter(button => button.text().match(/Annotate/))[0]

        await annotateButton.trigger('click')

        /// THEN    the card should emit a "createEntity" event

        const expectedPostEntity: PostEntity = {
            nodeId: nodeA.id,
            name: 'Foo Baz'
        }

        expect(wrapper.emitted().createEntity.length).toBe(1)
        expect(wrapper.emitted().createEntity[0]).toEqual([expectedPostEntity])
    })

    it('should allow annotating a child prediction', async () => {

        /// GIVEN   a prediction card with a selected child prediction
        /// AND     with selected tokens

        const wrapper = shallowMount(PredictionCard, {
            props: {
                candidateWithPredictions,
                currentNodeId: nodeB.id
            }
        })

        const spans = wrapper.findAll('.grid-candidate span')
        await spans[0].trigger('click')
        await spans[2].trigger('click')

        /// WHEN    clicking "Annotate"

        const annotateButton = wrapper.findAll('button')
            .filter(button => button.text().match(/Annotate/))[0]

        await annotateButton.trigger('click')

        /// THEN    the card should emit a "createNode" event

        const expectedPostNode: PostNode = {
            parentId: nodeB.id,
            entities: [{name: 'Foo Baz'}]
        }

        expect(wrapper.emitted().createNode.length).toBe(1)
        expect(wrapper.emitted().createNode[0]).toEqual([expectedPostNode])
    })
})
