const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Tạo schema cho bảng Banners
const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, default: null}
});

// Tạo model từ schema
module.exports = mongoose.model('Banners', bannerSchema);