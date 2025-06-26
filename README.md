# Esame Symfony PHP

Autore: Matteo Ariu

## Descrizione del progetto

Questo progetto è una web app fullstack composta da un frontend sviluppato in **React + Vite + TypeScript** e un backend realizzato con **Symfony PHP**. L'applicazione permette la gestione di una lista di videogiochi, con funzionalità di autenticazione, ricerca con filtri, aggiunta ad una lista personale con possibilità di inserimento di un rating.

---

## Avvio del progetto

1. Dalla root del progetto, eseguire il comando:
   ```bash
   docker compose up --build
   ```
2. Una volta avviati i servizi, l'applicazione sarà accessibile dal browser all'indirizzo:
   ```
   http://localhost:5173
   ```

Per accedere alla piattaforma è necessario registrarsi tramite la pagina di registrazione, utilizzando una qualsiasi email e password.

> **Nota:** Un possibile problema di mancato avvio del backend è possibile risolverlo assegnando i permessi di scrittura alla cartella `backend/var`.  
> Su Linux/Mac eseguire:
> ```bash
> chmod -R 777 backend/var
> ```
> Su Windows, verificare che la cartella non sia in sola lettura e che l'utente abbia i permessi di scrittura.


---

## Struttura del progetto

La repository è suddivisa in due cartelle principali:

### 1. `frontend/`

Contiene il progetto frontend sviluppato con **React, Vite e TypeScript**. Per il CSS è stato usato **TailwindCSS**.
Le principali pagine sono:

- **Login**: pagina con form di autenticazione utente.
- **Register**: pagina con form di registrazione utente.
- **Home**: mostra tutti i videogiochi presenti nel sistema, con funzionalità di ricerca per nome e filtri di ordinamento.
- **Dettaglio Videogioco**: cliccando su un videogioco dalla home si accede alla pagina di dettaglio, dove è possibile aggiungere il gioco alla propria lista personale.
- **Lista Utente**: mostra tutti i videogiochi salvati dall’utente, consente di modificare il rating personale e di rimuovere giochi dalla lista.

### 2. `backend/`

Contiene il backend **Symfony** e le configurazioni per il server:

- **Symfony**: fornisce una RESTful API che espone i dati in formato JSON al frontend e gira sulla porta `8000`.
- **Doctrine ORM**: utilizzato per la gestione delle entità, delle migrazioni e per il popolamento del database tramite il file di fixtures [`VideogameFixtures.php`](backend/src/DataFixtures/VideogameFixtures.php).
- **Entità principali**:
  - `User`: rappresenta l’utente.
  - `Videogame`: rappresenta il videogioco.
  - `UserVideogame`: gestisce la relazione molti-a-molti tra utente e videogioco (lista dei giochi salvati dall’utente).
- **Configurazione server**: sono inclusi i file per il deploy tramite **nginx** e **PostgreSQL** come database.

#### Struttura delle API

- **Registrazione**:  
  È presente un controller per la registrazione che consente la creazione di una nuova entità `User` con password salvata in formato hash.

- **Login**:  
  L'autenticazione viene gestita tramite il package **LexikJWTAuthenticationBundle** che fornisce autenticazione JWT. La configurazione è visibile nel file [`security.yaml`](backend/config/packages/security.yaml).

- **CORS**:  
  La gestione delle CORS è affidata al package **nelmio/cors-bundle**, configurato nel file [`nelmio_cors.yaml`](backend/config/packages/nelmio_cors.yaml) per permettere le richieste dal frontend.

- **Controller Videogame** (`VideogameController`):

  - `GET /api/games`: restituisce la lista di tutti i videogiochi.
  - `GET /api/games/search`: ricerca videogiochi per nome e permette l’ordinamento.
  - `GET /api/games/{id}`: restituisce il dettaglio di un singolo videogioco.

- **Controller UserVideogame** (`UserVideogameController`):
  - `GET /api/user/games`: restituisce la lista dei videogiochi salvati dall’utente autenticato.
  - `POST /api/user/games`: aggiunge un videogioco alla lista dell’utente.
  - `DELETE /api/user/games/{id}`: rimuove un videogioco dalla lista dell’utente.
  - `PUT /api/user/games/{id}`: aggiorna il rating personale dell’utente per un videogioco nella propria lista.

---


## Porte utilizzate dal progetto

- **Frontend React:** `5173`
- **Backend Symfony (via Nginx):** `8000`
- **Database PostgreSQL:** `5432`


