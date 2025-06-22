# Frontend Project

This is a React Vite TypeScript project that interacts with a Symfony backend for user authentication and videogame management.

## Project Structure

```
frontend
├── public
│   └── vite.svg
├── src
│   ├── api
│   │   ├── auth.ts
│   │   └── videogames.ts
│   ├── components
│   │   ├── Auth
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── Games
│   │   │   ├── GameList.tsx
│   │   │   ├── UserGameList.tsx
│   │   │   └── GameItem.tsx
│   │   └── Layout
│   │       └── Navbar.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── UserGames.tsx
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tsconfig.json
├── package.json
├── vite.config.ts
└── README.md
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:3000` to view the application.

## Features

- User Authentication:
  - Login and Registration forms for user access.
  
- Videogame Management:
  - View a list of all available videogames.
  - Manage user-specific videogames (add, remove, rate).

## API Endpoints

- **Authentication**
  - `POST /api/login`: Authenticate user.
  - `POST /api/register`: Register a new user.

- **Videogames**
  - `GET /api/games`: Fetch all videogames.
  - `POST /api/user/games`: Add a videogame to the user's list.
  - `DELETE /api/user/games`: Remove a videogame from the user's list.
  - `PUT /api/user/games/rating`: Update the rating of a videogame in the user's list.

## Technologies Used

- React
- TypeScript
- Vite
- Axios (for API calls)

## License

This project is licensed under the MIT License.