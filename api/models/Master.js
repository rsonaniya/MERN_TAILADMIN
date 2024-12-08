const mongoose = require("mongoose");

const masterSchema = new mongoose.Schema({
  category: { type: String, required: true },
});

module.exports = mongoose.model("Master", masterSchema);
