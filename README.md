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

## 🔐 Autenticazione e Ruoli

Il sistema utilizza **JWT (JSON Web Token)** per autenticare gli utenti e gestire i ruoli.

- **Utente (USER)**: Può creare e visualizzare solo i propri ticket.
- **Amministratore (ADMIN)**: Può visualizzare e gestire tutti i ticket.

## 📌 Persistenza del Token
Dopo il login, il **token JWT** e il **ruolo** dell'utente vengono salvati in `localStorage` per mantenere l'autenticazione attiva anche dopo il refresh della pagina.

## 🔄 API Backend
L'applicazione comunica con un backend Spring Boot 3.4.3 tramite API REST.
Esempio di chiamata API con axios per recuperare i ticket:

axios.get('/api/tickets', {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
})
  .then(response => console.log(response.data))
  .catch(error => console.error("Errore:", error));

