import {shallowMount} from '@vue/test-utils'

import LoadingOverlay from '@/components/loading-overlay/loading-overlay.vue'
import UploadPage from '@/pages/upload-page/upload-page.vue'
import UploadWarning from '@/components/upload-warning/upload-warning.vue'

describe('LoadingPage', () => {

    it('should render', async () => {

        /// GIVEN   the upload page

        const wrapper = await shallowMount(UploadPage)

        /// THEN    upload form should be rendered
        /// AND     the submit button should be disabled

        const form = wrapper.find('form')
        expect(form.text()).toContain('Upload ZIP')
        expect(form.find('input[type="submit"]').attributes().disabled).toBe('')

        /// THEN    the loading overlay should not be shown

        const loadingOverlay = wrapper.findComponent(LoadingOverlay)
        expect(loadingOverlay.classes()).toContain('d-none')

        /// THEN    the upload warning should not be shown

        const uploadWarning = wrapper.findComponent(UploadWarning)
        expect(uploadWarning.classes()).toContain('d-none')
    })

    it('should show a warning when clicking upload', async () => {

        /// GIVEN   the upload page with a selected file

        const wrapper = await shallowMount(UploadPage)

        /// THEN    upload form should be rendered
        /// AND     the submit button should be disabled

        const form = wrapper.find('form')
        expect(form.text()).toContain('Upload ZIP')
        expect(form.find('input[type="submit"]').attributes().disabled).toBe('')

        /// THEN    the loading overlay should not be shown

        const loadingOverlay = wrapper.findComponent(LoadingOverlay)
        expect(loadingOverlay.classes()).toContain('d-none')

        /// THEN    the upload warning should not be shown

        const uploadWarning = wrapper.findComponent(UploadWarning)
        expect(uploadWarning.classes()).toContain('d-none')
    })
})
