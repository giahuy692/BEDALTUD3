const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    default:"User"
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  Address: {
    type: String,
  },
  Role:{
    type: String,
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