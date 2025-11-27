import React, { useState, type DragEvent } from "react";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";

interface FilePickerProps {
  name: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onChange: (files: File[] | File | null) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  name,
  accept,
  multiple,
  className,
  onChange,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setFileNames(fileArray.map((f) => f.name));
    onChange(multiple ? fileArray : fileArray[0] ?? null);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
    console.log(e.dataTransfer.files);
  };

  return (
    <>
      <label
        htmlFor={name}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          className,
          "border border-gray-300 rounded-md flex flex-col gap-3 p-4 items-center justify-center cursor-pointer transition-colors duration-200",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "hover:border-blue-400 hover:bg-gray-50"
        )}
      >
        <span className="border border-gray-300 rounded-md p-2 bg-white">
          <CloudUpload className="text-gray-600" />
        </span>
        <p className="text-sm text-center text-gray-600">
          <span className="font-medium text-[#1B3F82]">Click to upload</span>{" "}
          or drag and drop <br />
          SVG, PNG, JPG or GIF (max. 800×400px)
        </p>

        {fileNames.length > 0 && (
          <ul className="mt-2 text-xs text-gray-700 text-center">
            {fileNames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        )}
      </label>

      <input
        id={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </>
  );
};

export default FilePicker;
