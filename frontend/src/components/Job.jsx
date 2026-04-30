import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <>
        {/* ❌ OLD:
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        */}

        {/* ✅ NEW: responsive + overflow safe card */}
        <div className='
            w-full 
            p-4 sm:p-5 
            rounded-md 
            shadow-xl 
            bg-white 
            border border-gray-100
            overflow-hidden   /* ✅ prevents content going outside */
        '>

            {/* HEADER */}
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 
                        ? "Today" 
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>

                <Button variant="outline" className="rounded-full" size="icon">
                    <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
            </div>

            {/* COMPANY */}
            <div className='flex items-center gap-2 my-2'>

                {/* ❌ OLD: p-6 (too big for mobile) */}
                {/* ✅ NEW: responsive size */}
                <Button className="p-3 sm:p-5" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>

                <div className="min-w-0">
                    {/* ✅ ADD: truncate to avoid overflow */}
                    <h1 className='font-medium text-sm sm:text-lg truncate'>
                        {job?.company?.name}
                    </h1>

                    <p className='text-xs sm:text-sm text-gray-500'>
                        India
                    </p>
                </div>
            </div>

            {/* JOB INFO */}
            <div>
                {/* ❌ OLD: text-lg */}
                {/* ✅ NEW: responsive + wrap */}
                <h1 className='font-bold text-base sm:text-lg my-2 break-words'>
                    {job?.title}
                </h1>

                {/* ❌ OLD: no control */}
                {/* ✅ NEW: limit + wrap */}
                <p className='
                    text-xs sm:text-sm 
                    text-gray-600 
                    line-clamp-3     /* ✅ limits lines */
                    break-words      /* ✅ prevents overflow */
                '>
                    {job?.description}
                </p>
            </div>

            {/* BADGES */}
            {/* ❌ OLD: flex (no wrap) */}
            {/* ✅ NEW: flex-wrap */}
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position} Positions
                </Badge>

                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType}
                </Badge>

                <Badge className='text-[#7209b7] font-bold' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* ACTION BUTTONS */}
            {/* ❌ OLD: row only */}
            {/* ✅ NEW: responsive stack */}
            <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-4'>
                
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>

                <Button 
                    className="bg-[#7209b7] w-full sm:w-auto"
                >
                    Save For Later
                </Button>
            </div>
        </div>
        </>
    )
}

Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        company: PropTypes.shape({
            logo: PropTypes.string,
            name: PropTypes.string
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.number,
        jobType: PropTypes.string,
        salary: PropTypes.number
    })
}

export default Job;