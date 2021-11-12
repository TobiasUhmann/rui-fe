import {defineComponent} from 'vue'

import LoadingOverlay from '@/components/loading-overlay/loading-overlay.vue'
import UploadWarning from '@/components/upload-warning/upload-warning.vue'
import {UploadService} from '@/services/upload-service'

export default defineComponent({
    name: 'UploadPage',

    components: {LoadingOverlay, UploadWarning},

    emits: ['uploaded'],

    data() {
        return {
            isFileSelected: false,
            showUploadWarning: false,

            loadingMessages: [] as string[],
            showLoading: false,
            showLoadingTimeout: -1
        }
    },

    methods: {

        startLoading(loadingMessage: string): void {
            this.loadingMessages.push(loadingMessage)

            if (this.showLoadingTimeout === -1) {
                this.showLoadingTimeout = window.setTimeout(() => this.showLoading = true, 500)
            }
        },

        stopLoading(loadingMessage: string): void {

            // Remove loading message
            const index = this.loadingMessages.indexOf(loadingMessage)
            if (index !== -1) {
                this.loadingMessages.splice(index, 1)
            }

            // Stop timeout if there are no further loading messages
            if (this.loadingMessages.length === 0) {
                window.clearTimeout(this.showLoadingTimeout)
                this.showLoadingTimeout = -1
                this.showLoading = false
            }
        },

        uploadAndRedirect(): void {
            const form = this.$refs.form as HTMLFormElement

            const formData = new FormData(form)

            this.startLoading('Uploading data...')
            UploadService.putUpload(formData).then(() => {
                this.$router.push('/taxonomy')

                this.stopLoading('Uploading data...')
            })

            this.showUploadWarning = false

            form.reset()
        }
    }
})
