import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            
            <Navbar />

            {/* ✅ Center container */}
            <div className='flex items-center justify-center max-w-7xl mx-auto px-3 sm:px-4'>

                {/* ❌ OLD: w-1/2 */}
                {/* ✅ NEW: responsive width */}
                <form 
                    onSubmit={submitHandler} 
                    className='w-full sm:w-2/3 md:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 my-10 bg-pink-200'
                >
                    <h1 className='font-bold text-lg sm:text-xl mb-5'>Login</h1>

                    {/* EMAIL */}
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="patel@gmail.com"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                        />
                    </div>

                    {/* 🚨 FIXED RADIO SECTION */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
    
    <RadioGroup 
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-5"
    >
        {/* STUDENT */}
        <label className="flex items-center gap-2 cursor-pointer">
            <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}

                /* ✅ FIX RADIO SIZE + ALIGN */
                className="w-4 h-4 mt-0"
            />
            <span className="text-sm">Student</span>
        </label>

        {/* RECRUITER */}
        <label className="flex items-center gap-2 cursor-pointer">
            <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}

                /* ✅ FIX RADIO SIZE + ALIGN */
                className="w-4 h-4 mt-0"
            />
            <span className="text-sm">Recruiter</span>
        </label>
    </RadioGroup>

</div>

                    {/* BUTTON */}
                    {
                        loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">
                                Login
                            </Button>
                        )
                    }

                    {/* SIGNUP LINK */}
                    <span className='text-sm'>
                        Don't have an account?{" "}
                        <Link to="/signup" className='text-blue-600'>
                            Signup
                        </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Login