const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createReview, getApprovedReviews } = require("../controllers/reviewController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), createReview);
router.get("/", getApprovedReviews);

module.exports = router;
