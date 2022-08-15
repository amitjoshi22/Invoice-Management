const jwt = require('jsonwebtoken');
const User = require('../models/Users');
exports.isAuthenticatedUser = async(req,res,next)=>{
    let token;
    //console.log(req.headers);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        res.status(200).json({
            message:'Please Provide Token'
        })
    }
    const jdecode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(jdecode.id);
    next();

}