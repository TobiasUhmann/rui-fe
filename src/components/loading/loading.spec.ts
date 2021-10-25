import {shallowMount} from '@vue/test-utils'

import Loading from '@/components/loading/loading.vue'

it('Render', async () => {

    //
    // GIVEN a loading component with a message
    //

    const message = 'Loading...'

    const wrapper = shallowMount(Loading, {
        props: {message}
    })

    //
    // THEN  the message should be rendered
    //

    const candidateText = wrapper.find('#text').text()
    expect(candidateText).toContain(message)
})
