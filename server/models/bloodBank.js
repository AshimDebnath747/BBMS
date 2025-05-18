import mongoose from 'mongoose';
const bloodBankSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    address:{
        type : String,
        required : true,
    },
    donationHistory:[{
        bloodGroup:{
            type : String,
            required : true,
        },
        amount:{
            type:Number,
            required : true
        },
        donor:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "donor",
        },
        date:{
            type : Date,
            default : Date.now,
        }
        }],
        availableBlood:[{
            bloodGroup:{
                type : String,
                required : true,
            },
            amount:{
                type:Number,
                required : true
            },
        }]
},
{
    timeStamps : true,
})
const bloodBankModel = mongoose.model("bloodBank",bloodBankSchema);

export default bloodBankModel;