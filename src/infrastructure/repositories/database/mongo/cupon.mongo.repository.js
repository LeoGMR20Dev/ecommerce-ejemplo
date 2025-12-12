const CuponRepository = require("../../../../domain/repositories/cupon.repository.interface");
const CuponModel = require("./models/cupon.model");
const Cupon = require("../../../../domain/entities/cupon.entity");

class CuponMongoRepository extends CuponRepository {
  async getAll() {
    const cupons = await CuponModel.find();
    return cupons.map(
      (c) =>
        new Cupon(
          c._id.toString(),
          c.name,
          c.amount,
          c.isPercentage,
          c.minimumPriceToApply
        )
    );
  }

  async getById(id) {
    const cupon = await CuponModel.findById(id);

    if (!cupon) return null;

    return new Cupon(
      cupon._id.toString(),
      cupon.name,
      cupon.amount,
      cupon.isPercentage,
      cupon.minimumPriceToApply
    );
  }

  async create(cupon) {
    console.log(cupon)
    const newCupon = new CuponModel({
      name: cupon.name,
      amount: cupon.amount,
      isPercentage: cupon.isPercentage,
      minimumPriceToApply: cupon.minimumPriceToApply,
    });

    const savedCupon = await newCupon.save();

    return new Cupon(
      savedCupon._id.toString(),
      savedCupon.name,
      savedCupon.amount,
      savedCupon.isPercentage,
      savedCupon.minimumPriceToApply
    );
  }

  async update(id, cupon) {
    const updatedCupon = await CuponModel.findByIdAndUpdate(
      id,
      {
        name: cupon.name,
        amount: cupon.amount,
        isPercentage: cupon.isPercentage,
        minimumPriceToApply: cupon.minimumPriceToApply,
      },
      { new: true }
    );

    if (!updatedCupon) return null;

    return new Cupon(
      updatedCupon._id.toString(),
      updatedCupon.name,
      updatedCupon.amount,
      updatedCupon.isPercentage,
      updatedCupon.minimumPriceToApply
    );
  }

  async delete(id) {
    return CuponModel.findByIdAndDelete(id);
  }
}

module.exports = CuponMongoRepository;
