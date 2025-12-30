const express = require("express");
const router = express.Router();
const multer = require("multer");

// Controllers
const {
  createReview,
  getApprovedReviews,
  getPendingReviews,
  updateReviewStatus,
  deleteReview
} = require("../controllers/reviewController");

// Admin middleware
const adminAuth = require("../middlewares/adminAuth");

// Multer setup (temporary local upload)
const upload = multer({ dest: "uploads/" });

/* =========================
   PUBLIC ROUTES
========================= */

// Submit review (public)
router.post("/", upload.single("image"), createReview);

// Get approved reviews only (public)
router.get("/", getApprovedReviews);

/* =========================
   ADMIN ROUTES (PROTECTED)
========================= */

// Get all pending reviews
router.get("/admin/pending", adminAuth, getPendingReviews);

// Approve or reject review
router.put("/admin/:id", adminAuth, updateReviewStatus);

// Delete review
router.delete("/admin/:id", adminAuth, deleteReview);

module.exports = router;
