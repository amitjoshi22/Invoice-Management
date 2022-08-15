const Profile = require('../models/Profile');
const { param } = require('../routes/profile');

const getProfile = async(req,res,next)=>{
    const {id} = req.params;
    try{
        const profile = await Profile.findById(id)
        res.status(200).json({
           success:true,
           data: profile
        })
    }catch(error){
        res.status(200).json({
            success:false,
            message:error.message
        })
    }
}

const createProfile =async(req,res,next)=>{
    const existingUser = await Profile.findOne({email:req.body.email})
    if(existingUser){
        res.status(404).json({
            message:'Profile Already Exist'
        })
    }
    //console.log(req.user);
    req.body.userId = req.user.id;
   // console.log(req.body);
    const profile = await Profile.create(req.body);
    res.status(200).json({
        success:true,
        data: profile
    })
    
}

const getAllProfile = async(req,res,next)=>{
    const allprofile = await Profile.find().sort({_id:-1})
    res.status(200).json({
            success:true,
            results:allprofile.length,
            data:allprofile
    })
}
const getProfilesBySearch = async(req,res,next)=>{
    const {searchQuery} = req.query;
    try{
        const name = new RegExp(searchQuery, "i");
      const email = new RegExp(searchQuery, "i");

      const profile = await Profile.find({$or:[{name},{email}]})

      res.status(200).json({
        data:profile
      })

    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

const updateProfile = async(req,res,next)=>{
    let profile = await Profile.findById(req.params.id);
    if(!profile){
        return next()
    }
    profile = await Profile.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false    
    })
    res.status(200).json({
        sucess:true,
        data:profile,
        message: 'Updation Done'
    })
}

const deleteProfile = async(req,res,next)=>{
    let profile = await Profile.findById(req.params.id);
    if(!profile){
        return next();
    }
    profile = await Profile.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message: 'Profile Delete'
    })

}


module.exports ={getProfile,getAllProfile,updateProfile,deleteProfile,getProfilesBySearch,createProfile}