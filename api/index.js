const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const masterRoutes = require("./routes/masterRoutes");
const detailsRoutes = require("./routes/detailsRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
connectDB();

app.use(bodyParser.json());

app.use("/api/master", masterRoutes);
app.use("/api/detail", detailsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
