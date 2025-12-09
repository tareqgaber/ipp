import ProgressSteps from "../components/permits/PogressSteps/ProgressSteps";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import { Link } from "react-router";
import Tabs from "@/components/permits/Tabs/Tabs";
import ProjectDetails from "@/components/permits/ProjectDetails/ProjectDetails";
import { useTranslation } from "react-i18next";
import GISNetwork from "@/components/permits/GISNetwork/GISNetwork";
import {
  HistoryLogTimeline,
  type HistoryLogItem,
} from "@/components/HistoryLogTimeline";
import { ClockFastForward } from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

// Mock data for logs - replace with actual API data
const mockLogs: HistoryLogItem[] = [
  {
    id: "1",
    date: "29/08/2025",
    time: "10:30 AM",
    type: "request_created",
    status: "completed",
    doneBy: "John Doe",
  },
  {
    id: "2",
    date: "02/09/2025",
    time: "02:15 PM",
    type: "gis_results",
    status: "completed",
    doneBy: "System",
    gisConflicts: [
      { label: "Zone Conflict", value: "2" },
      { label: "Utility Conflict", value: "1" },
    ],
  },
  {
    id: "3",
    date: "05/09/2025",
    time: "09:00 AM",
    type: "assign",
    status: "completed",
    doneBy: "Admin",
    assignment: { from: "Queue A", to: "Review Team B" },
  },
  {
    id: "4",
    date: "05/09/2025",
    time: "11:45 AM",
    type: "save",
    status: "pending_review",
    doneBy: "Jane Smith",
    comment: "Initial review completed. Waiting for additional documentation.",
  },
];

const PermitsPage = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  // const [currentStep, setCurrentStep] = useState(2);
  const currentStep = 2;

  const steps = [
    { id: 1, label: "Request created", description: "29/08/2025 " },
    { id: 2, label: "Automated Review", description: "02/09/2025" },
    { id: 3, label: "Assigned to queue", description: "05/09/2025" },
    { id: 4, label: "Manual Review", description: "-" },
    { id: 5, label: "Request completed", description: "-" },
  ];

  const completedSteps = steps
    .filter((step) => step.id < currentStep)
    .map((step) => step.id);

  const tabs = [
    {
      id: "details",
      label: "Project Details",
      content: <ProjectDetails />,
    },
    {
      id: "gis",
      label: "GIS & Network",
      content: <GISNetwork />,
    },
    {
      id: "log",
      label: "Log",
      content: (
        <div className="bg-white rounded-lg">
          <div className="px-4 lg:px-6 py-5 flex justify-between items-center border-b border-[#E9EAEB]">
            <div className="gap-2 flex items-center">
              <FeaturedIcon
                color="brand"
                icon={ClockFastForward}
                theme="light"
                size="md"
                className="bg-brand-100 w-9.5 h-9.5 [&_svg[data-icon]]:w-5.5 [&_svg[data-icon]]:h-5.5"
              />
              <h1 className="text-[#144892] font-semibold text-[16px] sm:text-[18px]">
                Logs
              </h1>
            </div>
          </div>
          <div className="pt-4 lg:pt-10 px-4 lg:px-10 pb-4 lg:pb-10">
            <HistoryLogTimeline logs={mockLogs} />
          </div>
        </div>
      ),
    },
    {
      id: "attachments",
      label: "Attachments",
      content: (
        <div className="p-4 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Attachments Content</h3>
          <p>This is the Attachments tab content.</p>
        </div>
      ),
    },
  ];

  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
  };
  return (
    <section className="h-screen">
      <div className="flex gap-2 h-[62px] mb-3 items-center">
        <Link to={"#"}>
          <ArrowLeft className={isRTL ? "rotate-180" : ""} />
        </Link>
        <h1 className="text-[24px] font-semibold text-[#144892]">
          REQ-2025-002
        </h1>
        <div className="bg-[#FFFAEB] py-0.5 pr-2 pl-1.5 border border-[#FEDF89] flex items-center gap-1 rounded-full">
          <div className="w-1.5 h-1.5 bg-[#F79009] rounded-full" />
          <h5 className="text-[12px] font-medium text-[#B54708]">
            Pending Review
          </h5>
        </div>
      </div>
      <div className="max-w-[1105px] mx-auto mb-6">
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>
      <div>
        <Tabs tabs={tabs} onTabChange={handleTabChange} />
      </div>
    </section>
  );
};

export default PermitsPage;
