const ProductModel = require('../models/products');
const { mongooseToObject } = require('../../util/mongoose');


class SiteController {
  GetListProduct(req, res,next) {
    try {
      ProductModel.find()
      .then((product) => {
        res.status(200).json(product);
      })
      .catch(next);
    } catch (error) {
      res.status(500).json(err);
    }
  }

}

module.exports = new SiteController();
