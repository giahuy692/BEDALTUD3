const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    default:"User",
    default: null
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    default: null
  },
  Password: {
    type: String,
    required: true,
    default: null
  },
  Address: {
    type: String,
    default: null
  },
  Phone: {
    type: String,
    default: null
  },
  Role:{
    type: String,
    default:"User"
  }
},{
  timestamps: true,
});

// Create the User model from the schema
module.exports  = mongoose.model('User', userSchema);

// id : khóa chính
// name: họ tên
// email: email,sử dụng để đăng nhập
// password: mật khẩu đăng nhập
// address: địa chỉ
// created: thời điểm đăng ký thành viên