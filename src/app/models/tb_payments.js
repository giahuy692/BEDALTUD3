const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// Tạo schema cho bảng Transaction
const TransactionSchema = new mongoose.Schema({
  Status: {
    type: String,
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  UserName: {
    type: String,
    required: true
  },
  UserEmail: {
    type: String,
    required: true
  },
  UserPhone: {
    type: String,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },
  Payment: {
    type: String,
    required: true
  },
  Message: {
    type: String
  }
},{
  timestamps:true,
});

// Tạo model từ schema
module.exports = mongoose.model('Transaction', TransactionSchema);

// id : khóa chính và trường dữ liệu
// status: lưu trạng thái của giao dịch
// user_id: id của thành viên mua hàng
// user_name: tên của khách hàng
// user_email: email của khách hàng
// user_phone: số điện thoại của khách hàng
// amount: tổng số tiền cần thanh toán
// payment: tên cổng thanh toán khách hàng chọn để thanh toán
// message: nội dung yêu cầu của khách hàng