import { FileIcon } from "@untitledui/file-icons";
import { Table, TableCard } from "@/components/application/table/table";
import { Toggle } from "@/components/base/toggle/toggle";
import { useState } from "react";
import DownloadIcon from "@/assets/icons/DownloadIcon";

// Mock data
const uploadedFiles = {
  items: [
    {
      id: 1,
      name: "project_plan.pdf",
      size: "2.5 MB",
      uploadedAt: "Mar 15, 2024",
      uploadedBy: "John Doe",
      includedInResponse: true,
      updatedAt: "Mar 14, 2024",
    },
    {
      id: 2,
      name: "site_photos.zip",
      size: "15.3 MB",
      uploadedAt: "Mar 14, 2024",
      uploadedBy: "Jane Smith",
      includedInResponse: false,
      updatedAt: "Mar 13, 2024",
    },
    {
      id: 3,
      name: "technical_specs.docx",
      size: "1.2 MB",
      uploadedAt: "Mar 13, 2024",
      uploadedBy: "Robert Wilson",
      includedInResponse: true,
      updatedAt: "Mar 12, 2024",
    },
  ],
};

export const AttachementsTable = () => {
  const [files, setFiles] = useState(uploadedFiles.items);

  const handleToggleIncluded = (id: number, value: boolean) => {
    setFiles(
      files.map((file) =>
        file.id === id ? { ...file, includedInResponse: value } : file
      )
    );
  };

  return (
    <TableCard.Root>
      <Table aria-label="Attachments" selectionMode="multiple">
        <Table.Header>
          <Table.Head isRowHeader id="name" className="bg-[#E9F1FC]">
            <span className="text-[12px] text-[#181D27] font-semibold">
              File name
            </span>
          </Table.Head>
          <Table.Head id="uploadedAt" className="bg-[#E9F1FC]">
            <span className="text-[12px] text-[#181D27] font-semibold">
              Upload Date
            </span>
          </Table.Head>
          <Table.Head id="uploadedBy" className="bg-[#E9F1FC]">
            <span className="text-[12px] text-[#181D27] font-semibold">
              Uploaded By
            </span>
          </Table.Head>
          <Table.Head
            id="includedInResponse"
            className="bg-[#E9F1FC] md:hidden xl:table-cell"
          >
            <span className="text-[12px] text-[#181D27] font-semibold">
              Included in response
            </span>
          </Table.Head>
          <Table.Head id="action" className="bg-[#E9F1FC]">
            <span className="text-[12px] text-[#181D27] font-semibold">
              Action
            </span>
          </Table.Head>
        </Table.Header>
        <Table.Body items={files}>
          {(item) => (
            <Table.Row id={item.id.toString()}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <FileIcon
                    type={item.name.split(".").pop() || "empty"}
                    theme="light"
                    className="size-10 dark:hidden"
                  />
                  <FileIcon
                    type={item.name.split(".").pop() || "empty"}
                    theme="dark"
                    className="size-10 not-dark:hidden"
                  />
                  <div className="whitespace-nowrap">
                    <p className="text-sm font-medium text-primary">
                      {item.name}
                    </p>
                    <p className="text-sm text-tertiary">{item.size}</p>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {item.uploadedAt}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {item.uploadedBy}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">
                <Toggle
                  size="sm"
                  dir="ltr"
                  isSelected={item.includedInResponse}
                  onChange={(checked) => handleToggleIncluded(item.id, checked)}
                />
              </Table.Cell>
              <Table.Cell>
                <span className="cursor-pointer">
                  <DownloadIcon />
                </span>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </TableCard.Root>
  );
};
