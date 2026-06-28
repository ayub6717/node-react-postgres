# API Documentation

## REST API with Swagger

### Swagger UI
Open in browser: **http://localhost:3002/api-docs**

Browse and test all API endpoints interactively through the Swagger UI.

---

## Testing with Postman

### Option 1: Import Postman Collection
1. Open Postman
2. Click the **Import** button
3. Select the `postman-collection.json` file
4. All endpoints are ready to test

### Option 2: Manual Testing

#### 1. Get All Users
```
GET http://localhost:3002/api/users
```

#### 2. Get User by ID
```
GET http://localhost:3002/api/users/1
```

#### 3. Create New User
```
POST http://localhost:3002/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### 4. Get All Products
```
GET http://localhost:3002/api/products
```

---

## VS Code Extensions (Optional)

### Thunder Client
Test APIs directly inside VS Code:
1. Go to Extensions → search "Thunder Client" → Install
2. Click the Thunder Client icon in the left sidebar
3. Create a New Request and start testing

### REST Client Extension
Use `.http` files to test API endpoints directly in VS Code.

---

## API Comparison

| Feature | Node.js (This Project) |
|---------|------------------------|
| API Documentation | Swagger / OpenAPI ✅ |
| Testing Tool | Postman ✅ |
| Interactive UI | swagger-ui-express ✅ |
| Collection Export | ✅ |

---

## Commands

```bash
# Start the API server
npm run api

# View Swagger UI
open http://localhost:3002/api-docs

# API Base URL
http://localhost:3002
```
