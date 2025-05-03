import { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice'
const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      const fetchJobs = async () => {
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjob`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs))
            }
          }catch(error){
            console.log(error);
          }
      }
      fetchJobs();
  },[])
}

export default useGetAllAdminJobs;