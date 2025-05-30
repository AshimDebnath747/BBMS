import mongoose from 'mongoose';

export const CONNECTDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}