const express = require("express");
const userRoutes = require("./routes/userRoutes.js");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const multer = require("multer");
const path = require("path");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

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

// route test
// app.post("/single", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("single file upload");
// });

//server
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
