import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='
            w-full 
            
            /* ❌ OLD: p-3 */
            /* ✅ NEW: compact padding */
            p-2 sm:p-3 
            
            bg-white 
            rounded-lg 
            shadow-md
        '>

            {/* HEADER */}
            {/* ❌ OLD: text-lg */}
            {/* ✅ NEW: responsive */}
            <h1 className='font-bold text-sm sm:text-base'>
                Filter Jobs
            </h1>

            <hr className='mt-2 mb-2' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className="mb-2">

                            {/* ❌ OLD: text-lg */}
                            {/* ✅ NEW: smaller */}
                            <h1 className='font-semibold text-xs sm:text-sm mb-1'>
                                {data.fitlerType}
                            </h1>

                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <label 
                                            key={itemId} 
                                            
                                            /* ❌ OLD: space-x-2 */
                                            /* ✅ NEW: better alignment */
                                            className='flex items-center gap-2 py-1 cursor-pointer'
                                        >
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId}

                                                /* ✅ FIX SIZE */
                                                className="h-3 w-3 sm:h-4 sm:w-4"
                                            />

                                            {/* ❌ OLD: default text */}
                                            {/* ✅ NEW: compact text */}
                                            <span className='text-[11px] sm:text-xs'>
                                                {item}
                                            </span>
                                        </label>
                                    )
                                })
                            }

                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard