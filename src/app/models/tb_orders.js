const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Tạo schema cho bảng Orders
const orderSchema = new mongoose.Schema({
  Transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true
  },
  Product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  Qty: {
    type: Number,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Data: {
    type: String
  },
  Status: {
    type: String,
    required: true
  }
},{
  timestamps:true
});

// Tạo model từ schema
module.exports = mongoose.model('Orders', orderSchema);

// id : khóa chính và trường dữ liệu
// transaction_id: id của giao dịch có nhiều đơn hàng và 1 đơn hàng phải thuộc 1 giao dịch
// product_id: id của sản phẩm
// qty: số lượng sản phẩm trong đơn hàng
// amount: số tiền của đơn hàng, lưu ý là số tiền trong bảng giao dịch sẽ bằng tổng số tiền trong bảng đơn hàng
// data: lưu dữ liệu
// status: trạng thái của đơn hàng cho biết sản phẩm của đơn hàng đã được gửi cho khách chưa