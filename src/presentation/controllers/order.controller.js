class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  getAll = async (_, res, next) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const order = await this.orderService.getOrderById(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const { id } = req.params;

    try {
      const order = await this.orderService.updateOrder(id, req.body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const { id } = req.params;

    try {
      await this.orderService.deleteOrder(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = OrderController;
