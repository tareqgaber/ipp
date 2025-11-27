import { Controller, useFormContext } from "react-hook-form";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";

interface RHFFileUploadProps {
  name: string;
  hint?: string;
  disabled?: boolean;
  accept?: string;
  allowsMultiple?: boolean;
  maxSize?: number;
  className?: string;
}

export const RHFFileUpload = ({
  name,
  hint,
  disabled,
  accept,
  allowsMultiple = true,
  maxSize,
  className,
}: RHFFileUploadProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FileUploadDropZone
          hint={hint}
          isDisabled={disabled}
          accept={accept}
          allowsMultiple={allowsMultiple}
          maxSize={maxSize}
          className={className}
          onDropFiles={(files) => {
            if (allowsMultiple) {
              field.onChange(files);
            } else {
              field.onChange(files[0]);
            }
          }}
        />
      )}
    />
  );
};

export default RHFFileUpload;
