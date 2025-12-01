const Order = require("../../domain/entities/order.entity");
const {
  NotFoundError,
  ValidationError,
} = require("../../domain/errors/custom-error");

class OrderService {
  constructor(orderRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async getAllOrders() {
    return this.orderRepository.getAll();
  }

  async getOrderById(id) {
    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundError("Orden no encontrada");
    }

    return order;
  }

  async createOrder(orderData) {
    //Get the product that will be related to the order

    const product = await this.productRepository.getById(orderData.product);

    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }

    //Validate the quantity of the order. It has to be less or equal than
    //the actual stock

    if (product.stock < orderData.quantity || orderData.quantity <= 0) {
      throw new ValidationError("Cantidad ingresada no válida");
    }

    //Get and validate the discount for the product

    const totalWithoutDiscount = orderData.quantity * product.price;

    if (orderData.discount > totalWithoutDiscount || orderData.discount < 0) {
      throw new ValidationError("Monto de descuento ingresado no válido");
    }

    //Update the product data and create the order

    const updatedProduct = await this.productRepository.update(product.id, {
      ...product,
      stock: product.stock - orderData.quantity,
    });

    if (!updatedProduct) {
      throw new NotFoundError("Producto no encontrado");
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

    return this.orderRepository.create(orderEntity);
  }

  async updateOrder(id, orderData) {
    //Get the order and the product data

    const order = await this.orderRepository.getById(id);

    if (!order) {
      throw new NotFoundError("Orden no encontradas");
    }

    const product = await this.productRepository.getById(order.product);

    if (!product) {
      throw new NotFoundError("Producto no encontrado");
    }

    //Validate the quantity to update with the previous stock

    const stockDifference = order.quantity - orderData.quantity;
    const updatedStock = product.stock + stockDifference;

    if (orderData.quantity <= 0 || updatedStock < 0) {
      throw new ValidationError("Cantidad ingresada no válida");
    }

    //Get and validate the discount for the product

    const totalWithoutDiscount = orderData.quantity * product.price;

    if (orderData.discount > totalWithoutDiscount || orderData.discount < 0) {
      throw new ValidationError("Monto de descuento ingresado no válido");
    }

    //Update the product and the order data

    const updatedProduct = await this.productRepository.update(product.id, {
      ...product,
      stock: updatedStock,
    });

    if (!updatedProduct) {
      throw new NotFoundError("Producto no encontrado");
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

    return this.orderRepository.update(id, orderEntity);
  }

  async deleteOrder(id) {
    const deletedOrder = await this.orderRepository.delete(id);

    if (!deletedOrder) {
      throw new NotFoundError("Orden no encontrada");
    }

    return;
  }
}

module.exports = OrderService;
