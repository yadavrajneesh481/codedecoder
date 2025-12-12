const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();
const app = express();

// CORS
app.use(cors({
  origin: "https://codedecoder-git-main-yadavrajneesh481s-projects.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// DB
connectDB();

// API routes
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/explain", require("./routes/explainRoutes.js"));

// Start
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
