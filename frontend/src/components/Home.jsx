import  { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user?.role, navigate]);
  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
  <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
    <Navbar />
    
    <div className="mt-4 sm:mt-6 md:mt-10">
      <HeroSection />
    </div>

    <div className="mt-6 sm:mt-8 md:mt-12">
      <CategoryCarousel />
    </div>

    <div className="mt-6 sm:mt-8 md:mt-12">
      <LatestJobs />
    </div>

    <div className="mt-8 sm:mt-10 md:mt-14">
      <Footer />
    </div>
  </div>
</div>
  )
}

export default Home