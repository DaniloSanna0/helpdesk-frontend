// main.ts - Configura Vue con Vue Router e Pinia
import { createApp } from 'vue'
import { createPinia, defineStore } from 'pinia'
import router from './router' // Importiamo il router
import axios from 'axios'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// Pinia Store per l'autenticazione
export const useAuthStore = defineStore('auth', {
  state: (): { token: string; userRole: string } => ({
    token: localStorage.getItem('token') || '',
    userRole: localStorage.getItem('userRole') || '',
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/auth/login', { username, password })
        this.token = response.data.token
        this.userRole = response.data.role
        localStorage.setItem('token', this.token)
        localStorage.setItem('userRole', this.userRole)
      } catch {
        throw new Error('Login fallito')
      }
    },
    logout() {
      this.token = ''
      this.userRole = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
    },
  },
})

app.mount('#app')

// Axios global settings
axios.defaults.baseURL = 'http://localhost:8080/api'

// Usa lo store DOPO che Pinia è stato montato
const authStore = useAuthStore()
axios.interceptors.request.use((config) => {
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})
