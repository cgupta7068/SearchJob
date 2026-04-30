import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            
            <Navbar />

            {/* CONTAINER */}
            <div className='flex items-center justify-center px-3 sm:px-4 min-h-[calc(100vh-64px)]'>

                {/* ✅ UPDATED CARD */}
                <form 
                    onSubmit={submitHandler} 
                    className='
                        w-full max-w-4xl
                        
                        /* 🔥 OUTSIDE MARGIN */
                        my-10 sm:my-16
                        
                        /* 🔥 INSIDE PADDING */
                        p-6 sm:p-8 md:p-10
                        
                        bg-white 
                        border border-gray-200 
                        shadow-lg 
                        rounded-xl
                    '
                >

                    {/* GRID */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>

                        <div>
                            <Label>Title</Label>
                            <Input name="title" value={input.title} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input name="description" value={input.description} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input name="salary" value={input.salary} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input name="location" value={input.location} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input name="experience" value={input.experience} onChange={changeEventHandler} />
                        </div>

                        <div>
                            <Label>No of Position</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
                        </div>

                        {/* SELECT */}
                        {
                            companies.length > 0 && (
                                <div className="sm:col-span-2">
                                    <Label>Company</Label>

                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    companies.map((company) => (
                                                        <SelectItem 
                                                            key={company._id} 
                                                            value={company?.name?.toLowerCase()}
                                                        >
                                                            {company.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )
                        }

                    </div>

                    {/* BUTTON */}
                    {
                        loading ? (
                            <Button className="w-full my-6">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-6">
                                Post New Job
                            </Button>
                        )
                    }

                    {/* WARNING */}
                    {
                        companies.length === 0 && (
                            <p className='text-xs text-red-600 font-bold text-center my-3'>
                                *Please register a company first before posting jobs
                            </p>
                        )
                    }

                </form>
            </div>
        </div>
    )
}

export default PostJob