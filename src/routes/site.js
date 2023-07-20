// Trong file site.js
const express = require('express');
const router = express.Router();
const middleware = require ("../app/middleware/auth.middleware");

const siteController = require('../app/controllers/SiteController');

//#region API Product
router.post('/GetListProduct', siteController.GetListProduct);
router.post('/GetProduct', middleware.verifyToken, siteController.GetProduct);
router.post('/FindProduct', siteController.FindProduct);
router.post('/CreateProduct',middleware.verifyToken, siteController.CreateProduct);
router.post('/UpdateProduct',middleware.verifyToken, siteController.UpdateProduct);
router.post('/DeleteProduct',middleware.verifyToken, siteController.DeleteProduct);
router.post('/GetProductByCategoryID', siteController.GetProductByCategoryID);
//#endregion

//#region API Category
router.post('/GetListCategory', siteController.GetListCategory);
router.post('/GetCategory', siteController.GetCategory);
router.post('/CreateCategory',middleware.verifyToken, siteController.CreateCategory);
router.post('/UpdateCategory',middleware.verifyToken, siteController.UpdateCategory);
router.post('/DeleteCategory',middleware.verifyToken, siteController.DeleteCategory);
//#endregion 

//#region API payment
router.post('/GetListTransaction', siteController.GetListTransaction);
router.post('/GetTransaction', siteController.GetTransaction);
router.post('/CreateTransaction', middleware.verifyToken, siteController.CreateTransaction);
router.post('/UpdateStatusTransaction', middleware.verifyToken, siteController.UpdateStatusTransaction);
router.post('/DeleteTransaction', middleware.verifyToken, siteController.DeleteTransaction);
//#endregion 

//#region API Order
router.post('/GetListOrder', siteController.GetListOrder);
//#endregion

//#region API Auth
router.post('/Register', siteController.Register);
router.post('/Login', siteController.Login);
router.post('/GetAllUser', middleware.verifyToken, siteController.GetAllUser);
router.post('/GetUser', middleware.verifyToken, siteController.GetUser);
router.post('/FindUser', middleware.verifyToken, siteController.FindUser);
router.post('/DeleteUser', middleware.verifyTokenAndAdminAuth, siteController.DeleteUser);
router.post('/UpdateUser', middleware.verifyToken, siteController.UpdateUser);
//#endregion


module.exports = router;