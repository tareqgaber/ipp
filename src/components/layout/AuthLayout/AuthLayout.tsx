import secImage from "@/assets/images/sec.jpg";
import secLogo from "@/assets/images/secLogo.png";
import secIcon from "@/assets/images/secIcon.png";
import { Link } from "react-router";
import { Outlet } from "react-router";
import { motion } from "framer-motion";
import { slideInVariants } from "@/lib/animations";
import { useLocation } from "react-router";

export function AuthLayout() {
  return (
    <div className=" h-screen w-screen flex ">
      <div className=" h-full  w-full md:w-1/2 lg:w-[45%] flex flex-col">
        <div className="md:p-10  p-5">
          {" "}
          <div className=" w-fit">
            <Link to="/">
              <img src={secLogo} className=" h-12 " />
            </Link>{" "}
          </div>
        </div>

        <div className=" grow w-full flex items-center justify-start px-6 flex-col ">
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
      <div
        className=" h-full hidden md:flex  w-1/2 relative  bg-cover bg-center flex-col justify-end items-start px-10 pb-16 lg:w-[55%] "
        style={{ backgroundImage: `url(${secImage})` }}
      >
        <div
          className="absolute inset-0 bg-[#183874] opacity-80  pointer-events-none"
          aria-hidden="true"
        />
        <div className=" z-10 text-white flex items-start flex-col gap-5 w-full">
          <img src={secIcon} className=" h-20 w-20 mb-4" />
          <h2 className=" text-3xl  lg:text-5xl font-bold mb-2">
            Your gateway to investment <br /> and sustainable growth
          </h2>
          <p className=" text-sm lg:text-lg">
            Together we grow. BENA connects you to industrial and investment
            opportunities for Vision 2030.
          </p>
        </div>
      </div>
    </div>
  );
}
