const User = require('../models/Users') 
const register =async(req,res,next)=>{
    const {name,email,password}=req.body;
    if(!email && !password){
        return next();
    }
    const existuser = await User.findOne({email})
    if(existuser){
        res.status(200).json({
            success:'Email Already Exit'
        }) 
    }
    const user = await User.create({ ...req.body})
    const token = user.getJwtToken()

    res.status(200).json({
        success:true,
        token:token
    })
}

const login = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next();
    }
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next();
    }
    const isMatchPassword=await user.comparePassword(password);
    if(!isMatchPassword){
        return next();
    }
    const token = user.getJwtToken();
    console.log(token);
    res.status(200).json({
        success:true,
        token:token
    })
}

const getUser = async(req,res,next)=>{
    res.status(200).json({
        message:'test'
    })
}


module.exports = {login,register,getUser}

