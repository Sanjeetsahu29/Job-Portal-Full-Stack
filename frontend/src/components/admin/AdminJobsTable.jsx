import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs } = useSelector((store) => store.job) || [];
  const { searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();
  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);
  return (
    <div>
      <Table>
        <TableCaption>List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className={"text-right cursor-pointer"}>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className={"w-32"}>
                    <div
                      className="flex items-center gap-2 w-fit cursor-pointer"
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                    >
                      <Edit2 />
                      <span>Edit</span>
                    </div>
                    <div className="flex items-center gap-2 w-fit cursor-pointer mt-2" onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)}>
                        <Eye/>
                        <span>Applicant</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
