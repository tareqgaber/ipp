import RHFInput from "../../../../components/RHFInputs/RHFInput";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { CircleCheck, ArrowLeft } from "lucide-react";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const getPasswordChecks = () => {
    const password = form.watch("password") || "";

    return {
      hasMinLength: password.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };
  console.log(getPasswordChecks());
  const onSubmit = (data: ResetPasswordSchema) => console.log(data);

  return (
    <div className=" flex flex-col gap-3 w-full   lg:px-25">
      <h1 className=" text-[#1D1E23] text-3xl font-semibold w-full">
        {" "}
        Set new password{" "}
      </h1>
      <p className=" text-[#6C6E75] text-sm  w-full mt-2">
        {" "}
        Your new password must be different to previously used passwords.{" "}
      </p>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-3 mt-2 w-full"
        >
          <RHFInput
            className="h-10"
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <RHFInput
            className="h-10"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="retype your password"
          />
          <div className=" flex w-full flex-col justify-start items-start -my-2 gap-1">
            <div
              className={` flex items-center justify-start ${
                getPasswordChecks().hasMinLength
                  ? "text-green-600"
                  : "text-gray-600"
              } gap-1 text-sm`}
            >
              <CircleCheck
                className={` h-4  ${
                  getPasswordChecks().hasMinLength
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              />
              Must be at least 8 characters{" "}
            </div>
            <div
              className={`  ${
                getPasswordChecks().hasSpecialChar
                  ? "text-green-600"
                  : "text-gray-600"
              } flex items-center justify-start  gap-1 text-sm`}
            >
              {" "}
              <CircleCheck
                className={` h-4  ${
                  getPasswordChecks().hasSpecialChar
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              />{" "}
              Must contain one special character
            </div>
          </div>
          <Button type="submit" className="rounded-md mt-2 bg-[#1B3F82]">
            {" "}
            Reset password{" "}
          </Button>

          <div className=" flex w-full justify-center items-center gap-2 ">
            <Link
              to="/login"
              className=" flex  items-center gap-1 text-sm font-semibold text-[#606675] hover:underline hover:underline-offset-2"
            >
              <ArrowLeft className=" text-gray-500 h-4 mt-0.5" /> Back to login{" "}
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ResetPasswordForm;
