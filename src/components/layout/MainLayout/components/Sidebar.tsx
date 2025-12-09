import React from "react";
import { useTranslation } from "react-i18next";
import Contractors from "@/assets/icons/Contractors";
import Encroachments from "@/assets/icons/Encroachments";
import ExcevationsIcon from "@/assets/icons/ExcevationsIcon";
import Flag from "@/assets/icons/Flag";
import HelpCenterIcon from "@/assets/icons/HelpCenterIcon";
import HomeIcon from "@/assets/icons/HomeIcon";
import Logo from "@/assets/icons/Logo";
import MyTasksIcon from "@/assets/icons/MyTasksIcon";
import PerformanceIcon from "@/assets/icons/PerformanceIcon";
import PermitsIcon from "@/assets/icons/PermitsIcon";
import SettingsIcon from "@/assets/icons/SettingsIcon";
import UserIcon from "@/assets/icons/UserIcon";
import { Link, useLocation } from "react-router";
import MiniLogo from "@/assets/icons/MiniLogo";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  onCloseMobile?: () => void; // Add this prop
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  onToggle: _onToggle,
  onCloseMobile,
}) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "ar";

  const currentPath = location.pathname;

  const menuItems = [
    {
      icon: (props: any) => <HomeIcon {...props} />,
      label: t("pages.layout.Dashboard"),
      path: "/",
      title: t("pages.layout.Home"),
    },
    {
      icon: (props: any) => <MyTasksIcon {...props} />,
      label: t("pages.layout.MyTasks"),
      path: "/my-tasks",
      title: t("pages.layout.MyTasks"),
    },
    {
      icon: (props: any) => <PermitsIcon {...props} />,
      label: t("pages.layout.Permits"),
      path: "/permit-requests",
      title: t("pages.layout.Permits"),
    },
    {
      icon: (props: any) => <ExcevationsIcon {...props} />,
      label: t("pages.layout.Excavation"),
      path: "/excavation",
      title: t("pages.layout.Excavation"),
    },
    {
      icon: (props: any) => <Contractors {...props} />,
      label: t("pages.layout.Contractors"),
      path: "/contractors",
      title: t("pages.layout.Contractors"),
    },
    {
      icon: (props: any) => <Encroachments {...props} />,
      label: t("pages.layout.Encroachments"),
      path: "/encroachments",
      title: t("pages.layout.Encroachments"),
    },
    {
      icon: (props: any) => <PerformanceIcon {...props} />,
      label: t("pages.layout.CityPerformance"),
      path: "/city-performance",
      title: t("pages.layout.CityPerformance"),
    },
    {
      icon: (props: any) => <UserIcon {...props} />,
      label: t("pages.layout.EmpPerformance"),
      path: "/emp-performance",
      title: t("pages.layout.EmpPerformance"),
    },
  ];

  const ServicesItems = [
    {
      icon: (props: any) => <HelpCenterIcon {...props} />,
      label: t("pages.layout.Helpcenter"),
      path: "/help-center",
      title: t("pages.layout.Helpcenter"),
    },
    {
      icon: (props: any) => <SettingsIcon {...props} />,
      label: t("pages.layout.Settings"),
      path: "/settings",
      title: t("pages.layout.Settings"),
    },
  ];

  const isItemActive = (path: string) => {
    return currentPath === path;
  };

  const handleLinkClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className={`absolute z-0 -bottom-40 ${
          isRTL ? "right-0" : "left-0"
        } hidden lg:block`}
      >
        <Flag className={isRTL ? "scale-x-[-1]" : ""} />
      </div>
      <aside
        className={`
                flex flex-col justify-between h-screen bg-linear-to-b from-[#144892] to-[#06162C] 
                py-6 px-4 transition-all duration-300 
                ${
                  collapsed
                    ? "w-16 lg:w-14 lg:px-2"
                    : "w-[250px] lg:w-[215px] lg:px-5"
                } 
                rtl:border-l rtl:border-r-0
                overflow-y-auto
            `}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex relative z-50 flex-col gap-8 lg:gap-[71px]">
          <div className={`${collapsed ? "hidden" : "flex"} justify-center`}>
            <Logo />
          </div>
          <div className={`${collapsed ? "flex" : "hidden"} justify-center`}>
            <MiniLogo />
          </div>
          <nav className="flex flex-col lg:gap-3">
            <h6
              className={`
                            text-[11px] lg:text-[12px] font-medium text-[#889ebd] text-shadow-alpha-white 
                            ${collapsed ? "hidden" : "flex"}
                        `}
            >
              {t("pages.layout.MainMenu")}
            </h6>
            {menuItems.map((item, index) => {
              const active = isItemActive(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                                        flex items-center gap-2 lg:gap-3 transition-colors p-2 lg:p-0
                                        ${
                                          active
                                            ? "text-orange-500"
                                            : "text-white"
                                        } 
                                        ${
                                          collapsed
                                            ? "justify-center"
                                            : "justify-start"
                                        }
                                        rounded-lg lg:rounded-none 
                                    `}
                  title={collapsed ? item.label : undefined}
                  onClick={handleLinkClick}
                >
                  <span>
                    {item.icon({
                      className: "w-5 h-5 lg:w-auto lg:h-auto",
                      bg: active ? "#F68C22" : "#4C8CE6",
                      opacity: active ? "100" : "0.3",
                    })}
                  </span>
                  {!collapsed && (
                    <span className="font-medium text-[14px] lg:text-[16px] truncate">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex relative z-50 flex-col">
          <nav className="flex flex-col gap-3 lg:gap-4">
            <h6
              className={`
                            text-[11px] lg:text-[12px] font-medium text-[#889ebd] text-shadow-alpha-white 
                            ${collapsed ? "hidden" : "flex"}
                        `}
            >
              {t("pages.layout.CityPerformance")}
            </h6>
            {ServicesItems.map((item, index) => {
              const active = isItemActive(item.path);
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                                        flex items-center gap-2 lg:gap-3 transition-colors p-2 lg:p-0
                                        ${
                                          active
                                            ? "text-orange-500"
                                            : "text-white"
                                        } 
                                        ${
                                          collapsed
                                            ? "justify-center"
                                            : "justify-start"
                                        }
                                        rounded-lg lg:rounded-none 
                                    `}
                  title={collapsed ? item.label : undefined}
                  onClick={handleLinkClick}
                >
                  <span>
                    {item.icon({
                      className: "w-5 h-5 lg:w-auto lg:h-auto",
                      color: active ? "#F68C22" : "white",
                    })}
                  </span>
                  {!collapsed && (
                    <span className="font-semibold text-[14px] lg:text-[16px] truncate">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
