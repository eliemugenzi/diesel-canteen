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
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
