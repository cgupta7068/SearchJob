import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const isInitiallyApplied =
        singleJob?.applications?.some(
            application => application.applicant === user?._id
        ) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ]
                };

                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));

                    setIsApplied(
                        res.data.job.applications.some(
                            application => application.applicant === user?._id
                        )
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            {/* ❌ OLD:
            <div className='max-w-7xl mx-auto my-10'>
            */}

            {/* ✅ NEW: container with padding */}
            <div className="max-w-7xl mx-auto my-6 sm:my-10 px-3 sm:px-4 md:px-6">

            {/* ❌ OLD: no card */}
            {/* ✅ NEW: single responsive card */}
            <div className="
                bg-white 
                rounded-xl 
                shadow-md 
                p-4 sm:p-6 md:p-8
                
                w-full                 /* ✅ always full width */
                max-w-2xl              /* ✅ limits size on desktop */
                mx-auto                /* ✅ center card */
            ">

                {/* ❌ OLD: flex row (overflow issue) */}
                {/* ✅ NEW: responsive layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div className="w-full">

                        <h1 className="font-bold text-lg sm:text-xl md:text-2xl break-words">
                            {singleJob?.title}
                        </h1>

                        {/* ❌ OLD: no wrap */}
                        {/* ✅ NEW: wrap badges */}
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                            <Badge className="text-blue-700 font-bold" variant="ghost">
                                {singleJob?.postion} Positions
                            </Badge>

                            <Badge className="text-[#F83002] font-bold" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>

                            <Badge className="text-[#7209b7] font-bold" variant="ghost">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>

                    {/* ❌ OLD: fixed button */}
                    {/* ✅ NEW: responsive */}
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`w-full md:w-auto rounded-lg ${
                            isApplied
                                ? 'bg-gray-600 cursor-not-allowed'
                                : 'bg-[#7209b7] hover:bg-[#5f32ad]'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                <h1 className="border-b-2 border-gray-300 font-medium py-4 mt-4">
                    Job Description
                </h1>

                {/* ❌ OLD: overflow text */}
                {/* ✅ NEW: prevent overflow */}
                <div className="my-4 space-y-3 text-sm sm:text-base">

                    <p className="font-bold">
                        Role:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800 break-words">
                            {singleJob?.title}
                        </span>
                    </p>

                    <p className="font-bold">
                        Location:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800 break-words">
                            {singleJob?.location}
                        </span>
                    </p>

                    <p className="font-bold">
                        Description:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800 break-words">
                            {singleJob?.description}
                        </span>
                    </p>

                    <p className="font-bold">
                        Experience:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800">
                            {singleJob?.experience} yrs
                        </span>
                    </p>

                    <p className="font-bold">
                        Salary:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800">
                            {singleJob?.salary} LPA
                        </span>
                    </p>

                    <p className="font-bold">
                        Total Applicants:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800">
                            {singleJob?.applications?.length}
                        </span>
                    </p>

                    <p className="font-bold">
                        Posted Date:
                        <span className="ml-2 sm:ml-4 font-normal text-gray-800">
                            {singleJob?.createdAt?.split("T")[0]}
                        </span>
                    </p>

                </div>
            </div>
        </div>
        </>
    );
};

export default JobDescription;