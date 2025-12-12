const mongoose = require("mongoose");

const cuponSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0.1,
  },
  isPercentage: {
    type: Boolean,
    required: true,
  },
  minimumPriceToApply: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Cupon", cuponSchema);
