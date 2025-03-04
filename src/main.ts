import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createNotivue } from 'notivue'
import 'notivue/notification.css' // Only needed if using built-in notifications
import 'notivue/animations.css' // Only needed if using built-in animations

import App from './App.vue'
import router from './router'

const app = createApp(App)
const notivue = createNotivue()

app.use(createPinia())
app.use(notivue)
app.use(router)

app.mount('#app')
