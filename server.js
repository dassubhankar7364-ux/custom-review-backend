require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/reviews", reviewRoutes);

// 🔍 Root route (Render debug purpose)
app.get("/", (req, res) => {
  res.send("✅ Review backend is running 🚀");
});

/* =========================
   DATABASE & SERVER
========================= */
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
