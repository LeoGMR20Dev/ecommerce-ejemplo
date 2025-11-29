class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  getAll = async (_, res) => {
    const orders = await this.orderService.getAllOrders();
    res.status(200).json(orders);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const order = await this.orderService.getOrderById(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  };

  create = async (req, res) => {
    const order = await this.orderService.createOrder(req.body);
    res.status(201).json(order);
  };

  update = async (req, res) => {
    const { id } = req.params;
    const order = await this.orderService.updateOrder(id, req.body);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    await this.orderService.deleteOrder(id);
    res.status(204).send();
  };
}
module.exports = OrderController;
