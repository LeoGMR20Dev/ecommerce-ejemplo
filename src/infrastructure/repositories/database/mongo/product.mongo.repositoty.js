const ProductModel = require("./models/product.model");

class ProductMongoRepository {
  // ¡Implementa la misma interfaz!
  async getAll() {
    return ProductModel.find();
  }

  async getById(id) {
    return ProductModel.findById(id);
  }

  async create(productData) {
    return ProductModel.create(productData);
  }

  async update(id, productData) {
    return ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }
}
module.exports = ProductMongoRepository;
