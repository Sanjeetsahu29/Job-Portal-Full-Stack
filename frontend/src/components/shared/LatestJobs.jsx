import React from 'react'
import LatestJobCard from './LatestJobCard'
// const randomJobs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
import { useSelector } from 'react-redux'
const LatestJobs = () => {
  const {allJobs} = useSelector(store => store.job);
  return (
    <div className='max-w-7xl mx-auto my-20 p-6'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 my-5'>
            {
                allJobs.length<=0 ? <h1 className='text-center text-2xl font-bold'>No Jobs available</h1> : allJobs.slice(0,6).map((job) => <LatestJobCard key={job._id} job={job}/>)  // Generate 15 random job cards using the randomJobs array
            }

        </div>
    </div>
  )
}

export default LatestJobs