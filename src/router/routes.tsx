import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";
import { SiteRoute } from "./SiteRoute";
import type { RouteHandle } from "./types";
import OpportunityPage from "@/pages/admin/OpportunityPage";
import UsersPage from "@/pages/admin/usersPage";
import SettingsPage from "@/pages/admin/SettingsPage";
// layouts
import { AuthLayout, AdminLayout, SiteLayout } from "@/components/layout";

/******** pages ********/
// auth pages
import {
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetpasswordPage,
} from "@/pages/auth";

// site pages
import { OpportunitiesPage, OpportunityDetailsPage } from "@/pages/site";

// admin pages
import {
  DashboardPage,
  AdminOpportunityDetailsPage,
  OpportunityFormPage,
} from "@/pages/admin";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import DraftPage from "@/pages/DraftPage";
import WizardDemo from "@/pages/examples/WizardDemo";

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      {
        path: "/",
        element: (
          <SiteRoute adminPath="/admin">
            <OpportunitiesPage />
          </SiteRoute>
        ),
      },
      {
        path: "/opportunities/:id",
        element: (
          <SiteRoute adminPath="/admin/opportunities/:id">
            <OpportunityDetailsPage />
          </SiteRoute>
        ),
      },
    ],
  },
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetpasswordPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <ProtectedRoute roles="admin">
            <DashboardPage />
          </ProtectedRoute>
        ),
        // handle: { hideLayout: true } as RouteHandle,
      },
      {
        path: "/admin/opportunities/new",
        element: (
          <ProtectedRoute roles="admin">
            <OpportunityFormPage />
          </ProtectedRoute>
        ),
        handle: { hideLayout: true } as RouteHandle,
      },
      {
        path: "/admin/opportunities/:id/edit",
        element: (
          <ProtectedRoute roles="admin">
            <OpportunityFormPage />
          </ProtectedRoute>
        ),
        handle: { hideLayout: true } as RouteHandle,
      },
      {
        path: "/admin/opportunities/:id",
        element: (
          <ProtectedRoute roles="admin">
            <AdminOpportunityDetailsPage />
          </ProtectedRoute>
        ),
        // Example: Uncomment to hide entire layout (sidebar + header)
        // handle: { hideLayout: true } as RouteHandle,
      },
      {
        path: "/admin/opportunities",
        element: (
          // <ProtectedRoute roles="admin">
          <OpportunityPage />
          // </ProtectedRoute>
        ),
        // Example: Uncomment to hide only the sidebar
        // handle: { hideSidebar: true } as RouteHandle,
      },
      {
        path: "/admin/users",
        element: (
          // <ProtectedRoute roles="admin">
          <UsersPage />
          // </ProtectedRoute>
        ),
        // Example: Uncomment to hide only the header
        // handle: { hideHeader: true } as RouteHandle,
      },
      {
        path: "/admin/settings",
        element: (
          // <ProtectedRoute roles="admin">
          <SettingsPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/admin/wizard",
        element: (
          // <ProtectedRoute roles="admin">
          <WizardDemo />
          // </ProtectedRoute>
        ),
        handle: { hideLayout: true } as RouteHandle,
      },
    ],
  }, // end admin pages
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "users",
        element: <DraftPage />,
      },
    ],
  },
  {
    path: "/Drafts",
    element: <DraftPage />,
  },
]);
