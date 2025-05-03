import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className=" p-5 rounded-lg">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className={"bg-gray-700 hover:bg-black"}>
            <TableHead className={"text-white"}>Date</TableHead>
            <TableHead className={"text-white"}>Job Role</TableHead>
            <TableHead className={"text-white"}>Company</TableHead>
            <TableHead className={"text-white text-right"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You have not Applied any Jobs yet</span>
          ) : (
            allAppliedJobs.map((appliedJob) => {
              return (
                <TableRow key={appliedJob._id} className={"bg-gray-100"}>
                  <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob?.job?.title}</TableCell>
                  <TableCell>{appliedJob?.job?.company.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected"
                          ? "bg-red-400"
                          : appliedJob.status === "pending"
                          ? "bg-gray-400"
                          : "bg-green-400"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
