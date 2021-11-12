import {shallowMount} from '@vue/test-utils'

import LoadingOverlay from '@/components/loading-overlay/loading-overlay.vue'

describe('LoadingOverlay', () => {

    it('should render', async () => {

        /// GIVEN   a loading overlay with a message

        const message = 'Loading...'

        const wrapper = shallowMount(LoadingOverlay, {
            props: {message}
        })

        /// THEN    the message should be rendered

        const candidateText = wrapper.find('#text').text()
        expect(candidateText).toContain(message)
    })
})
