// import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="px-2 sm:px-4">
            <Carousel className="w-full sm:max-w-2xl lg:max-w-4xl mx-auto my-10 sm:my-16 md:my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem 
                                key={index} 
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    
                                    /* ❌ OLD:
                                    text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1 sm:py-2
                                    */

                                    /* ✅ NEW: smaller button ONLY */
                                    className="
                                        rounded-full 
                                        text-[10px] sm:text-xs 
                                        px-2 sm:px-3 
                                        py-0.5 sm:py-1 
                                        h-6 sm:h-7
                                        whitespace-nowrap
                                    "
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>

                <div className="hidden sm:block">
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;