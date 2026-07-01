import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/features/user/userThunk";

export default function Register() {

    const [loginData,setLoginData]=useState({
        username:'',
        email:'',
        password:''
    });

    const [validationError,setValidationError]=useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state)=>state.user.error);

    const handleChange =(e)=>{

        setValidationError((prev)=>({...prev,[e.target.name]:''}));

        setLoginData({
            ...loginData,
            [e.target.name]:e.target.value,
        })
    }

    const validate =()=>{
        let errors={};

        if(!loginData.username.trim()) errors.username='Username is required'
        if(!loginData.email.trim()) errors.email='Email is required' 
        else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(loginData.email)) errors.email='Invalid email'
        if(!loginData.password.trim()) errors.password='Password is required'
        else if(loginData.password.length<6) errors.password='Password must be atleast 6 characters'

        setValidationError(errors);

        return Object.keys(errors).length===0;
    }

    const handleSubmit= async (e)=>{

        e.preventDefault();

        if(!validate()) return;
        try{
            await dispatch(userRegister(loginData)).unwrap();
            navigate('/');
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 border border-blue-500 rounded-lg overflow-hidden w-full max-w-md m-4 text-center">
            <div className="text-white bg-blue-500 w-full p-4">
            <h1 className="text-2xl p-4 rounded-lg font-bold">Looks like you're new here!</h1>
            <h3 className="text-lg  font-semibold">Sign up with your email id to get started</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 m-4 w-full px-4">
                <input type="text" name="username" placeholder="Enter username" onChange={handleChange} className="p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"  />
                {validationError.username && 
                    <p className="text-sm text-red-500">{validationError.username}</p>
                }
                
                <input type="text" name="email" placeholder="Enter email id" onChange={handleChange} className="p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"  />
                {validationError.email && 
                    <p className="text-sm text-red-500">{validationError.email}</p>
                }
                
                <input type="password" name="password" placeholder="Enter password" onChange={handleChange} className="p-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"  />
                {validationError.password && 
                    <p className="text-sm text-red-500">{validationError.password}</p>
                }
                
                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Sign Up</button>
                <Link to='/login' className=" text-center text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white w-full">Existing User? Log in</Link>
            </form>
            {error && 
                <p className="text-red-500 mb-4 text-sm">{error}</p>
            }
        </div>
    </div>
  )
}
