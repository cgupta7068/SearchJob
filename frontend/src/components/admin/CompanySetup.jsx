import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany?.name || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: null
        })
    }, [singleCompany]);

    return (

        /* ================= BACKGROUND (ADDED) ================= */
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

            <Navbar />

            {/* ================= CENTER LAYOUT ================= */}

            {/* ❌ OLD:
            <div className='max-w-xl mx-auto my-10'>
            */}

            {/* ✅ NEW */}
            <div className='flex items-center justify-center px-3 sm:px-4 min-h-[calc(100vh-64px)]'>

                {/* ================= CARD ================= */}

                <div className='
                    w-full max-w-2xl 
                    
                    /* ✅ more padding */
                    p-6 sm:p-8 
                    
                    bg-white 
                    rounded-xl 
                    shadow-lg
                '>

                    <form onSubmit={submitHandler}>

                        {/* HEADER */}
                        <div className='flex items-center gap-4 mb-6'>

                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                variant="outline" 
                                className="flex items-center gap-2 text-gray-600"
                            >
                                <ArrowLeft />
                                <span>Back</span>
                            </Button>

                            <h1 className='font-bold text-lg sm:text-xl'>
                                Company Setup
                            </h1>
                        </div>

                        {/* GRID */}

                        {/* ❌ OLD:
                        grid-cols-2
                        */}

                        {/* ✅ NEW: responsive */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

                            <div>
                                <Label>Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div>
                                <Label>Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            <div>
                                <Label>Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                />
                            </div>

                            {/* FULL WIDTH FIELD */}
                            <div className="sm:col-span-2">
                                <Label>Logo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                />
                            </div>

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
                                    Update
                                </Button>
                            )
                        }

                    </form>

                </div>
            </div>
        </div>
    )
}

export default CompanySetup