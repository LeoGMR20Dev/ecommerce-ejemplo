const Cupon = require("../../domain/entities/cupon.entity");
const { NotFoundError } = require("../../domain/errors/custom-error");

class CuponService {
  constructor(cuponRepository) {
    this.cuponRepository = cuponRepository;
  }

  async getAllCupons() {
    return this.cuponRepository.getAll();
  }

  async getCuponById(id) {
    const cupon = await this.cuponRepository.getById(id);

    if (!cupon) {
      throw new NotFoundError("Cupon not found");
    }

    return cupon;
  }

  async createCupon(cuponData) {
    const cuponEntity = new Cupon(
      null,
      cuponData.name,
      cuponData.amount,
      cuponData.isPercentage,
      cuponData.minimumPriceToApply
    );

    return this.cuponRepository.create(cuponEntity);
  }

  async updateCupon(id, cuponData) {
    const cuponEntity = new Cupon(
      id,
      cuponData.name,
      cuponData.amount,
      cuponData.isPercentage,
      cuponData.minimumPriceToApply
    );

    const updatedCupon = await this.cuponRepository.update(id, cuponEntity);

    if (!updatedCupon) {
      throw new NotFoundError("Cupon not found");
    }

    return updatedCupon;
  }

  async deleteCupon(id) {
    const deletedCupon = await this.cuponRepository.delete(id);

    if (!deletedCupon) {
      throw new NotFoundError("Cupon not found");
    }

    return;
  }
}

module.exports = CuponService;
