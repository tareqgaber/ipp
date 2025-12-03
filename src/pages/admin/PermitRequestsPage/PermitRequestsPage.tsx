import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DataTable } from "@/components/DataTable";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { t } = useTranslation();

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
        t("pages.permitRequests.confirmations.deleteMultiple", {
          count: ids.length,
        })
      )
    ) {
      bulkDelete.mutate(ids);
    }
  };

  const handleExport = (ids: string[]) => {
    console.log("Exporting permit requests:", ids);
    // Implement export logic here
    alert(
      t("pages.permitRequests.confirmations.exportingMultiple", {
        count: ids.length,
      })
    );
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
        handleExport,
      ),
    [t]
  );

  return <DataTable config={tableConfig} data={data} isLoading={isLoading} />;
};

export default PermitRequestsPage;
