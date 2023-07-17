const tb_products = require("../models/tb_products");
const { mongooseToObject } = require("../../util/mongoose");
const tb_categorys = require("../models/tb_categorys");
const tb_transactions = require("../models/tb_transactions");
const tb_users = require("../models/tb_users");

class SiteController {
  //#region API Product
  async GetListProduct(req, res, next) {
    let { sort, page, pageSize } = req.body;

    if (page !== null || page !== undefined) page = 1;

    try {
      await tb_products
        .find()
        .limit(pageSize * 1)
        .skip((page - 1) * pageSize)
        .sort({ price: sort })
        .then((products) => {
          let total = products.length;
          res.status(200).json({ products, total });
        })
        .catch((err) =>
          res
            .status(200)
            .json({ Message: "Lỗi trong lúc lấy danh sách loại sản phẩm" })
        );
    } catch (error) {
      res.status(500).json({ Message: "Lỗi trong lúc lấy danh sách sản phẩm" });
    }
  }

  async GetProduct(req, res, next) {
    try {
      await tb_products.findOne({ _id: req.body._id }).then((product) => {
        if (product !== null || product !== undefined) {
          return res.status(200).json(product);
        } else {
          return res
            .status(200)
            .json({ Message: "Lỗi trong lúc lấy chi tiết sản phẩm" });
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json({ Message: "Lỗi trong lúc lấy chi tiết sản phẩm" });
    }
  }

  async CreateProduct(req, res, next) {
    let DTOProduct = req.body;
    if (DTOProduct.CatalogId !== undefined || DTOProduct.CatalogId !== null) {
      const category = await tb_categorys.findById(DTOProduct.CatalogId);
      DTOProduct.CatalogName = category.Name;
    }
    const newProduct = new tb_products(DTOProduct);
    try {
      newProduct
        .save()
        .then((product) => {
          return res.status(200).json(product);
        })
        .catch((error) => {
          return res.status(200).json({ Message: "Lỗi khi lưu sản phẩm:" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi lưu sản phẩm:" });
    }
  }

  async UpdateProduct(req, res, next) {
    const { _id, ...updateFields } = req.body;
    if (
      updateFields.CatalogId !== undefined ||
      updateFields.CatalogId !== null
    ) {
      const category = await tb_categorys.findById(updateFields.CatalogId);
      updateFields.CatalogName = category.Name;
    }
    try {
      await tb_products
        .findOneAndUpdate({ _id: req.body._id }, updateFields, {
          new: true,
        })
        .then((updatedProduct) => {
          return res.status(200).json(updatedProduct);
        })
        .catch((error) => {
          return res
            .status(200)
            .json({ Message: "Lỗi khi cập nhật sản phẩm:" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi lưu sản phẩm:" });
    }
  }

  DeleteProduct(req, res, next) {
    try {
      tb_products
        .findOneAndRemove({ _id: req.body._id })
        .then((removedProduct) => {
          if (removedProduct) {
            return res
              .status(200)
              .json({ Message: "Xóa sản phẩm thành công!" });
          } else {
            return res.status(200).json({ Message: "Sản phẩm không tồn tại!" });
          }
        })
        .catch((error) => {
          return res.status(200).json({ Message: "Lỗi khi xóa sản phẩm!" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi xóa sản phẩm:" });
    }
  }

  GetProductByCategoryID(req, res, next) {
    try {
      tb_products
        .find({ CatalogId: req.body.CatalogId })
        .then((products) => {
          if (products.length > 0) {
            return res.status(200).json(products);
          } else {
            return res.status(200).json({
              Message: "Không tìm thấy sản phẩm cho loại sản phẩm này!",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.status(200).json({
            Message: "Lỗi trong lúc lấy danh sách sản phẩm theo loại sản phẩm!",
          });
        });
    } catch (error) {
      return res.status(500).json({
        Message: "Lỗi trong lúc lấy danh sách sản phẩm  theo loại sản phẩm!",
      });
    }
  }

  //#endregion

  //#region API Category
  GetListCategory(req, res) {
    try {
      tb_categorys.find().then((categorys) => {
        if (categorys.length > 0) {
          let total = categorys.length;
          return res.status(200).json({ categorys, total });
        } else {
          return res
            .status(200)
            .json({ Message: "Lỗi trong lúc lấy danh sách loại sản phẩm!" });
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json({ Message: "Lỗi trong lúc lấy danh sách sản phẩm!" });
    }
  }

  GetCategory(req, res) {
    try {
      tb_categorys.findOne({ _id: req.body._id }).then((catalog) => {
        if (catalog !== null || catalog !== undefined) {
          return res.status(200).json(catalog);
        } else {
          return res
            .status(200)
            .json({ Message: "Lỗi trong lúc lấy chi tiết loại sản phẩm" });
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json({ Message: "Lỗi trong lúc lấy chi tiết loại sản phẩm!" });
    }
  }

  CreateCategory(req, res) {
    let DTOCategory = req.body;
    const newCAtegory = new tb_categorys(DTOCategory);
    try {
      newCAtegory
        .save()
        .then((category) => {
          return res.status(200).json(category);
        })
        .catch((error) => {
          return res.status(200).json({ Message: "Lỗi khi lưu sản phẩm:" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi lưu sản phẩm:" });
    }
  }

  UpdateCategory(req, res) {
    const { _id, ...updateFields } = req.body;
    try {
      tb_categorys
        .findOneAndUpdate({ _id: req.body._id }, updateFields, {
          new: true,
        })
        .then((updatedCategory) => {
          return res.status(200).json(updatedCategory);
        })
        .catch((error) => {
          return res
            .status(200)
            .json({ Message: "Lỗi khi cập nhật sản phẩm:" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi lưu sản phẩm:" });
    }
  }

  DeleteCategory(req, res) {
    try {
      tb_categorys
        .findOneAndRemove({ _id: req.body._id })
        .then((removedCategory) => {
          if (removedCategory) {
            return res
              .status(200)
              .json({ Message: "Xóa loại sản phẩm thành công!" });
          } else {
            return res
              .status(200)
              .json({ Message: "Sản loại phẩm không tồn tại!" });
          }
        })
        .catch((error) => {
          return res
            .status(200)
            .json({ Message: "Lỗi khi xóa loại sản phẩm!" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi xóa loại sản phẩm:" });
    }
  }

  //#endregion

  //#region API Transaction
  async GetListTransaction(req, res) {
    try {
      tb_transactions.find().then(
        (v) => {
          res.status(200).json(v);
        },
        (err) => {
          res.status(200).json({
            Message: "Lỗi trong lúc lấy danh sách giao dịch!",
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        Message: "Lỗi trong lúc lấy danh sách giao dịch!",
      });
    }
  }

  async GetTransaction(req, res) {
    try {
      await tb_transactions.findById({ _id: req.body._id }).then(
        (v) => {
          if (v) {
            res.status(200).json(v);
          } else {
            res.status(200).json({ Message: "Sản phẩm không tồn tại!" });
          }
        },
        (err) => {
          res.status(200).json({
            Message: "Lỗi trong lúc lấy chi tiết giao dịch!",
          });
        }
      );
    } catch (error) {
      res.status(500).json({
        Message: "Lỗi trong lúc lấy chi tiết giao dịch!",
      });
    }
  }

  async CreateTransaction(req, res) {
    let DTOTransaction = req.body;
    try {
      if (DTOTransaction.UserId) {
        const transaction = await tb_transactions.findOne({
          _id: DTOTransaction,
        });
        DTOTransaction.UserName = transaction.UserName;
        DTOTransaction.UserEmail = transaction.UserEmail;
        DTOTransaction.UserPhone = transaction.UserPhone;
      }
      const newTransaction = new tb_transactions(DTOTransaction);
      await newTransaction.save().then(
        (v) => {
          res
            .status(200)
            .json({ Message: "Giao dịch thành công!", transaction: v });
        },
        (err) => {
          res.status(200).json({ Message: "Lỗi trong lúc giao dịch!" });
        }
      );
    } catch (error) {
      res.status(500).json({ Message: "Lỗi trong lúc giao dịch!" });
    }
  }

  async UpdateStatusTransaction(req, res) {
    let { _id, UserId, ...updateFields } = req.body;
    if (updateFields.UserId !== undefined || updateFields.UserId !== null) {
      const transaction = await tb_transactions.findOne({
        _id: updateFields.UserId,
      });
      if (transaction) {
        updateFields.UserName = transaction.UserName;
        updateFields.UserEmail = transaction.UserEmail;
        updateFields.UserPhone = transaction.UserPhone;
      }
    }
    try {
      tb_transactions
        .findOneAndUpdate({ _id: req.body._id }, updateFields, {
          new: true,
        })
        .then((updatedCategory) => {
          return res.status(200).json(updatedCategory);
        })
        .catch((error) => {
          return res
            .status(200)
            .json({ Message: "Lỗi khi cập nhật giao dịch:" });
        });
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi cập nhật giao dịch:" });
    }
  }

  async DeleteTransaction(req, res) {
    try {
      let detele = await tb_transactions.deleteOne({ _id: req.body._id });
      if (detele) {
        return res.status(200).json({ Message: "Xóa giao dịch thành công!" });
      } else {
        return res
          .status(200)
          .json({ Message: "Xóa giao dịch không thành công!" });
      }
    } catch (error) {
      return res.status(500).json({ Message: "Lỗi khi xóa giao dịch:" });
    }
  }
  //#endregion
}

module.exports = new SiteController();
