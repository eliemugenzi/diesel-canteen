const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const AdminSchema = new Schema({
  login_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  drinks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Drink",
    },
  ],
});

AdminSchema.pre("save", async function (next) {
  try {
    const admin = this;

    console.log({ this: this });
    const password = bcrypt.hashSync(admin.password, 10);
    admin.password = password;
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
