import { TrendingUp } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { SiteOpportunity } from "@/api/types";

interface OpportunityCardProps {
  opportunity?: SiteOpportunity;
  isLoading?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  isLoading = false,
}) => {
  const { isMobile, isBelow } = useBreakpoint();
  if (isLoading) {
    return (
      <Card className={`bg-gray-50 ${isMobile ? "py-4" : "py-8"}`}>
        <CardHeader className={isMobile ? "px-4" : "px-8"}>
          <Skeleton
            className={`rounded-lg ${
              isMobile ? "w-10 h-10 mb-4" : "w-14 h-14 mb-6"
            }`}
          />
          <Skeleton className="h-7 w-3/4 mb-2" />
          <Skeleton className="h-5 w-full mb-1" />
          <Skeleton className="h-5 w-5/6" />
        </CardHeader>
        <CardContent className={`space-y-2 ${isMobile ? "px-4" : "px-8"}`}>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-12" />
          </div>
        </CardContent>
        <CardFooter
          className={`flex gap-4 ${
            isMobile ? "flex-col px-4" : "justify-between px-8"
          }`}
        >
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </CardFooter>
      </Card>
    );
  }

  if (!opportunity) {
    return null;
  }

  return (
    <Card className={`bg-gray-50 h-full ${isMobile ? "py-4" : "py-8"}`}>
      <CardHeader className={isMobile ? "px-4" : "px-8"}>
        <div
          className={`rounded-lg border border-gray-300 p-2 bg-white flex items-center justify-center ${
            isMobile ? "w-10 h-10 mb-4" : "w-14 h-14 mb-6"
          }`}
        >
          <TrendingUp
            className={
              isMobile ? "h-5 w-5 text-gray-600" : "h-7 w-7 text-gray-600"
            }
          />
        </div>
        <CardTitle
          className={`font-semibold leading-[30px] ${
            isMobile ? "text-lg" : "text-xl"
          }`}
        >
          {opportunity.title}
        </CardTitle>
        <CardDescription
          className={`text-gray-600 leading-[24px] ${
            isMobile ? "text-sm" : "text-md"
          }`}
        >
          {opportunity.description}
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`space-y-2 leading-[24px] ${isMobile ? "px-4" : "px-8"}`}
      >
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Spend (SAR)</span>
          <span className="text-md font-semibold">
            {opportunity.spendRange}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Quantity (Units):</span>
          <span className="text-md font-semibold">
            {opportunity.quantityRange}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Local suppliers:</span>
          <span className="text-md font-semibold">
            {opportunity.localSuppliers}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Global suppliers:</span>
          <span className="text-md font-semibold">
            {opportunity.globalSuppliers}
          </span>
        </div>
      </CardContent>
      <CardFooter
        className={`flex gap-4 mt-auto ${
          isMobile ? "flex-col px-4" : "justify-between px-8"
        }`}
      >
        <Button
          variant="outlined"
          color="gray"
          className={isMobile ? "w-full" : "flex-1"}
          size={isBelow("md") ? "md" : "xl"}
          asChild
        >
          <Link to={`/opportunities/${opportunity.id}`}>View Details</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={isMobile ? "w-full" : "flex-1"}
          size={isBelow("md") ? "md" : "xl"}
          asChild
        >
          <Link to={`/login?opportunityId=${opportunity.id}`}>Apply</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityCard;
