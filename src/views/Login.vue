<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h3 class="text-center">Login</h3>
            <form @submit.prevent="handleLogin">
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
              <button type="submit" class="btn btn-primary w-100">Accedi</button>
            </form>
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

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value)
    router.push('/dashboard') // Reindirizza alla dashboard dopo il login
  } catch {
    alert('Login fallito! Controlla le credenziali.')
  }
}
</script>
