import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowNarrowUpRight } from "@untitledui/icons";
import { Link } from "react-router";
const StateCard = () => {
  return (
    <Card className=" p-5 bg-background rounded-xl shadow-sm border border-border w-full md:w-1/4">
      <CardHeader className="p-0 mb-0  text-start">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Opportunities
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2  items-start px-0 -mt-5">
        <div className="text-2xl font-semibold text-foreground -mb-1">26</div>

        <Link
          to="#"
          className="p-0 h-auto text-primary font-semibold flex items-start gap-1 hover:underline"
        >
          View Details
          <ArrowNarrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default StateCard;
