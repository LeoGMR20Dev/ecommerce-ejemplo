class ProductController {
  constructor(productService) {
    // Depende del Caso de Uso
    this.productService = productService;
  }

  getAll = async (_, res) => {
    // Usamos arrow fn para no perder el 'this'
    const products = await this.productService.getAllProducts();
    res.status(200).json(products);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const product = await this.productService.getProductById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };

  create = async (req, res) => {
    const product = await this.productService.createProduct(req.body);
    res.status(201).json(product); // 201 Created!
  };

  update = async (req, res) => {
    const { id } = req.params;
    const product = await this.productService.updateProduct(id, req.body);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    await this.productService.deleteProduct(id);
    res.status(204).send();
  };
}
module.exports = ProductController;
