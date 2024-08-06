"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { schemaRegister } from "@/lib/zodSchema";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserAction } from "@/data/actions/auth-actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IoIosCloseCircleOutline } from "react-icons/io";
import MyButton from "@/components/custom/MyButton";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const initialState = {
    errors: {
      name: undefined,
      email: undefined,
      password: undefined,
      confirm: undefined,
    },
    message: undefined,
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  const form = useForm({
    resolver: zodResolver(schemaRegister),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const [state, formAction] = useFormState(registerUserAction, initialState);

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
  //   try {
  //     const res = await fetch("http://localhost:3000/api/auth/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: data.username,
  //         password: data.password,
  //         email: data.email,
  //       }),
  //     });

  //     console.log(res.body);
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   router.push("/auth/signin");
  // };

  return (
    <div className="h-screen">
      <div className="h-[80%] flex items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account with your personal informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="myForm"
                // onSubmit={form.handleSubmit(handleSubmit)}
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="confirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm password"
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
            <MyButton title="SignUn" />

            <Link
              href="/auth/signin"
              className="underline hover:text-zinc-700 mt-4"
            >
              Login with existing account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
