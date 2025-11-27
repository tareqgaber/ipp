import { Outlet, useMatches } from "react-router";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { AppSidebar } from "@/components/SideNav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Lightbulb02, Users01, Settings02 } from "@untitledui/icons";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/UserMenu";
import { useBreakpoint } from "@/hooks/useBreakpoints";
import { useState } from "react";
import { useEffect } from "react";
import type { RouteHandle } from "@/router/types";
const AdminPages = [
  { url: "/admin/opportunities", Icon: Lightbulb02, label: "Opportunity" },
  { url: "/admin/users", Icon: Users01, label: "Users" },
  { url: "/admin/settings", Icon: Settings02, label: "Settings" },
];

export function AdminLayout() {
  const matches = useMatches();
  const { isMobile } = useBreakpoint();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Get route handle from current matched route
  const currentHandle = matches[matches.length - 1]?.handle as RouteHandle | undefined;
  const hideLayout = currentHandle?.hideLayout ?? false;
  const hideHeader = currentHandle?.hideHeader ?? false;
  const hideSidebar = currentHandle?.hideSidebar ?? false;

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const sidebarWidth =
    isMobile && !sidebarOpen ? "0px" : sidebarOpen ? "18rem" : "4rem";

  // If hideLayout is true, render content without any layout chrome
  if (hideLayout) {
    return (
      <div className="min-h-screen w-full">
        <Outlet />
      </div>
    );
  }

  return (
    <SidebarProvider
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      style={
        {
          "--sidebar-width": hideSidebar ? "0px" : sidebarWidth,
          "--sidebar-width-icon": "4rem",
        } as React.CSSProperties
      }
    >
      {!hideSidebar && (
        <AppSidebar
          navPages={AdminPages}
          collapsedWidth={isMobile ? "0rem" : "4rem"}
        />
      )}
      <SidebarInset className="w-full ">
        <div className="flex flex-col min-h-screen w-full">
          {!hideHeader && (
            <header className="border-b w-full h-16 ">
              <div
                className={` ${
                  isMobile ? "justify-between " : "justify-end"
                } px-6 py-4 flex items-center  gap-2  `}
              >
                {!hideSidebar && <SidebarTrigger className=" md:hidden" />}
                <div className=" flex items-center justify-between gap-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                  <UserMenu />
                </div>
              </div>
            </header>
          )}

          <main className="flex-1 p-6 bg-gray-50 w-full">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
