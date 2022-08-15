const mongoose = require('mongoose');


const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        require,d:[true, 'Please Enter the Name']
    },
    email:{
        type:String,
        required:[true,'Please Enter the Email ID'],
        unique:true
    },
    phone:{
        type:String,
        required:[true,'Please Enter the Phone number']
    },
    address:String,
    userID:[String],
    createAt:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('client',clientSchema)