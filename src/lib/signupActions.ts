// src/lib/signupActions.ts
"use server";  // This marks the file as a Server Action

import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";

export async function signUp(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  try {
    await dbConnect();

    // Check if user already exists in the database by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return { success: true };
  } catch (error) {
    console.error("Error during signup:", error.message);
    return { error: "Signup failed. Please try again later." };
  }
}
