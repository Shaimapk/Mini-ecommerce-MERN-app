import express from "express";
import productRoutes from './routes/productRoute.js'
import cors from "cors";
import userRoute from './routes/userRoute.js'

const app = express();
app.use(express.json());

app.use(cors());

//server upload images
app.use("/uploads",express.static("uploads"));

app.use('/api/products',productRoutes);

app.use('/api/user',userRoute);


export default app;