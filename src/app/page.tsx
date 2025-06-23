"use client";
import { ZapIcon } from "lucide-react";
import { Suspense } from "react";
import Image from "next/image";

import SignInForm from "@/components/sign-in/SignInForm";
import Link from "next/link";
import Credentials from "@/components/sign-in/Credentials";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <ZapIcon className="size-4" />
            </div>
            SyncoHR
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div>
            <Credentials />
            <Suspense fallback={<div>Loading...</div>}>
              <SignInForm />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/hero-bg.jpg"
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
