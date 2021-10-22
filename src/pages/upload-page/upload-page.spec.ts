import {shallowMount} from '@vue/test-utils'

import Loading from '@/components/loading/loading.vue'
import UploadPage from '@/pages/upload-page/upload-page.vue'
import UploadWarning from '@/components/upload-warning/upload-warning.vue'

it('Render', async () => {

    //
    // GIVEN the upload page
    //

    const wrapper = await shallowMount(UploadPage)

    //
    // THEN  upload form should be rendered
    //

    expect(wrapper.find('form').text()).toContain('Upload ZIP')

    //
    // THEN  the loading indicator should not be shown
    //

    const loading = wrapper.findComponent(Loading)
    expect(loading.classes()).toContain('d-none')

    //
    // THEN  the upload warning should not be shown
    //

    const uploadWarning = wrapper.findComponent(UploadWarning)
    expect(uploadWarning.classes()).toContain('d-none')
})
