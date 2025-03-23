import express from 'express';
import donorModel from '../models/donor.js';
import bcrypt from 'bcrypt';
const donorRouter = express.Router();
import { setUser } from '../service/auth.js';
donorRouter.post("/signup",async(req,res)=>{
     const donor = req.body;
     const newdonor = new donorModel(donor);
     try{
        await newdonor.save();
        res.status(201).json({success:true,data:newdonor});
     }catch(err){
        res.status(400).json({success:false,message:err.message});
     }
})
donorRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const donor = await donorModel.findOne({email});
        if(!donor) return res.status(404).json({success:false,message:"Donor not found!"});
        const isMatch = await bcrypt.compare(password,donor.password)
        if(!isMatch){
            return res.status(404).json({success:false,message:"wrong password!"});
        }else{
        const token  = setUser(donor);
        return res.status(200).json({success:true,
            token:token,
            donor:{
                id:donor._id,
                name:donor.name,
                email:donor.email,
                phone:donor.phone,
                age:donor.age,
                totalBlood : donor.totalBlood,
                bloodGroup : donor.bloodGroup,
                lastDonated : donor.lastDonated,
                role:"donor",
            }});
        }
    }catch(err){
        return res.status(400).json({success:false,message:err.message});
    }
})
donorRouter.get("/history/:id",async (req,res)=>{
    const {id }= req.params;
    try{
    const data = await donorModel.findById(id);
    if(!data){
        return res.status(404).json({success:false,message:"Not found"})
    }
    return res.status(201).json({success:true, data :data.donationHistory});
}catch(err){
   return  res.status(500).json({success:false , message :"internal server error!"+err})
}
})

export default donorRouter;

