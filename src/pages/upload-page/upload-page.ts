import {defineComponent} from 'vue'

import Loading from '@/components/loading/loading.vue'
import UploadWarning from '@/components/upload-warning/upload-warning.vue'
import {UploadService} from '@/services/upload-service'

export default defineComponent({
    name: 'UploadPage',

    components: {Loading, UploadWarning},

    emits: ['uploaded'],

    data() {
        return {
            isFileSelected: false,
            showUploadWarning: false,

            showLoading: false,
            showLoadingTimeout: -1
        }
    },

    methods: {

        uploadAndRedirect(): void {
            const form = this.$refs.form as HTMLFormElement

            const formData = new FormData(form)
            UploadService.putUpload(formData).then(() => {
                this.$router.push('/taxonomy')

                this.showLoading = false
                window.clearTimeout(this.showLoadingTimeout)
            })

            this.showUploadWarning = false

            this.showLoadingTimeout = window.setTimeout(() => this.showLoading = true, 500)

            form.reset()
        }
    }
})
