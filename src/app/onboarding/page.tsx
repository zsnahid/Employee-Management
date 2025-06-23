"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { RoleCombobox } from "@/components/onboarding/RoleCombobox";
import { createUser } from "@/lib/actions";

export default function OnboardingComponent() {
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      // Clear any previous errors
      setError("");

      // Add the selected role to form data
      formData.append("email", user?.emailAddresses[0]?.emailAddress || "");
      formData.append("role", selectedRole);

      // Create user in database
      const createUserResult = await createUser(formData);

      // If user creation fails in database don't proceed with onboarding
      if (!createUserResult.success) {
        setError(createUserResult.error || "Failed to create user");
        return;
      }

      // Complete onboarding with Clerk
      const res = await completeOnboarding(formData);
      if (res?.message) {
        // Reloads the user's data from the Clerk API
        await user?.reload();
        router.push("/");
      }
      if (res?.error) {
        setError(String(res?.error));
      }
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Error in handleSubmit: ", error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Welcome
          </CardTitle>
          <CardDescription className="text-gray-600">
            Complete your profile to get started with our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">
                  Role
                </Label>
                <RoleCombobox onValueChange={handleRoleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation" className="text-sm font-medium">
                  Designation
                </Label>
                <Input
                  type="text"
                  name="designation"
                  id="designation"
                  placeholder="e.g. Software Engineer"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-sm font-medium">
                  Salary
                </Label>
                <Input
                  type="number"
                  name="salary"
                  id="salary"
                  placeholder="Monthly salary"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="bank_account_no"
                  className="text-sm font-medium"
                >
                  Bank Account Number
                </Label>
                <Input
                  type="text"
                  name="bank_account_no"
                  id="bank_account_no"
                  placeholder="Enter account number"
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">
                  Address
                </Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-600">
                  Error: {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Complete Onboarding
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
