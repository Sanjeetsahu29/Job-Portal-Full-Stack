import Navbar from '../components/shared/Navbar'
import HeroSection from '../components/shared/HeroSection';
import CategoryCarousel from '../components/shared/CategoryCarousel';
import LatestJobs from '../components/shared/LatestJobs';
import Footer from '@/components/shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  useGetAllJobs();
  const {user} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home