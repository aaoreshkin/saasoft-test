import { createApp } from 'vue'
import { createPinia } from 'pinia'
import app from '@/App.vue'

const instance = createApp(app)

instance.use(createPinia())

instance.mount('#app')
