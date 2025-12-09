const Order = require("../../domain/entities/order.entity");
const {
  NotFoundError,
  ValidationError,
} = require("../../domain/errors/custom-error");

class OrderService {
  constructor(orderRepository, productRepository, transactionRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.transactionRepository = transactionRepository;
  }

  async getAllOrders() {
    return this.orderRepository.getAll();
  }

  async getOrderById(id) {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    return order;
  }

  async createOrder(orderData) {
    await this.transactionRepository.beginTransaction();

    try {
      const session = await this.transactionRepository.getSession();

      //Get the product that will be related to the order

      const product = await this.productRepository.getById(
        orderData.product,
        session
      );

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      //Validate the quantity of the order. It has to be less or equal than
      //the actual stock

      if (product.stock < orderData.quantity || orderData.quantity <= 0) {
        throw new ValidationError("Entered quantity not valid");
      }

      //Get and validate the discount for the product

      const totalWithoutDiscount = orderData.quantity * product.price;

      if (orderData.discount > totalWithoutDiscount || orderData.discount < 0) {
        throw new ValidationError("Entered discount amount not valid");
      }

      //Update the product data and create the order

      const updatedProduct = await this.productRepository.update(
        product.id,
        {
          ...product,
          stock: product.stock - orderData.quantity,
        },
        session
      );

      if (!updatedProduct) {
        throw new NotFoundError("Product not found");
      }

      const total = totalWithoutDiscount - orderData.discount;

      const orderEntity = new Order(
        null,
        product.id.toString(),
        orderData.description,
        orderData.quantity,
        product.price,
        orderData.discount,
        total
      );
      const order = await this.orderRepository.create(orderEntity, session);

      await this.transactionRepository.commitTransaction();

      return order;
    } catch (error) {
      await this.transactionRepository.rollbackTransaction();
      throw error;
    } finally {
      await this.transactionRepository.dispose();
    }
  }

  async updateOrder(id, orderData) {
    await this.transactionRepository.beginTransaction();

    try {
      const session = await this.transactionRepository.getSession();

      //Get the order and the product data

      const order = await this.orderRepository.getById(id, session);

      if (!order) {
        throw new NotFoundError("Order not found");
      }

      const product = await this.productRepository.getById(
        order.product,
        session
      );

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      //Validate the quantity to update with the previous stock

      const stockDifference = order.quantity - orderData.quantity;
      const updatedStock = product.stock + stockDifference;

      if (orderData.quantity <= 0 || updatedStock < 0) {
        throw new ValidationError("Entered quantity is not valid");
      }

      //Get and validate the discount for the product

      const totalWithoutDiscount = orderData.quantity * product.price;

      if (orderData.discount > totalWithoutDiscount || orderData.discount < 0) {
        throw new ValidationError("Entered discount is not valid");
      }

      //Update the product and the order data

      const updatedProduct = await this.productRepository.update(
        product.id,
        {
          ...product,
          stock: updatedStock,
        },
        session
      );

      if (!updatedProduct) {
        throw new NotFoundError("Product not found");
      }

      const total = totalWithoutDiscount - orderData.discount;

      const orderEntity = new Order(
        id,
        product.id.toString(),
        orderData.description,
        orderData.quantity,
        product.price,
        orderData.discount,
        total
      );

      const updatedOrder = await this.orderRepository.update(
        id,
        orderEntity,
        session
      );

      await this.transactionRepository.commitTransaction();

      return updatedOrder;
    } catch (error) {
      await this.transactionRepository.rollbackTransaction();
      throw error;
    } finally {
      await this.transactionRepository.dispose();
    }
  }

  async deleteOrder(id) {
    const deletedOrder = await this.orderRepository.delete(id);

    if (!deletedOrder) {
      throw new NotFoundError("Order not found");
    }

    return;
  }
}

module.exports = OrderService;
