import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeCellProps {
  value: any;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "primary"
    | "warning"
    | "pink"
    | "blue"
    | "error"
    | "gray"
    | "success";
  className?: string;
}

export function BadgeCell({
  value,
  variant = "default",
  className,
}: BadgeCellProps) {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground">-</span>;
  }

  // Convert boolean to string
  const displayValue =
    typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);

  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {displayValue}
    </Badge>
  );
}
