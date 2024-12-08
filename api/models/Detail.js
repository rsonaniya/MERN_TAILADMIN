const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  question: { type: String, required: true },
  masterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Master",
    required: true,
  },
});

module.exports = mongoose.model("Detail", detailSchema);
