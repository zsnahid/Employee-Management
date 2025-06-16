"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
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
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="grid h-dvh w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Left Side - Hero Image */}
      <div className="hidden flex-col items-center justify-center space-y-6 lg:flex">
        <div className="relative aspect-square w-full max-w-md">
          <Image
            src="/hero-bg.jpg"
            alt="SyncoHR - Employee Management"
            fill
            className="rounded-3xl object-cover"
            priority
          />
        </div>
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to SyncoHR
          </h1>
          <p className="max-w-md text-lg text-gray-600 dark:text-gray-400">
            Streamline your workforce management with our comprehensive HR
            platform
          </p>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="mx-auto w-full max-w-md lg:mx-0">
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step name="start">
                  <div className="space-y-6">
                    {/* Mobile Hero */}
                    <div className="mb-8 space-y-2 text-center lg:hidden">
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Welcome Back
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sign in to your SyncoHR account
                      </p>
                    </div>

                    <Card className="dark:bg-gray-900/80">
                      <CardHeader className="space-y-1 pb-6 text-center">
                        <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                          Sign in to SyncoHR
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Welcome back! Please sign in to continue
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <Clerk.Connection name="google" asChild>
                            <Button
                              size="lg"
                              variant="outline"
                              type="button"
                              disabled={isGlobalLoading}
                              className="h-12 w-full border-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <Clerk.Loading scope="provider:google">
                                {(isLoading) =>
                                  isLoading ? (
                                    <Icons.spinner className="size-5 animate-spin" />
                                  ) : (
                                    <>
                                      <Icons.google className="mr-3 size-5" />
                                      Continue with Google
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                              or continue with email
                            </span>
                          </div>
                        </div>

                        <Clerk.Field name="identifier" className="space-y-3">
                          <Clerk.Label asChild>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email address
                            </Label>
                          </Clerk.Label>
                          <Clerk.Input type="email" required asChild>
                            <Input className="focus:border-primary h-12 border-2 transition-all duration-200 focus:ring-0" />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-destructive text-sm" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter className="pt-6">
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              size="lg"
                              className="h-12 text-base font-medium"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-5 animate-spin" />
                                  ) : (
                                    "Continue"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>

                          <Button
                            variant="link"
                            size="lg"
                            asChild
                            className="text-primary hover:text-primary/80"
                          >
                            <Clerk.Link navigate="sign-up">
                              Don&apos;t have an account? Sign up
                            </Clerk.Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </SignIn.Step>

                <SignIn.Step name="choose-strategy">
                  <Card className="dark:bg-gray-900/80">
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Use another method
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Facing issues? You can use any of these methods to sign
                        in.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <SignIn.SupportedStrategy name="email_code" asChild>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isGlobalLoading}
                          className="h-12 w-full border-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          Email verification code
                        </Button>
                      </SignIn.SupportedStrategy>
                      <SignIn.SupportedStrategy name="password" asChild>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isGlobalLoading}
                          className="h-12 w-full border-2 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          Password
                        </Button>
                      </SignIn.SupportedStrategy>
                    </CardContent>
                    <CardFooter>
                      <SignIn.Action navigate="previous" asChild>
                        <Button
                          disabled={isGlobalLoading}
                          size="lg"
                          variant="outline"
                          className="h-12 w-full"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-5 animate-spin" />
                              ) : (
                                "Go back"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="verifications">
                  <SignIn.Strategy name="password">
                    <Card className="dark:bg-gray-900/80">
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Enter your password
                        </CardTitle>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Welcome back <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Clerk.Field name="password" className="space-y-3">
                          <Clerk.Label asChild>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Password
                            </Label>
                          </Clerk.Label>
                          <Clerk.Input type="password" asChild>
                            <Input className="focus:border-primary h-12 border-2 transition-all duration-200 focus:ring-0" />
                          </Clerk.Input>
                          <Clerk.FieldError className="text-destructive text-sm" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              size="lg"
                              className="h-12 text-base font-medium"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-5 animate-spin" />
                                  ) : (
                                    "Sign In"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              type="button"
                              size="lg"
                              variant="link"
                              className="text-primary hover:text-primary/80"
                            >
                              Use another method
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>

                  <SignIn.Strategy name="email_code">
                    <Card className="dark:bg-gray-900/80">
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Check your email
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Enter the verification code sent to your email
                        </CardDescription>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Welcome back <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Clerk.Field name="code">
                          <Clerk.Label className="sr-only">
                            Email verification code
                          </Clerk.Label>
                          <div className="grid items-center justify-center gap-y-4">
                            <div className="flex justify-center text-center">
                              <Clerk.Input
                                type="otp"
                                autoSubmit
                                className="flex justify-center has-[:disabled]:opacity-50"
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className="border-input data-[status=selected]:ring-primary data-[status=cursor]:ring-primary -sm relative flex h-12 w-12 items-center justify-center border-2 bg-white text-base transition-all first:rounded-l-lg first:border-l last:rounded-r-lg data-[status=cursor]:ring-2 data-[status=selected]:ring-2 dark:bg-gray-900"
                                    >
                                      {value}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="text-destructive text-center text-sm" />
                            <SignIn.Action
                              asChild
                              resend
                              className="text-center"
                              fallback={({ resendableAfter }) => (
                                <Button
                                  variant="link"
                                  size="lg"
                                  disabled
                                  className="text-gray-500"
                                >
                                  Didn&apos;t receive a code? Resend (
                                  <span className="tabular-nums">
                                    {resendableAfter}
                                  </span>
                                  )
                                </Button>
                              )}
                            >
                              <Button
                                variant="link"
                                size="lg"
                                className="text-primary hover:text-primary/80"
                              >
                                Didn&apos;t receive a code? Resend
                              </Button>
                            </SignIn.Action>
                          </div>
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              size="lg"
                              className="h-12 text-base font-medium"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-5 animate-spin" />
                                  ) : (
                                    "Verify & Continue"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              size="lg"
                              variant="link"
                              className="text-primary hover:text-primary/80"
                            >
                              Use another method
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>
                </SignIn.Step>
              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </div>
    </div>
  );
}
