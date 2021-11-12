import {shallowMount} from '@vue/test-utils'

import PaginationBar from '@/components/pagination-bar/pagination-bar.vue'

describe('PaginationBar', () => {

    it('should render', () => {

        /// GIVEN   a pagination bar

        const numberOfPages = 7

        const wrapper = shallowMount(PaginationBar, {
            props: {numberOfPages}
        })

        /// THEN    it should render the total number of pages

        expect(wrapper.text()).toContain(`/ ${numberOfPages}`)
    })
})
