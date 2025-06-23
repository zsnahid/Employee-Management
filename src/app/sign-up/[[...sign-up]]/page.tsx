"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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
import "@/app/sign-up/[[...sign-up]]/styles.css";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Side - Sign Up Form */}
      <div className="flex items-center justify-center">
        <SignUp.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignUp.Step name="start">
                  <Card className="w-sm">
                    <CardHeader className="space-y-1 pb-6 text-center">
                      <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Create your account
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Welcome! Please fill in the details to get started.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Clerk.Connection name="google" asChild>
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                            className="w-full"
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

                      <Clerk.Field name="emailAddress" className="space-y-3">
                        <Clerk.Label asChild>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="email" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-destructive text-sm" />
                      </Clerk.Field>

                      <Clerk.Field name="password" className="space-y-3">
                        <Clerk.Label asChild>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-destructive text-sm" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <div className="grid w-full gap-y-4">
                        <SignUp.Captcha className="empty:hidden" />
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-5 animate-spin" />
                                ) : (
                                  "Create Account"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>

                        <Button variant="link" asChild>
                          <Clerk.Link navigate="sign-in">
                            Already have an account? Sign in
                          </Clerk.Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="continue">
                  <Card className="w-sm">
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Complete your profile
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Please provide additional information to finish setting
                        up your account.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <Clerk.Field name="firstName" className="space-y-3">
                        <Clerk.Label asChild>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            First name
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-destructive text-sm" />
                      </Clerk.Field>

                      <Clerk.Field name="lastName" className="space-y-3">
                        <Clerk.Label asChild>
                          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Last name
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-destructive text-sm" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
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
                      </SignUp.Action>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <Card className="w-sm">
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Verify your email
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          We sent a verification code to your email address
                        </CardDescription>
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
                                      className="border-input data-[status=selected]:ring-primary data-[status=cursor]:ring-primary relative flex h-12 w-12 items-center justify-center border-2 bg-white text-base shadow-sm transition-all first:rounded-l-lg first:border-l last:rounded-r-lg data-[status=cursor]:ring-2 data-[status=selected]:ring-2 dark:bg-gray-900"
                                    >
                                      {value}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="text-destructive text-center text-sm" />
                            <SignUp.Action
                              asChild
                              resend
                              className="text-center"
                              fallback={({ resendableAfter }) => (
                                <Button
                                  variant="link"
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
                              <Button variant="link">
                                Didn&apos;t receive a code? Resend
                              </Button>
                            </SignUp.Action>
                          </div>
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-5 animate-spin" />
                                ) : (
                                  "Verify & Complete"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </CardFooter>
                    </Card>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </div>

      {/* Right Side - Hero Image */}
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
