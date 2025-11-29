const Order = require("../../domain/entities/order.entity");

class OrderService {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async getAllOrders() {
    return this.orderRepository.getAll();
  }

  async getOrderById(id) {
    return this.orderRepository.getById(id);
  }

  async createOrder(orderData) {
    const product = await this.productRepository.getById(orderData.product);

    if (!product) return null;

    if (product.stock < orderData.quantity || orderData.quantity <= 0)
      return null;

    const totalWithoutDiscount = orderData.quantity * product.price;

    if (orderData.discount > totalWithoutDiscount || orderData.discount < 0) {
      return null;
    }
    console.log("dsadas");
    const updatedProduct = await this.productRepository.update(product.id, {
      ...product,
      stock: product.stock - orderData.quantity,
    });
    console.log("dsadas2");

    if (!updatedProduct) return null;

    const total = totalWithoutDiscount - orderData.discount;
    console.log("dsadas3", product);

    const orderEntity = new Order(
      null,
      product.id.toString(),
      orderData.description,
      orderData.quantity,
      product.price,
      orderData.discount,
      total
    );
    console.log("dsadas4");

    return this.orderRepository.create(orderEntity);
  }

  async updateOrder(id, orderData) {
    const order = await this.orderRepository.getById(id);

    if (!order) return null;

    const product = await this.productRepository.getById(order.product);

    if (!product) return null;

    const stockDifference = order.quantity - orderData.quantity; //10 - 21 = -11
    const updatedStock = product.stock + stockDifference;

    if (orderData.quantity <= 0 || updatedStock < 0) return null;

    const totalWithoutDiscount = orderData.quantity * product.price;

    if (orderData.discount > totalWithoutDiscount || orderData.discount < 0) {
      return null;
    }

    const updatedProduct = await this.productRepository.update(product.id, {
      ...product,
      stock: updatedStock,
    });

    if (!updatedProduct) return null;

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

    return this.orderRepository.update(id, orderEntity);
  }

  async deleteOrder(id) {
    return this.orderRepository.delete(id);
  }
}

module.exports = OrderService;
