import ProgressSteps from '../components/permits/PogressSteps/ProgressSteps';
import ArrowLeft from '@/assets/icons/ArrowLeft';
import { Link } from 'react-router';
import Tabs from '@/components/permits/Tabs/Tabs';
import ProjectDetails from '@/components/permits/ProjectDetails/ProjectDetails';
import { useTranslation } from 'react-i18next';
import GISNetwork from '@/components/permits/GISNetwork/GISNetwork';

const PermitsPage = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    // const [currentStep, setCurrentStep] = useState(2);
    const currentStep = 3

    const steps = [
        { id: 1, label: 'Request created', description: '29/08/2025 ' },
        { id: 2, label: 'Automated Review', description: '02/09/2025' },
        { id: 3, label: 'Assigned to queue', description: '05/09/2025' },
        { id: 4, label: 'Manual Review', description: '-' },
        { id: 5, label: 'Request completed', description: '-' }
    ];

    const completedSteps = steps.filter(step => step.id < currentStep).map(step => step.id);

    const tabs = [
        {
            id: 'details',
            label: 'Project Details',
            content: <ProjectDetails />
        },
        {
            id: 'gis',
            label: 'GIS & Network',
            content: <GISNetwork />
        },
        {
            id: 'log',
            label: 'Log',
            content: (
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Log Content</h3>
                    <p>This is the Log tab content.</p>
                </div>
            )
        },
        {
            id: 'attachments',
            label: 'Attachments',
            content: (
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Attachments Content</h3>
                    <p>This is the Attachments tab content.</p>
                </div>
            )
        }
    ];

    const handleTabChange = (tabId: string) => {
        console.log(`Tab changed to: ${tabId}`);
    };
    return (
        <section className='h-screen'>
            <div className='flex gap-2 h-[62px] mb-3 items-center'>
                <Link to={"#"}>
                    <ArrowLeft className={isRTL ? 'rotate-180' : ''} />
                </Link>
                <h1 className='text-[24px] font-semibold text-[#144892]'>REQ-2025-002</h1>
                <div className='bg-[#FFFAEB] py-0.5 pr-2 pl-1.5 border border-[#FEDF89] flex items-center gap-1 rounded-full'>
                    <div className='w-1.5 h-1.5 bg-[#F79009] rounded-full' />
                    <h5 className='text-[12px] font-medium text-[#B54708]'>Pending Review</h5>
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
                <Tabs
                    tabs={tabs}
                    onTabChange={handleTabChange}
                />
            </div>
        </section>
    )
}

export default PermitsPage