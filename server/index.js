import express from 'express';
import dotenv from 'dotenv';
import { CONNECTDB } from './config/db.js';
import donorRouter from './routes/donorRoutes.js';
import adminRouter from './routes/adminRoute.js';
import patientRounter from './routes/patientRoutes.js';
dotenv.config();
const app  = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//donor router
app.use('/api/donor',donorRouter);
app.use('/api/admin',adminRouter);
app.use("/api/patient",patientRounter);
app.get("/",(req,res)=>{
    return res.redirect("/login");
})

app.listen(port,()=>{
    CONNECTDB();
    console.log(`Server is running on port ${port}`);
})