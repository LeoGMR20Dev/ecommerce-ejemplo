class CuponController {
  constructor(cuponService) {
    this.cuponService = cuponService;
  }

  getAll = async (_, res, next) => {
    try {
      const cupons = await this.cuponService.getAllCupons();
      res.status(200).json(cupons);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const cupon = await this.cuponService.getCuponById(id);
      res.status(200).json(cupon);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const cupon = await this.cuponService.createCupon(req.body);
      res.status(201).json(cupon);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const { id } = req.params;

    try {
      const cupon = await this.cuponService.updateCupon(id, req.body);
      res.status(200).json(cupon);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const { id } = req.params;

    try {
      await this.cuponService.deleteCupon(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CuponController;
