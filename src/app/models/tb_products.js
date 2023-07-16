const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
  CatalogId: {
    type: mongoose.Schema.Types.ObjectId,default: null,

    ref: 'Categorys',
  },
  CatalogName: {
    type: String,default: null,

  },
  ProductName: {
    type: String ,
    required: true
  },
  Price: {
    type: Number,default: null,

  },
  Discount: {
    type: Number,
    default: 0
  },
  Description:{
    type: String,
    default: null,
  },
  Quantity:{
    type: Number,default: null,

  },
  Image_link: {
    type: String,
default: null,
  },
  Image_list: {
    type: [String],
    default: null,
  }
},{
  timestamps: true,
});

module.exports = mongoose.model('Products', Products);

// DTO Product	
// _id	Khóa chính và trường dữ liệu
// CatalogId	id của danh mục sản phẩm
// CatalogName	Tên loại sản phẩm
// ProductName	Tên sản phẩm
// Price	giá sản phẩm
// Discount	lưu chiết khấu, giảm giá
// Description	Mô tả sản phẩm
// Quantity	Số lượng sản phẩm
// Image_link	Ảnh đại diện của sản phẩm
// Image_list	Ảnh chi tiết của sản phẩm
// createdAt	Ngày tạo
// updatedAt	Ngày update
