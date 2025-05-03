import { Mail, Pen, Contact } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "../components/shared/AppliedJobTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import UpdateProfileDialog from "../components/shared/UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
// const skills = [
//   "HTML",
//   "CSS",
//   "JavaScript",
//   "React",
//   "Redux",
//   "Node.js",
//   "Express.js",
//   "MongoDB",
//   "Tailwind CSS",
// ];
const Profile = () => {
  useGetAppliedJobs();
  const isResume = true;
  const [open, setOpen] = useState(false);
  const {user} = useSelector(store => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border-gray-200 border rounded-2xl my-5 p-8">
        <Avatar className={"w-full  h-24 flex justify-center"}>
          <AvatarImage
            src={user.profile.profilePhoto}
            alt="profile image"
            className={"h-24 w-24 rounded-full"}
          />
        </Avatar>

        <div className="flex justify-between items-center gap-6">
          <div className="max-w-[70%]">
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-medium mt-10 mb-2">
              {user.fullname}
            </h1>
            <p className="text-sm ">
              {user.profile.bio}
            </p>
          </div>
          <Button className="text-right" variant="outline" onClick={()=>setOpen(!open)}>
            <Pen />
          </Button>
        </div>
        <div className="my-6 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Mail className="w-[22px]"/>
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Contact className="w-[22px]"/>
            <span className="text-sm">{user.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          {user.profile.skills.length !== 0 ? (
            user.profile.skills.map((item, index) => (
              <Badge key={index} className="mr-2" variant={"outline"}>
                {item}
              </Badge>
            ))
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="grid my-5 w-full  max-w-sm items-center gap-1.5 bg-amber-50 p-2 rounded-lg">
          <Label className={"text-md font-medium "}>Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user.profile.resume}
              className="text-sm cursor-pointer hover:underline px-1 py-2 rounded-md text-indigo-500"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm ">NA</span>
          )}
        </div>
      </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5">
          <h1 className="font-semibold text-lg my-5">Applied Jobs</h1>
          {/* job list */}
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
