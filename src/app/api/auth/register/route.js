import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Role, User } from "@/data/models/index";

export async function POST(res) {
  try {
    const { username, email, password } = await res.json();
    console.log({ username, email, password });

    if (username === null || username === "") {
      return NextResponse.json(
        { message: "Invalid Username" },
        { status: 500 }
      );
    }
    if (email === null || email === "") {
      return NextResponse.json({ message: "Invalid email" }, { status: 500 });
    }
    if (password === null || password === "" || password < 4) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 500 }
      );
    }

    const exist = await User.findOne({ where: { email } });

    console.log("exist", exist);

    if (exist) {
      return NextResponse.json(
        { message: "this email is already exist" },
        { status: 500 }
      );
    }

    const cryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: cryptedPassword,
    });

    // set default ROLE = "CLIENT"
    const role = await Role.findOne({ where: { roleName: "client" } });
    const newUser = await user.setRole(role);
    console.log(newUser.toJson());

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error occured" });
  }
}
