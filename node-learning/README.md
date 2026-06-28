# node-react-postgres

A full-stack web application built with **Node.js + Express** (backend) and **React + Vite** (frontend), connected to a **PostgreSQL** database. Includes Swagger API documentation and React Query for data fetching.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS, React Query |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| API Docs | Swagger (OpenAPI 3.0) |

---

## Project Structure

```
/
├── node-learning/        # Backend (Express.js + PostgreSQL)
│   ├── src/
│   │   ├── api-server.js # Main API server with Swagger docs
│   │   ├── db.js         # PostgreSQL connection pool
│   │   ├── server.js     # Basic HTTP server example
│   │   ├── index.js      # Node.js entry point example
│   │   └── migrate.js    # Database migration script
│   ├── .env              # Environment variables (not committed)
│   ├── .env.example      # Environment variable template
│   ├── postman-collection.json
│   └── API-DOCS.md
│
└── node+react/           # Frontend (React + Vite)
    ├── src/
    │   ├── api/
    │   │   └── apiService.js
    │   ├── components/
    │   │   ├── UsersList.jsx
    │   │   ├── ProductsList.jsx
    │   │   └── CreateUserForm.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### 1. Set Up the Database

Create a database named `demoDb` in PostgreSQL, then run:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);
```

Or use the migration script (after configuring `.env`):

```bash
cd node-learning
node src/migrate.js
```

### 2. Configure Environment Variables

```bash
cd node-learning
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
PORT=3002
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=demoDb
DB_PASSWORD=your_password
DB_PORT=5432
```

### 3. Start the Backend

```bash
cd node-learning
npm install
npm run api
```

API running at: http://localhost:3002  
Swagger Docs: http://localhost:3002/api-docs

### 4. Start the Frontend

```bash
cd node+react
npm install
npm run dev
```

Frontend running at: http://localhost:5173

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a new user |
| GET | `/api/products` | Get all products |

Full interactive documentation: **http://localhost:3002/api-docs**

---

## License

ISC
