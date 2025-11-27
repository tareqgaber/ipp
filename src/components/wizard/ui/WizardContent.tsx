import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { WizardBanner } from "./WizardBanner";
import { wizardStepVariants } from "@/lib/animations";
import { useDirection } from "@/hooks/useDirection";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { BadgeConfig, BannerConfig } from "../core/types";

export interface WizardContentProps {
  title?: string;
  description?: string;
  badges?: BadgeConfig[];
  banners?: BannerConfig[];
  children: ReactNode;
  className?: string;
}

/**
 * WizardContent - Main content area with animated transitions
 * RTL-aware: Uses direction-aware slide animations
 */
export function WizardContent({
  title,
  description,
  badges,
  banners,
  children,
  className,
}: WizardContentProps) {
  const { direction } = useDirection();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title || "content"}
        variants={wizardStepVariants(direction)}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn("flex flex-col gap-6", className)}
      >
        {/* Header Section */}
        {(title || description || badges) && (
          <div className="flex flex-col gap-3">
            <div className="">
              {title && (
                <h2 className="text-2xl font-semibold text-foreground leading-8 text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
              {/* Badges */}
              {badges && badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {badges.map((badge, index) => (
                    <Badge key={index} variant={badge.variant}>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Banners Section */}
        {banners && banners.length > 0 && (
          <div className="flex flex-col gap-3">
            {banners.map((banner, index) => (
              <WizardBanner key={index} {...banner} />
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </motion.div>
    </AnimatePresence>
  );
}
