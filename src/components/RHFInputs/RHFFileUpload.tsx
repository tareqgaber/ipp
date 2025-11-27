import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import clsx from "clsx";
import FilePicker from "../FilePicker";

interface RHFFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

function RHFFileUpload<T extends FieldValues>({
  name,
  label,
  description,
  accept,
  multiple,
  className,
}: RHFFileUploadProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [fileNames, setFileNames] = useState<string[]>([]);
  const error = errors[name];

  return (
    <div className={clsx("flex flex-col space-y-2", className)}>
      {label && (
        <Label htmlFor={name} className="font-medium text-sm">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref } }) => (
          <FilePicker
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={(files) => {
              const names = Array.isArray(files)
                ? files.map((f) => f.name)
                : files
                ? [files.name]
                : [];
              setFileNames(names);
              onChange(files);
            }}
          />
        )}
      />

      {description && <p className="text-xs text-gray-500">{description}</p>}

      {error && (
        <p className="text-xs text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

export default RHFFileUpload;
