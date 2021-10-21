import {defineComponent} from 'vue'

import UploadWarning from '@/components/upload-warning/upload-warning.vue'
import {UploadService} from '@/services/upload-service'

export default defineComponent({
    name: 'UploadPage',

    components: {UploadWarning},

    emits: ['uploaded'],

    data() {
        return {
            showUploadWarning: false
        }
    },

    methods: {

        uploadAndRedirect(): void {
            const form = this.$refs.form as HTMLFormElement

            const formData = new FormData(form)
            UploadService.putUpload(formData)
                .then(() => this.$router.push('/taxonomy'))

            this.showUploadWarning = false

            form.reset()
        }
    }
})
