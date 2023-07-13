const ProductModel = require("../models/products");
const { mongooseToObject } = require("../../util/mongoose");

class SiteController {
  GetListProduct(req, res, next) {
    const { sort, page, pageSize } = req.body;
    try {
      ProductModel.find()
        .limit(pageSize * 1)
        .skip((page - 1) * pageSize)
        .sort({ price: sort })
        .then((product) => {
          let totalProduct = product.length;
          res.status(200).json({ product, totalProduct });
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      res.status(500).json(err);
    }
  }

  GetProduct(req, res, next) {
    console.log(req.body._id);
    try {
      ProductModel.findOne({ _id: req.body._id })
        .then((product) => {
          return res.status(200).json(product);
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      return res.status(500).json(err);
    }
  }

  CreateProduct(req, res, next) {
    let DTOProduct = req.body;
    const newProduct = new ProductModel(DTOProduct);
    try {
      newProduct
        .save()
        .then((product) => {
          return res.status(200).json(product);
        })
        .catch((error) => {
          return res.status(500).json("Lỗi khi lưu sản phẩm:", error);
        });
    } catch (error) {
      return res.status(500).json("Lỗi khi lưu sản phẩm:", error);
    }
  }

  UpdateProduct(req, res, next) {
    const { _id, ...updateFields } = req.body;
    try {
      ProductModel.findOneAndUpdate({ _id: req.body._id }, updateFields, {
        new: true,
      })
        .then((updatedProduct) => {
          return res.status(200).json(updatedProduct);
        })
        .catch((error) => {
          return res.status(500).json("Lỗi khi cập nhật sản phẩm:", error);
        });
    } catch (error) {
      return res.status(500).json("Lỗi khi lưu sản phẩm:", error);
    }
  }

  DeleteProduct(req, res, next) {
    ProductModel.findOneAndRemove({ _id: req.body._id })
      .then((removedProduct) => {
        if (removedProduct) {
          return res.status(200).json({ Message: "Xóa sản phẩm thành công!" });
        } else {
          return res.status(400).json({ Message: "Sản phẩm không tồn tại!" });
        }
      })
      .catch((error) => {
        return res.status(500).json({ Message: "Lỗi khi xóa sản phẩm!" });
      });
  }
}

module.exports = new SiteController();
