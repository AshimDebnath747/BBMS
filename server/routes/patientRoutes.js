import express from 'express';
import patientModel from '../models/patient.js';
import bloodBankModel from '../models/bloodBank.js';
import bcrypt from 'bcrypt';
const patientRouter = express.Router();
import { setUser } from '../service/auth.js';
patientRouter.post("/signup",async(req,res)=>{
     const patient = req.body;
     const newPatient = new patientModel(patient);
     try{
        await newPatient.save();
        res.status(201).json({success:true,data:newPatient});
     }catch(err){
        res.status(400).json({success:false,message:err.message});
     }
})
patientRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const patient = await patientModel.findOne({email});
        if(!patient) return res.status(404).json({success:false,message:"Patient not found!"});
        const isMatch = await bcrypt.compare(password,patient.password)
        if(!isMatch){
            return res.status(404).json({success:false,message:"wrong password!"});
        }else{
        const token  = setUser(patient);
        return res.status(200).json({success:true,
            token:token,
            patient:{
                id:patient._id,
                name:patient.email,
                phone:patient.phone,
                age:patient.age,
                totalBlood : patient.totalBlood,
                bloodGroup:patient.bloodGroup,
                role:"patient",
            }});
        }
    }catch(err){
        return res.status(400).json({success:false,message:err.message});
    }
})
patientRouter.get("/search/:type",async (req,res)=>{
    const type =  req.params.type;
    try{
    const data = await bloodBankModel.find({'availableBlood.bloodGroup':type});
    if(!data){
        return res.status(404).json({success:false,message:"Not found"})
    }
    return res.status(201).json({success:true, data :data});
}catch(err){
   return  res.status(500).json({success:false , message :"fuck server error!"+err})
}
})

export default patientRouter;

