const mongoose = require("mongoose");
const schema = mongoose.Schema;

const shopSchema = new schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hospital: { type: String, required: true },
    address: { type: String, required: true },
    stock: {
      mask: { type: Number },
      ppe: { type: Number },
      ventilator: { type: Number },
      gown: { type: Number },
    },
    messages: [
      {
        send: { type: String },
        date: { type: Date },
        to: { type: String },
        from: { type: String },
        message: { type: String },
      },
    ],
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

export default Shops;
