import dotenv from 'dotenv';
import app from './app.js'
import connectDB from './config/db.js';

dotenv.config({
    path:'./config/config.env'
})
const PORT =process.env.PORT || 3000;

//connect dB
connectDB();

app.get('/',(req,res)=>{
    res.status(200).json({message:'Server is working'});
})


//start server
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})

