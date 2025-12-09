import DoneIcon from "@/assets/icons/DoneIcon";
import NotYetIcon from "@/assets/icons/NotYetIcon";
import { Stepper, Step } from "react-form-stepper";
import { useTranslation } from "react-i18next";

interface StepData {
  id: number;
  label: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: StepData[];
  currentStep: number;
  completedSteps?: number[];
  className?: string;
  showDescriptions?: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  className = "",
  showDescriptions = true,
}) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "ar";
  const activeStepIndex = currentStep - 1;

  return (
    <div className={`w-full ${className}`}>
      <div dir="ltr" className={isRTL ? "scale-x-[-1]" : ""}>
        <Stepper
          activeStep={activeStepIndex}
          connectorStateColors
          styleConfig={{
            activeBgColor: "#144892",
            activeTextColor: "#ffffff",
            completedBgColor: "#144892",
            completedTextColor: "#ffffff",
            inactiveBgColor: "#e5e7eb",
            inactiveTextColor: "#6b7280",
            size: "24px",
            circleFontSize: "24px",
            labelFontSize: "0.875rem",
            borderRadius: "50%",
            fontWeight: "normal"
          }}
          connectorStyleConfig={{
            activeColor: "#144892",
            completedColor: "#144892",
            disabledColor: "#d1d5db",
            size: 3,
            style: "solid" as const,
          }}
        >
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = index === activeStepIndex;
            const forceDoneOnStep5 = step.id === 5 && currentStep >= 5;

            return (
              <Step
                key={step.id}
                label={
                  <div className={`hidden sm:flex flex-col items-center ${isRTL ? "scale-x-[-1]" : ""}`}>
                    <span className={`font-medium text-center px-1 text-sm`}>
                      {step.label}
                    </span>
                    {showDescriptions && step.description && (
                      <span className={`text-gray-500 text-center mt-1 px-2 text-sm`}>
                        {step.description}
                      </span>
                    )}
                  </div>
                } 
                completed={isCompleted || forceDoneOnStep5}
                active={isCurrent}
              >
                <div className={isRTL ? "scale-x-[-1]" : ""}>
                  {isCompleted || forceDoneOnStep5 ? (
                    <DoneIcon />
                  ) : isCurrent ? (
                    <div className="relative flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8">
                      <div className="absolute inset-0 animate-ping rounded-full border-2 border-blue-100 opacity-75"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-blue-100"></div>
                      <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-4 sm:border-8 border-[#144892] bg-white"></div>
                    </div>
                  ) : (
                    <NotYetIcon />
                  )}
                </div>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </div>
  );
};

export default ProgressSteps;