const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
});

module.exports = mongoose.model("Token", TokenSchema);
