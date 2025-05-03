import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    naviagate("/browse");
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-3">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No.1 Job Hunt Webiste
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply &<br />
          Get you <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="mx-auto max-w-3xl px-2">
            Discover thousands of jobs and apply directly to the company you love.
            Create a professional resume, apply directly to jobs, and get hired quickly.
            Get the job you want, with confidence. 
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto ">
            <input 
                type="text" 
                placeholder="Find your dream job"
                className="outline-none border-none w-full"
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button className="rounded-r-full bg-[#6A38C2] " onClick={searchJobHandler}>
                <Search className="h-5 w-5"/>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
