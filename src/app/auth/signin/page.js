"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { schemaSignin } from "@/lib/zodSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinUserAction } from "@/data/actions/auth-actions";
import { IoIosCloseCircleOutline } from "react-icons/io";
import MyButton from "@/components/custom/MyButton";

export default function SignInPage() {
  const [error, setError] = useState(null);
  const initialState = {
    zodErrors: {
      email: undefined,
      password: undefined,
    },
    message: undefined,
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(schemaSignin),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const [state, formAction] = useFormState(signinUserAction, initialState);

  useEffect(() => {
    if (state?.message) {
      setError(state.message);
    }

    if (state?.zodErrors) {
      console.log(Object.entries(state?.zodErrors));
      // Check if state.errors is an array before iterating
      // const errors = Object.entries(state?.zodErrors);
      // errors.forEach((error) => {
      //   console.log(error);
      //   form.setError(error[0], { message: error[1] });
      // });
    }
  }, [state, state?.zodErrors]);

  // const handleSubmit = async (data) => {
  //   setIsLoading(true);
  //   try {
  //     console.log(data);
  //     const response = await signIn("credentials", {
  //       email: data.email,
  //       password: data.password,
  //     });
  //     if (!response?.error) {
  //       // router.push("/");
  //     } else {
  //       throw new Error("Credentials error");
  //     }
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.log(err, err.message);
  //     if (err instanceof AuthError) {
  //       switch (error.type) {
  //         case "CredentialsSignin":
  //           setError("Invalid email or password");
  //         default:
  //           setError("Somthing went wrong, try again");
  //       }
  //     }
  //     throw err;
  //   }
  // };

  return (
    <div className="h-screen">
      <div className="h-[80%] flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Sign In User</CardTitle>
            <CardDescription>
              Access your account with signin with your informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="myForm"
                // onSubmit={() => {
                //   form.handleSubmit(handleSubmit);
                // }}
                action={formAction}
                className="space-y-8"
              >
                {error && (
                  <div className="w-full rounded-md bg-red-300 border border-red-700 text-red-700 px-3 py-2 flex justify-between items-center">
                    <p>{error}</p>
                    <button
                      type="button"
                      className="text-xl"
                      onClick={() => {
                        setError(null);
                      }}
                    >
                      <IoIosCloseCircleOutline />
                    </button>
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email Address"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <MyButton title="SignIn" />
            <Link
              href="/auth/signup"
              className="underline hover:text-zinc-700 mt-4"
            >
              Create an account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
