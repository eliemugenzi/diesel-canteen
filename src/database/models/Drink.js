const mongoose = require("mongoose");
const { Schema } = mongoose;

const DrinkSchema = new Schema({
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
  creacted_at: {
    type: Date,
    default: Date.now(),
  },
});
