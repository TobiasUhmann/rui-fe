import {defineComponent} from 'vue'

export default defineComponent({
    name: 'Header',

    methods: {
        goToHomePage() {
            this.$router.push('/').then()
        }
    }
})
