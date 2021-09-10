import {shallowMount} from '@vue/test-utils'

import PaginationBar from '@/components/pagination-bar/pagination-bar.vue'

describe('PaginationBar.vue', () => {
    it('renders /', () => {
        const numberOfPages = 7

        const wrapper = shallowMount(PaginationBar, {
            props: {numberOfPages}
        })

        expect(wrapper.text()).toContain('/ 7')
    })
})
