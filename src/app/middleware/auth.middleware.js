const jwt = require("jsonwebtoken");

const authMiddleware = {
    verifyToken : (req, res, next) => {
        let token = req.headers;
        console.log(token);
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, 'secretkey',(err, user) => {
                if (err) {
                  return  res.status(403).json({message: "Token không hợp lệ!"})
                }
                req.user = user;
                next()
            })
        } else {
            res.status(401).json({message: "Bạn chưa được xác thực!"})
        }
    },

    verifyTokenAndAdminAuth:(req, res) => {
        authMiddleware.verifyToken(req, res, () => {
            if(req.user.id == req.body.id || req.user.admin){
                next();
            } else {
                return res.status(403).json({message:"Bạn không được phép xóa user này!"})
            }
        })
    }
}

module.exports = authMiddleware