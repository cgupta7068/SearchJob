// import React from 'react'
import PropTypes from 'prop-types'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='
                w-full
                p-3 sm:p-4
                rounded-md 
                shadow-md 
                bg-white 
                border border-gray-100 
                cursor-pointer
                overflow-hidden
            '
        >

            {/* Company */}
            <div className="min-w-0">
                <h1 className='font-medium text-sm sm:text-base truncate'>
                    {job?.company?.name}
                </h1>

                <p className='text-xs sm:text-sm text-gray-500'>
                    India
                </p>
            </div>

            {/* Job Info */}
            <div>
                <h1 className='font-bold text-sm sm:text-base my-1 break-words'>
                    {job?.title}
                </h1>

                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2 break-words'>
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap items-center gap-1 mt-3'>
                <Badge className='text-blue-700 text-[10px] px-2 py-0' variant="ghost">
                    {job?.position}
                </Badge>

                <Badge className='text-[#F83002] text-[10px] px-2 py-0' variant="ghost">
                    {job?.jobType}
                </Badge>

                <Badge className='text-[#7209b7] text-[10px] px-2 py-0' variant="ghost">
                    {job?.salary}L
                </Badge>
            </div>

        </div>
    )
}

LatestJobCards.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.number,
        jobType: PropTypes.string,
        salary: PropTypes.number,
        company: PropTypes.shape({
            name: PropTypes.string
        })
    }).isRequired
}

export default LatestJobCards