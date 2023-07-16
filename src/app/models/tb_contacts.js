const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new mongoose.Schema({
  FullName: { type: String, required: true, default: null },
  Email: { type: String, required: true, default: null },
  Phone: { type: String, required: true, default: null },
  Message: { type: String, required: true,default: null },
  IsRead: {type: Boolean, default: false}
});

// Tạo model từ schema
module.exports = mongoose.model('Contacts', contactSchema);