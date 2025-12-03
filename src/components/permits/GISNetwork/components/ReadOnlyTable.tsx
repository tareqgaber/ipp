import { Table, TableCard } from "@/components/application/table/table";


export interface ConsultantItem {
    id: number;
    name: string;
    Consultant: string;
    ProjectManagerName: string;
    IdNumber: string;
    PrimaryNumber: string;
    SecondaryNumber: string;
    EmailAddress: string;
}

export interface ReadOnlyTableProps {
    data?: ConsultantItem[];
}


export const ReadOnlyTable: React.FC<ReadOnlyTableProps> = ({ data = [] }) => {
    return (
        <TableCard.Root>
            <Table aria-label="Consultant Information" selectionMode="none">
                <Table.Header>
                    <Table.Head
                        id="Consultant"
                        className="bg-[#E9F1FC]"
                        isRowHeader
                    >
                        <span className="text-[12px] text-[#181D27] font-semibold">
                            Route
                        </span>
                    </Table.Head>
                    <Table.Head
                        id="ProjectManagerName"
                        className="bg-[#E9F1FC]"
                    >
                        <span className="text-[12px] text-[#181D27] font-semibold">
                            Start Point (Lat, Lon)
                        </span>
                    </Table.Head>
                    <Table.Head
                        id="IdNumber"
                        className="bg-[#E9F1FC]"
                    >
                        <span className="text-[12px] text-[#181D27] font-semibold">
                            End Point (Lat, Lon)
                        </span>
                    </Table.Head>
                    <Table.Head
                        id="PrimaryNumber"
                        className="bg-[#E9F1FC]"
                    >
                        <span className="text-[12px] text-[#181D27] font-semibold">
                            Path Length 
                        </span>
                    </Table.Head>
                    <Table.Head
                        id="SecondaryNumber"
                        className="bg-[#E9F1FC]"
                    >
                        <span className="text-[12px] text-[#181D27] font-semibold">
                            Path Width
                        </span>
                    </Table.Head>
                    <Table.Head
                        id="EmailAddress"
                        className="bg-[#E9F1FC]"
                    >
                        <span className="text-[12px] text-[#181D27] font-semibold">
                            Excavation Depth
                        </span>
                    </Table.Head>
                </Table.Header>
                <Table.Body items={data}>
                    {(item) => (
                        <Table.Row id={item.name}>
                            <Table.Cell  className="whitespace-nowrap text-[14px] font-medium text-[#181D27]">
                                {item.Consultant}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-[14px] font-medium text-[#181D27]">
                                {item.ProjectManagerName}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-[14px] font-medium text-[#181D27]">
                                {item.IdNumber}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-[14px] font-medium text-[#181D27]">
                                {item.PrimaryNumber}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-[14px] font-medium text-[#181D27]">
                                {item.SecondaryNumber}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap text-[14px] font-medium text-[#181D27]">
                                {item.EmailAddress}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};