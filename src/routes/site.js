// Trong file site.js
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

//#region API Product
router.post('/GetListProduct', siteController.GetListProduct);
router.post('/GetProduct', siteController.GetProduct);
router.post('/CreateProduct', siteController.CreateProduct);
router.post('/UpdateProduct', siteController.UpdateProduct);
router.post('/DeleteProduct', siteController.DeleteProduct);
router.post('/GetProductByCategoryID', siteController.GetProductByCategoryID);
//#endregion

//#region API Category
router.post('/GetListCategory', siteController.GetListCategory);
router.post('/GetCategory', siteController.GetCategory);
router.post('/CreateCategory', siteController.CreateCategory);
router.post('/UpdateCategory', siteController.UpdateCategory);
router.post('/DeleteCategory', siteController.DeleteCategory);
//#endregion 

//#region API payment
router.post('/GetListTransaction', siteController.GetListTransaction);
router.post('/GetTransaction', siteController.GetTransaction);
router.post('/CreateTransaction', siteController.CreateTransaction);
router.post('/UpdateStatusTransaction', siteController.UpdateStatusTransaction);
router.post('/DeleteTransaction', siteController.DeleteTransaction);
//#endregion 

//#region API Order
router.post('/GetListOrder', siteController.GetListOrder);
//#endregion

//#region API Auth
router.post('/Register', siteController.Register);
router.post('/Login', siteController.Login);
router.post('/GetAllUser', siteController.GetAllUser);
//#endregion


module.exports = router;