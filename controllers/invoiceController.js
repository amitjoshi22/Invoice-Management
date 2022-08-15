const Invoice = require('../models/invoice');

const getTotalCount = async(req,res,next)=>{
    const searchQuery = req.query;
    const count= await Invoice.countDocuments({creator:searchQuery})
    res.status(200).json({
        data:count
    })

}
const getInvoicesByUser = async(req,res,next)=>{
    const {searchQuery} = req.query;
    const userInvoice = await Invoice.find({creator:searchQuery})
    res.status(200).json({
        data:userInvoice
    })
}
const createInvoice = async(req,res,next)=>{
    const invoice = await Invoice.create(req.body);

    try{
    res.status(200).json({
        sucess:true,
        message:'Inserted into the database',
        data:invoice
    })
    }catch(error){
            res.status(200).json({
                message:error.message
            })
    }
}

const getInvoice =async(req,res,next)=>{
    const {id} = req.params;
    const info = await Invoice.findByID(id);
    if(!findid){
            res.status(200).json({
                message: 'ID Not Found'
            })
    }
    res.status(200).json({
        data:info
    })
}

const updateInvoice = async(req,res,next)=>{
    const {id} = req.params;
    const uinvoice = await Invoice.findByIDAndUpdate(id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false 
    })
    if(!uinvoice){
        res.status(200).json({
            message:'Update Issue'
        })
    }
    res.status(200).json({
        message:'UPdate Done',
        data:uinvoice
    })

}

const deleteInvoice =async(req,res,next)=>{
    const {id} = req.params;
    const findInvoice = await Invoice.findByID(id);
    if(!findInvoice){
           res.status(200).json({
             message:'NOt Find Invoice'
            })
    }
    const dinvoice = await Invoice.findByIDAndDelete(id);
    res.status(200).json({
        message:'Invoice Deleted'
    })
}

module.exports ={getTotalCount,getInvoicesByUser,createInvoice,getInvoice,updateInvoice,deleteInvoice}
