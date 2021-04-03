const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Location", LocationSchema);
