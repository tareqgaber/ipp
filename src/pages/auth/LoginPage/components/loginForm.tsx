import { RHFCheckbox, RHFInput } from "@/components/RHFInputs";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router";
import { Button } from "@/components/base/buttons/button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useLogin } from "@/api/queries";
import { useTranslation } from "@/hooks/useTranslation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
  const { t } = useTranslation();
  const { mutate, isPending } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    mutate(data);
  };

  return (
    <>
      <h1 className=" text-display-sm-r font-semibold text-center mb-3">
        {t("auth.login.title")}
      </h1>
      <p className="text-md-r text-tertiary-600 text-center mb-8">
        {t("auth.login.subtitle")}
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
          <div className="flex w-full justify-between items-center py-1">
            <RHFCheckbox name="remember" label={t("auth.login.rememberMe")} />

            <Link
              to="/forgot-password"
              className=" text-sm font-semibold text-[#1B3F82] hover:underline hover:underline-offset-2"
            >
              Forgot Password?
            </Link>
          </div>
          <Button
            disabled={isPending}
            type="submit"
            className=""
            isLoading={isPending}
          >
            {t("auth.login.submit")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
