import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
  "QA Engineer",
  "Cybersecurity Engineer",
  "Marketing Manager",
  "Graphic Designer",
  "Project Manager",
  "Sales Manager",
  "Help Desk Engineer",
  "Software Engineer",
  "Product Designer",
  "System Engineer",
];
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query));
      naviagate("/browse");
    }
  return (
    <div>
      <Carousel className={"w-full max-w-xl mx-auto my-20"}>
        <CarouselContent>
          {
            category.map((items, index)=>(
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Button variant="outline" className={"rounded-full "} onClick={()=>searchJobHandler(category)}>
                        {items}
                    </Button>
                </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
