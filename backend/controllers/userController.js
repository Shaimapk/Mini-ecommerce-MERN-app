import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js';

export const userRegistration = async (req,res)=>{

    try{

        const {username,email,password}= req.body;
        
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:'User already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        //generate jwt
        const token = generateToken(user);

        res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        path:'/',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });


        res.status(201).json({message:'User registered successfully',
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


export const login = async (req,res) => {
    try {
        const {email,password}=req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'User not found'});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(401).json({message:'Invalid password'});
        }

        //generate jwt
        const token = generateToken(user);

        res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        path:'/',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });


        res.status(200).json({
            message:'Login successful',
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        })

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const getProfile = async (req,res)=>{
    res.status(200).json(req.user);
}

export const logout = (req, res) => {
    res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    path: "/",
});

    res.status(200).json({
        message: "Logged out successfully",
    });
};