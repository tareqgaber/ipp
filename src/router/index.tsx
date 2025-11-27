import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthInitializer } from "../components/AuthInitializer";

export function Router() {
  return (
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  );
}
