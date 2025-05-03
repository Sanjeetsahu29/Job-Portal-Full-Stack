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
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CompaniesTable = () => {
  const {companies} = useSelector((store) => store.company) || [];
  const {searchCompanyByText} = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(()=>{
    const filteredCompanies = companies.length >=0 && companies.filter((company) => {
        if(!searchCompanyByText) return true;
        return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
      }
    )
    setFilterCompany(filteredCompanies);
  },[companies, searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <tr key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      // src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg"
                      src={company?.logo}
                      alt="Company Logo"
                      className="w-15 "
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className={"text-right cursor-pointer"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className={"w-32"}>
                      <div 
                        className="flex items-center gap-2 w-fit cursor-pointer"
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                      >
                        <Edit2 />
                        <span>Edit</span>
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

export default CompaniesTable;
