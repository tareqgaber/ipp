import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar";
import ToggleIcon from "@/assets/icons/ToggleIcon";
import { Outlet, useLocation } from "react-router";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

interface LayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = () => {
  const { t, i18n } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = i18n.language === "ar";
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setIsMobileMenuOpen(false);
  };

  const getBreadcrumb = () => {
    const menuItems = [
      { path: "/", title: t("pages.layout.Home") },
      { path: "/my-tasks", title: t("pages.layout.MyTasks") },
      { path: "/permit-requests", title: t("pages.layout.Permits") },
      { path: "/excavation", title: t("pages.layout.Excavation") },
      { path: "/contractors", title: t("pages.layout.Contractors") },
      { path: "/encroachments", title: t("pages.layout.Encroachments") },
      { path: "/city-performance", title: t("pages.layout.CityPerformance") },
      { path: "/emp-performance", title: t("pages.layout.EmpPerformance") },
      { path: "/help-center", title: t("pages.layout.Helpcenter") },
      { path: "/settings", title: t("pages.layout.Settings") },
    ];

    const match = menuItems.find(
      (item) =>
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
    );

    const breadcrumb = [{ label: t("pages.layout.Home"), path: "/" }];

    if (match) {
      breadcrumb.push({
        label: match.title,
        path: match.path,
      });
    }

    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length > 1) {
      const dynamicId = parts[1];
      breadcrumb.push({
        label: dynamicId,
        path: "",
      });
    }

    return breadcrumb;
  };


  const getSidebarTransform = () => {
    if (isMobileMenuOpen) {
      return "translate-x-0";
    }

    if (isRTL) {
      return "translate-x-full lg:translate-x-0";
    } else {
      return "-translate-x-full lg:translate-x-0";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
        fixed lg:relative z-50 h-full
        ${getSidebarTransform()}
        transition-transform duration-300 ease-in-out
      `}
      >
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <main className="flex-1 overflow-auto w-full">
        <header className="sticky top-0 z-10 bg-white border-b border-[#e6e6e6] px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div
                className="cursor-pointer hidden lg:block"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <ToggleIcon />
              </div>

              <Breadcrumb paths={getBreadcrumb()} />
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors cursor-pointer text-sm lg:text-base whitespace-nowrap"
              >
                {i18n.language === "en" ? "العربية" : "English"}
              </button>
            </div>
          </div>
        </header>

        <div className="py-6 lg:py-10 px-4 sm:px-6 lg:px-14 bg-[#F7F7F7]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
