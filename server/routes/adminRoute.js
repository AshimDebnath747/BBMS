import express from 'express';
import adminModel from '../models/admin.js';
import bcrypt from 'bcrypt';
import { setUser } from '../service/auth.js';
import donorModel from '../models/donor.js';
import bloodBankModel from "../models/bloodBank.js";
const adminRouter = express.Router();

adminRouter.post("/signup",async (req,res)=>{
    const admin = req.body;
    const newAdmin = new adminModel(admin)
    try{
      await newAdmin.save();
      res.status(200).json({success:true,message:newAdmin})
    }catch(err){
        res.status(500).json({success:false,message:err})
    }
})
adminRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try{
       const admin = await adminModel.findOne({email});
       if(!admin) res.status(404).json({success:false,message:"user not found!"});
       const isMatch = await bcrypt.compare( password , admin.password);
       if(!isMatch) res.status(404).json({success:false,message:"wrong password!"})
        else{
        const token = setUser(admin);
        res.status(200).json({success:true,
            token : token,
            admin :{
                 id : admin._id,
                 name : admin.name,
                 email : admin.email,
                 role : "admin",
            }
        })
    }
    }catch(err){
        res.status(500).json({success:false,message:err})
    }
})
adminRouter.post("/donate/user",async(req,res)=>{
    let {Id , amount , date , place , type } = req.body;
    try{
    const donor = await donorModel.findOne({_id : Id});
    const bloodBank = await bloodBankModel.findOne({name : place});
    console.log(donor);
    console.log(bloodBank);
   if(!donor || !bloodBank) return res.status(404).json({success:false,message:"user not found"})
      const filter = {_id : Id}
      const newValue = {$push :{ donationHistory : {place : place , amount : amount , date : date}}}
      await donorModel.updateOne(filter , newValue)
      const filter2 = {name : place}
      const newValue2 = {$push :{donationHistory : { bloodGroup : type , amount : amount , date : date , donor :Id}}}
      await bloodBankModel.updateOne(filter2 , newValue2)
      return res.status(200).json({success:true,message:"donation added!"})
    }
    catch(err){
       return res.status(500).json({success:false,message:"internal seever error!"})
    }
    
})
adminRouter.post("/bloodbank/create",async (req,res)=>{
    const bloodBank = req.body
    const newBloodBank = new bloodBankModel(bloodBank)
    try{
        newBloodBank.save()
        return res.status(200).json({success:true,mesage:"blood bank created successfully!"})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
})
export default adminRouter;