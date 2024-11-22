import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import Intro from './pages/Intro.vue'
import Auth from './pages/Auth.vue'
import Regnick from './pages/RegNick.vue'

import i18n  from "./i18n.js"

const routes = [
  { path: '/',   component: Intro },
  { path: '/auth',   component: Auth },
  { path: '/regnick',   component: Regnick },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App);

app
.use(router)
.use(i18n)
.use(autoAnimatePlugin)

app.mount('#app')