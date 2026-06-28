# Frontend — React + Vite + Tailwind CSS

React frontend for the Node.js + PostgreSQL full-stack app. Uses **React Query** for data fetching and **Tailwind CSS** for styling.

## Getting Started

### 1. Start the backend first

```bash
cd ../backend
npm install
npm run api
```

API available at: `http://localhost:3002`

### 2. Start the frontend

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

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set root directory to `frontend`
4. Set `VITE_API_URL` to your hosted backend URL in Vercel environment variables
5. Deploy

## License

ISC
