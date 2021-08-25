import {defineComponent} from 'vue'

import UploadWarning from '@/components/upload_warning/upload_warning.vue'
import UploadService from "@/services/UploadService";

export default defineComponent({
    name: 'UploadView',

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
                .then(() => this.$router.push('Taxonomy'))

            this.showUploadWarning = false

            form.reset()
        }
    }
})
