const { Router } = require("express");
const OrderController = require("../controllers/order.controller");

const OrderService = require("../../application/use-cases/order.service");
const authenticateToken = require("../middlewares/auth.middleware");

const OrderMongoRepository = require("../../infrastructure/repositories/database/mongo/order.mongo.repository");
const ProductMongoRepository = require("../../infrastructure/repositories/database/mongo/product.mongo.repository");
const TransactionMongoRepository = require("../../infrastructure/repositories/database/mongo/transaction.mongo.repository");
const orderRepository = new OrderMongoRepository();
const productRepository = new ProductMongoRepository();
const transactionRepository = new TransactionMongoRepository();

const orderService = new OrderService(
  orderRepository,
  productRepository,
  transactionRepository
);
const orderController = new OrderController(orderService);

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: The orders CRUD endpoints
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", orderController.getAll);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */
router.get("/:id", orderController.getById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new user
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.post("/", [authenticateToken], orderController.create);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product or Order not found
 */
router.put("/:id", [authenticateToken], orderController.update);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Order not found
 */
router.delete("/:id", [authenticateToken], orderController.delete);

module.exports = router;
