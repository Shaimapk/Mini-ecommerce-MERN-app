import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
    "user/register",
    async (loginData,thunkAPI)=>{
        try {
            const response = await axios.post('http://localhost:5000/api/user/register/',loginData);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
)
export const userLogin = createAsyncThunk(
    "user/login",
    async (loginData,thunkAPI)=>{
        try {
            const response = await axios.post('http://localhost:5000/api/user/login/',loginData);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
            
            
        }
    }
)