import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
    password:{
        type:String,
        required : true,
    },
    patientHistory:[{
            date:{
                type:Date,
                default:Date.now,
            },
            bloodGroup:{
             type:String,
             required:true,
            },
            amount:{
                type:Number,
                required:true,
            }
        
 } ],
    requestHistory:{
        type:String,
    }
},{
    timestamps:true,
})
patientSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
patientSchema.methods.addHistory = function(patientData){
    const newPatientData = {
        date : patientData.date,
        place : patientData.place,
        amount : patientData.amount,
    }
    const isDuplicate = this.patientHistory.some(history => 
        history.date === newPatientData.date
      );
    
      if (!isDuplicate) {
        this.patientHistory.push(newPatientHistory);
      }
    
      return this;
};
const patientModel = mongoose.model("patient",patientSchema);

export default patientModel;