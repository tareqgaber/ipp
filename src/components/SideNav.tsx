import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import secIcon2 from "@/assets/images/secIcon2.png";
import secLogo from "@/assets/images/secLogo.png";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy01, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { useTranslation } from "@/hooks";

interface NavPage {
  Icon?: React.ElementType;
  url: string;
  label: string;
}

interface CollapsibleSidebarProps {
  navPages: NavPage[];
  footerPages?: NavPage[];
  collapsedWidth?: string;
  expandedWidth?: string;
  className?: string;
}

export function AppSidebar({
  navPages,
  collapsedWidth = "4rem",
  expandedWidth = "18rem",
  className = "",
}: CollapsibleSidebarProps) {
  const { open, toggleSidebar, isMobile } = useSidebar();
  const currentPath = useLocation();
  const { currentLanguage: lang } = useTranslation();
  const isRTL = lang === "ar";
  return (
    <motion.div
      animate={{ width: open ? expandedWidth : collapsedWidth }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      <Sidebar
        collapsible="icon"
        side={isRTL ? "right" : "left"}
        className={cn(
          "border-r bg-background transition-all duration-300 ",
          className
        )}
      >
        {/* HEADER */}
        <SidebarHeader
          className={`relative pt-3 pb-5  ${open ? "px-5" : " px-3"}`}
        >
          {!isMobile && <Button
            variant="ghost"
            size="icon"
            className={`absolute top-4  ${
              isRTL ? "-left-8" : "right-0"
            } translate-x-1/2 z-10 rounded-full h-8 w-8 bg-background shadow hover:bg-background text-foreground`}
            onClick={toggleSidebar}
          >
            {open  ? (
              isRTL ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )
            ) : isRTL ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>}

          <motion.img
            key={"icon"}
            src={isMobile ? secLogo : open  ? secLogo : secIcon2}
            alt="Logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-12 w-fit object-contain"
          />
        </SidebarHeader>

        {/* MAIN CONTENT */}
        <SidebarContent className="w-full">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col items-center gap-2">
                {navPages.map((page) => {
                  const Icon = page.Icon;
                  const isActive = currentPath.pathname === page.url;
                  return (
                    <SidebarMenuItem
                      key={page.url}
                      className={`w-full ${
                       isMobile ? "" : open ? "" : "flex items-center justify-center"
                      }`}
                    >
                      <Link
                        to={page.url}
                        className={cn(
                          "flex items-center gap-3 h-10 rounded-md transition-colors p-2",
                          isMobile ? "" : open ? "" : "justify-center w-10",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/50"
                        )}
                      >
                        {Icon && <Icon className="!h-5 !w-5" />}

                        <AnimatePresence>
                          {( open || isMobile ) && (
                            <motion.span
                              key={page.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.25 }}
                              className="text-sm truncate"
                            >
                              {page.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem
              className={`${
                isMobile ? "" : open ? "" : "flex items-center justify-center w-full"
              }`}
            >
              <SidebarMenuButton
                asChild
                tooltip={"Support"}
                className={`flex items-center h-auto ${
                  isMobile ? "" : open ? "" : "justify-center items-center w-full"
                }`}
              >
                <Link
                  to={"/support"}
                  className={cn(
                    "flex items-center gap-3 !p-2 h-auto rounded-md transition-colors",
                    isMobile ? "" : open ? "" : "!w-10 !h-10 !p-2"
                  )}
                >
                  <LifeBuoy01 className="!h-5 !w-5" />
                  <AnimatePresence>
                    {( open || isMobile ) && (
                      <motion.span
                        key="support-label"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="text-sm truncate"
                      >
                        Support
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </motion.div>
  );
}
