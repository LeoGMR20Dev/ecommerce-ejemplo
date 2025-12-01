class ProductController {
  constructor(productService) {
    // Depende del Caso de Uso
    this.productService = productService;
  }

  getAll = async (_, res, next) => {
    // Usamos arrow fn para no perder el 'this'
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await this.productService.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product); // 201 Created!
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await this.productService.updateProduct(id, req.body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    const { id } = req.params;

    try {
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
module.exports = ProductController;
