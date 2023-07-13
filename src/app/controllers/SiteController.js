const ProductModel = require('../models/products');
const { mongooseToObject } = require('../../util/mongoose');


class SiteController {
  GetListProduct(req, res,next) {
    const { sort, page, pageSize, email, address, pswRepeat, phone } = req.body;
    try {
      ProductModel.find()
      .limit(pageSize  * 1)
      .skip((page - 1) * pageSize )
      .sort({price:sort})
      .then((product) => {
        let totalProduct = product.length;
        res.status(200).json({ product, totalProduct });
      })
      .catch(next);
    } catch (error) {
      res.status(500).json(err);
    }
  }

}

module.exports = new SiteController();
