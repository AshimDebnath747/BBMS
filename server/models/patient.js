import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,  
    },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,  
    },
    bloodGroup:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    medicalHistory:{
        type:String,
        required:true,  
    },
    requestHistory:{
        type:String,
        required:true,
    }
})

const patientModel = mongoose.model("patient",patientSchema);

export default patientModel;