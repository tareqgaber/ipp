import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { SearchLg,  ChevronDown } from "@untitledui/icons"



const OpportunityFilter = () => {
  return (
    <div className="flex flex-wrap items-center gap-5 w-full  md:flex-row flex-col">
      <Card className="w-full md:w-[calc(50%-0.75rem)] flex items-center pl-6 p-0 border border-border shadow-sm rounded-lg relative ">
        <SearchLg className="h-4 w-4 text-muted-foreground absolute top-3.5 left-3" />
        <Input
          type="text"
          placeholder="Search by Opportunity name"
          className="pl-10 border-0 shadow-none focus-visible:ring-0 text-base placeholder:text-muted-foreground"
        />
      </Card>

      <Card className=" flex items-start gap-2 pl-4 py-0 border border-border shadow-sm rounded-lg w-full md:w-[calc(25%-0.75rem)]">
        <Select>
          <SelectTrigger className="border-0 shadow-none p-0 focus:ring-0 text-base ">
            <SelectValue placeholder="Opportunity status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
          </SelectContent>
        </Select>
      </Card>
    </div>
  )
}

export default OpportunityFilter
