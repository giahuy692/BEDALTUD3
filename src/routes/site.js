// Trong file site.js
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/GetListProduct', siteController.GetListProduct);

module.exports = router;