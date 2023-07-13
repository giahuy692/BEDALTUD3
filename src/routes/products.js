const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

router.get('/GetListProduct', productController.GetListProduct);

module.exports = router;
