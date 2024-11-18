import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import Intro from './pages/Intro.vue'
import i18n  from "./i18n.js"

const routes = [
  { path: '/',   component: Intro },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App);

app
.use(router)
.use(i18n)

app.mount('#app')