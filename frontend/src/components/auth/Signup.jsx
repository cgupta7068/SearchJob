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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
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

            {/* CONTAINER */}
            <div className='flex items-center justify-center max-w-7xl mx-auto px-3 sm:px-4'>

                {/* ❌ OLD: w-1/2 */}
                {/* ✅ NEW: responsive width */}
                <form 
                    onSubmit={submitHandler} 
                    className='w-full sm:w-2/3 md:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 my-10 bg-pink-200'
                >
                    <h1 className='font-bold text-lg sm:text-xl mb-5'>Sign Up</h1>

                    {/* FULL NAME */}
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="patel"
                        />
                    </div>

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

                    {/* PHONE */}
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
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

                    {/* 🚨 FIXED SECTION */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        
                        {/* RADIO */}
                        <RadioGroup className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-5">

                            <label className="flex items-center gap-2 cursor-pointer">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Student</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Recruiter</span>
                            </label>

                        </RadioGroup>

                        {/* FILE INPUT */}
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer text-sm"
                            />
                        </div>

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
                                Signup
                            </Button>
                        )
                    }

                    {/* LOGIN LINK */}
                    <span className='text-sm'>
                        Already have an account?{" "}
                        <Link to="/login" className='text-blue-600'>
                            Login
                        </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Signup