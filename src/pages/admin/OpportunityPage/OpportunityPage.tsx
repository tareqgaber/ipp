import StateCard from "./components/StateCard";
import { Button } from "@/components/ui/button";
import OpportunityFilter from "./components/OpportunityFilter";
import OpportunityCard from "./components/OpportunityCard";
import Pagination from "./components/Pagination";
import { useNavigate } from "react-router";

const OpportunityPage = () => {
  const navigate = useNavigate();

  return (
    <div className=" h-full w-full  flex flex-col gap-5">
      <div className="w-full flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold  leading-8">Opportunities</h2>
          <p className="text-Colors-Text-text-tertiary-(600) text-base font-normal ">
            Explore our investment opportunities
          </p>
        </div>
        <Button onClick={() => navigate("/admin/opportunities/new")}>
          + Add New Opportunity
        </Button>
      </div>
      <div className=" w-full flex items-center gap-5    ">
        {" "}
        <StateCard /> <StateCard /> <StateCard /> <StateCard />{" "}
      </div>
      <OpportunityFilter />
      <div className=" w-full gap-5 flex flex-col md:flex-row   flex-wrap">
        <OpportunityCard />
        <OpportunityCard />

        <OpportunityCard />

        <OpportunityCard />

        <OpportunityCard />

        <OpportunityCard />
       
      </div>
       <div className="w-full -mb-5">
          <Pagination />
        </div>
    </div>
  );
};

export default OpportunityPage;
