const express = require("express");
const userRoutes = require("./routes/userRoutes.js");
const sauceRoutes = require("./routes/sauceRoutes.js");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
//routes
app.use("/api/auth", userRoutes);

app.use("/api", sauceRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
