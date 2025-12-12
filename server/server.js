const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const path = require("path");
dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://codedecoder-git-main-yadavrajneesh481s-projects.vercel.app/' // or '*' for dev
}));
app.use(express.json());

connectDB();

// API routes
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/explain", require("./routes/explainRoutes.js"));

app.use(express.static(path.join(__dirname, "build")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
