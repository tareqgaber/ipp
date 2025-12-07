import { useState } from "react";
import { X } from "lucide-react";
import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
} from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { useTranslation } from "@/hooks/useTranslation";

interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onAssign: (assigneeType: string, assignTo: string) => void;
}

const assigneeTypeOptions = [
  { id: "individual", label: "Individual" },
  { id: "team", label: "Team" },
  { id: "department", label: "Department" },
];

const assignToOptions = [
  { id: "john_smith", label: "John Smith" },
  { id: "sarah_johnson", label: "Sarah Johnson" },
  { id: "michael_chen", label: "Michael Chen" },
  { id: "team_a", label: "Team A" },
  { id: "team_b", label: "Team B" },
  { id: "team_c", label: "Team C" },
];

export const AssignModal = ({
  isOpen,
  onClose,
  selectedIds,
  onAssign,
}: AssignModalProps) => {
  const { t } = useTranslation();
  const [assigneeType, setAssigneeType] = useState<string>("");
  const [assignTo, setAssignTo] = useState<string>("");

  const handleAssign = () => {
    if (assigneeType && assignTo) {
      onAssign(assigneeType, assignTo);
      onClose();
      setAssigneeType("");
      setAssignTo("");
    }
  };

  const handleClose = () => {
    onClose();
    setAssigneeType("");
    setAssignTo("");
  };

  const formattedIds = selectedIds.join(", ");

  return (
    <DialogTrigger
      isOpen={isOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <ModalOverlay isDismissable>
        <Modal className="max-w-md">
          <Dialog>
            <div className="w-full rounded-xl bg-primary shadow-xl">
              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-primary">
                    {t("pages.permitRequests.assignModal.title")}
                    {selectedIds.length > 1 && (
                      <span className="py-.5 px-1.5 bg-brand-500 text-white rounded-lg text-xs font-medium h-5.5 inline-flex items-center ms-1">
                        {selectedIds.length}
                      </span>
                    )}
                  </h2>
                  <p className="mt-1 text-sm text-tertiary">{formattedIds}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-2 text-quaternary hover:bg-secondary hover:text-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 p-6">
                <Select
                  label={
                    t("pages.permitRequests.assignModal.assigneeType") ??
                    "Assignee Type"
                  }
                  placeholder={
                    t("pages.permitRequests.assignModal.selectAssigneeType") ??
                    "Select assignee type"
                  }
                  items={assigneeTypeOptions}
                  selectedKey={assigneeType}
                  onSelectionChange={(key) => setAssigneeType(key as string)}
                >
                  {(item) => (
                    <Select.Item id={item.id}>{item.label}</Select.Item>
                  )}
                </Select>

                <Select
                  label={
                    t("pages.permitRequests.assignModal.assignTo") ??
                    "Assign to"
                  }
                  placeholder={
                    t("pages.permitRequests.assignModal.selectAssignTo") ??
                    "Select assignee"
                  }
                  items={assignToOptions}
                  selectedKey={assignTo}
                  onSelectionChange={(key) => setAssignTo(key as string)}
                >
                  {(item) => (
                    <Select.Item id={item.id}>{item.label}</Select.Item>
                  )}
                </Select>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-6 pb-6">
                <Button
                  className="flex-1"
                  color="primary"
                  size="xl"
                  onClick={handleAssign}
                  isDisabled={!assigneeType || !assignTo}
                >
                  {t("pages.permitRequests.assignModal.assign") ?? "Assign"}
                </Button>
                <Button
                  color="secondary"
                  size="xl"
                  onClick={handleClose}
                  className="flex-1"
                >
                  {t("pages.permitRequests.assignModal.cancel") ?? "Cancel"}
                </Button>
              </div>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
};
