import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";
import { AuthLayout } from "@/components/layout";
import { LoginPage } from "@/pages/auth";
import MainLayout from "@/components/layout/MainLayout/components/MainLayout";
import { DashboardPage } from "@/pages/admin";
import MyTasksPage from "@/pages/MyTasksPage";
import PermitsPage from "@/pages/PermitsPage";
import ExcavationPage from "@/pages/ExcavationPage";
import ContractorsPage from "./ContractorsPage";
import EncroachmentsPage from "@/pages/EncroachmentsPage";
import PerformancePage from "@/pages/PerformancePage";
import EmpPerformancePage from "@/pages/EmpPerformancePage";
import HelpCenterPage from "@/pages/HelpCenterPage";
import SettingsPage from "@/pages/SettingsPage";

export const router = createBrowserRouter([
  // Public routes (for guests only)
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

  // Protected routes (require authentication)
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/my-tasks",
        element: <MyTasksPage />,
      },
      {
        path: "/permits",
        element: <PermitsPage />,
      },
      {
        path: "/excavation",
        element: <ExcavationPage />,
      },
      {
        path: "/contractors",
        element: <ContractorsPage />,
      },
      {
        path: "/encroachments",
        element: <EncroachmentsPage />,
      },
      {
        path: "/city-performance",
        element: <PerformancePage />,
      },
      {
        path: "/emp-performance",
        element: <EmpPerformancePage />,
      },
      {
        path: "/help-center",
        element: <HelpCenterPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },

  // Fallback route
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);