const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const contactSchema = new mongoose.Schema({
  FullName: { type: String, required: true },
  Email: { type: String, required: true },
  Phone: { type: String, required: true },
  Message: { type: String, required: true },
  IsRead: {type: Boolean}
});

// Tạo model từ schema
module.exports = mongoose.model('Contacts', contactSchema);