import { cn } from "@/lib/utils";
import { Badge } from "@/components/base/badges/badges";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { DataTableMetricCard } from "../types";
import { motion } from "framer-motion";

interface DataTableMetricCardsProps {
  cards: DataTableMetricCard[];
  activeCardId?: string; // For radio mode
  activeCardIds?: string[]; // For checkbox mode
  selectionMode?: "radio" | "checkbox";
  onCardClick: (cardId: string, filterKey: string, filterValue: any) => void;
  isLoading?: boolean;
  skeletonCount?: number;
}

export const DataTableMetricCards = ({
  cards,
  activeCardId,
  activeCardIds = [],
  selectionMode = "radio",
  onCardClick,
  isLoading = false,
  skeletonCount = 5,
}: DataTableMetricCardsProps) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid",
          "grid-cols-1",
          "gap-4",
          "md:grid-cols-2",
          "xl:grid-cols-5"
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="flex flex-col rounded-lg bg-white p-4 shadow-xs dark:bg-gray-800"
          >
            {/* Title skeleton */}
            <div className="mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            {/* Value skeleton */}
            <div className="mb-2 h-10 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            {/* Badge skeleton */}
            <div className="h-6 w-1/3 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    );
  }

  if (!cards || cards.length === 0) return null;

  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "gap-4",
        "md:grid-cols-2",
        "xl:grid-cols-5"
      )}
    >
      {cards.map((card, index) => {
        const isClickable = card.clickable !== false; // Default to true
        const isActive =
          selectionMode === "checkbox"
            ? activeCardIds.includes(card.id)
            : activeCardId === card.id;

        return (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut",
            }}
            onClick={() =>
              isClickable &&
              onCardClick(card.id, card.filterKey, card.filterValue)
            }
            disabled={!isClickable}
            className={cn(
              "group relative flex flex-col rounded-lg p-4 text-start shadow-xs",
              isClickable
                ? "cursor-pointer hover:shadow-xs"
                : "cursor-default opacity-75",
              isActive
                ? "bg-[linear-gradient(180deg,#4767A5_0%,#122A57_100%)] text-white"
                : "bg-white dark:bg-gray-800"
            )}
          >
            {/* Title */}
            <h3 className="text-sm font-medium mb-2">{card.label}</h3>

            {/* Count */}
            <div className="text-display-md font-semibold mb-2">
              {card.value}
            </div>

            {/* Badge with percentage and subtext */}
            {(card.percentage || card.subtext) && (
              <Badge type="modern" color="gray" size="lg">
                <div className="flex items-center gap-1">
                  {card.directionIcon === "up" && (
                    <ArrowUpRight className="h-3 w-3 text-success-500 stroke-[2.25]" />
                  )}
                  {card.directionIcon === "down" && (
                    <ArrowDownRight className="h-3 w-3 text-error-500 stroke-[2.25]" />
                  )}
                  {card.percentage && <span>{card.percentage}</span>}
                  {card.subtext && <span>{card.subtext}</span>}
                </div>
              </Badge>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
