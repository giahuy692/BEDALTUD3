const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Tạo schema cho bảng News
const categorySchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    default: null
  },
  Sort_order: {
    type: Number,
    default: null
  }
},{
  timestamps:true,
});

// Tạo model từ schema
module.exports = mongoose.model('Categorys', categorySchema);

//id : khóa chính và trường dữ liệu
// name: tên danh mục
// sort_order: vị trí sắp xếp