import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SettingsCard() {
  return (
    <Card className="w-full max-w-md border border-border bg-background shadow-sm p-5 flex flex-col gap-6">
      <CardHeader className="p-0 flex flex-col gap-3">
        <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-lg shadow-inner">
          <Clock className="w-5 h-5" />
        </div>

        <div className="flex flex-col gap-1">
          <CardTitle className="text-base font-semibold text-foreground">
            SLA Time
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Modify the SLA time to match your service requirements.
          </CardDescription>
        </div>
      </CardHeader>

      <CardFooter className="p-0">
        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold">
          Change SLA Time
          <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
