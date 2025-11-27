import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Pagination() {
  const pages = [1, 2, 3, "...", 8, 9, 10]
  const activePage = 1

  return (
    <div className="w-full border-t border-border-secondary px-6 pt-3 pb-4 flex justify-center items-center gap-3">
      {/* Previous Button */}
      <div className="flex-1 flex justify-start">
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center gap-1 rounded-lg shadow-sm border border-border-primary"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground/80">Previous</span>
        </Button>
      </div>

      {/* Page Numbers */}
      <div className="flex justify-center items-center gap-1">
        {pages.map((page, i) => (
          <Button
            key={i}
            variant={page === activePage ? "contained" : "ghost"}
            size="sm"
            className={cn(
              "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
              page === activePage
                ? "bg-muted text-foreground font-semibold"
                : "text-muted-foreground hover:bg-muted/60"
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex-1 flex justify-end">
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center gap-1 rounded-lg shadow-sm border border-border-primary"
        >
          <span className="text-sm font-semibold text-foreground/80">Next</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}
