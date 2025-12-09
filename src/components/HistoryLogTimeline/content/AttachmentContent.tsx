import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/base/badges/badges";
import type { HistoryLogItem } from "../types";
import { Trash01, Upload01 } from "@untitledui/icons";
import { PdfIcon } from "@/components/foundations/pdf-icon";

interface AttachmentContentProps {
  log: HistoryLogItem;
}

export const AttachmentContent = ({ log }: AttachmentContentProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <div className="text-sm text-tertiary">
        <span>Done by </span>
        <span className="text-brand-600 font-medium">{log.doneBy}</span>
      </div>

      {log.attachments && log.attachments.length > 0 && (
        <div className="space-y-2">
          {log.attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-[#FAFAFA] p-3"
            >
              <div className="flex items-center gap-3">
                <PdfIcon />
                <div>
                  <p className="text-sm font-medium text-primary">
                    {attachment.name}
                  </p>
                  <p className="text-xs text-tertiary">{attachment.size}</p>
                </div>
              </div>
              <Badge
                color={attachment.status === "uploaded" ? "blue" : "error"}
                size="sm"
                className="bg-white border border-gray-200 ring-0 text-secondary-700 rounded-lg"
              >
                <span className="flex items-center gap-1">
                  {attachment.status === "uploaded" ? (
                    <Upload01 className="h-3.5 w-3.5 text-success-500" />
                  ) : (
                    <Trash01 className="h-3.5 w-3.5 text-error-500" />
                  )}
                  {attachment.status === "uploaded"
                    ? t("common.uploaded")
                    : t("common.deleted")}
                </span>
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
