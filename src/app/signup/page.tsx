// src/app/signup/page.tsx
"use client";  // This marks the file as a Client Component

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";  // Client-side redirect
import { signUp } from "@/lib/signupActions";  // Import the server action

function Page() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();  // For client-side redirect

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");  // Clear previous errors

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await signUp(formData);  // Call the server action

    if (result?.error) {
      setErrorMessage(result.error);  // Show error message
    } else if (result?.success) {
      // On success, redirect to login page
      router.push("/login");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input type="text" placeholder="Name" name="name" required />
            <Input type="email" placeholder="Email" name="email" required />
            <Input type="password" placeholder="Password" name="password" required minLength={6} />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <Button>Login with Google</Button>
          <Link href="/login">Already have an account? Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
