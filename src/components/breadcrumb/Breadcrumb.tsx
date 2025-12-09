import React from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

interface BreadcrumbProps {
  paths: Array<{ label: string; path?: string }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <nav className="text-xs text-gray-500 flex items-center gap-2">
      {paths.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.path ? (
            <Link to={item.path} className="hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}

          {index < paths.length - 1 && (
            <span className="text-gray-400">{isRTL ? ">" : "/"}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
