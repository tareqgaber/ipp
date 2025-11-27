import { useParams } from "react-router";

export function OpportunityDetailsPage() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold">Admin - Opportunity Details</h1>
      <p className="mt-4">Opportunity ID: {id}</p>
      {/* Admin opportunity details content */}
    </div>
  );
}
