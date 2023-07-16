const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Tạo schema cho bảng Orders
const orderSchema = new mongoose.Schema({
  paymentID: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Transaction',
    required: true
  },
  paymentName: {
    type: String,
    required: true,
    default: null
  },
  ProductId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Product',
    required: true,
    default: null
  },
  ProductName: {
    type: String ,
    required: true,
    default: null
  },
  Qty: {
    type: Number,
    default: null
  },
  Amount: {
    type: Number,
    default: null
  },
  Status: {
    type: String,
    default: null,
    default: 'Chờ xử lý'
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