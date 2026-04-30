import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;

            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div>

            {/* ================= MOBILE VIEW (ADDED) ================= */}
            {/* ✅ ADDED: mobile card layout */}
            <div className="sm:hidden space-y-4">
                {
                    filterJobs?.map((job) => (
                        <div 
                            key={job._id}
                            className="bg-white p-4 rounded-lg shadow border"
                        >
                            <div className="flex justify-between items-center">

                                <div>
                                    <h1 className="font-medium text-sm">
                                        {job?.company?.name}
                                    </h1>
                                    <p className="text-xs text-gray-500">
                                        {job?.title}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {job?.createdAt.split("T")[0]}
                                    </p>
                                </div>

                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="w-5 h-5" />
                                    </PopoverTrigger>

                                    <PopoverContent className="w-28">
                                        
                                        {/* ❌ OLD:
                                        navigate(`/admin/companies/${job._id}`)
                                        */}

                                        {/* ✅ NEW: correct route */}
                                        <div 
                                            onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                        >
                                            <Edit2 className="w-4" />
                                            <span className="text-sm">Edit</span>
                                        </div>

                                        {/* ✅ ADDED: Applicants action */}
                                        <div 
                                            onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                            className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md mt-1"
                                        >
                                            <Eye className="w-4" />
                                            <span className="text-sm">Applicants</span>
                                        </div>

                                    </PopoverContent>
                                </Popover>

                            </div>
                        </div>
                    ))
                }
            </div>

            {/* ================= DESKTOP VIEW ================= */}

            {/* ❌ OLD: table always visible */}
            {/* ✅ NEW: hide on mobile */}
            <div className="hidden sm:block">

                <Table>
                    <TableCaption>A list of your recent posted jobs</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            filterJobs?.map((job) => (

                                /* ❌ OLD:
                                <tr key={job._id}>
                                */

                                /* ✅ NEW: correct component */
                                <TableRow key={job._id}>

                                    <TableCell>{job?.company?.name}</TableCell>

                                    <TableCell>{job?.title}</TableCell>

                                    <TableCell>
                                        {job?.createdAt.split("T")[0]}
                                    </TableCell>

                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>

                                            <PopoverContent className="w-32">

                                                {/* ❌ OLD:
                                                wrong navigation
                                                */}

                                                {/* ✅ NEW */}
                                                <div 
                                                    onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                    className='flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md'
                                                >
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>

                                                {/* ✅ ADDED */}
                                                <div 
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className='flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md mt-1'
                                                >
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>

                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </div>

        </div>
    )
}

export default AdminJobsTable