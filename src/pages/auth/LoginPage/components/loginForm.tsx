import RHFCheckbox from "../../../../components/RHFInputs/RHFCheckBox";
import RHFInput from "../../../../components/RHFInputs/RHFInput";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useLogin } from "@/api/queries";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});






const LoginForm = () => {
  const {mutate, isPending} = useLogin()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) =>{
    mutate(data)
  };

  return (
    <div className=" flex flex-col gap-2 w-full   lg:px-25">
      <h1 className=" text-[#1D1E23] text-3xl font-semibold w-full">
        {" "}
        Log in{" "}
      </h1>
      <p className=" text-[#6C6E75] text-sm  w-full mt-2">
        {" "}
        Welcome back! Please enter your details.{" "}
      </p>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 mt-4 w-full"
        >
          <RHFInput name="email" label="Email" placeholder="Enter your email" />
          <RHFInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <div className=" flex w-full justify-between items-center">
            <RHFCheckbox name="remember" label="Remember me" />

            <Link
              to="/forgot-password"
              className=" text-sm font-semibold text-[#1B3F82] hover:underline hover:underline-offset-2"
            >
              {" "}
              Forgot Password?{" "}
            </Link>
          </div>
          <Button disabled={isPending}  type="submit" className=" py-2 rounded-md mt-2 bg-[#1B3F82]">
            {" "}
          { isPending ? <LoadingSpinner size="sm" className="  border-wight" /> :   " Log In"}{" "}
          </Button>

          <div className=" flex w-full justify-center items-center gap-2 ">
            <span className=" text-sm text-gray-500">
              {" "}
              dont have an account?
            </span>{" "}
            <Link
              to="/signup"
              className=" text-sm font-semibold text-[#1B3F82] hover:underline hover:underline-offset-2"
            >
              {" "}
              Sign Up{" "}
            </Link>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
