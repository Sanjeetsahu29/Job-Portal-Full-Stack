import React, { useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import Job from '../components/shared/Job'
import { useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }
  },[])
  return (

    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto my-10'>
          <h1 className='font-medium text-lg my-10'>Search Results ({allJobs.length})</h1>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-10'>
            {
              allJobs.map((job)=>{
                return (
                    <Job key={job._id} job={job}/>
                )
              })
            }
          </div>
          
        </div>
    </div>
  )
}

export default Browse