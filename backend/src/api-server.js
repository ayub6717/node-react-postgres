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
 *     description: Retrieves a list of all products from the database. Auto-seeds default products if table is empty.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 */
app.get('/api/products', async (req, res) => {
  try {
    let products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
    
    // Auto-seed if database has no products
    if (products.length === 0) {
      await prisma.product.createMany({
        data: [
          { name: 'Gaming Laptop', price: 1299.99, description: 'High-performance gaming laptop with RTX graphics', category: 'Electronics', stock: 15 },
          { name: 'Wireless Headphones', price: 199.99, description: 'Active noise-canceling over-ear wireless headphones', category: 'Audio', stock: 45 },
          { name: 'Mechanical Keyboard', price: 89.99, description: 'Tactile mechanical keyboard with RGB backlighting', category: 'Accessories', stock: 30 }
        ]
      });
      products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
    }
    
    res.json({ success: true, data: products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieves a specific product by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product and saves it to the database
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Smart Watch
 *               price:
 *                 type: number
 *                 example: 249.99
 *               description:
 *                 type: string
 *                 example: Smart fitness tracker and smartwatch
 *               category:
 *                 type: string
 *                 example: Wearables
 *               stock:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 */
app.post('/api/products', async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        category,
        stock: stock ? parseInt(stock) : 0
      }
    });
    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Updates an existing product details by its ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
app.put('/api/products/:id', async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        price: price ? parseFloat(price) : undefined,
        description,
        category,
        stock: stock !== undefined ? parseInt(stock) : undefined
      }
    });
    res.json({ success: true, message: 'Product updated successfully', data: updatedProduct });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product by its ID from the database
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
app.delete('/api/products/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 API Server running at: http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs:          http://localhost:${PORT}/api-docs\n`);
});
