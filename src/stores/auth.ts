import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
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
