const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
  ProductName: { 
    type: String, 
    required: true
  },
  Category: { 
    type: String , 
    required: true
  },
  Price: { 
    type: Number, 
    default: 0 
  },
  Description: { 
    type: String
  },
  Quantity:{
    type: Number,
    default: 0
  }, 
  Image:{
    type:String
  }
},{
  timestamps: true,
});

module.exports = mongoose.model('Products', Products);
