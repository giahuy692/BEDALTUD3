// Trong file site.js
const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

// Định nghĩa các tuyến đường và xử lý yêu cầu
// router.get('/product', siteController.product);
router.get('/create', adminController.create);
// Xuất router middleware để sử dụng trong module khác
module.exports = router;