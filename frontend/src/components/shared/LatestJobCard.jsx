import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
const LatestJobCard = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="border px-2 py-4 rounded-lg shadow-md shadow-indigo-200 cursor-pointer hover:shadow-green-200 hover:shadow-xl">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className=" text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
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
    </div>
  );
};

export default LatestJobCard;
