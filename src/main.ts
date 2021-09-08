import App from './app/app.vue'
import {createApp} from 'vue'
import {router} from './router'

createApp(App).use(router).mount('#app')
