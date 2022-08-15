const mongoose = require('mongoose');


const invoiceSchema = new mongoose.Schema({
    dueDate:Date,
    currency:String,
    item: [{itemName:String,unitPrice:String,quantity:String,discount:String}],
    rates:String,
    vat:Number,
    total: Number,
    subTotal: Number,
    notes:String,
    status:String,
    invoiceNumber:String,
    type:String,
    creator:[String],
    totalAmountReceived:Number,
    client:{
        name:String,
        email:String,
        phone:String,
        address:String
    },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

module.exports = mongoose.model('Invoice',invoiceSchema)