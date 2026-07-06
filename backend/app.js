import express from "express";
import productRoutes from './routes/productRoute.js'
import cors from "cors";
import userRoute from './routes/userRoute.js'
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:[
        'http://localhost:5173',
        'https://ecommerce-demo-by-shaima.netlify.app/'
    ],
    credentials:true
}));


app.use('/api/products',productRoutes);

app.use('/api/user',userRoute);


export default app;