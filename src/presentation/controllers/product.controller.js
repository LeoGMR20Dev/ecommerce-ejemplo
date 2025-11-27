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
    const product = await this.productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  };

  create = async (req, res) => {
    const product = await this.productService.createProduct(req.body);
    res.status(201).json(product); // 201 Created!
  };

  update = async (req, res) => {
    const product = await this.productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  };

  delete = async (req, res) => {
    const product = await this.productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.sendStatus(204);
  };
}
module.exports = ProductController;
