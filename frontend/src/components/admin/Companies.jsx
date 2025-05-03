import Navbar from "../shared/Navbar";
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import {setSearchCompanyByText} from "@/redux/companySlice"
import { useDispatch } from "react-redux";
const Companies = () => {
  useGetAllCompanies(); // Custom hook to fetch all companies
  const navigate = useNavigate();   
  const dispatch = useDispatch(); // Redux dispatch function
  const [input, setInput] = useState(""); // State to manage input value
  useEffect(() => {
    dispatch(setSearchCompanyByText(input)); // Dispatch action to set search text
  }, [input, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)} // Update input state on change
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
};

export default Companies;
