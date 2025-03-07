import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const donorSchema = new mongoose.Schema({
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
    password:{
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
    },
    lastDonated:{
        type:Date,
    },
    totalBlood:{
        type:Number,
        default : 0
    },
    role:{
        type:String,
        default:"donor",
    },
    donationHistory :[{
        date:{
            type:Date,
        },
        place : {
            type : String,
            default :"IGM",
        },
        amount : {
            type : Number,
            default : 2,
        }
    }]
    
},{
    timestamps:true,
})
donorSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})
donorSchema.methods.addHistory = function(donorData){
    const newDonordata = {
        date : donorData.date,
        place : donorData.place,
        amount : donorData.amount,
    }
    const isDuplicate = this.donationHistory.some(history => 
        history.date === newDonordata.date
      );
    
      if (!isDuplicate) {
        this.contacts.push(newContact);
      }
    
      return this;
};
const donorModel = mongoose.model("donor",donorSchema);

export default donorModel;