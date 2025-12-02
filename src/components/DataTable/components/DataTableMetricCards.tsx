import { cn } from "@/lib/utils";
import { Badge } from "@/components/base/badges/badges";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { DataTableMetricCard } from "../types";

interface DataTableMetricCardsProps {
  cards: DataTableMetricCard[];
  activeCardId?: string; // For radio mode
  activeCardIds?: string[]; // For checkbox mode
  selectionMode?: "radio" | "checkbox";
  onCardClick: (cardId: string, filterKey: string, filterValue: any) => void;
}

export const DataTableMetricCards = ({
  cards,
  activeCardId,
  activeCardIds = [],
  selectionMode = "radio",
  onCardClick,
}: DataTableMetricCardsProps) => {
  if (!cards || cards.length === 0) return null;

  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "gap-4",
        "md:grid-cols-2",
        "xl:grid-cols-4"
      )}
    >
      {cards.map((card) => {
        const isClickable = card.clickable !== false; // Default to true
        const isActive =
          selectionMode === "checkbox"
            ? activeCardIds.includes(card.id)
            : activeCardId === card.id;

        return (
          <button
            key={card.id}
            onClick={() =>
              isClickable &&
              onCardClick(card.id, card.filterKey, card.filterValue)
            }
            disabled={!isClickable}
            className={cn(
              "group relative flex flex-col rounded-lg p-4 text-left transition-all shadow-xs",
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
          </button>
        );
      })}
    </div>
  );
};
