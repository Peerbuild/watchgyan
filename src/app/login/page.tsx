"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { toast } from "sonner";

const LoginButton = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "AccessDenied") {
      toast.error("You are not authorized to access this page");
    }
  }, [error]);

  return (
    <Button onClick={() => signIn("google")} className="w-full">
      Sign in with Google
    </Button>
  );
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <main className="space-y-6">
        <div className="space-y-1">
          <h1 className="font-serif text-h3">Welcome Back! Pankaj</h1>
          <p>Sign in to continue</p>
        </div>
        <Suspense>
          <LoginButton />
        </Suspense>
      </main>
    </div>
  );
}
