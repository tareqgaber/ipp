import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface WizardProgressProps {
  percent: number;
  label?: string;
  className?: string;
}

/**
 * WizardProgress - Progress bar showing wizard completion
 * Direction-neutral, no RTL adjustments needed
 */
export function WizardProgress({
  percent,
  label,
  className,
}: WizardProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Progress value={percent} className="h-2" />
        {label && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            {label}
          </div>
        )}
      </motion.div>
    </div>
  );
}
