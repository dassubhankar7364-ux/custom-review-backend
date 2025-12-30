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
