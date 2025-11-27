import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { WizardStepper } from "./WizardStepper";
import { WizardMobileHeader } from "./WizardMobileHeader";
import { useDirection } from "@/hooks/useDirection";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { StepUIConfig } from "../core/types";
import logoImage from "@/assets/images/logo.svg";

export interface WizardShellProps {
  stepsUi: StepUIConfig[];
  activeStepId: string;
  onStepClick?(id: string): void;
  headerSlot?: ReactNode;
  progressPercent?: number;
  footerSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * WizardShell - Main layout orchestrator
 * RTL-aware: Uses grid layout, border-e for sidebar, dynamic Sheet side
 */
export function WizardShell({
  stepsUi,
  activeStepId,
  onStepClick,
  headerSlot,
  progressPercent,
  footerSlot,
  children,
  className,
}: WizardShellProps) {
  const { isRTL } = useDirection();
  const [mobileStepsOpen, setMobileStepsOpen] = useState(false);

  const activeStep = stepsUi.find((step) => step.id === activeStepId);
  const mobileTitle = activeStep?.title || "Wizard";

  return (
    <>
      {/* Desktop Layout */}
      <div
        className={cn(
          "hidden h-screen md:grid md:grid-cols-[440px_1fr]",
          className
        )}
      >
        {/* Sidebar */}
        <aside className="border-e border-e-gray-200 overflow-y-auto px-5 py-6 bg-gray-50">
          <div className="mb-20">
            <img src={logoImage} alt="Logo" />
          </div>

          <WizardStepper
            items={stepsUi}
            activeId={activeStepId}
            onItemClick={onStepClick}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col overflow-hidden">
          {/* Custom Header Slot (if provided) */}
          {headerSlot}

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>

          {/* Footer */}
          {footerSlot}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex h-screen flex-col md:hidden">
        {/* Mobile Header */}
        {headerSlot || (
          <WizardMobileHeader
            title={mobileTitle}
            onOpenSteps={() => setMobileStepsOpen(true)}
            progressPercent={progressPercent}
          />
        )}

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>

        {/* Footer */}
        {footerSlot}

        {/* Mobile Steps Drawer */}
        <Sheet open={mobileStepsOpen} onOpenChange={setMobileStepsOpen}>
          <SheetContent
            side={isRTL ? "right" : "left"}
            className="w-[280px] px-4 py-8"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Wizard Steps</SheetTitle>
            </SheetHeader>
            <WizardStepper
              items={stepsUi}
              activeId={activeStepId}
              onItemClick={(id) => {
                onStepClick?.(id);
                setMobileStepsOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
