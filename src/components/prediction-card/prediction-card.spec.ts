import {mount} from '@vue/test-utils'

import PredictionCard from '@/components/prediction-card/prediction-card.vue'

describe('PredictionCard', () => {

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

        expect(wrapper.find('.candidate').text()).toBe('Foo Bar Baz')

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

        expect(wrapper.find('#mention')).toContain('Foo Baz')
    })
})
