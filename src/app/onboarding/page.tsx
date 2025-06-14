"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RoleCombobox } from "./RoleCombobox";

export default function OnboardingComponent() {
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (formData: FormData) => {
    formData.append("role", selectedRole);

    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push("/");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <div>
      <h1>Welcome</h1>
      <form action={handleSubmit}>
        <div>
          <Label htmlFor="userName">Name</Label>
          <Input type="text" name="userName" required />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <RoleCombobox onValueChange={handleRoleChange} />
        </div>
        {error && <p className="text-destructive">Error: {error}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
