import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (

        /* ================= BACKGROUND (ADDED) ================= */
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

            <Navbar />

            {/* ================= CONTENT WRAPPER ================= */}

            {/* ❌ OLD:
            <div className='max-w-6xl mx-auto my-10'>
            */}

            {/* ✅ NEW: padding instead of margin */}
            <div className='max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-10'>

                {/* ================= SEARCH + BUTTON ================= */}

                {/* ❌ OLD:
                flex items-center justify-between
                */}

                {/* ✅ NEW: responsive + compact */}
                <div className='flex items-center gap-2 sm:gap-3 my-5'>

                    <Input
                        /* ❌ OLD: w-fit */

                        /* ✅ NEW: flexible width */
                        className="flex-1 h-8 text-xs sm:h-10 sm:text-sm"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button 
                        onClick={() => navigate("/admin/companies/create")}

                        /* ✅ NEW: compact button */
                        className="h-8 px-3 text-xs sm:h-10 sm:text-sm"
                    >
                        New Company
                    </Button>

                </div>

                {/* ================= TABLE ================= */}

                <CompaniesTable />

            </div>
        </div>
    )
}

export default Companies