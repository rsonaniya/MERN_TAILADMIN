const express = require("express");
const {
  createCategory,
  getCategories,
} = require("../controllers/masterController");
const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);

module.exports = router;
