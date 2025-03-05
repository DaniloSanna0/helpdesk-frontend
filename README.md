# 🔹 Caratteristiche principali
- **Autenticazione e autorizzazione**: Login con JWT, ruoli utente (`USER` e `ADMIN`).
- **Gestione dei ticket**: Gli utenti possono creare e visualizzare solo i propri ticket, mentre gli admin possono gestire tutti i ticket.
- **Interfaccia moderna**: Layout responsive e componenti ottimizzati per un'esperienza fluida.
- **Routing dinamico**: Accesso condizionale alle pagine in base al ruolo dell'utente.
- **Gestione dello stato con Pinia**: Persistenza del token di autenticazione e dei dati dell'utente.
- **Integrazione con API REST**: Comunicazione con il backend per operazioni CRUD sui ticket.

## 🎯 Tecnologie utilizzate
- **Vue.js 3** (Composition API)
- **Pinia** (State Management)
- **Vue Router** (Gestione delle rotte)
- **Axios** (Chiamate HTTP)
- **Bootstrap 5** (Stilizzazione)
- **Vite** (Build Tool per prestazioni ottimali)

🔐 Autenticazione e Ruoli
Il sistema implementa un'autenticazione JWT con login e ruoli:

Utente (USER): Può creare e visualizzare i propri ticket.
Amministratore (ADMIN): Può vedere e gestire tutti i ticket.
Al login, il token e il ruolo vengono salvati in localStorage per garantire persistenza.

📚 Struttura del Progetto
bash
Copia
Modifica
/src
 ├── assets/        # File statici (CSS, immagini)
 ├── components/    # Componenti Vue riutilizzabili
 ├── pages/         # Pagine principali
 ├── router/        # Configurazione delle rotte Vue
 ├── stores/        # Pinia store per gestione stato globale
 ├── services/      # Chiamate API con Axios
 ├── App.vue        # Entry point dell'app
 ├── main.ts        # Inizializzazione Vue e dipendenze

 🔄 API Backend
L'app comunica con un backend Spring Boot. Esempio di chiamata API:

javascript
Copia
Modifica
axios.get('/api/tickets', {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(response => console.log(response.data))
  .catch(error => console.error("Errore:", error));
