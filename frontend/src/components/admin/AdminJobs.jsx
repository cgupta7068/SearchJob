import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button' 
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux' 
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      
      <Navbar />

      {/* ❌ OLD:
      <div className='max-w-6xl mx-auto my-10'>
      */}

      {/* ✅ NEW: responsive padding */}
      <div className='max-w-6xl mx-auto my-6 sm:my-10 px-3 sm:px-4'>

        {/* ❌ OLD:
        flex items-center justify-between
        */}

        {/* ✅ NEW: responsive layout */}
        <div className='flex items-center gap-2 sm:gap-3 my-5'>
    
    {/* INPUT */}
    <Input
        /* ❌ OLD: w-full sm:w-1/2 */

        /* ✅ NEW: flexible width */
        className="flex-1 h-8 text-xs sm:h-10 sm:text-sm"
        placeholder="Filter by name, role"
        onChange={(e) => setInput(e.target.value)}
    />

    {/* BUTTON */}
    <Button 
        onClick={() => navigate("/admin/jobs/create")}
        
        /* ❌ OLD: w-full sm:w-auto */

        /* ✅ NEW: compact button */
        className="h-8 px-3 text-xs sm:h-10 sm:text-sm"
    >
        New Jobs
    </Button>

</div>

        {/* TABLE */}
        <AdminJobsTable />

      </div>
    </div>
  )
}

export default AdminJobs