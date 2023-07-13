// Trong file site.js
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.post('/GetListProduct', siteController.GetListProduct);

module.exports = router;