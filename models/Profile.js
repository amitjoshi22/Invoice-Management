const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your Name']
    },
    email:{
        type:String,
        required:[true,'Please Provide your Email'],
        unique:true
    },
    phoneNumber:String,
    businessName:String,
    contactAddress:String,
    paymentDetails:String,
    logo:String,
    website:String,
    userId: [String]

})

module.exports = mongoose.model('Profile',profileSchema)