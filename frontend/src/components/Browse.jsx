import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            
            <Navbar />

            {/* ❌ OLD:
            <div className='max-w-7xl mx-auto my-10'>
            */}

            {/* ✅ NEW: reduce container width → cards look smaller */}
            <div className='max-w-5xl mx-auto my-6 sm:my-10 px-3 sm:px-4'>

                <h1 className='font-bold text-lg sm:text-xl md:text-2xl my-6 sm:my-10 text-white'>
                    Search Results ({allJobs.length})
                </h1>

                {/* ❌ OLD:
                grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                */}

                {/* ✅ NEW: increase columns → cards shrink */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse;