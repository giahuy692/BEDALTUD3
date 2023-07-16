const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Tạo schema cho bảng News
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String ,default: null },
  publishDate: { type: Date, default: null }
});

// Tạo model từ schema
module.exports = mongoose.model('News', newsSchema);