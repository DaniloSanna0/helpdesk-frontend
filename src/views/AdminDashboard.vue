<template>
  <div class="container mt-5">
    <h2 class="mb-4">Gestione Ticket (Admin)</h2>

    <div v-if="tickets.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Utente</th>
            <th>Titolo</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.username }}</td>
            <td>{{ ticket.title }}</td>
            <td>
              <span class="badge" :class="getBadgeClass(ticket.status)">
                {{ ticket.status }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-warning me-2"
                @click="updateStatus(ticket.id, 'IN_PROGRESS')"
              >
                In Lavorazione
              </button>
              <button
                class="btn btn-sm btn-success me-2"
                @click="updateStatus(ticket.id, 'RESOLVED')"
              >
                Risolto
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteTicket(ticket.id)">
                Elimina
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Nessun ticket trovato.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const tickets = ref([])

// Carica tutti i ticket (solo per admin)
const loadTickets = async () => {
  try {
    const response = await axios.get('/admin/tickets', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    tickets.value = response.data
  } catch (error) {
    console.error('Errore nel caricamento dei ticket:', error)
  }
}

// Aggiorna lo stato di un ticket
const updateStatus = async (ticketId, status) => {
  try {
    await axios.put(
      `/admin/tickets/${ticketId}`,
      { status },
      {
        headers: { Authorization: `Bearer ${authStore.token}` },
      },
    )
    loadTickets() // Ricarica la lista dopo la modifica
  } catch (error) {
    console.error("Errore nell'aggiornamento dello stato:", error)
  }
}

// Elimina un ticket
const deleteTicket = async (ticketId) => {
  try {
    await axios.delete(`/admin/tickets/${ticketId}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    loadTickets() // Ricarica la lista dopo la cancellazione
  } catch (error) {
    console.error("Errore nell'eliminazione del ticket:", error)
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
