import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;

                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        /* ================== BACKGROUND (ADDED) ================== */
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

            <Navbar />

            {/* ================== CENTER CONTAINER ================== */}

            {/* ❌ OLD:
            <div className='max-w-4xl mx-auto'>
            */}

            {/* ✅ NEW: center + padding */}
            <div className='flex items-center justify-center px-3 sm:px-4 min-h-[calc(100vh-64px)]'>

                {/* ================== CARD (ADDED) ================== */}

                <div className='
                    w-full max-w-md 
                    
                    /* ✅ padding increased */
                    p-6 sm:p-8 
                    
                    bg-white 
                    rounded-xl 
                    shadow-lg
                '>

                    {/* HEADER */}
                    <div className='mb-6'>
                        <h1 className='font-bold text-xl sm:text-2xl'>
                            Your Company Name
                        </h1>

                        <p className='text-gray-500 text-sm mt-1'>
                            What would you like to give your company name? You can change this later.
                        </p>
                    </div>

                    {/* INPUT */}
                    <Label>Company Name</Label>

                    <Input
                        type="text"

                        /* ❌ OLD: my-2 */
                        /* ✅ NEW: better spacing */
                        className="mt-2 mb-4"

                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    {/* BUTTONS */}

                    {/* ❌ OLD:
                    flex items-center gap-2 my-10
                    */}

                    {/* ✅ NEW: responsive buttons */}
                    <div className='flex gap-2 mt-6'>
                        
                        <Button 
                            variant="outline" 
                            onClick={() => navigate("/admin/companies")}
                            className="flex-1"
                        >
                            Cancel
                        </Button>

                        <Button 
                            onClick={registerNewCompany}
                            className="flex-1 bg-[#6A38C2] text-white"
                        >
                            Continue
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompanyCreate