const { Router } = require("express");
const OrderController = require("../controllers/order.controller");

const OrderService = require("../../application/use-cases/order.service");

const OrderMongoRepository = require("../../infrastructure/repositories/database/mongo/order.mongo.repository");
const ProductMongoRepository = require("../../infrastructure/repositories/database/mongo/product.mongo.repository");
const orderRepository = new OrderMongoRepository();
const productRepository = new ProductMongoRepository();

const orderService = new OrderService(orderRepository, productRepository);
const orderController = new OrderController(orderService);

const router = Router();
router.get("/", orderController.getAll);
router.get("/:id", orderController.getById);
router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;
