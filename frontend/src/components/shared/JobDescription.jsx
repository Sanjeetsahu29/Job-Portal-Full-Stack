import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-5 border rounded-lg">
        <div className="flex justify-between items-center ">
          <div>
            <h1 className="font-medium text-2xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 my-2">
              <Badge variant="ghost" className="text-blue-700 font-bold">
                {singleJob?.position} position
              </Badge>
              <Badge variant="ghost" className="text-[#F83002] font-bold">
                {singleJob?.jobType}
              </Badge>
              <Badge variant="ghost" className="text-stone-500 font-bold">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad]"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-gray-300 font-medium my-5">
          Job Description
        </h1>
        <div>
          <h1 className="font-medium my-1">
            Role:{" "}
            <span className="pl-1 font-normal text-gray-800 text-sm">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-medium my-1">
            Location:
            <span className="pl-1 font-normal text-gray-800 text-sm">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-medium my-1">
            Description:
            <span className="pl-1 font-normal text-gray-800 text-sm">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-medium my-1">
            Experience:
            <span className="pl-1 font-normal text-gray-800 text-sm">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-medium my-1">
            Total Applicant:
            <span className="pl-1 font-normal text-gray-800 text-sm">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-medium my-1">
            Posted Date:{" "}
            <span className="pl-1 font-normal text-gray-800 text-sm">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
