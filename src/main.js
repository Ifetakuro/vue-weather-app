import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import dotenv from 'dotenv'

dotenv.config()

createApp(App).mount('#app')
