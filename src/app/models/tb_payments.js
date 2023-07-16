const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Tạo schema cho bảng Transaction
const TransactionSchema = new mongoose.Schema({
  Status: {
    type: String,
    default: null,
    default: "Chưa thanh toán"
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  UserName: {
    type: String,
    required: true,
    default: null
  },
  UserEmail: {
    type: String, 
    required: true,
    default: null
  },
  UserPhone: {
    type: String,
    default: null,
    required: true
  },
  Amount: {
    type: Number,
    default: null
  },
  Payment: {
    type: String,
    default: "Thanh toán sau khi nhận hàng"
  },
  Message: {
    type: String,
    default: null
  }
},{
  timestamps:true,
});

// Tạo model từ schema
module.exports = mongoose.model('Transactions', TransactionSchema);

// id : khóa chính và trường dữ liệu
// status: lưu trạng thái của giao dịch
// user_id: id của thành viên mua hàng
// user_name: tên của khách hàng
// user_email: email của khách hàng
// user_phone: số điện thoại của khách hàng
// amount: tổng số tiền cần thanh toán
// payment: tên cổng thanh toán khách hàng chọn để thanh toán
// message: nội dung yêu cầu của khách hàng