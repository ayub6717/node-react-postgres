# Node.js + React + PostgreSQL — Full Stack App

A full-stack application demonstrating REST API integration using **React Query** for data fetching, **Tailwind CSS** for styling, and a **Node.js/Express** backend connected to **PostgreSQL**.

## Features

- ✅ React Query (`useQuery` / `useMutation`) for GET and POST requests
- ✅ Automatic loading states, error handling, and cache invalidation
- ✅ Tailwind CSS styling
- ✅ PostgreSQL-backed user management
- ✅ Vercel deployment ready

## Getting Started

### 1. Start the Backend API

```bash
cd ../node-learning
npm install
npm run api
```

API available at: `http://localhost:3002`  
Swagger UI: `http://localhost:3002/api-docs`

### 2. Start the Frontend

```bash
npm install
npm run dev
```

App available at: `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   └── apiService.js       # Axios API functions
├── components/
│   ├── UsersList.jsx        # Displays all users from the database
│   ├── ProductsList.jsx     # Displays products list
│   └── CreateUserForm.jsx   # Form to create a new user
├── App.jsx                  # Root component with tab navigation
└── main.jsx                 # React Query provider setup
```

## Environment Variables

Copy `.env.example` to `.env` and set your API URL:

```env
VITE_API_URL=http://localhost:3002/api
```

## Deployment

### Deploy Frontend to Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set `VITE_API_URL` to your hosted backend URL in Vercel environment variables
4. Deploy

### Deploy Backend

Host the `node-learning` backend on Railway, Render, or any Node.js-compatible platform. Set the required environment variables (see `node-learning/.env.example`).

## License

ISC
