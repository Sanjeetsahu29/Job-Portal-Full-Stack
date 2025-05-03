import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const dispatch = useDispatch()
    const handleChange = (value) => {
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    })
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
        <h1>Filter Jobs</h1>
        <hr className='mt-3'/>
        <RadioGroup value={selectedValue} defaultValue="option-one" onValueChange={handleChange} className="space-y-4 mt-4">
            {
                filterData.map((data,index)=>(
                    <div key={index}>
                        <h1 className="font-medium text-gray-800 text-lg">{data.fitlerType}</h1>
                        {
                            data.array.map((item, idx)=>{
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div className="flex items-center space-x-2 my-2" key={index}>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <label className="text-sm text-gray-500" htmlFor={itemId}>{item}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
      </RadioGroup>
      
    </div>
  )
}

export default FilterCard