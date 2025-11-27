import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreVertical } from "lucide-react"

export default function OpportunityCard() {
  return (
    <Card className="flex-1 min-w-[300px] md:w-[calc(33.333%-1.25rem)] p-5 rounded-2xl border border-border-secondary shadow-sm flex flex-col">
      <CardHeader className="flex flex-row justify-between items-start p-0">
        <div className="w-12 h-12 rounded-[10px] bg-orange-500 flex items-center justify-center shadow-inner text-white">
          <Eye className="w-6 h-6" />
        </div>

        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 font-medium px-2.5 py-0.5 rounded-full"
        >
          Active
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 p-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground">Reactors</h3>
          <p className="text-sm text-muted-foreground">
            High-voltage transformers with strong demand and localization potential in manufacturing and services.
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Application Period</span>
            <span className="text-foreground font-medium">12 Mar - 28 Apr</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Spend (SAR)</span>
            <span className="text-foreground font-medium">12–16B</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quantity (Units)</span>
            <span className="text-foreground font-medium">550–750</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Local suppliers</span>
            <span className="text-foreground font-medium">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Global suppliers</span>
            <span className="text-foreground font-medium">5</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-start gap-4 p-0">
        <Button
          variant="outlined"
          className="flex-1 font-semibold border-border-primary"
        >
          View Details
        </Button>

        <Button
          variant="outlined"
          size="icon"
          className="border-border-primary"
        >
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  )
}
