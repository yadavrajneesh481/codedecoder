const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { explainController } = require("../controllers/explainController");
const router = express.Router();

router.post("/code", authMiddleware, explainController)

module.exports = router;