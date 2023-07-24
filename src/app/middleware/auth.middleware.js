const jwt = require("jsonwebtoken");

const authMiddleware = {
    verifyToken : (req, res, next) => {
        let token = req.body.token || req.query.token || req.headers['token'] || req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, 'secretkey',(err, user) => {
                if (err) {
                  return  res.status(403).json({message: "Invalid token!"})
                }
                req.user = user;
                next()
            })
        } else {
            res.status(401).json({message: "You are not authenticated!"})
        }
    },

    verifyTokenAndAdminAuth:(req, res,next) => {
        authMiddleware.verifyToken(req, res, () => {
            if(req.user.id == req.body.id || req.user.admin){
                next();
            } else {
                return res.status(403).json({message:"You are not allowed to delete this user!"})
            }
        })
    }
}

module.exports = authMiddleware