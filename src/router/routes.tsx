import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";
// layouts
import { AuthLayout, AdminLayout } from "@/components/layout";

/******** pages ********/
// auth pages
import { LoginPage } from "@/pages/auth";

// admin pages
import { DashboardPage } from "@/pages/admin";

export const router = createBrowserRouter([
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute roles="admin">
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
