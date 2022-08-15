const Client = require('../models/Client')

const getClients =async(req,res,next)=>{
    const client = await Client.find().sort({_id:-1})
    res.status(200).json({
        success:true,
        data:client
    })
}

const createClient =async(req,res,next)=>{
    const {email} = req.body;
    const existingclient = await Client.findOne({email:email});
    if(existingclient){
        res.status(404).json({
            success:false,
            message:'Client Email Id Already Exist'
        })
    }
    const client = await Client.create(req.body);
    res.status(200).json({
        success:true,
        message:'Client Created'
    })

}

const updateClient =async(req,res,next)=>{
    let client = await Client.findById(req.params.id);
    if(client){
        res.status(404).json({
            status:false,
            messsage:'Client ID not Found'
        })
    }
    client = await Client.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false 
    })
    res.status(200).json({
        message:'Client Updated',
        success:true
    })
}

const deleteClient =async(req,res,next)=>{
    let client = await Client.findById(req.params.id);
    if(client){
        res.status(404).json({
            message:true,
            message:'Client Id not Found'
        })
    }
    client = await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message: 'Client Deleted'
    })


}

const getClientsByUser=async(req,res,next)=>{
    const {searchQuery} = req.query;
    const clients= await Client.find({userid:searchQuery})
    res.status(400).json({
        data:clients,
        success:true
    })
}

module.exports={getClients,createClient,updateClient,deleteClient,getClientsByUser}