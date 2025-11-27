import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-800">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Access Denied</h2>
        <p className="text-gray-600">
          You don't have permission to access this page.
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Button onClick={() => navigate(-1)} variant="outlined" color="gray">
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
