const Detail = require("../models/Detail");

exports.addQuestion = async (req, res) => {
  try {
    const { question, masterId } = req.body;
    const newQuestion = new Detail({ question, masterId });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Detail.find().populate("masterId", "category");
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
