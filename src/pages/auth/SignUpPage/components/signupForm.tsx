import RHFInput from "../../../../components/RHFInputs/RHFInput";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import RHFPhoneInput from "../../../../components/RHFInputs/RHFPhoneInput";
import { CircleCheck } from "lucide-react";
import { useRegister } from "@/api/queries";
import { LoadingSpinner } from "@/components/LoadingSpinner";
export const signupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    ),
});

export type SignupSchema = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const { isPending, mutate } = useRegister();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
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
  const onSubmit = (data: SignupSchema) => {
    mutate(data)
  };

  return (
    <div className=" flex flex-col gap-1 w-full   lg:px-25">
      <h1 className=" text-[#1D1E23] text-3xl font-semibold w-full">
        {" "}
        Sign UP{" "}
      </h1>
      <p className=" text-[#6C6E75] text-sm  w-full mt-2">
        {" "}
        Welcome! Please enter your details.{" "}
      </p>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-3 mt-2 w-full"
        >
          <RHFInput
            className="h-10"
            name="name"
            label="Name"
            placeholder="Enter Your name"
          />

          <RHFInput
            className="h-10"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <RHFPhoneInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter your Phone Number"
            className="h-6"
          />
          <RHFInput
            className="h-10"
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
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
          <Button disabled={isPending} type="submit" className="rounded-md mt-2 bg-[#1B3F82]">
            {" "}
            {isPending ? <LoadingSpinner size="sm" className="  border-wight" /> :   "Get Started"}{" "}
          </Button>

          <div className=" flex w-full justify-center items-center gap-2 ">
            <span className=" text-sm text-gray-500">
              {" "}
              already have an account?
            </span>{" "}
            <Link
              to="/login"
              className=" text-sm font-semibold text-[#1B3F82] hover:underline hover:underline-offset-2"
            >
              {" "}
              Log In{" "}
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupForm;
