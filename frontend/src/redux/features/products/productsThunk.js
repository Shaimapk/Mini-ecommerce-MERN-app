import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({keyword='',category='',sort='',page=1},thunkAPI)=>{
        try{
            
            const response = await axios.get(`http://localhost:5000/api/products?keyword=${keyword}&category=${category}&sort=${sort}&page=${page}`);
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addProduct= createAsyncThunk(
    "products/addProduct",
    async(productData,thunkAPI)=>{
        const formData = new FormData();
        formData.append("name",productData.name);
        formData.append("description",productData.description);
        formData.append("price",productData.price);
        formData.append("category",productData.category);
        formData.append("stock",productData.stock);
        formData.append("image",productData.image);
        try {
            const response= await axios.post("http://localhost:5000/api/products",
                formData,
            {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async(id,thunkAPI)=>{
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async({id,productData},thunkAPI) => {

        const formData = new FormData();

        formData.append("name",productData.name);
        formData.append("description",productData.description);
        formData.append("price",productData.price);
        formData.append("category",productData.category);
        formData.append("stock",productData.stock);
       
        if (productData.image instanceof File) {
             formData.append("image", productData.image);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${id}`,
                formData,
             {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

