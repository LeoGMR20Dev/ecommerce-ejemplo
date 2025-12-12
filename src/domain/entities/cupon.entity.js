class Cupon {
  constructor(id, name, amount, isPercentage, minimumPriceToApply) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.isPercentage = isPercentage;
    this.minimumPriceToApply = minimumPriceToApply;
  }
}

module.exports = Cupon;
