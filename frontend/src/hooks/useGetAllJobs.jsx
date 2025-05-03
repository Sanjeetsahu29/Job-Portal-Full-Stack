import { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllJob } from '@/redux/jobSlice'
import { useSelector } from 'react-redux'
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector((store) => store.job);
  useEffect(() => {
      const fetchJobs = async () => {
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllJob(res.data.jobs))
            }
          }catch(error){
            console.log(error);
          }
      }
      fetchJobs();
  },[])
}

export default useGetAllJobs