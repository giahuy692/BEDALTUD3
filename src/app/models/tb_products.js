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

// id : khóa chính và trường dữ liệu
// catalog_id: id của danh mục sản phẩm
// name: tên sản phẩm
// price: giá sản phẩm
// discount: lưu chiết khấu, giảm giá
// price: giá sản phẩm
// image_link: lưu link file ảnh minh họa
// image_list: lưu danh sách link file ảnh
// created: thời điểm tạo sản phẩm
// view: số lượt xem sản phẩm