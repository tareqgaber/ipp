import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DataTable } from "@/components/DataTable";
import {
  usePermitRequestsQuery,
  useApprovePermitRequest,
  useRejectPermitRequest,
  useBulkApprovePermitRequests,
  useBulkDeletePermitRequests,
} from "@/api/queries";
import { createPermitRequestsTableConfig } from "./config/permitRequestsTableConfig";
import type { PermitRequestListParams } from "@/api/types";

export const PermitRequestsPage = () => {
  const navigate = useNavigate();

  // Table state - managed by DataTable internally, this is just for initial query
  const [tableParams] = useState<PermitRequestListParams>({
    page: 1,
    pageSize: 10,
  });

  // Fetch data
  const { data, isLoading } = usePermitRequestsQuery(tableParams);

  // Mutations
  const approvePermit = useApprovePermitRequest();
  const rejectPermit = useRejectPermitRequest();
  const bulkApprove = useBulkApprovePermitRequests();
  const bulkDelete = useBulkDeletePermitRequests();

  // Action handlers
  const handleView = (id: string) => {
    navigate(`/admin/permit-requests/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/permit-requests/${id}/edit`);
  };

  const handleApprove = (id: string) => {
    approvePermit.mutate(id);
  };

  const handleReject = (id: string) => {
    rejectPermit.mutate(id);
  };

  const handleBulkApprove = (ids: string[]) => {
    bulkApprove.mutate(ids);
  };

  const handleBulkDelete = (ids: string[]) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${ids.length} permit request(s)?`
      )
    ) {
      bulkDelete.mutate(ids);
    }
  };

  const handleExport = (ids: string[]) => {
    console.log("Exporting permit requests:", ids);
    // Implement export logic here
    alert(`Exporting ${ids.length} permit request(s)`);
  };

  // Create table configuration
  const tableConfig = useMemo(
    () =>
      createPermitRequestsTableConfig(
        handleApprove,
        handleReject,
        handleEdit,
        handleView,
        handleBulkApprove,
        handleBulkDelete,
        handleExport
      ),
    []
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <DataTable config={tableConfig} data={data} isLoading={isLoading} />
    </div>
  );
};

export default PermitRequestsPage;
