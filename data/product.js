const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerName: String,
    rating: Number,
    comment: String,
  });
  
  const productSchema = new mongoose.Schema({
    author: String,
    title: String,
    isbn: Number,
    reviews: [reviewSchema], // Array of reviews
  });

module.exports = mongoose.model('bookdetails', productSchema);
