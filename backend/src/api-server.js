// REST API Server with Swagger Documentation

require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;
const prisma = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js REST API',
      version: '1.0.0',
      description: 'RESTful API with Swagger documentation, built with Express.js and PostgreSQL.',
      contact: {
        name: 'Developer'
      }
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`,
        description: 'Primary server'
      },
      {
        url: `http://localhost:${PORT}`,
        description: 'Local development server'
      }
    ]
  },
  apis: ['./src/api-server.js'] // JSDoc annotations are in this file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================ API Endpoints ================

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     description: API home page with links to documentation
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 docs:
 *                   type: string
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Node.js REST API 🚀',
    docs: `http://localhost:${PORT}/api-docs`,
    info: 'Visit the Swagger documentation to explore all available endpoints.'
  });
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users from the database
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User list successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 */
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a specific user by their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: User not found
 */
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user and saves them to the database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  try {
    const newUser = await prisma.user.create({
      data: { name, email }
    });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves a static list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 */
app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 50000 },
    { id: 2, name: 'Mobile', price: 20000 },
    { id: 3, name: 'Tablet', price: 15000 }
  ];

  res.json({ success: true, data: products });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 API Server running at: http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs:          http://localhost:${PORT}/api-docs\n`);
});
