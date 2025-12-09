import DoneIcon from "@/assets/icons/DoneIcon";
import NotYetIcon from "@/assets/icons/NotYetIcon";

interface Step {
  id: number;
  label: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  completedSteps?: number[];
  className?: string;
  showLabels?: boolean;
  showDescriptions?: boolean;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  className = "",
  showLabels = true,
  showDescriptions = true,
}) => {
  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

  const getStepIcon = (stepId: number, status: string) => {
    if (stepId === 5 && currentStep >= 5) {
      return <DoneIcon />;
    }

    switch (status) {
      case "completed":
        return <DoneIcon />;
      case "current":
        return (
          <div className="relative flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8">
            <div className="absolute inset-0 animate-ping rounded-full border-2 border-blue-100 opacity-75"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-100"></div>
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-4 sm:border-8 border-[#144892] bg-white"></div>
          </div>
        );
      case "pending":
      default:
        return <NotYetIcon />;
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        {/* Progress line background */}
        <div className="absolute top-3 sm:top-4 left-4 right-4 sm:left-6 sm:right-1 h-0.5 bg-gray-200 -translate-y-1/2">
          {/* Progress fill */}
          <div
            className="h-full bg-[#144892] transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps container */}
        <div className="relative flex justify-between px-2 sm:px-0">
          {steps.map((step) => {
            const status = getStepStatus(step.id);

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className="relative">
                  <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
                    {getStepIcon(step.id, status)}
                  </div>

                  {showLabels && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 sm:mt-3 hidden sm:block">
                      <span className="text-[10px] sm:text-xs font-medium whitespace-nowrap text-[#414651]">
                        {step.label}
                      </span>
                    </div>
                  )}
                </div>

                {showDescriptions && step.description && (
                  <div className="mt-6 sm:mt-8 text-center max-w-20 sm:max-w-[120px] hidden sm:block">
                    <span className="text-xs font-normal text-[#535862]">
                      {step.description}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;
