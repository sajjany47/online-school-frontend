"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { InputField } from "./CustomField";
import * as Yup from "yup";
import { userLogin } from "@/service/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducer/UserReducer";
import { toast } from "react-toastify";

interface LoginValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
export const Login = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handelLogin = (values: LoginValues) => {
    userLogin(values)
      .then((res) => {
        sessionStorage.setItem("accessToken", res.data.token.accessToken);
        sessionStorage.setItem("refreshToken", res.data.token.refreshToken);
        dispatch(
          setUser({
            data: res.data.data,
            acccessToken: res.data.token.accessToken,
            refreshToken: res.data.token.refreshToken,
          })
        );
        router.push("/home");
      })
      .catch((err) => {
        toast.error(err.response.data.error ?? err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      });
  };
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handelLogin}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
              <div className={cn("flex flex-col gap-6", className)} {...props}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                      Enter your email below to login to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <Field
                        label={"Username"}
                        name="username"
                        component={InputField}
                        placeholder={"Username"}
                      />
                      <Field
                        label={"Password"}
                        name="password"
                        component={InputField}
                        placeholder={"Password"}
                        type="password"
                      />
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>

                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                      <div className="flex flex-col gap-4">
                        <Button className="w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                              fill="currentColor"
                            />
                          </svg>
                          Login with Apple
                        </Button>
                        <Button className="w-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            />
                          </svg>
                          Login with Google
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <a href="#" className="underline underline-offset-4">
                        Sign up
                      </a>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                  By clicking continue, you agree to our{" "}
                  <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>.
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
