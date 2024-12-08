const Master = require("../models/Master");

exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = new Master({ category });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Master.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
