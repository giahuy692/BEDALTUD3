const tb_products = require("../models/tb_products");
const { mongooseToObject } = require("../../util/mongoose");
const tb_categorys = require("../models/tb_categorys");
const tb_transactions = require("../models/tb_transactions");
const tb_users = require("../models/tb_users");
const tb_orders = require("../models/tb_orders");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");

function hasValue(v){
  if(v !== null || v !== undefined){
    return true;
  } 

  return false;
} 

function HandleAccessToken(user) {
  return jwt.sign({
    id:user._id,
    UserName: user.UserName,
    Email: user.Email
  },"secretkey",{expiresIn:"6h"})
}

function HandleRefreshAccessToken(user) {
  return jwt.sign({
    id:user._id,
    UserName: user.UserName,
    Email: user.Email
  },"refeshToken",{expiresIn:"30d"})
}


class SiteController {
  
  //#region API Product
  async GetListProduct(req, res, next) {
    let { sort, page, pageSize } = req.body;

    if (hasValue(page)) page = 1;

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
      res.status(500).json({ Message: error});
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
        .json({ Message: error});
    }
  }

  async FindProduct(req , res){
    try {
      const products = await tb_products.find({ProductName: { $regex: req.body.ProductName, $options: 'i' }});
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async CreateProduct(req, res, next) {
    let DTOProduct = req.body;
    if (DTOProduct.CatalogId !== undefined && DTOProduct.CatalogId !== null) {
      const category = await tb_categorys.findById({_id: DTOProduct.CatalogId});
      if(category !== null || category !== undefined){
        DTOProduct.CatalogName = category.Name;
      } 
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
      return res.status(500).json({ Message:error});
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
      return res.status(500).json({ Message: error});
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
      return res.status(500).json({ Message: error });
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
        Message: error,
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
        .json({ Message: error});
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
        .json({ Message:error });
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
      return res.status(500).json({ Message:error });
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
      return res.status(500).json({ Message: error});
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
      return res.status(500).json({ Message: error });
    }
  }

  //#endregion

  //#region API Transaction
  async GetListTransaction(req, res) {
    try {
      tb_transactions.find().then(
        (v) => {
          return res.status(200).json(v);
        },
        (err) => {
          return res.status(200).json({
            Message: "Lỗi trong lúc lấy danh sách giao dịch!",
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        Message: error,
      });
    }
  }

  async GetTransaction(req, res) {
    try {
      await tb_transactions.findById({ _id: req.body._id }).then(
        (v) => {
          if (v) {
            return res.status(200).json(v);
          } else {
            return res.status(200).json({ Message: "Sản phẩm không tồn tại!" });
          }
        },
        (err) => {
          return res.status(200).json({
            Message: "Lỗi trong lúc lấy chi tiết giao dịch!",
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        Message: error,
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
          return res
            .status(200)
            .json({ Message: "Giao dịch thành công!", transaction: v });
        },
        (err) => {
          return res.status(200).json({ Message: "Lỗi trong lúc giao dịch!" });
        }
      );
    } catch (error) {
      return res.status(500).json(error);
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
            .json({ Message: "Lỗi khi cập nhật giao dịch" });
        });
    } catch (error) {
      return res.status(500).json(error);
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
      return res.status(500).json(error);
    }
  }
  //#endregion

  //#region API Order
  async GetListOrder(req, res){
    try {
      let GetListOrder = await tb_orders.find().then()
        return res.status(200).json(GetListOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async CreateOrder(req, res) {
    let DTOOrder = req.body;
    try {
      const newOrder = new tb_orders(DTOOrder);
      await newOrder.save().then(
        (v) => {
          return res
            .status(200)
            .json({ Message: "Giao dịch thành công!", ObjectResult: v });
        },
        (err) => {
          return res.status(200).json({ Message: "Lỗi trong lúc tạo đơn hàng!" });
        }
      );
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async UpdateOrder(req, res) {
    let { _id, ...updateFields } = req.body;
    try {
      tb_orders
        .findOneAndUpdate({ _id: req.body._id }, updateFields, {
          new: true,
        })
        .then((updatedOrder) => {
          return res.status(200).json(updatedOrder);
        })
        .catch((error) => {
          return res
            .status(200)
            .json({ Message: "Lỗi khi cập nhật đơn hàng" });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async GetOrder(req, res) {
    try {
      await tb_orders.findById({ _id: req.body._id }).then(
        (v) => {
          if (v) {
            return res.status(200).json(v);
          } else {
            return res.status(200).json({ Message: "Đơn hàng không tồn tại!" });
          }
        },
        (err) => {
          return res.status(200).json({
            Message: "Lỗi trong lúc lấy chi tiết đơn hàng!",
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        Message: error,
      });
    }
  }

  async DeleteOrder(req, res) {
    try {
      let detele = await tb_orders.deleteOne({ _id: req.body._id });
      if (detele) {
        return res.status(200).json({ Message: "Xóa đơn hàng thành công!" });
      } else {
        return res
          .status(200)
          .json({ Message: "Xóa đơn hàng không thành công!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  //#endregion 
  
  //#region API Auth
  async Register(req, res){
   
    let {PswRepeat, ...registerData} = req.body;
    console.log(registerData.Phone)
    if(!hasValue(registerData.Username) || !hasValue(registerData.Email)
      || !hasValue(registerData.Address) || !hasValue(registerData.Password)
      || !hasValue(PswRepeat) || !hasValue(registerData.Phone) ){
      return res.status(200).json({message: "Làm ơn hãy điền tất cả các field"})
    }
    try {
      if(PswRepeat == registerData.Password){
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(registerData.Password, salt);
        registerData.Password = hashed;
        const newUser = await new tb_users(registerData);
        const user = await newUser.save();
        return res.status(200).json(user);
      } else {
        return res.status(200).json({message:"Field repeat password/ password không khớp nhau!"});
      }
    } catch (error) { 
      return res.status(500).json({message:error})
    }
  }

  async Login(req, res){
    try {
      const user = await tb_users.findOne({Email: req.body.Email});
      if (!user) {
        return res.status(404).json({message:"Email không chính xác!"})
      }
      const validPassword = await bcrypt.compare(
        req.body.Password,
        user.Password
      );
      if(!validPassword){
        return res.status(404).json({message:"Mật khẩu không chính xác!"})
      }
      if (hasValue(user) & validPassword) {
        const accessToken = HandleAccessToken(user);
        const refreshToken = HandleRefreshAccessToken(user)
        res.cookie("refreshToken", refreshToken,{
          httpOnly:true,
          secure:false,
          path:'/',
          sameSite: "strict",
        })
        res.setHeader("token", `Bearer ${accessToken}`);
        const {Password, ...others} = user._doc;
        return res.status(200).json({others, accessToken});
      };
    } catch (error) {
      return res.status(500).json({message:error})
    }
  }

  async RefreshToken(req, res){
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.status.json({message: "Bạn chưa được xác thực!"})
    jwt.verify(refreshToken, 'refeshToken', (err, user) => {
      if(err){
        console.log(err);
      } 

      const newAccessToken = HandleAccessToken(user);
      const newRefreshAccessToken = HandleRefreshAccessToken(user)
      res.cookie("refreshToken", newRefreshAccessToken,{
        httpOnly:true,
        secure:false,
        path:'/',
        sameSite: "strict",
      })
      return res.status(200).json({accessToken: newAccessToken})
    })
  }

  async Logout(req, res){
    res.clearCookie("refreshToken");
    res.status(200).json({message: "Đăng xuất thành công!"})
  }

  async GetAllUser(req, res){
    try {
      const user = await tb_users.find();
      let total = user.length
      return res.status(200).json({user,total});
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async GetUser(req, res){
    try {
      const user = await tb_users.findById({_id: req.body._id});
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async FindUser(req , res){
    try {
      const users = await tb_users.find({UserName: { $regex: req.body.UserName, $options: 'i' }});
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async UpdateUser(req, res){
    try {
      const { _id, ...updateFields } = req.body;
  
      // Kiểm tra xem người dùng có tồn tại hay không
      const user = await tb_users.findById(_id);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      
  
      // Kiểm tra xem người dùng muốn thay đổi mật khẩu hay không
      if (updateFields.password) {
        // Mã hóa mật khẩu mới
        const hashedPassword = await bcrypt.hash(updateFields.password, 10);
        updateFields.Password = hashedPassword;
      }
  
      // Lưu thông tin người dùng đã được cập nhật
      const newUser = await tb_users.findOneAndUpdate({ _id: req.body._id }, updateFields, {
        new: true,
      })
  
      return res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async DeleteUser(req, res){
    try {
      let user = await tb_users.findByIdAndDelete({_id: req.body._id});
      if(user){
        return res.status(200).json({message: "Xóa user thành công!"});
      } else {
        return res.status(200).json({message: "User không tồn tại!"});
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
  //#endregion
}

module.exports = new SiteController();
