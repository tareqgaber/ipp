import { useAuth } from "../../../hooks";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { useLogout } from "../../../api/queries/auth";
import { VehiclesTableExample } from "@/components/examples/VehiclesTableExample";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/animations";

export function DashboardPage() {
  const { user, role } = useAuth();
  const logout = useLogout();

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.div
        variants={staggerItemVariants}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button onClick={() => logout.mutate()} variant="outlined" color="gray">
              Logout
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={staggerItemVariants}
        whileHover="hover"
        className="p-6 bg-card rounded-lg shadow"
      >
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainerVariants}
          className="space-y-2"
        >
          <motion.p variants={staggerItemVariants}>
            <strong>Name:</strong> {user?.name}
          </motion.p>
          <motion.p variants={staggerItemVariants}>
            <strong>Email:</strong> {user?.email}
          </motion.p>
          <motion.p variants={staggerItemVariants}>
            <strong>Role:</strong>{" "}
            <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
              {role}
            </span>
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerItemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-2">Access Level</h3>
        <p>
          You are viewing the admin dashboard accessible to admin users only.
        </p>
      </motion.div>

      {/* DataTable Example */}
      <motion.div
        variants={staggerItemVariants}
        className="p-6 bg-card rounded-lg shadow"
      >
        <VehiclesTableExample />
      </motion.div>
    </motion.div>
  );
}
