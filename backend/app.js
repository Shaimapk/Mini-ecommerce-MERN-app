import express from "express";
import productRoutes from './routes/productRoute.js'
import cors from "cors";
import userRoute from './routes/userRoute.js'
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

//server upload images
app.use("/uploads",express.static("uploads"));

app.use('/api/products',productRoutes);

app.use('/api/user',userRoute);


export default app;