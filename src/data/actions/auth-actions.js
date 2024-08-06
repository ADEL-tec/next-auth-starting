"use server";

import { signIn } from "@/lib/auth/auth";
import { schemaRegister, schemaSignin } from "@/lib/zodSchema";
import { redirect } from "next/navigation";

export const registerUserAction = async (prevState, formData) => {
  const data = Object.fromEntries(formData);
  const validatedFields = schemaRegister.safeParse({
    username: data.username,
    password: data.password,
    email: data.email,
    confirm: data.confirm,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        email: data.email,
      }),
    });

    console.log(res.body);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    } else {
      redirect("/auth/signin");
    }
  } catch (err) {
    console.log(err);
    if (err.message === "NEXT_REDIRECT") {
      redirect("/auth/signin");
    }
    throw err;
  }
};

export const signinUserAction = async (prevState, formData) => {
  const data = Object.fromEntries(formData);
  console.log(data);
  const validatedFields = schemaSignin.safeParse({
    password: data.password,
    email: data.email,
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Login.",
    };
  }

  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    if (!response?.error) {
      console.log("correct");
      redirect("/");
    } else {
      throw new Error("Credentials Error");
    }
  } catch (err) {
    console.log(err, err.message);
    if (err.type === "CredentialsSignin") {
      return { ...prevState, message: "Invalid email or password" };
    }
    if (err.message === "NEXT_REDIRECT") {
      redirect("/");
    }

    throw err;
  }
};
