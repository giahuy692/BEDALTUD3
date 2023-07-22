// Using Node.js `require()`
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise
async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/store').then(() => console.log('Đã kết nối thành công!'));
  } catch (error) {
    console.log('Đã kết nối server thành công!');
  }
}

module.exports = { connect };

