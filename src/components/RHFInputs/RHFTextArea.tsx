import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import clsx from "clsx";
import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from "react";



interface RHFTextAreaProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  label?: string;
  description?: string;
}

const RHFTextArea = ({ label, description, ...props }: RHFTextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const name = props.name as string;
  if (!name) {
    console.warn("RHFTextArea requires a `name` prop");
    return null;
  }

  const error =   errors[name];

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            {...field}
            {...props}
            value={field.value ?? ""}
            className={clsx(
              props.className,
              error && "border-red-600 focus:ring-red-500 focus:border-red-500",
              "shadow-none focus:shadow-none"
            )}
          />
        )}
      />

      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}

      {error && (
        <p className="text-xs text-red-600">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default RHFTextArea;
