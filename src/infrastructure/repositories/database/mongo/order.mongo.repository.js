const OrderRepository = require("../../../../domain/repositories/order.repository.interface");
const OrderModel = require("./models/order.model");
const Order = require("../../../../domain/entities/order.entity");

class OrderMongoRepository extends OrderRepository {
  async getAll() {
    const orders = await OrderModel.find();
    return orders.map(
      (p) =>
        new Order(
          p._id.toString(),
          p.product,
          p.description,
          p.quantity,
          p.price,
          p.discount,
          p.total
        )
    );
  }

  async getById(id, session = null) {
    const order = await OrderModel.findById(
      id,
      null,
      session ? { session } : undefined
    );

    if (!order) return null;

    return new Order(
      order._id.toString(),
      order.product,
      order.description,
      order.quantity,
      order.price,
      order.discount,
      order.total
    );
  }

  async create(orderEntity, session = null) {
    const newOrder = new OrderModel({
      product: orderEntity.product,
      description: orderEntity.description,
      quantity: orderEntity.quantity,
      price: orderEntity.price,
      discount: orderEntity.discount,
      total: orderEntity.total,
    });

    const savedOrder = session
      ? await newOrder.save({ session })
      : await newOrder.save();

    return new Order(
      savedOrder._id.toString(),
      savedOrder.product,
      savedOrder.description,
      savedOrder.quantity,
      savedOrder.price,
      savedOrder.discount,
      savedOrder.total
    );
  }

  async update(id, orderEntity, session = null) {
    const dataToUpdate = {
      product: orderEntity.product,
      description: orderEntity.description,
      quantity: orderEntity.quantity,
      price: orderEntity.price,
      discount: orderEntity.discount,
      total: orderEntity.total,
    };

    const options = { new: true };
    if (session) options.session = session;

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      dataToUpdate,
      options
    );

    if (!updatedOrder) return null;

    return new Order(
      updatedOrder._id.toString(),
      updatedOrder.product,
      updatedOrder.description,
      updatedOrder.quantity,
      updatedOrder.price,
      updatedOrder.discount,
      updatedOrder.total
    );
  }

  async delete(id) {
    return OrderModel.findByIdAndDelete(id);
  }
}

module.exports = OrderMongoRepository;
