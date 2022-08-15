const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter the Name']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please Enter the Password']
    },
    password:{
        type:String,
        required:[true,'Please enter the Password'],
        minlength:[8, 'Please enter the 8 Digit password'],
        select:false
    },
    role:{
        type:String,
        enum:{
            values:['user', 'employeer'],
            message:'Please Select correct role'
        },
        default:'user'
    },
    createdBy:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
}

// Compare user password in database password
userSchema.methods.comparePassword = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

module.exports = mongoose.model('User',userSchema);

