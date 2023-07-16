const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Tạo schema cho bảng News
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: Date, required: true }
});

// Tạo model từ schema
module.exports = mongoose.model('News', newsSchema);