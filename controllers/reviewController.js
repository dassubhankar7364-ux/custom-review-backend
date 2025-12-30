const Review = require("../models/Review");
const cloudinary = require("../config/cloudinary");

exports.createReview = async (req, res) => {
  const { name, rating, comment } = req.body;

  let imageUrl = "";
  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    imageUrl = upload.secure_url;
  }

  const review = await Review.create({
    name,
    rating,
    comment,
    image: imageUrl
  });

  res.json({ success: true, review });
};

exports.getApprovedReviews = async (req, res) => {
  const reviews = await Review.find({ status: "approved" });
  res.json(reviews);
};

// 🔹 Get all pending reviews (Admin)
exports.getPendingReviews = async (req, res) => {
  const reviews = await Review.find({ status: "pending" });
  res.json(reviews);
};

// 🔹 Approve or Reject review (Admin)
exports.updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // approved / rejected

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const review = await Review.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json({ success: true, review });
};

// 🔹 Delete review (Admin)
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  await Review.findByIdAndDelete(id);
  res.json({ success: true, message: "Review deleted" });
};
