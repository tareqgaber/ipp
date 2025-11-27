import RHFInput from "../../../../components/RHFInputs/RHFInput";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ArrowLeft } from "lucide-react";

const forgotPassSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPasswordForm = () => {
  const form = useForm<z.infer<typeof forgotPassSchema>>({
    resolver: zodResolver(forgotPassSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof forgotPassSchema>) =>
    console.log(data);

  return (
    <div className=" flex flex-col gap-2 w-full   lg:px-25">
      <h1 className=" text-[#1D1E23] text-3xl font-semibold w-full">
        {" "}
        Forgot password?{" "}
      </h1>
      <p className=" text-[#6C6E75] text-sm  w-full mt-2">
        {" "}
        No worries, we’ll send you reset instructions.{" "}
      </p>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 mt-4 w-full"
        >
          <RHFInput name="email" label="Email" placeholder="Enter your email" />

          <Button type="submit" className=" py-2 rounded-md mt-2 bg-[#1B3F82]">
            {" "}
            Reset password{" "}
          </Button>

          <div className=" flex w-full justify-center items-center gap-2 ">
            <Link
              to="/login"
              className=" flex  items-center gap-1 text-sm font-semibold text-[#606675] hover:underline hover:underline-offset-2"
            >
              <ArrowLeft className=" text-gray-500  h-4 mt-0.5" /> Back to login{" "}
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ForgotPasswordForm;
