import React from "react";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "job-id-123";
  const daysAgoFunction = (mongodbTime)=>{  
    const createdAt = new Date(mongodbTime);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate - createdAt);
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
  }
  return (
    <div className="p-5 rounded-lg shadow-md bg-white border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500"> {daysAgoFunction(job?.createdAt) === 0 ? "Today" : daysAgoFunction(job?.createdAt)} days ago</div>
        <Button
          variant={"outline"}
          className={"rounded-full cursor-pointer"}
          size={"icon"}
        >
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant={"outline"} size={"icon"} className={"p-6"}>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium">{job?.company?.name}</h1>
          <p>{job?.location}</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-semibold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 mb-2">
          {job?.description}
        </p>
      </div>
      <div>
        <Badge variant="ghost" className="text-blue-700 font-bold">
          {job?.position} Position
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-stone-500 font-bold">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant={"outline"}
          className={
            "cursor-pointer bg-indigo-100  hover:bg-red-400 hover:text-white"
          }
        >
          Save for later
        </Button>
        <Button
          variant={"outline"}
          className={"cursor-pointer hover:bg-slate-700 hover:text-white"}
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
