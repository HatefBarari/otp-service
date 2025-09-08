const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    phone: {
      type: String, // 09149532509
      required: true,
    },
    expireAt: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      default: 0, //5
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("otp", schema);

module.exports = model;
