import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: ref(localStorage.getItem('token') || ''),
    userRole: ref(localStorage.getItem('userRole') || ''),
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await axios.post('/auth/login', { username, password })
        this.token = response.data.token

        const decoded = jwtDecode<{ role: string }>(this.token)
        this.userRole = decoded.role

        localStorage.setItem('token', this.token)
        localStorage.setItem('userRole', this.userRole)
      } catch (error) {
        console.error('Errore login:', error)
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
