<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Registrati</h3>
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" id="username" v-model="username" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
                />
              </div>
              <button type="submit" class="btn btn-success w-100">Registrati</button>
            </form>
            <p class="mt-3 text-center">
              Hai già un account? <router-link to="/login">Accedi</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  try {
    await axios.post('/auth/register', { username: username.value, password: password.value })
    await authStore.login(username.value, password.value) // Login automatico dopo registrazione
    router.push('/dashboard')
  } catch {
    alert('Errore durante la registrazione. Riprova.')
  }
}
</script>
