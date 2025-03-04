<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-5">
    <h2 class="mb-4">I tuoi Ticket</h2>

    <!-- Bottone per aprire il form di creazione -->
    <button class="btn btn-primary mb-3" @click="showCreateModal = true">Crea Nuovo Ticket</button>

    <!-- Lista dei ticket -->
    <div v-if="tickets.length > 0">
      <div class="card mb-3" v-for="ticket in tickets" :key="ticket.id">
        <div class="card-body">
          <h5 class="card-title">{{ ticket.title }}</h5>
          <p class="card-text">{{ ticket.description }}</p>
          <span class="badge" :class="getBadgeClass(ticket.status)">
            {{ ticket.status }}
          </span>
        </div>
      </div>
    </div>
    <p v-else>Nessun ticket trovato.</p>

    <!-- Modale per creare un ticket -->
    <div v-if="showCreateModal" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Nuovo Ticket</h5>
            <button type="button" class="btn-close" @click="showCreateModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createTicket">
              <div class="mb-3">
                <label class="form-label">Titolo</label>
                <input v-model="newTicket.title" type="text" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Descrizione</label>
                <textarea v-model="newTicket.description" class="form-control" required></textarea>
              </div>
              <button type="submit" class="btn btn-success">Crea</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showCreateModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const tickets = ref([])
const showCreateModal = ref(false)
const newTicket = ref({ title: '', description: '' })

// Carica i ticket dell'utente al caricamento della pagina
const loadTickets = async () => {
  try {
    const response = await axios.get('/tickets', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tickets.value = response.data
  } catch (error) {
    console.error('Errore nel caricamento dei ticket:', error)
  }
}

// Crea un nuovo ticket
const createTicket = async () => {
  try {
    await axios.post('/tickets', newTicket.value, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    showCreateModal.value = false
    newTicket.value = { title: '', description: '' }
    loadTickets() // Ricarica la lista dei ticket
  } catch (error) {
    console.error('Errore nella creazione del ticket:', error)
  }
}

// Restituisce la classe per lo stato del ticket
const getBadgeClass = (status) => {
  switch (status) {
    case 'OPEN':
      return 'badge bg-warning'
    case 'IN_PROGRESS':
      return 'badge bg-primary'
    case 'RESOLVED':
      return 'badge bg-success'
    default:
      return 'badge bg-secondary'
  }
}

onMounted(loadTickets)
</script>
