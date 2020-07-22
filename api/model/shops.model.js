const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shopSchema = new schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    contact: { type: String, required: true },
    messages: [
      {
        send: { type: Boolean },
        date: { type: String },
        to: { type: String },
        from: { type: String },
        message: { type: String },
      },
    ],
    products: {
      mask: { type: Number },
      ppe: { type: Number },
      ventilator: { type: Number },
      gown: { type: Number },
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

const Shops = mongoose.model("shops", shopSchema);

module.exports = Shops;
