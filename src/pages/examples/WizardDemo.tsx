import { useEffect, useState } from "react";
import { useWizard } from "@/hooks";
import { useDirection } from "@/hooks/useDirection";
import {
  WizardShell,
  WizardContent,
  WizardFooter,
} from "@/components/wizard/ui";
import { mapStepsToUI } from "@/components/wizard/core/navigationUtils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoWizardConfig } from "./demoConfig";

/**
 * WizardDemo - Demo page showcasing the wizard system
 * Features:
 * - 4 steps (1 auto-skipped)
 * - Custom "Recalculate" action on step 2
 * - Full RTL/LTR support
 * - Console logging for all lifecycle events
 * - No form inputs (visual/navigation demo only)
 */
export function WizardDemo() {
  const ctx = useWizard(demoWizardConfig);
  const { direction, isRTL } = useDirection();
  const [stepsUi, setStepsUi] = useState<
    Awaited<ReturnType<typeof mapStepsToUI>>
  >([]);

  // Update steps UI when active step changes
  useEffect(() => {
    mapStepsToUI(
      ctx.steps,
      ctx.activeStep.id,
      ctx.activeStepIndex,
      ctx.values
    ).then(setStepsUi);
  }, [ctx.activeStepIndex, ctx.activeStep.id, ctx.steps, ctx.values]);

  // Log state changes for debugging
  useEffect(() => {
    console.log("[WizardDemo] State:", {
      state: ctx.state,
      activeStep: ctx.activeStep.id,
      activeIndex: ctx.activeStepIndex,
      progress: ctx.progressPercent,
      direction,
      isRTL,
    });
  }, [
    ctx.state,
    ctx.activeStep.id,
    ctx.activeStepIndex,
    ctx.progressPercent,
    direction,
    isRTL,
  ]);

  return (
    <div className="h-screen bg-background">
      <WizardShell
        stepsUi={stepsUi}
        activeStepId={ctx.activeStep.id}
        onStepClick={ctx.goto}
        progressPercent={ctx.progressPercent}
        footerSlot={
          <WizardFooter
            actions={ctx.getActions()}
            onActionClick={ctx.runAction}
          />
        }
      >
        <WizardContent
          title="New Opportunity"
          badges={[
            {
              label: "Draft",
              variant: "gray",
            },
          ]}
          // banners={
          //   ctx.activeStepIndex === 0
          //     ? [
          //         {
          //           type: "info",
          //           title: "Demo Wizard",
          //           message:
          //             "This is a demonstration of the wizard system with no form inputs. Navigate between steps to see lifecycle events in the console.",
          //         },
          //       ]
          //     : undefined
          // }
        >
          <div className="space-y-6">
            {/* Step Content */}
            <StepContent stepId={ctx.activeStep.id} />

            {/* Debug Info Card */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="text-lg">Debug Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-muted-foreground">Current Step:</div>
                  <div className="font-mono">{ctx.activeStep.id}</div>

                  <div className="text-muted-foreground">Step Index:</div>
                  <div className="font-mono">
                    {ctx.activeStepIndex} / {ctx.steps.length - 1}
                  </div>

                  <div className="text-muted-foreground">Progress:</div>
                  <div className="font-mono">{ctx.progressPercent}%</div>

                  <div className="text-muted-foreground">Wizard State:</div>
                  <div className="font-mono">
                    <Badge
                      variant={
                        ctx.state === "idle"
                          ? "success"
                          : ctx.state === "error"
                          ? "error"
                          : "warning"
                      }
                    >
                      {ctx.state}
                    </Badge>
                  </div>

                  <div className="text-muted-foreground">Direction:</div>
                  <div className="font-mono">{direction.toUpperCase()}</div>

                  <div className="text-muted-foreground">Visible Steps:</div>
                  <div className="font-mono">{ctx.visibleSteps.length}</div>

                  <div className="text-muted-foreground">
                    Available Actions:
                  </div>
                  <div className="font-mono">{ctx.getActions().length}</div>
                </div>

                <div className="pt-3 border-t">
                  <div className="text-muted-foreground mb-2">
                    Steps Status:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stepsUi.map((step) => (
                      <Badge
                        key={step.id}
                        variant={
                          step.status === "active"
                            ? "primary"
                            : step.status === "completed"
                            ? "success"
                            : step.status === "skipped"
                            ? "gray"
                            : "outline"
                        }
                      >
                        {step.title}: {step.status}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </WizardContent>
      </WizardShell>
    </div>
  );
}

/**
 * StepContent - Placeholder content for each step
 */
function StepContent({ stepId }: { stepId: string }) {
  const content: Record<string, React.ReactNode> = {
    "basic-info": (
      <Card>
        <CardHeader>
          <CardTitle>Basic Information Form</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            This step would contain form fields for basic company information
            such as:
          </p>
          <ul>
            <li>Company name and registration details</li>
            <li>Plan name and type</li>
            <li>Primary contact information</li>
            <li>Target localization percentage</li>
          </ul>
          <p className="text-muted-foreground italic">
            Form fields are not implemented in this demo. Click "Next" to
            proceed.
          </p>
        </CardContent>
      </Card>
    ),

    "product-details": (
      <Card>
        <CardHeader>
          <CardTitle>Product & Plant Overview</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>This step would contain:</p>
          <ul>
            <li>Product catalog and specifications</li>
            <li>Manufacturing facility details</li>
            <li>Production capacity information</li>
            <li>Saudization workforce projections (Year 1, 2, 3)</li>
          </ul>
          <p className="text-success-600 font-medium">
            Try the "Recalculate" button to see a custom action in the console!
          </p>
        </CardContent>
      </Card>
    ),

    "optional-setup": (
      <Card>
        <CardHeader>
          <CardTitle>Optional Setup</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            This step is automatically skipped in the demo via the{" "}
            <code>shouldSkip</code> function.
          </p>
          <p className="text-muted-foreground italic">
            You won't see this content during navigation.
          </p>
        </CardContent>
      </Card>
    ),

    review: (
      <Card>
        <CardHeader>
          <CardTitle>Review & Submit</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p>
            This is the final step where users would review all entered
            information:
          </p>
          <ul>
            <li>Summary of basic information</li>
            <li>Product and facility overview</li>
            <li>Saudization timeline and projections</li>
            <li>Supporting documents (if any)</li>
          </ul>
          <p className="text-primary-600 font-medium">
            Click "Submit Plan" to see the submission action in the console!
          </p>
          <p className="text-muted-foreground text-xs">
            In a real implementation, this would send data to the backend API.
          </p>
        </CardContent>
      </Card>
    ),
  };

  return content[stepId] || <div>Content for {stepId}</div>;
}

export default WizardDemo;
