import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const adminSchema =new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    notifications:{
        type : String,
    },
    password :{
        type : String,
        required : true,
    }
},{timestamps:true});
adminSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const adminModel = mongoose.model("admin",adminSchema);

export default adminModel;
