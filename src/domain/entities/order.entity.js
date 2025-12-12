class OrderEntity {
  constructor(
    id,
    product,
    description,
    quantity,
    price,
    discount,
    cupon,
    total
  ) {
    this.id = id;
    this.product = product;
    this.description = description;
    this.quantity = quantity;
    this.price = price;
    this.discount = discount;
    this.cupon = cupon;
    this.total = total;
  }
}

module.exports = OrderEntity;
