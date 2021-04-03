const mongoose = require("mongoose");

const { Schema } = mongoose;

const FoodSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Food", FoodSchema);
