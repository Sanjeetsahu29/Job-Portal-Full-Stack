import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice.js";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16 flex-wrap px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#7902f8]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex gap-4 items-center font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className={"cursor-pointer"} variant={"outline"}>
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className={"bg-black hover:bg-gray-600 cursor-pointer"}>
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className={"cursor-pointer"}>
                  <AvatarImage src={user.profile.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-3 space-y-2">
                  <Avatar className={"cursor-pointer"}>
                    <AvatarImage src={user.profile.profilePhoto} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-5">
                      {user.profile.bio}
                    </p>
                  </div>
                </div>
                <div className="flex  flex-col ml-7 ">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <Link to="/profile">
                        <Button variant={"link"} className={"cursor-pointer"}>
                          <IoPersonCircleOutline />
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <Button
                      onClick={logoutHandler}
                      variant={"link"}
                      className={"cursor-pointer"}
                    >
                      <IoLogOutOutline />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
