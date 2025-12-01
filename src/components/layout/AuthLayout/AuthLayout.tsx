import secLogo from "@/assets/images/secLogo.png";
import { Link } from "react-router";
import { Outlet } from "react-router";
import { motion } from "framer-motion";
import { slideInVariants } from "@/lib/animations";
import { useLocation } from "react-router";
import { useTranslation } from "@/hooks/useTranslation";

export function AuthLayout() {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen w-screen bg-[url('@/assets/images/login-bg.png')] bg-cover bg-center flex items-center justify-center flex-col p-6">
      <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>

      <div className="hidden lg:block h-[148px]"></div>
      <div className="w-full md:w-1/2 lg:w-[460px] flex flex-col relative">
        <div className="bg-white rounded-3xl shadow-[0px_4px_74.69999694824219px_0px_rgba(0,0,0,0.05)] p-6 lg:p-10">
          {/* <Link to="/"> */}
          <img src={secLogo} className="h-[56px] mx-auto mb-8" />
          {/* </Link> */}
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideInVariants("ltr")}
            className="w-full"
            key={useLocation().key}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
      <div className="py-6 lg:py-10 relative">
        <p className="text-display-xs-r font-semibold text-center text-white mb-3">
          {t("pages.auth.thumb")}
        </p>
        <p className="text-md-r font-semibold text-center text-white">
          {t("pages.auth.thumb_desc")}
        </p>
      </div>
    </div>
  );
}
