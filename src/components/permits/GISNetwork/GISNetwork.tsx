import GISNetworkAnalysis from './components/GISNetworkAnalysis'
import CoordinatesInformation from './components/CoordinatesInformation'


const data = [
    {
        id: 1,
        name: "john-doe",
        Consultant: "John Doe",
        ProjectManagerName: "Sarah Johnson",
        IdNumber: "EMP00123",
        PrimaryNumber: "+1 (555) 123-4567",
        SecondaryNumber: "+1 (555) 987-6543",
        EmailAddress: "john.doe@consultant.com"
    },
    {
        id: 2,
        name: "jane-smith",
        Consultant: "Jane Smith",
        ProjectManagerName: "Michael Chen",
        IdNumber: "EMP00124",
        PrimaryNumber: "+1 (555) 234-5678",
        SecondaryNumber: "+1 (555) 876-5432",
        EmailAddress: "jane.smith@consultant.com"
    },
    {
        id: 3,
        name: "robert-wilson",
        Consultant: "Robert Wilson",
        ProjectManagerName: "Emma Davis",
        IdNumber: "EMP00125",
        PrimaryNumber: "+1 (555) 345-6789",
        SecondaryNumber: "+1 (555) 765-4321",
        EmailAddress: "robert.wilson@consultant.com"
    }
]
const GISNetwork = () => {
    return (
        <div className="flex flex-col gap-5 pb-5">
            <GISNetworkAnalysis />
            <CoordinatesInformation data={data} />
        </div>
    )
}

export default GISNetwork