const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Tạo schema cho bảng News
const categorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Sort_order: {
    type: Number,
    required: true
  }
},{
  timestamps:true,
});

// Tạo model từ schema
module.exports = mongoose.model('Categorys', categorySchema);

//id : khóa chính và trường dữ liệu
// name: tên danh mục
// sort_order: vị trí sắp xếp